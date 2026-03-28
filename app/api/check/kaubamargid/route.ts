import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ratelimit";

export interface TrademarkMatch {
  id: number;
  verbalElement: string;
  currentStatus: string;
  applicationNumber: string;
  registrationNumber: string | null;
  owner: string;
}

export interface KaubamargidResult {
  status: "available" | "taken" | "similar" | "error";
  exactCount: number;
  similarCount: number;
  matches: TrademarkMatch[];
  epaUrl: string;
}

const EPA_API = "https://andmebaas.epa.ee/avalik/api/trademarks/search";

// Aktiivsed staatused (mitte lõpetatud)
const ACTIVE_STATUSES = new Set([
  "Registered",
  "Under examination",
  "Opposed",
  "Appeal pending",
  "Awaiting registration",
]);

function buildEpaUrl(name: string): string {
  return `https://andmebaas.epa.ee/avalik/#/trademarks?verbalElement=${encodeURIComponent(name)}`;
}

function mapTrademark(tm: Record<string, unknown>): TrademarkMatch {
  return {
    id: tm.id as number,
    verbalElement: (tm.verbalElement as string) ?? "",
    currentStatus: (tm.currentStatus as string) ?? "",
    applicationNumber: (tm.applicationNumber as string) ?? "",
    registrationNumber: (tm.registrationNumber as string | null) ?? null,
    owner: (tm.personSortIndex as string) ?? "",
  };
}

async function searchTrademarks(
  verbalElement: string,
  exactMatch: boolean,
  size = 5
): Promise<TrademarkMatch[]> {
  const params = new URLSearchParams({
    verbalElement,
    exactMatch: String(exactMatch),
    size: String(size),
    page: "0",
    sort: "id,desc",
  });

  const res = await fetch(
    `${EPA_API}/findBySearchParameters?${params}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok || res.status === 204) return [];

  const data = await res.json();
  const trademarks = data?._embedded?.trademarks as Record<string, unknown>[] | undefined;
  return (trademarks ?? []).map(mapTrademark);
}

export async function GET(request: NextRequest) {
  const rateLimitError = await checkRateLimit(request);
  if (rateLimitError) return rateLimitError;

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name || name.trim().length < 2) {
    return NextResponse.json(
      { error: "Nimi peab olema vähemalt 2 tähemärki" },
      { status: 400 }
    );
  }

  const trimmed = name.trim();
  const epaUrl = buildEpaUrl(trimmed);

  try {
    // Täpne otsing ja sarnane otsing paralleelselt
    const [exactMatches, similarMatches] = await Promise.all([
      searchTrademarks(trimmed, true, 5),
      searchTrademarks(trimmed, false, 5),
    ]);

    // Aktiivsed täpsed vasted
    const activeExact = exactMatches.filter((tm) =>
      ACTIVE_STATUSES.has(tm.currentStatus)
    );

    // Sarnased (v.a täpsed)
    const exactIds = new Set(exactMatches.map((tm) => tm.id));
    const onlySimilar = similarMatches.filter((tm) => !exactIds.has(tm.id));
    const activeSimilar = onlySimilar.filter((tm) =>
      ACTIVE_STATUSES.has(tm.currentStatus)
    );

    let status: KaubamargidResult["status"];
    let matches: TrademarkMatch[];

    if (activeExact.length > 0) {
      status = "taken";
      matches = activeExact;
    } else if (activeSimilar.length > 0) {
      status = "similar";
      matches = activeSimilar.slice(0, 3);
    } else {
      status = "available";
      matches = [];
    }

    const result: KaubamargidResult = {
      status,
      exactCount: activeExact.length,
      similarCount: activeSimilar.length,
      matches,
      epaUrl,
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "EPA registri päring ebaõnnestus" },
      { status: 500 }
    );
  }
}
