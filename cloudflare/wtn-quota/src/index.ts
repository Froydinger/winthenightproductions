// One fixed Durable Object coordinates all WTN Netlify deployments.
// This service never receives prompts, raw IP addresses, or the OpenAI key.
export type Policy = { visitorHourly: number; visitorDaily: number; concurrency: number; dailyTokens: number };
type Visitor = { hour: number; day: number; hourly: number; daily: number };
type Ticket = { visitor: string; started: number; phase: 'preparing' | 'provider' | 'done'; tokens: number };
type State = { version: 1; policy: Policy; time: number; day: number; tokens: number; visitors: Record<string, Visitor>; tickets: Record<string, Ticket> };
type Storage = { get<T>(key: string): Promise<T | undefined>; put(key: string, value: unknown): Promise<void>; transaction<T>(callback: (tx: Storage) => Promise<T>): Promise<T> };
export type Env = Record<string, string | undefined> & { QUOTA: { idFromName(name: string): unknown; get(id: unknown): { fetch(request: Request): Promise<Response> } } };
const dayMs = 86_400_000, hourMs = 3_600_000;
const validID = (id: unknown): id is string => typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id);
const validVisitor = (id: unknown): id is string => typeof id === 'string' && /^[0-9a-f]{64}$/.test(id);
const number = (n: unknown): n is number => Number.isSafeInteger(n) && Number(n) >= 0;
const json = (value: unknown, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store' } });
export function readPolicy(env: Record<string, string | undefined>): Policy {
  function value(key: string, max: number) {
    const raw = env[key];
    if (!raw || !/^[1-9]\d*$/.test(raw)) throw Error('Quota policy missing');
    const n = Number(raw);
    if (!number(n) || n > max) throw Error('Quota policy invalid');
    return n;
  }
  return { visitorHourly: value('WTN_VISITOR_HOURLY', 1000), visitorDaily: value('WTN_VISITOR_DAILY', 10000), concurrency: value('WTN_GLOBAL_CONCURRENCY', 100), dailyTokens: value('WTN_DAILY_TOKEN_BUDGET', 1_000_000_000) };
}
function validate(s: State, p: Policy) {
  if (!s || s.version !== 1 || JSON.stringify(s.policy) !== JSON.stringify(p) || !number(s.time) || !number(s.day) || s.day !== Math.floor(s.time / dayMs) || !number(s.tokens) || s.tokens > p.dailyTokens || !s.visitors || !s.tickets || JSON.stringify(s).length > 1_000_000) throw Error('Quota state invalid');
  for (const [id, v] of Object.entries(s.visitors)) {
    if (!validVisitor(id) || !v || !number(v.hour) || !number(v.day) || Math.floor(v.hour / 24) !== v.day || v.day > s.day || v.hour > Math.floor(s.time / hourMs) || !number(v.hourly) || !number(v.daily) || v.hourly > p.visitorHourly || v.daily > p.visitorDaily || v.hourly > v.daily) throw Error('Quota visitor invalid');
  }
  const active = new Set<string>();
  for (const [id, t] of Object.entries(s.tickets)) {
    if (!validID(id) || !t || !validVisitor(t.visitor) || !number(t.started) || t.started > s.time || !number(t.tokens) || t.tokens > 301_500 || !['preparing', 'provider', 'done'].includes(t.phase) || (t.phase === 'preparing' && t.tokens !== 0) || (t.phase === 'provider' && t.tokens < 1)) throw Error('Quota ticket invalid');
    if (t.phase !== 'done') {
      if (active.has(t.visitor) || !s.visitors[t.visitor]) throw Error('Quota concurrency invalid');
      active.add(t.visitor);
    }
  }
  if (active.size > p.concurrency) throw Error('Quota concurrency invalid');
}
export async function authenticated(req: Request, secret: string | undefined, clock = Date.now) {
  if (!secret || secret.length < 32) return false;
  const timestamp = req.headers.get('x-wtn-time') || '', signature = req.headers.get('x-wtn-signature') || '';
  if (!/^\d{13}$/.test(timestamp) || Math.abs(clock() - Number(timestamp)) > 120_000 || !/^[0-9a-f]{64}$/.test(signature)) return false;
  const reader = req.clone().body?.getReader(), chunks: Uint8Array[] = [];
  let length = 0;
  if (reader) {
    try {
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        length += chunk.value.byteLength;
        if (length > 1024) { await reader.cancel(); return false; }
        chunks.push(chunk.value);
      }
    } finally { reader.releaseLock(); }
  }
  const bytesText = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytesText.set(chunk, offset); offset += chunk.byteLength; }
  const body = new TextDecoder().decode(bytesText);
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const bytes = Uint8Array.from(signature.match(/../g)!, n => Number.parseInt(n, 16));
  return crypto.subtle.verify('HMAC', key, bytes, new TextEncoder().encode(`${timestamp}\n${req.method}\n${new URL(req.url).pathname}\n${body}`));
}

export default {
  async fetch(req: Request, env: Env) {
    try {
      if (req.method === 'GET' && new URL(req.url).pathname === '/health') return json({ service: 'wtn-arc-quota', version: 1 });
      if (!await authenticated(req, env.WTN_QUOTA_SECRET)) return json({ error: 'Unauthorized' }, 401);
      readPolicy(env);
      return env.QUOTA.get(env.QUOTA.idFromName('wtn-public-arc-v1')).fetch(req);
    } catch { return json({ error: 'Quota unavailable' }, 503); }
  },
};

