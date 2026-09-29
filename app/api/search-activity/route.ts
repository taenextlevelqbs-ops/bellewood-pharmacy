import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are missing");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const searchTerm =
      typeof body.searchTerm === "string"
        ? body.searchTerm.trim().slice(0, 120)
        : "";

    const matched = Boolean(body.matched);

    const resultCount =
      typeof body.resultCount === "number"
        ? Math.max(0, Math.min(body.resultCount, 1000))
        : 0;

    if (searchTerm.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Search term is too short" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("medication_search_activity")
      .insert({
        search_term: searchTerm,
        matched,
        result_count: resultCount,
      })
      .select("id")
      .single();

    if (error) {
      console.error("SEARCH ACTIVITY SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          ok: false,
          error: error.message,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      id: data.id,
    });
  } catch (error) {
    console.error("SEARCH ACTIVITY API ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown search activity error",
      },
      { status: 500 }
    );
  }
}
