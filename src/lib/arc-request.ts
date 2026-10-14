// Keep the displayed/session history; bound only the outgoing recent context.
export function arcRequestMessages<T extends { role: 'user' | 'assistant'; content: string }>(messages: T[]): T[] {
  const recent = messages.slice(-20);
  while (recent.length > 1 && new TextEncoder().encode(JSON.stringify(recent)).byteLength > 16_000) recent.shift();
  return recent;
}