export class WTNArcQuota {
  private ctx: { storage: Storage };
  private env: Env;
  constructor(ctx: { storage: Storage }, env: Env) { this.ctx = ctx; this.env = env; }
  async fetch(req: Request): Promise<Response> {
    try {
      const path = new URL(req.url).pathname, policy = readPolicy(this.env);
      if (req.method === 'GET' && path === '/status') {
        const s = await this.ctx.storage.get<State>('quota-v1');
        if (s) validate(s, policy);
        return json({ version: 1, policy, initialized: !!s, day: s?.day, reservedTokens: s?.tokens || 0, active: Object.entries(s?.tickets || {}).filter(([, t]) => t.phase !== 'done').map(([id, t]) => ({ id, phase: t.phase, started: t.started })) });
      }
      if (req.method !== 'POST' || !['/begin', '/reserve', '/finish'].includes(path)) return json({ error: 'Not found' }, 404);
      const text = await req.text();
      if (text.length > 1024) return json({ error: 'Invalid request' }, 400);
      const body = JSON.parse(text) as { id?: unknown; visitor?: unknown; tokens?: unknown; outcome?: unknown };
      if (!body || !validID(body.id) || !validVisitor(body.visitor) || (path === '/reserve' && (!number(body.tokens) || body.tokens < 1 || body.tokens > 301_500)) || (path === '/finish' && !['pre-provider', 'terminal'].includes(String(body.outcome)))) return json({ error: 'Invalid request' }, 400);
      const id = body.id, visitor = body.visitor;
      return await this.ctx.storage.transaction(async tx => {
        const instant = Date.now();
        const s: State = await tx.get<State>('quota-v1') || { version: 1, policy, time: instant, day: Math.floor(instant / dayMs), tokens: 0, visitors: {}, tickets: {} };
        validate(s, policy);
        const now = Math.max(instant, s.time), day = Math.floor(now / dayMs), hour = Math.floor(now / hourMs);
        s.time = now;
        if (day > s.day) { s.day = day; s.tokens = 0; }
        for (const [tid, ticket] of Object.entries(s.tickets)) {
          // Only pre-provider tickets expire. A later reserve cannot revive them.
          if (ticket.phase === 'preparing' && now - ticket.started > 60_000) ticket.phase = 'done';
          if (ticket.phase === 'done' && now - ticket.started > 2 * dayMs) delete s.tickets[tid];
        }
        const active = Object.values(s.tickets).filter(t => t.phase !== 'done');
        const activeVisitors = new Set(active.map(t => t.visitor));
        for (const [key, v] of Object.entries(s.visitors)) if (v.day < day && !activeVisitors.has(key)) delete s.visitors[key];
        const ticket = s.tickets[id];
        let result: { allowed?: boolean; retryAfter?: number; finished?: boolean };
        if (path === '/begin') {
          const v = s.visitors[visitor] || { hour, day, hourly: 0, daily: 0 };
          if (hour > v.hour) { v.hour = hour; v.hourly = 0; }
          if (day > v.day) { v.day = day; v.daily = 0; }
          if (ticket) result = { allowed: false, retryAfter: 60 }; // Never replay provider permission.
          else if (v.hourly >= policy.visitorHourly) result = { allowed: false, retryAfter: Math.max(1, Math.ceil((hourMs - now % hourMs) / 1000)) };
          else if (v.daily >= policy.visitorDaily || s.tokens >= policy.dailyTokens) result = { allowed: false, retryAfter: Math.max(1, Math.ceil((dayMs - now % dayMs) / 1000)) };
          else if (activeVisitors.has(visitor) || active.length >= policy.concurrency || Object.keys(s.tickets).length >= 4000 || Object.keys(s.visitors).length >= 2000) result = { allowed: false, retryAfter: 60 };
          else {
            v.hourly++; v.daily++; s.visitors[visitor] = v;
            s.tickets[id] = { visitor, started: now, phase: 'preparing', tokens: 0 };
            result = { allowed: true };
          }
        } else if (path === '/reserve') {
          if (!ticket || ticket.visitor !== visitor || ticket.phase !== 'preparing' || s.tokens + Number(body.tokens) > policy.dailyTokens) result = { allowed: false, retryAfter: 60 };
          else { ticket.phase = 'provider'; ticket.tokens = Number(body.tokens); s.tokens += ticket.tokens; result = { allowed: true }; }
        } else {
          if (ticket && ticket.visitor !== visitor) throw Error('Ticket identity mismatch');
          // The authenticated Netlify caller asserts either no provider was sent,
          // or a terminal provider response was received. Usage is never refunded.
          if (ticket) ticket.phase = 'done';
          else s.tickets[id] = { visitor, started: now, phase: 'done', tokens: 0 }; // Fence a delayed begin after lost acknowledgement.
          result = { finished: true };
        }
        validate(s, policy);
        await tx.put('quota-v1', s);
        return json(result);
      });
    } catch { return json({ error: 'Quota unavailable' }, 503); }
  }
}
