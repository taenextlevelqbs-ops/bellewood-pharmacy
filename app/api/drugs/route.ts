import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const url =
      "https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=" +
      encodeURIComponent(query);

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const data = await response.json();

    const rawSuggestions =
      data?.suggestionGroup?.suggestionList?.suggestion ?? [];

    const suggestions = Array.from(
      new Set(
        rawSuggestions
          .filter(
            (item: unknown): item is string =>
              typeof item === "string"
          )
          .map((item: string) => item.trim())
          .filter(Boolean)
      )
    ).slice(0, 8);

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
