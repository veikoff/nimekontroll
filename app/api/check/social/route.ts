import { NextRequest, NextResponse } from "next/server";

export interface SocialCheck {
  platform: string;
  url: string;
  available: boolean | null;
  status: "available" | "taken" | "error";
  handle: string;
}

export interface SocialResult {
  platforms: SocialCheck[];
}

function sanitizeHandle(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 50);
}

async function checkUrl(url: string): Promise<"available" | "taken" | "error"> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(7000),
    });

    if (res.status === 404) return "available";
    if (res.status === 200) return "taken";
    if (res.status === 302 || res.status === 301) return "taken";
    return "error";
  } catch {
    return "error";
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name || name.trim().length < 2) {
    return NextResponse.json(
      { error: "Nimi peab olema vähemalt 2 tähemärki" },
      { status: 400 }
    );
  }

  const handle = sanitizeHandle(name);

  const platforms = [
    {
      platform: "Facebook",
      url: `https://www.facebook.com/${handle}`,
      handle: `facebook.com/${handle}`,
    },
    {
      platform: "Instagram",
      url: `https://www.instagram.com/${handle}/`,
      handle: `@${handle}`,
    },
    {
      platform: "LinkedIn",
      url: `https://www.linkedin.com/company/${handle}/`,
      handle: `linkedin.com/company/${handle}`,
    },
  ];

  const checks = await Promise.allSettled(
    platforms.map(async (p): Promise<SocialCheck> => {
      const status = await checkUrl(p.url);
      return {
        platform: p.platform,
        url: p.url,
        handle: p.handle,
        available: status === "available" ? true : status === "taken" ? false : null,
        status,
      };
    })
  );

  const result: SocialCheck[] = checks.map((r, i) => {
    if (r.status === "fulfilled") return r.value;
    return {
      platform: platforms[i].platform,
      url: platforms[i].url,
      handle: platforms[i].handle,
      available: null,
      status: "error" as const,
    };
  });

  return NextResponse.json({ platforms: result } satisfies SocialResult);
}
