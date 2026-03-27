import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { type NextRequest, NextResponse } from "next/server";

// Kui Upstash credentials puuduvad, rate limiting vahele jäetakse
const isConfigured =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit = isConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      // 10 kontrolli minutis per IP (sliding window)
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      prefix: "nimekontroll",
    })
  : null;

function getIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "127.0.0.1";
}

/**
 * Kontrollib rate limit-it. Kui limiit ületatud, tagastab 429 vastuse.
 * Kui Redis pole konfigureeritud, tagastab null (lase läbi).
 */
export async function checkRateLimit(
  request: NextRequest
): Promise<NextResponse | null> {
  if (!ratelimit) return null;

  const ip = getIp(request);
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Liiga palju päringuid. Proovi uuesti minuti pärast." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
          "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
        },
      }
    );
  }

  return null;
}
