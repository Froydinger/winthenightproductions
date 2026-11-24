import { createHmac, randomUUID } from 'node:crypto';
import { isIP } from 'node:net';
export interface QuotaTicket {
  allowed: boolean;
  retryAfter?: number;
  reserve(tokens: number): Promise<{ allowed: boolean; retryAfter?: number }>;
  finish(outcome: 'pre-provider' | 'terminal'): Promise<void>;
}
export type QuotaFactory = (ip: string) => Promise<QuotaTicket>;
export function visitorAddress(address: string) {
  if (isIP(address) === 4) return address;
  if (isIP(address) !== 6) throw Error('Client identity unavailable');
  const compact = new URL(`http://[${address}]/`).hostname.slice(1, -1);
  const [left, right] = compact.split('::');
  const head = left ? left.split(':') : [], tail = right ? right.split(':') : [];
  const groups = right === undefined ? head : [...head, ...Array(8 - head.length - tail.length).fill('0'), ...tail];
  if (groups.slice(0, 5).every(g => Number.parseInt(g, 16) === 0) && groups[5] === 'ffff') {
    return groups.slice(6).flatMap(g => { const n = Number.parseInt(g, 16); return [n >> 8, n & 255]; }).join('.');
  }
  return groups.slice(0, 4).map(g => Number.parseInt(g, 16).toString(16)).join(':');
}
export async function beginQuota(ip: string, env = process.env, transport = fetch): Promise<QuotaTicket> {
  const secret = env.WTN_QUOTA_SECRET, endpoint = env.WTN_QUOTA_URL;
  if (!secret || secret.length < 32 || !endpoint) throw Error('Quota unavailable');
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || !url.hostname.endsWith('.workers.dev')) throw Error('Quota endpoint invalid');
  const visitor = createHmac('sha256', secret).update(`wtn-visitor-v1\n${visitorAddress(ip)}`).digest('hex');
  const id = randomUUID();
  async function call(path: string, extra: Record<string, unknown> = {}) {
    const timestamp = String(Date.now()), body = JSON.stringify({ id, visitor, ...extra });
    const signature = createHmac('sha256', secret!).update(`${timestamp}\nPOST\n${path}\n${body}`).digest('hex');
    const res = await transport(new URL(path, url), { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(4000), headers: { 'Content-Type': 'application/json', 'x-wtn-time': timestamp, 'x-wtn-signature': signature }, body });
    if (res.status !== 200) throw Error('Quota unavailable');
    const data = await res.json() as { allowed?: unknown; retryAfter?: unknown; finished?: unknown };
    if (!data || typeof data !== 'object') throw Error('Invalid quota reply');
    return data;
  }
  const finish = async (outcome: 'pre-provider' | 'terminal') => {
    const result = await call('/finish', { outcome });
    if (result.finished !== true) throw Error('Quota cleanup unavailable');
  };
  const admission = (data: Awaited<ReturnType<typeof call>>) => {
    if (typeof data.allowed !== 'boolean') throw Error('Invalid quota reply');
    if (data.allowed === false && (!Number.isSafeInteger(data.retryAfter) || Number(data.retryAfter) < 1 || Number(data.retryAfter) > 86400)) throw Error('Invalid quota denial');
    return { allowed: data.allowed, retryAfter: data.retryAfter as number | undefined };
  };
  try {
    const decision = admission(await call('/begin'));
    return { ...decision, reserve: async tokens => admission(await call('/reserve', { tokens })), finish };
  } catch {
    // An admission acknowledgement may have been lost. No provider is sent;
    // cleanup can safely finish this known ticket without replaying admission.
    await finish('pre-provider').catch(() => {});
    throw Error('Quota unavailable');
  }
}
