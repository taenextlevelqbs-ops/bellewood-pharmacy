"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Medication = {
  id: string;
  medication_name: string;
  strength: string | null;
  dosage_form: string | null;
  status: "available" | "limited" | "call_to_confirm" | "unavailable";
  updated_at: string;
};

type DrugResult = {
  rxcui: string;
  name: string;
  synonym?: string | null;
  type?: string | null;
};

const statusInfo = {
  available: {
    label: "Available",
    text: "This medication is currently listed as available. Please contact Bellewood Pharmacy to confirm before your visit.",
  },
  limited: {
    label: "Limited Availability",
    text: "Availability is currently limited. Please call Bellewood Pharmacy to confirm before your visit.",
  },
  call_to_confirm: {
    label: "Call to Confirm",
    text: "Please contact Bellewood Pharmacy to confirm current availability.",
  },
  unavailable: {
    label: "Currently Unavailable",
    text: "This medication is currently listed as unavailable. Contact Bellewood Pharmacy for the latest information.",
  },
};

async function logMedicationSearch(
  searchTerm: string,
  matched: boolean,
  resultCount: number
) {
  const term = searchTerm.trim();

  if (term.length < 2) return;

  try {
    await fetch("/api/search-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm: term,
        matched,
        resultCount,
      }),
    });
  } catch {
    // Analytics must never interrupt the public medication search.
  }
}

