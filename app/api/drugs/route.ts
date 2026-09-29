import { NextRequest, NextResponse } from "next/server";

type Candidate = {
  rxcui?: string;
  score?: string;
  rank?: string;
};

type RxProperties = {
  rxcui?: string;
  name?: string;
  synonym?: string;
  tty?: string;
};

type DrugResult = {
  rxcui: string;
  name: string;
  synonym: string | null;
  type: string | null;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({
      suggestions: [],
      results: [],
    });
  }

  try {
    const searchUrl =
      "https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=" +
      encodeURIComponent(query) +
      "&maxEntries=20&option=1";

    const searchResponse = await fetch(searchUrl, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!searchResponse.ok) {
      console.error(
        "RxNorm approximate search failed:",
        searchResponse.status
      );

      return NextResponse.json(
        {
          suggestions: [],
          results: [],
          error: "RxNorm search failed",
        },
        { status: 502 }
      );
    }

    const searchData = await searchResponse.json();

    const candidates: Candidate[] =
      searchData?.approximateGroup?.candidate ?? [];

    const ids = Array.from(
      new Set(
        candidates
          .map((candidate) => candidate.rxcui)
          .filter((id): id is string => Boolean(id))
      )
    ).slice(0, 12);

    if (ids.length === 0) {
      return NextResponse.json({
        suggestions: [],
        results: [],
      });
    }

    const concepts = await Promise.all(
      ids.map(async (id): Promise<DrugResult | null> => {
        try {
          const propertiesUrl =
            "https://rxnav.nlm.nih.gov/REST/rxcui/" +
            encodeURIComponent(id) +
            "/properties.json";

          const response = await fetch(propertiesUrl, {
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          const properties: RxProperties | undefined =
            data?.properties;

          if (!properties?.name) {
            return null;
          }

          return {
            rxcui: id,
            name: properties.name.trim(),
            synonym: properties.synonym?.trim() || null,
            type: properties.tty || null,
          };
        } catch {
          return null;
        }
      })
    );

    const unique = new Map<string, DrugResult>();

    for (const concept of concepts) {
      if (!concept) continue;

      const key = concept.name.toLowerCase();

      if (!unique.has(key)) {
        unique.set(key, concept);
      }
    }

    const results = Array.from(unique.values()).slice(0, 10);

    return NextResponse.json({
      suggestions: results.map((result) => result.name),
      results,
    });
  } catch (error) {
    console.error("RxNorm API error:", error);

    return NextResponse.json(
      {
        suggestions: [],
        results: [],
        error: "Unable to search medications",
      },
      { status: 500 }
    );
  }
}
