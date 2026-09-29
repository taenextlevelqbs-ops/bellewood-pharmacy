"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminNav from "@/components/admin/AdminNav";

type SearchRow = {
  id: number;
  search_term: string;
  matched: boolean;
  result_count: number;
  created_at: string;
};

export default function SearchActivityPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [rows, setRows] = useState<SearchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [range, setRange] = useState<"today" | "week" | "all">("week");

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    let query = supabase
      .from("medication_search_activity")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);

    if (range === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      query = query.gte("created_at", start.toISOString());
    }

    if (range === "week") {
      const start = new Date();
      start.setDate(start.getDate() - 7);
      query = query.gte("created_at", start.toISOString());
    }

    const { data } = await query;

    setRows((data as SearchRow[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [range]);

  const filtered = rows.filter((row) =>
    row.search_term.toLowerCase().includes(filter.toLowerCase())
  );

  const stats = useMemo(() => {
    const total = rows.length;
    const matches = rows.filter((row) => row.matched).length;
    const noResults = rows.filter((row) => !row.matched).length;

    const counts = new Map<string, number>();

    rows.forEach((row) => {
      const key = row.search_term.trim().toLowerCase();
      counts.set(key, (counts.get(key) || 0) + 1);
    });

    const popular = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      total,
      matches,
      noResults,
      popular,
    };
  }, [rows]);

  return (
    <main className="min-h-screen bg-[#d9d9d9] text-[#303030]">
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
            Bellewood Pharmacy
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Search Activity
          </h1>

          <p className="mt-2 text-sm text-[#666]">
            Anonymous medication availability search trends.
          </p>
        </div>
      </header>

      <AdminNav />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Searches" value={stats.total} />
          <Stat label="Matched Searches" value={stats.matches} />
          <Stat label="No Result Searches" value={stats.noResults} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <section className="rounded-[30px] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black">
                  Recent Searches
                </h2>
                <p className="mt-1 text-sm text-[#666]">
                  See what medications visitors are looking for.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={range}
                  onChange={(e) =>
                    setRange(e.target.value as "today" | "week" | "all")
                  }
                  className="rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-bold"
                >
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="all">All Time</option>
                </select>

                <button
                  onClick={load}
                  className="rounded-full bg-[#303030] px-4 py-2 text-sm font-bold text-white"
                >
                  Refresh
                </button>
              </div>
            </div>

            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter searches..."
              className="mt-5 w-full rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-[#ed1c2e]"
            />

            <div className="mt-5 space-y-2">
              {loading ? (
                <p className="py-8 text-center text-[#666]">
                  Loading activity...
                </p>
              ) : filtered.length === 0 ? (
                <p className="py-8 text-center text-[#666]">
                  No search activity yet.
                </p>
              ) : (
                filtered.map((row) => (
                  <div
                    key={row.id}
                    className="flex flex-col justify-between gap-3 rounded-2xl border border-black/10 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-black capitalize">
                        {row.search_term}
                      </p>

                      <p className="mt-1 text-xs text-[#777]">
                        {new Date(row.created_at).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-black ${
                        row.matched
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-[#ed1c2e]"
                      }`}
                    >
                      {row.matched
                        ? `${row.result_count} result${
                            row.result_count === 1 ? "" : "s"
                          }`
                        : "No Match"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="h-fit rounded-[30px] bg-[#303030] p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6b77]">
              Demand Insights
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Most searched
            </h2>

            <div className="mt-6 space-y-3">
              {stats.popular.length === 0 ? (
                <p className="text-sm text-white/60">
                  Search data will appear here.
                </p>
              ) : (
                stats.popular.map(([term, count], index) => (
                  <div
                    key={term}
                    className="flex items-center justify-between rounded-2xl bg-white/10 p-4"
                  >
                    <div>
                      <p className="text-xs font-bold text-white/50">
                        #{index + 1}
                      </p>
                      <p className="mt-1 font-black capitalize">
                        {term}
                      </p>
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#303030]">
                      {count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[26px] bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wider text-[#777]">
        {label}
      </p>

      <p className="mt-2 text-4xl font-black">
        {value}
      </p>
    </div>
  );
}