export default function AvailabilityPage() {
  const supabase = useMemo(() => createClient(), []);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Medication[]>([]);
  const [suggestions, setSuggestions] = useState<DrugResult[]>([]);

  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchError, setSearchError] = useState("");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const term = query.trim();

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (requestRef.current) {
      requestRef.current.abort();
    }

    if (term.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSuggestionLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      requestRef.current = controller;

      try {
        setSuggestionLoading(true);

        const response = await fetch(
          `/api/drugs?q=${encodeURIComponent(term)}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Drug lookup failed");
        }

        const data = await response.json();

        const drugResults: DrugResult[] = Array.isArray(data.results)
          ? data.results
          : Array.isArray(data.suggestions)
          ? data.suggestions.map((name: string, index: number) => ({
              rxcui: String(index),
              name,
            }))
          : [];

        setSuggestions(drugResults.slice(0, 8));
        setShowSuggestions(true);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setSuggestions([]);
        }
      } finally {
        setSuggestionLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  async function runInventorySearch(term: string) {
    const normalized = term.trim();

    if (!normalized) return;

    setLoading(true);
    setSearched(false);
    setSearchError("");
    setShowSuggestions(false);

    try {
      const { data, error } = await supabase
        .from("medication_inventory")
        .select(
          "id, medication_name, strength, dosage_form, status, updated_at"
        )
        .ilike("medication_name", `%${normalized}%`)
        .order("medication_name", { ascending: true })
        .limit(20);

      if (error) {
        console.error("Medication search error:", error);
        setResults([]);
        setSearchError(
          "We couldn't check medication availability right now. Please call Bellewood Pharmacy."
        );
        setSearched(true);
        return;
      }

      const medications = (data as Medication[]) || [];

      setResults(medications);
      setSearched(true);

      void logMedicationSearch(
        normalized,
        medications.length > 0,
        medications.length
      );
    } catch (error) {
      console.error("Medication search error:", error);

      setResults([]);
      setSearchError(
        "We couldn't check medication availability right now. Please call Bellewood Pharmacy."
      );
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  async function searchMedication(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await runInventorySearch(query);
  }

  async function selectDrug(drug: DrugResult) {
    setQuery(drug.name);
    setSuggestions([]);
    setShowSuggestions(false);

    await runInventorySearch(drug.name);
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#333333]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-black">
            Bellewood <span className="text-[#ed1c2e]">Pharmacy</span>
          </a>

          <a
            href="/"
            className="text-sm font-bold text-gray-500 transition hover:text-[#ed1c2e]"
          >
            Back to Home
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
            Medication Availability
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
            Looking for a medication?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
            Search Bellewood's current medication availability before your
            visit.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-3xl">
          <form
            onSubmit={searchMedication}
            className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm focus-within:border-[#ed1c2e]"
          >
            <input
              type="search"
              name="medication-search"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearched(false);
                setSearchError("");
              }}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Start typing a medication..."
              className="min-w-0 flex-1 bg-white px-5 py-5 text-base text-[#333] outline-none"
            />

            <button
              type="submit"
              disabled={loading || query.trim().length === 0}
              className="min-w-[120px] bg-[#ed1c2e] px-7 font-black text-white transition hover:bg-[#d7192a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {showSuggestions && query.trim().length >= 2 && (
            <div className="absolute left-0 right-0 top-[76px] z-30 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
              {suggestionLoading ? (
                <div className="px-5 py-4 text-sm text-gray-500">
                  Finding medications...
                </div>
              ) : suggestions.length > 0 ? (
                <>
                  <div className="border-b border-gray-100 px-5 py-3 text-xs font-black uppercase tracking-[0.15em] text-gray-400">
                    Medication suggestions
                  </div>

                  {suggestions.map((drug) => (
                    <button
                      type="button"
                      key={`${drug.rxcui}-${drug.name}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => void selectDrug(drug)}
                      className="block w-full border-b border-gray-100 px-5 py-4 text-left transition last:border-0 hover:bg-[#f8f8f8]"
                    >
                      <span className="block font-bold text-[#333]">
                        {drug.name}
                      </span>

                      {drug.synonym &&
                        drug.synonym.toLowerCase() !==
                          drug.name.toLowerCase() && (
                          <span className="mt-1 block text-xs text-gray-500">
                            {drug.synonym}
                          </span>
                        )}
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-5 py-4 text-sm text-gray-500">
                  No medication suggestions found. You can still search
                  Bellewood's inventory.
                </div>
              )}
            </div>
          )}
        </div>

        {searched && (
          <div className="mx-auto mt-8 max-w-3xl">
            {searchError ? (
              <div className="rounded-[28px] bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-black">
                  Availability check unavailable
                </h2>

                <p className="mt-3 leading-7 text-gray-500">
                  {searchError}
                </p>

                <a
                  href="tel:5714101556"
                  className="mt-6 inline-block rounded-full bg-[#ed1c2e] px-6 py-3 font-bold text-white"
                >
                  Call (571) 410-1556
                </a>
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-[28px] bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 font-black text-[#ed1c2e]">
                  B
                </div>

                <h2 className="mt-5 text-xl font-black">
                  No matching medication currently listed
                </h2>

                <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
                  We recognize the medication you searched for, but it is not
                  currently listed in Bellewood's public inventory. This does
                  not necessarily mean Bellewood cannot provide it.
                </p>

                <a
                  href="tel:5714101556"
                  className="mt-6 inline-block rounded-full bg-[#ed1c2e] px-6 py-3 font-bold text-white"
                >
                  Call Bellewood to Confirm
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mb-3 flex items-center justify-between px-1">
                  <p className="text-sm font-bold text-gray-500">
                    {results.length} matching{" "}
                    {results.length === 1 ? "medication" : "medications"}
                  </p>

                  <span className="text-xs font-bold text-gray-400">
                    Bellewood inventory
                  </span>
                </div>

                {results.map((medication) => {
                  const info =
                    statusInfo[medication.status] ||
                    statusInfo.call_to_confirm;

                  return (
                    <div
                      key={medication.id}
                      className="rounded-[28px] bg-white p-7 shadow-sm"
                    >
                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                        <div>
                          <h2 className="text-xl font-black">
                            {medication.medication_name}
                          </h2>

                          <p className="mt-1 text-sm text-gray-500">
                            {[medication.strength, medication.dosage_form]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </div>

                        <span className="w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-black text-[#ed1c2e]">
                          {info.label}
                        </span>
                      </div>

                      <p className="mt-5 leading-7 text-gray-500">
                        {info.text}
                      </p>

                      <p className="mt-4 text-xs text-gray-400">
                        Last updated{" "}
                        {new Date(
                          medication.updated_at
                        ).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <p className="mt-6 text-center text-xs leading-5 text-gray-400">
              Inventory can change throughout the day. Availability is not
              guaranteed until confirmed by Bellewood Pharmacy. A valid
              prescription may be required for prescription medications.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
