/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * This protects against naive floods and brute force on a single instance
 * (local dev, Docker, long-lived Node server). On serverless platforms each
 * instance keeps its own counters, so treat this as defense-in-depth and add
 * an edge/WAF rate limit (Vercel WAF, Upstash, Cloudflare) for hard guarantees.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

function prune(now: number): void {
  if (buckets.size < MAX_BUCKETS) return;
  for (const [key, b] of buckets) {
    if (now > b.resetAt) buckets.delete(key);
    if (buckets.size < MAX_BUCKETS / 2) break;
  }
}

/** Returns true when the request is allowed, false when the limit is exceeded. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  prune(now);
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

/** Best-effort client IP from proxy headers (Vercel/NGINX set x-forwarded-for). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return ip.slice(0, 64);
}

export const TOO_MANY = {
  error: "Too many requests — please wait a minute and try again.",
} as const;
