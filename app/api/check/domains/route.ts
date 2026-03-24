import { NextRequest, NextResponse } from "next/server";

export interface DomainCheck {
  tld: string;
  domain: string;
  available: boolean | null;
  price?: string;
  affiliateUrl?: string;
  status: "available" | "taken" | "error";
}

export interface DomainsResult {
  domains: DomainCheck[];
}

function sanitizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 63);
}

const ZONE_AFFILIATE = process.env.ZONE_AFFILIATE_ID ?? "";

function getAffiliateUrl(domain: string, tld: string): string {
  if (tld === ".ee" || tld === ".eu") {
    const base = `https://www.zone.ee/et/domeenid/?domain=${encodeURIComponent(domain)}`;
    return ZONE_AFFILIATE ? `${base}&ref=${ZONE_AFFILIATE}` : base;
  }
  if (tld === ".com" || tld === ".io" || tld === ".co") {
    return `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(domain)}`;
  }
  return `https://www.zone.ee/et/domeenid/?domain=${encodeURIComponent(domain)}`;
}

function getPrice(tld: string): string {
  const prices: Record<string, string> = {
    ".ee": "€3,90/a",
    ".com": "€9,98/a",
    ".eu": "€4,90/a",
    ".io": "€39/a",
    ".co": "€22/a",
  };
  return prices[tld] ?? "";
}

async function checkDomainRDAP(domain: string, tld: string): Promise<"available" | "taken" | "error"> {
  const rdapEndpoints: Record<string, string> = {
    ".ee": `https://rdap.internet.ee/domain/${domain}`,
    ".com": `https://rdap.verisign.com/com/v1/domain/${domain}`,
    ".eu": `https://rdap.eu/domain/${domain}`,
    ".io": `https://rdap.nic.io/domain/${domain}`,
    ".co": `https://rdap.nic.co/domain/${domain}`,
  };

  const url = rdapEndpoints[tld];
  if (!url) return "error";

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/rdap+json" },
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 200) return "taken";
    if (res.status === 404) return "available";
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

  const slug = sanitizeName(name);
  const tlds = [".ee", ".com", ".eu", ".io"];

  const checks = await Promise.allSettled(
    tlds.map(async (tld): Promise<DomainCheck> => {
      const domain = `${slug}${tld}`;
      const status = await checkDomainRDAP(domain, tld);
      return {
        tld,
        domain,
        available: status === "available" ? true : status === "taken" ? false : null,
        price: getPrice(tld),
        affiliateUrl: status === "available" ? getAffiliateUrl(domain, tld) : undefined,
        status,
      };
    })
  );

  const domains: DomainCheck[] = checks.map((result, i) => {
    if (result.status === "fulfilled") return result.value;
    return {
      tld: tlds[i],
      domain: `${slug}${tlds[i]}`,
      available: null,
      status: "error" as const,
    };
  });

  return NextResponse.json({ domains } satisfies DomainsResult);
}
