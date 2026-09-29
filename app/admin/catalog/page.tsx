"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminNav from "@/components/admin/AdminNav";

type Drug = {
  rxcui: string;
  name: string;
  synonym: string | null;
  type: string | null;
};

type Status =
  | "available"
  | "limited"
  | "call_to_confirm"
  | "unavailable";

export default function DrugCatalogPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<Drug | null>(null);
  const [strength, setStrength] = useState("");
  const [form, setForm] = useState("");
  const [status, setStatus] =
    useState<Status>("call_to_confirm");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
      }
    })();
  }, [router, supabase]);

  useEffect(() => {
    const term = query.trim();

    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/drug-catalog?q=${encodeURIComponent(term)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Drug search failed");
        }

        const data = await response.json();

        setResults(
          Array.isArray(data.results) ? data.results : []
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(error);
        setResults([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  async function addToInventory() {
    if (!selected) return;

    setSaving(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data: existing } = await supabase
        .from("medication_inventory")
        .select("id")
        .ilike("medication_name", selected.name)
        .eq("strength", strength.trim() || "")
        .limit(1);

      if (existing && existing.length > 0) {
        setMessage("This medication is already in Bellewood inventory.");
        return;
      }

      const { error } = await supabase
        .from("medication_inventory")
        .insert({
          medication_name: selected.name,
          strength: strength.trim() || null,
          dosage_form: form.trim() || null,
          status,
          notes: `RxNorm RxCUI: ${selected.rxcui}`,
          updated_by: user.id,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      setMessage(`${selected.name} added to Bellewood inventory.`);
      setSelected(null);
      setStrength("");
      setForm("");
      setStatus("call_to_confirm");
    } catch (error) {
      console.error(error);
      setMessage("Could not add medication to inventory.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#d9d9d9] text-[#303030]">
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
            Bellewood Pharmacy
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Drug Catalog
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
            Search the medication catalog and add only the
            medications Bellewood actually carries.
          </p>
        </div>
      </header>

      <AdminNav />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-[30px] bg-white p-6 shadow-sm md:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ed1c2e]">
              Medication Finder
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Search medications
            </h2>

            <p className="mt-2 text-sm text-[#666]">
              Start typing a drug name. Select the correct medication
              and confirm what Bellewood carries.
            </p>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Example: amoxicillin, atorvastatin, metformin..."
              autoComplete="off"
              spellCheck={false}
              className="mt-6 w-full rounded-2xl border border-black/15 bg-white px-5 py-4 text-lg font-bold outline-none transition focus:border-[#ed1c2e] focus:ring-4 focus:ring-[#ed1c2e]/10"
            />
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="rounded-2xl border border-black/10 p-5 text-[#666]">
                Searching medication catalog...
              </div>
            ) : query.trim().length >= 2 &&
              results.length === 0 ? (
              <div className="rounded-2xl border border-black/10 p-5 text-[#666]">
                No medication matches found.
              </div>
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {results.map((drug) => (
                  <button
                    key={`${drug.rxcui}-${drug.name}`}
                    type="button"
                    onClick={() => {
                      setSelected(drug);
                      setMessage("");
                    }}
                    className="rounded-2xl border border-black/10 bg-white p-5 text-left transition hover:border-[#ed1c2e] hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black">
                          {drug.name}
                        </p>

                        {drug.synonym &&
                          drug.synonym !== drug.name && (
                            <p className="mt-1 text-sm text-[#666]">
                              {drug.synonym}
                            </p>
                          )}
                      </div>

                      <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-black text-[#ed1c2e]">
                        Select
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-[#888]">
                      RxCUI {drug.rxcui}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {selected && (
          <section className="mt-6 rounded-[30px] bg-[#303030] p-6 text-white shadow-sm md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6b77]">
                  Confirm Inventory
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {selected.name}
                </h2>

                <p className="mt-2 text-sm text-white/60">
                  Confirm the exact item Bellewood carries before
                  adding it to inventory.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-bold"
              >
                Cancel
              </button>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-white/60">
                  Strength
                </label>

                <input
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                  placeholder="500 mg"
                  className="w-full rounded-2xl bg-white px-4 py-3 text-[#303030] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-white/60">
                  Form
                </label>

                <input
                  value={form}
                  onChange={(e) => setForm(e.target.value)}
                  placeholder="Capsule"
                  className="w-full rounded-2xl bg-white px-4 py-3 text-[#303030] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-white/60">
                  Public Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as Status)
                  }
                  className="w-full rounded-2xl bg-white px-4 py-3 text-[#303030] outline-none"
                >
                  <option value="available">
                    Available
                  </option>
                  <option value="limited">
                    Limited Availability
                  </option>
                  <option value="call_to_confirm">
                    Call to Confirm
                  </option>
                  <option value="unavailable">
                    Unavailable
                  </option>
                </select>
              </div>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={addToInventory}
              className="mt-6 rounded-full bg-[#ed1c2e] px-6 py-3 font-black text-white disabled:opacity-50"
            >
              {saving
                ? "Adding..."
                : "Add to Bellewood Inventory"}
            </button>

            {message && (
              <p className="mt-4 text-sm font-bold">
                {message}
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
