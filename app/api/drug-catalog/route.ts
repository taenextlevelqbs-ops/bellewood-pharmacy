import { NextRequest, NextResponse } from "next/server";

type RxResult = {
  rxcui: string;
  name: string;
  synonym?: string | null;
  type?: string | null;
};

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Reuse our already-working RxNorm search API internally.
    const origin = request.nextUrl.origin;

    const response = await fetch(
      `${origin}/api/drugs?q=${encodeURIComponent(q)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Drug search failed: ${response.status}`);
    }

    const data = await response.json();

    const results: RxResult[] = Array.isArray(data.results)
      ? data.results
      : [];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Drug catalog search error:", error);

    return NextResponse.json(
      { results: [], error: "Could not search drug catalog" },
      { status: 500 }
    );
  }
}
