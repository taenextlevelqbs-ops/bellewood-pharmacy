"use client";

import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Medication = {
  id: number;
  medication_name: string;
  strength: string | null;
  dosage_form: string | null;
  status: "available" | "limited" | "call_to_confirm" | "unavailable";
  updated_at: string;
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
    // Analytics must never block the patient-facing search experience.
  }
}

export default function AvailabilityPage() {
  const supabase = useMemo(() => createClient(), []);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Medication[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function searchMedication(e: FormEvent) {
    e.preventDefault();

    const term = query.trim();

    if (!term) return;

    setLoading(true);
    setSearched(false);

    const { data } = await supabase
      .from("medication_inventory")
      .select(
        "id, medication_name, strength, dosage_form, status, updated_at"
      )
      .ilike("medication_name", `%${term}%`)
      .order("medication_name", { ascending: true })
      .limit(20);

    setResults((data as Medication[]) || []);
    setSearched(true);
    setLoading(false);
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
            className="text-sm font-bold text-gray-500 hover:text-[#ed1c2e]"
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
            Search Bellewood's current medication availability before your visit.
          </p>
        </div>

        <form
          onSubmit={searchMedication}
          className="mx-auto mt-10 flex max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Example: Amoxicillin"
            className="min-w-0 flex-1 px-5 py-5 outline-none"
          />

          <button
            disabled={loading}
            className="bg-[#ed1c2e] px-7 font-black text-white disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {searched && (
          <div className="mx-auto mt-8 max-w-3xl">
            {results.length === 0 ? (
              <div className="rounded-[28px] bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-black">
                  No matching medication listed
                </h2>

                <p className="mt-3 leading-7 text-gray-500">
                  This does not necessarily mean Bellewood cannot provide it.
                  Please call the pharmacy to confirm.
                </p>

                <a
                  href="tel:5714101556"
                  className="mt-6 inline-block rounded-full bg-[#ed1c2e] px-6 py-3 font-bold text-white"
                >
                  Call (571) 410-1556
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((medication) => {
                  const info = statusInfo[medication.status];

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
                        {new Date(medication.updated_at).toLocaleString()}
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
