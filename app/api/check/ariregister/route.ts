import { NextRequest, NextResponse } from "next/server";

export interface AriregisterResult {
  available: boolean;
  similar: number;
  status: "available" | "taken" | "similar" | "error";
  message: string;
}

function sanitizeName(name: string): string {
  return name.trim().slice(0, 100);
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

  const sanitized = sanitizeName(name);

  try {
    const response = await fetch(
      `https://ariregister.rik.ee/est/api/autocomplete?q=${encodeURIComponent(sanitized)}&limit=20`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      throw new Error(`Äriregister API viga: ${response.status}`);
    }

    const data = await response.json();
    const results: Array<{ name: string; status?: string }> = Array.isArray(data)
      ? data
      : data.results ?? data.data ?? [];

    const normalizedSearch = sanitized.toLowerCase().trim();

    const exactMatch = results.find(
      (r) => r.name?.toLowerCase().trim() === normalizedSearch
    );

    const similarCount = results.filter((r) =>
      r.name?.toLowerCase().includes(normalizedSearch)
    ).length;

    if (exactMatch) {
      const result: AriregisterResult = {
        available: false,
        similar: similarCount,
        status: "taken",
        message: "Nimi on juba registreeritud äriregistris",
      };
      return NextResponse.json(result);
    }

    if (similarCount > 0) {
      const result: AriregisterResult = {
        available: true,
        similar: similarCount,
        status: "similar",
        message: `Täpne nimi on vaba, kuid leidub ${similarCount} sarnast nime`,
      };
      return NextResponse.json(result);
    }

    const result: AriregisterResult = {
      available: true,
      similar: 0,
      status: "available",
      message: "Nimi on äriregistris vaba",
    };
    return NextResponse.json(result);
  } catch (error) {
    console.error("Äriregister check error:", error);
    const result: AriregisterResult = {
      available: false,
      similar: 0,
      status: "error",
      message: "Äriregistri kontrollimine ebaõnnestus. Proovi uuesti.",
    };
    return NextResponse.json(result, { status: 502 });
  }
}
