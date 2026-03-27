import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ratelimit";

export interface AriregisterResult {
  available: boolean;
  similar: number;
  status: "available" | "taken" | "similar" | "conflict" | "error";
  message: string;
  matchedName?: string;
  conflictingNames?: string[];
}

// Sõnapõhine normaliseerimine – töötab ka ü, ä, ö tähtedega
const LEGAL_FORM_WORDS = new Set([
  "oü", "as", "mtü", "sa", "fie", "tü", "uü", "tüh",
  "osaühing", "aktsiaselts", "mittetulundusühing", "sihtasutus",
  "tulundusühistu", "usaldusühing", "täisühing",
  "füüsilisest isikust ettevõtja",
]);

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => !LEGAL_FORM_WORDS.has(word))
    .join(" ");
}

function sanitize(name: string): string {
  return name.trim().slice(0, 100);
}

// Ametlik nimekontroll – sama algoritm mis äriregistri ametnikud kasutavad
// emtak_cl=66191 on vajalik täistulemuste saamiseks (ilma selleta kontroll on leebem)
async function checkNameQuery(name: string): Promise<{
  hasConflict: boolean;
  conflictingNames: string[];
}> {
  const url =
    `https://ariregister.rik.ee/est/name_query?search=1&precision=2` +
    `&name=${encodeURIComponent(name)}&legal_form_sub_register=%C3%84&legal_form=1&emtak_cl=66191`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return { hasConflict: false, conflictingNames: [] };

    const html = await res.text();

    // Kaks erinevat konfliktisõnumit äriregistrist:
    const hasConflict =
      html.includes("Nimi ei ole selgesti eristatav") ||
      html.includes("Nimi on registris juba registreeritud");

    // Konfliktinimed: "1. Aiaauk OÜ on kantud äriregistrisse 12.06.2018"
    const conflictMatches = html.match(
      /\d+\.\s+([^<\n]{3,80}?)\s+on kantud äriregistrisse/g
    );
    const conflictingNames = conflictMatches
      ? conflictMatches.map((m) =>
          m.replace(/^\d+\.\s+/, "").replace(/\s+on kantud äriregistrisse.*/, "").trim()
        )
      : [];

    return { hasConflict, conflictingNames };
  } catch {
    return { hasConflict: false, conflictingNames: [] };
  }
}

// Kiire autocomplete – täpse ja sarnase vaste leidmiseks
async function checkAutocomplete(name: string): Promise<{
  exactMatch: string | null;
  similarCount: number;
}> {
  try {
    const res = await fetch(
      `https://ariregister.rik.ee/est/api/autocomplete?q=${encodeURIComponent(name)}&limit=50`,
      { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(6000) }
    );
    if (!res.ok) return { exactMatch: null, similarCount: 0 };

    const data = await res.json();
    const results: Array<{ name: string }> = Array.isArray(data)
      ? data
      : data.data ?? data.results ?? [];

    const searchExact = name.toLowerCase().trim();
    const searchNorm = normalizeName(name);

    const exact = results.find((r) => {
      const rLower = r.name?.toLowerCase().trim() ?? "";
      const rNorm = normalizeName(r.name ?? "");
      return rLower === searchExact || rNorm === searchNorm;
    });

    const similar = results.filter((r) => {
      const rNorm = normalizeName(r.name ?? "");
      if (rNorm === searchNorm) return false; // täpne vaste, mitte sarnane
      return rNorm.includes(searchNorm) || searchNorm.includes(rNorm);
    }).length;

    return { exactMatch: exact?.name ?? null, similarCount: similar };
  } catch {
    return { exactMatch: null, similarCount: 0 };
  }
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

  const sanitized = sanitize(name);

  const [nameQueryResult, autocompleteResult] = await Promise.all([
    checkNameQuery(sanitized),
    checkAutocomplete(sanitized),
  ]);

  const { hasConflict, conflictingNames } = nameQueryResult;
  const { exactMatch, similarCount } = autocompleteResult;

  // Prioriteet 1: täpne vaste autocomplete'ist
  if (exactMatch) {
    return NextResponse.json({
      available: false,
      similar: similarCount,
      status: "taken",
      message: "Nimi on juba registreeritud äriregistris",
      matchedName: exactMatch,
      conflictingNames,
    } satisfies AriregisterResult);
  }

  // Prioriteet 2: ametlik nimekontroll leidis konflikti
  if (hasConflict) {
    return NextResponse.json({
      available: false,
      similar: conflictingNames.length,
      status: "conflict",
      message: "Nimi ei ole selgesti eristatav registrisse kantud nimedest",
      conflictingNames,
    } satisfies AriregisterResult);
  }

  // Prioriteet 3: sarnaseid nimesid on autocomplete'is
  if (similarCount > 0) {
    return NextResponse.json({
      available: true,
      similar: similarCount,
      status: "similar",
      message: `Täpne nimi on vaba, kuid leidub ${similarCount} sarnast nime`,
    } satisfies AriregisterResult);
  }

  return NextResponse.json({
    available: true,
    similar: 0,
    status: "available",
    message: "Nimi on äriregistris vaba",
  } satisfies AriregisterResult);
}
