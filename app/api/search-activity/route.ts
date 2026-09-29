import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase URL or service role key is missing");
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


export async function GET(request: NextRequest) {
  try {
    const range = request.nextUrl.searchParams.get("range") || "today";
    const supabase = getSupabase();

    let query = supabase
      .from("medication_search_activity")
      .select("id, search_term, matched, result_count, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    const now = new Date();

    if (range === "today") {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      query = query.gte("created_at", start.toISOString());
    }

    if (range === "week") {
      const start = new Date(now);
      start.setDate(start.getDate() - 7);
      query = query.gte("created_at", start.toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("SEARCH ACTIVITY GET ERROR:", error);

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
      rows: data || [],
    });
  } catch (error) {
    console.error("SEARCH ACTIVITY GET API ERROR:", error);

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
