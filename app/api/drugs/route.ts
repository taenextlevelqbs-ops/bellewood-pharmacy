import { NextRequest, NextResponse } from "next/server";

type RxConcept = {
  rxcui?: string;
  name?: string;
  synonym?: string;
  tty?: string;
  language?: string;
  suppress?: string;
  umlscui?: string;
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
    const approximateUrl =
      "https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=" +
      encodeURIComponent(query) +
      "&maxEntries=15&option=1";

    const approximateResponse = await fetch(approximateUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!approximateResponse.ok) {
      return NextResponse.json({
        suggestions: [],
        results: [],
      });
    }

    const approximateData = await approximateResponse.json();

    const candidates: Array<{ rxcui?: string }> =
      approximateData?.approximateGroup?.candidate ?? [];

    const ids = Array.from(
      new Set(
        candidates
          .map((candidate) => candidate.rxcui)
          .filter((id): id is string => Boolean(id))
      )
    ).slice(0, 12);

    const concepts = await Promise.all(
      ids.map(async (id): Promise<DrugResult | null> => {
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
          const properties: RxConcept | undefined = data?.properties;

          if (!properties?.name) return null;

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
    console.error("RxNorm search error:", error);

    return NextResponse.json({
      suggestions: [],
      results: [],
    });
  }
}
