type Key = string;

const requests: Map<Key, number[]> = new Map();

export function rateLimitCheck(params: { key: string; limit: number; windowMs: number }): boolean {
  const now = Date.now();
  const windowStart = now - params.windowMs;
  const list = requests.get(params.key) || [];
  const recent = list.filter((t) => t > windowStart);
  if (recent.length >= params.limit) {
    requests.set(params.key, recent);
    return false;
  }
  recent.push(now);
  requests.set(params.key, recent);
  return true;
} 