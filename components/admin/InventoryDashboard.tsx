"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminNav from "@/components/admin/AdminNav";

type Status =
  | "available"
  | "limited"
  | "call_to_confirm"
  | "unavailable";

type Medication = {
  id: number;
  medication_name: string;
  strength: string | null;
  dosage_form: string | null;
  status: Status;
  notes: string | null;
  updated_at: string;
  updated_by: string | null;
};

const statusLabels: Record<Status, string> = {
  available: "Available",
  limited: "Limited",
  call_to_confirm: "Call to Confirm",
  unavailable: "Unavailable",
};

const statusStyles: Record<Status, string> = {
  available: "bg-green-50 text-green-700 border-green-200",
  limited: "bg-amber-50 text-amber-700 border-amber-200",
  call_to_confirm: "bg-blue-50 text-blue-700 border-blue-200",
  unavailable: "bg-red-50 text-[#ed1c2e] border-red-200",
};

export default function InventoryDashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [medications, setMedications] = useState<Medication[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [name, setName] = useState("");
  const [drugSuggestions, setDrugSuggestions] = useState<string[]>([]);
  const [drugSearchLoading, setDrugSearchLoading] = useState(false);
  const [showDrugSuggestions, setShowDrugSuggestions] = useState(false);
  const [strength, setStrength] = useState("");
  const [form, setForm] = useState("");
  const [status, setStatus] = useState<Status>("available");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadInventory() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    const { data, error } = await supabase
      .from("medication_inventory")
      .select("*")
      .order("medication_name", { ascending: true });

    if (!error && data) {
      setMedications(data as Medication[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadInventory();
  }, []);

  useEffect(() => {
    const query = name.trim();

    if (query.length < 2) {
      setDrugSuggestions([]);
      setShowDrugSuggestions(false);
      setDrugSearchLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setDrugSearchLoading(true);

      try {
        const response = await fetch(
          `/api/drugs?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`Drug search failed: ${response.status}`);
        }

        const data = await response.json();

        const suggestions = Array.isArray(data.suggestions)
          ? data.suggestions.filter(
              (drug: unknown): drug is string =>
                typeof drug === "string" && drug.trim().length > 0
            )
          : [];

        setDrugSuggestions(suggestions.slice(0, 10));
        setShowDrugSuggestions(true);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Admin drug search failed:", error);
        setDrugSuggestions([]);
        setShowDrugSuggestions(true);
      } finally {
        if (!controller.signal.aborted) {
          setDrugSearchLoading(false);
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [name]);

  async function addMedication(e: FormEvent) {
    e.preventDefault();

    if (!name.trim()) return;

    setSaving(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    const { error } = await supabase.from("medication_inventory").insert({
      medication_name: name.trim(),
      strength: strength.trim() || null,
      dosage_form: form.trim() || null,
      status,
      notes: notes.trim() || null,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setMessage("Could not add medication.");
    } else {
      setName("");
      setStrength("");
      setForm("");
      setStatus("available");
      setNotes("");
      setMessage("Medication added successfully.");
      await loadInventory();
    }

    setSaving(false);
  }

  async function updateStatus(id: number, newStatus: Status) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("medication_inventory")
      .update({
        status: newStatus,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (!error) {
      await loadInventory();
    }
  }

  async function removeMedication(id: number) {
    const confirmed = window.confirm(
      "Remove this medication from public availability?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("medication_inventory")
      .delete()
      .eq("id", id);

    if (!error) {
      await loadInventory();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const counts = useMemo(
    () => ({
      total: medications.length,
      available: medications.filter((m) => m.status === "available").length,
      limited: medications.filter((m) => m.status === "limited").length,
      call_to_confirm: medications.filter(
        (m) => m.status === "call_to_confirm"
      ).length,
      unavailable: medications.filter((m) => m.status === "unavailable")
        .length,
    }),
    [medications]
  );

  const filtered = medications.filter((medication) => {
    const value = `${medication.medication_name} ${
      medication.strength || ""
    } ${medication.dosage_form || ""}`.toLowerCase();

    const matchesSearch = value.includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || medication.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-[#e2e2e2] text-[#303030]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Bellewood Pharmacy
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight">
              Staff Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#666]">
              Manage public medication availability and inventory status.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/availability"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm font-bold transition hover:bg-[#f5f5f5]"
            >
              View Public Page ↗
            </a>

            <button
              onClick={logout}
              className="rounded-full bg-[#303030] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-black"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <AdminNav />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-[24px] border bg-white p-5 text-left shadow-sm transition ${
              filter === "all"
                ? "border-[#303030]"
                : "border-black/10 hover:border-black/20"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-wider text-[#777]">
              Total Listed
            </p>
            <p className="mt-2 text-3xl font-black">{counts.total}</p>
          </button>

          <button
            onClick={() => setFilter("available")}
            className={`rounded-[24px] border bg-white p-5 text-left shadow-sm transition ${
              filter === "available"
                ? "border-green-500"
                : "border-black/10 hover:border-black/20"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-wider text-green-700">
              Available
            </p>
            <p className="mt-2 text-3xl font-black">{counts.available}</p>
          </button>

          <button
            onClick={() => setFilter("limited")}
            className={`rounded-[24px] border bg-white p-5 text-left shadow-sm transition ${
              filter === "limited"
                ? "border-amber-500"
                : "border-black/10 hover:border-black/20"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-wider text-amber-700">
              Limited
            </p>
            <p className="mt-2 text-3xl font-black">{counts.limited}</p>
          </button>

          <button
            onClick={() => setFilter("call_to_confirm")}
            className={`rounded-[24px] border bg-white p-5 text-left shadow-sm transition ${
              filter === "call_to_confirm"
                ? "border-blue-500"
                : "border-black/10 hover:border-black/20"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-wider text-blue-700">
              Call to Confirm
            </p>
            <p className="mt-2 text-3xl font-black">
              {counts.call_to_confirm}
            </p>
          </button>

          <button
            onClick={() => setFilter("unavailable")}
            className={`rounded-[24px] border bg-white p-5 text-left shadow-sm transition ${
              filter === "unavailable"
                ? "border-[#ed1c2e]"
                : "border-black/10 hover:border-black/20"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-wider text-[#ed1c2e]">
              Unavailable
            </p>
            <p className="mt-2 text-3xl font-black">{counts.unavailable}</p>
          </button>
        </section>

        <div id="medications" className="mt-7 grid gap-7 lg:grid-cols-[380px_1fr]">
          <section className="h-fit rounded-[30px] border border-black/10 bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ed1c2e] text-2xl font-black text-white">
              +
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#ed1c2e]">
              Add Inventory
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Add medication
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#666]">
              Add a medication and choose what customers should see on the
              public availability page.
            </p>

            <form onSubmit={addMedication} className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#666]">
                  Medication
                </label>

                <div className="relative">
                  <input
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setShowDrugSuggestions(true);
                    }}
                    onFocus={() => {
                      if (drugSuggestions.length > 0) {
                        setShowDrugSuggestions(true);
                      }
                    }}
                    placeholder="Start typing a drug name..."
                    type="search"
                    name="medication-search"
                    autoComplete="new-password"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    data-form-type="other"
                    className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 pr-12 text-[#303030] outline-none transition focus:border-[#ed1c2e] focus:ring-4 focus:ring-[#ed1c2e]/10"
                  />

                  {drugSearchLoading && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#777]">
                      ...
                    </span>
                  )}

                  {showDrugSuggestions &&
                    name.trim().length >= 2 &&
                    !drugSearchLoading && (
                      <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
                        {drugSuggestions.length > 0 ? (
                          <>
                            <div className="border-b border-black/5 bg-[#f5f5f5] px-4 py-2">
                              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#777]">
                                Drug Suggestions
                              </p>
                            </div>

                            {drugSuggestions.map((drug) => (
                              <button
                                key={drug}
                                type="button"
                                onClick={() => {
                                  setName(drug);
                                  setShowDrugSuggestions(false);
                                }}
                                className="block w-full border-b border-black/5 px-4 py-3 text-left text-sm font-bold text-[#303030] transition last:border-b-0 hover:bg-[#f5f5f5]"
                              >
                                {drug}
                              </button>
                            ))}
                          </>
                        ) : (
                          <div className="px-4 py-3">
                            <p className="text-sm text-[#666]">
                              No drug suggestions found. You can still enter the medication manually.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#666]">
                    Strength
                  </label>

                  <input
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                    placeholder="500 mg"
                    className="w-full min-w-0 rounded-2xl border border-black/15 bg-white px-4 py-3 text-[#303030] outline-none focus:border-[#ed1c2e]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#666]">
                    Form
                  </label>

                  <input
                    value={form}
                    onChange={(e) => setForm(e.target.value)}
                    placeholder="Capsule"
                    className="w-full min-w-0 rounded-2xl border border-black/15 bg-white px-4 py-3 text-[#303030] outline-none focus:border-[#ed1c2e]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#666]">
                  Public Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-[#303030] outline-none focus:border-[#ed1c2e]"
                >
                  <option value="available">Available</option>
                  <option value="limited">Limited Availability</option>
                  <option value="call_to_confirm">Call to Confirm</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-[#666]">
                  Notes
                </label>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Availability note (optional)"
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-black/15 bg-white px-4 py-3 text-[#303030] outline-none focus:border-[#ed1c2e]"
                />
              </div>

              <button
                disabled={saving}
                className="w-full rounded-full bg-[#ed1c2e] px-6 py-4 font-black text-white shadow-sm transition hover:bg-[#d71929] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Medication"}
              </button>

              {message && (
                <p className="rounded-2xl bg-[#f5f5f5] p-3 text-center text-sm font-bold text-[#555]">
                  {message}
                </p>
              )}
            </form>
          </section>

          <section>
            <div className="rounded-[30px] bg-[#303030] p-7 text-white shadow-sm md:p-8">
              <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6b77]">
                    Medication Availability
                  </p>

                  <h2 className="mt-3 text-3xl font-black">
                    Current Inventory
                  </h2>

                  <p className="mt-2 text-sm text-white/70">
                    Showing {filtered.length} of {medications.length} listed
                    medications
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search medication..."
                    className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/50 sm:w-64"
                  />

                  {filter !== "all" && (
                    <button
                      onClick={() => setFilter("all")}
                      className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#303030]"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <div className="rounded-[26px] border border-black/10 bg-white p-8 text-[#666] shadow-sm">
                  Loading inventory...
                </div>
              ) : filtered.length === 0 ? (
                <div className="rounded-[26px] border border-black/10 bg-white p-8 text-center shadow-sm">
                  <p className="font-black text-[#303030]">
                    No medications found
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    Try another search or clear the current status filter.
                  </p>
                </div>
              ) : (
                filtered.map((medication) => (
                  <div
                    key={medication.id}
                    className="rounded-[26px] border border-black/10 bg-white p-6 shadow-sm transition hover:border-black/20 hover:shadow-md"
                  >
                    <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-black text-[#303030]">
                            {medication.medication_name}
                          </h3>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-black ${statusStyles[medication.status]}`}
                          >
                            {statusLabels[medication.status]}
                          </span>
                        </div>

                        <p className="mt-2 text-sm font-medium text-[#555]">
                          {[medication.strength, medication.dosage_form]
                            .filter(Boolean)
                            .join(" • ") || "No strength/form specified"}
                        </p>

                        {medication.notes && (
                          <div className="mt-3 rounded-xl bg-[#f5f5f5] px-4 py-3 text-sm leading-6 text-[#555]">
                            {medication.notes}
                          </div>
                        )}

                        <p className="mt-3 text-xs font-medium text-[#777]">
                          Last updated{" "}
                          {new Date(
                            medication.updated_at
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={medication.status}
                          onChange={(e) =>
                            updateStatus(
                              medication.id,
                              e.target.value as Status
                            )
                          }
                          className="rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-bold text-[#303030] outline-none focus:border-[#ed1c2e]"
                        >
                          {Object.entries(statusLabels).map(
                            ([value, label]) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            )
                          )}
                        </select>

                        <button
                          onClick={() =>
                            removeMedication(medication.id)
                          }
                          className="rounded-full bg-red-50 px-4 py-2.5 text-sm font-bold text-[#ed1c2e] transition hover:bg-red-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-black/10 py-6 text-xs font-medium text-[#666] sm:flex-row">
          <span>Bellewood Pharmacy Staff Portal</span>
          <span>521 E Market St, Suite H • Leesburg, VA</span>
        </footer>
      </div>
    </main>
  );
}
