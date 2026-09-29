import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://gdklrxqputfzjydjsjdt.supabase.co";

  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_UlinTuGNSs9G09fP7zMdkw_XY6L1fS4";

  return createClient(url, key);
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
      return NextResponse.json({ ok: true });
    }

    const supabase = getSupabase();

    const { error } = await supabase
      .from("medication_search_activity")
      .insert({
        search_term: searchTerm,
        matched,
        result_count: resultCount,
      });

    if (error) {
      console.error("Search activity insert:", error.message);
    }

    return NextResponse.json({ ok: !error });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
