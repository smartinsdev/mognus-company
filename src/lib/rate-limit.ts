type Window = {
  count: number;
  resetAt: number;
};

// Module scope here is a cache keyed by client, not request-scoped state, so
// concurrent renders cannot contaminate each other the way a shared `let`
// holding request data would.
//
// It is still only one process's memory: the counters reset on every deploy
// and, behind more than one instance, each instance keeps its own window. So
// this raises the cost of hammering an endpoint, it does not cap it. A real
// ceiling needs a shared store (Redis, Upstash, the platform's own limiter).
const windows = new Map<string, Window>();

// Bounds what an attacker rotating source addresses can make the map cost.
// Past this the oldest windows go, which at worst hands back a fresh quota to
// clients that had already spent theirs.
const MAX_TRACKED = 10_000;

/**
 * Fixed-window counter. Returns false once `key` has been seen more than
 * `limit` times inside `windowMs`.
 */
export function withinRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const current = windows.get(key);

  if (current && now < current.resetAt) {
    current.count += 1;
    return current.count <= limit;
  }

  // Sweeping on write keeps the module free of a timer handle that would
  // otherwise hold the process open.
  if (windows.size >= MAX_TRACKED) {
    for (const [k, w] of windows) {
      if (now >= w.resetAt) {
        windows.delete(k);
      }
    }
    // Everything still live: drop insertion-order oldest to get back under.
    for (const k of windows.keys()) {
      if (windows.size < MAX_TRACKED) {
        break;
      }
      windows.delete(k);
    }
  }

  windows.set(key, { count: 1, resetAt: now + windowMs });
  return true;
}
