import { NextRequest, NextResponse } from "next/server";

type RxConcept = {
  rxcui?: string;
  name?: string;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    // RxNorm approximate drug-name search
    const searchUrl =
      "https://rxnav.nlm.nih.gov/REST/rxcui.json?name=" +
      encodeURIComponent(query) +
      "&search=9";

    const searchResponse = await fetch(searchUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!searchResponse.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const searchData = await searchResponse.json();

    const ids: string[] =
      searchData?.idGroup?.rxnormId?.slice(0, 10) ?? [];

    if (ids.length === 0) {
      return NextResponse.json({ suggestions: [] });
    }

    // Convert RxNorm IDs into actual medication names
    const names = await Promise.all(
      ids.map(async (id) => {
        try {
          const response = await fetch(
            `https://rxnav.nlm.nih.gov/REST/rxcui/${encodeURIComponent(
              id
            )}/properties.json`,
            {
              headers: { Accept: "application/json" },
              cache: "no-store",
            }
          );

          if (!response.ok) return null;

          const data = await response.json();

          const concept: RxConcept | undefined =
            data?.properties;

          return concept?.name?.trim() || null;
        } catch {
          return null;
        }
      })
    );

    const suggestions = Array.from(
      new Set(
        names.filter(
          (name): name is string =>
            typeof name === "string" && name.length > 0
        )
      )
    ).slice(0, 8);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("RxNorm search error:", error);

    return NextResponse.json(
      { suggestions: [] },
      { status: 200 }
    );
  }
}
