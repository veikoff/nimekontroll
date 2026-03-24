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

// Hinnad Zone.ee (.ee, .eu) ja Namecheap (.com, .io) hinnakirjast
// Zone.ee: .eu €6.00/a, .com €12.46/a (kinnitatud zone.ee lehelt 2025)
// Zone.ee .ee hind: €9.60/a (tavahin), kampaania hind võib olla madalam
// Namecheap: .com ~$9.98/a (esimene aasta), .io ~$34.98/a
function getPrice(tld: string): string {
  const prices: Record<string, string> = {
    ".ee": "al. €9.60/a",   // Zone.ee tavahin; kampaaniad võivad olla odavamad
    ".eu": "€6.00/a",       // Zone.ee kinnitatud hind
    ".com": "~$9.98/a",     // Namecheap (esimene aasta)
    ".io": "~$34.98/a",     // Namecheap
    ".co": "~$9.98/a",      // Namecheap
  };
  return prices[tld] ?? "";
}

// Cloudflare DNS over HTTPS – töötab kõigi TLD-de jaoks
// Status 0 = NOERROR (domeen olemas), 3 = NXDOMAIN (domeen vaba)
async function checkDomainDoH(domain: string): Promise<"available" | "taken" | "error"> {
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=NS`,
      {
        headers: { Accept: "application/dns-json" },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (!res.ok) return "error";
    const data = await res.json();
    // Status 0 = NOERROR (registreeritud), 3 = NXDOMAIN (vaba)
    if (data.Status === 3) return "available";
    if (data.Status === 0) return "taken";
    return "error";
  } catch {
    return "error";
  }
}

// .com kasutab RDAP-i (usaldusväärsem kui DNS)
async function checkDomainRDAPCom(domain: string): Promise<"available" | "taken" | "error"> {
  try {
    const res = await fetch(
      `https://rdap.verisign.com/com/v1/domain/${domain}`,
      {
        headers: { Accept: "application/rdap+json" },
        signal: AbortSignal.timeout(8000),
      }
    );
    if (res.status === 200) return "taken";
    if (res.status === 404) return "available";
    return "error";
  } catch {
    return "error";
  }
}

async function checkDomain(domain: string, tld: string): Promise<"available" | "taken" | "error"> {
  // .com-il on usaldusväärne RDAP server (Verisign)
  if (tld === ".com") return checkDomainRDAPCom(domain);
  // Kõik teised TLD-d (.ee, .eu, .io, .co) DoH kaudu
  return checkDomainDoH(domain);
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
      const status = await checkDomain(domain, tld);
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
