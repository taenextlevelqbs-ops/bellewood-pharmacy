"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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

export default function InventoryDashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [medications, setMedications] = useState<Medication[]>([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
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
      setMessage("Medication added.");
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

  const filtered = medications.filter((medication) => {
    const value = `${medication.medication_name} ${medication.strength || ""} ${
      medication.dosage_form || ""
    }`.toLowerCase();

    return value.includes(search.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#303030]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ed1c2e]">
              Bellewood Pharmacy
            </p>
            <h1 className="mt-1 text-xl font-black">
              Inventory Admin
            </h1>
          </div>

          <button
            onClick={logout}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-7 lg:grid-cols-[380px_1fr]">

          <section className="h-fit rounded-[30px] bg-white p-7 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ed1c2e]">
              Add Inventory
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Add medication
            </h2>

            <form onSubmit={addMedication} className="mt-7 space-y-4">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Medication name"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                  placeholder="Strength"
                  className="min-w-0 rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
                />

                <input
                  value={form}
                  onChange={(e) => setForm(e.target.value)}
                  placeholder="Form"
                  className="min-w-0 rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
                />
              </div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none"
              >
                <option value="available">Available</option>
                <option value="limited">Limited Availability</option>
                <option value="call_to_confirm">Call to Confirm</option>
                <option value="unavailable">Unavailable</option>
              </select>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Internal/public availability note (optional)"
                rows={3}
                className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <button
                disabled={saving}
                className="w-full rounded-full bg-[#ed1c2e] px-6 py-4 font-black text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Add Medication"}
              </button>

              {message && (
                <p className="text-center text-sm font-bold text-gray-500">
                  {message}
                </p>
              )}
            </form>
          </section>

          <section>
            <div className="rounded-[30px] bg-[#303030] p-7 text-white md:p-8">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6b77]">
                    Medication Availability
                  </p>
                  <h2 className="mt-3 text-3xl font-black">
                    Current Inventory
                  </h2>
                  <p className="mt-2 text-sm text-white/50">
                    {medications.length} medication
                    {medications.length === 1 ? "" : "s"} listed
                  </p>
                </div>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search inventory..."
                  className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/40 md:w-72"
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <div className="rounded-[26px] bg-white p-8 text-gray-400">
                  Loading inventory...
                </div>
              ) : filtered.length === 0 ? (
                <div className="rounded-[26px] bg-white p-8 text-gray-400 shadow-sm">
                  No medications found.
                </div>
              ) : (
                filtered.map((medication) => (
                  <div
                    key={medication.id}
                    className="rounded-[26px] bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
                      <div>
                        <h3 className="text-lg font-black">
                          {medication.medication_name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {[medication.strength, medication.dosage_form]
                            .filter(Boolean)
                            .join(" • ") || "No strength/form specified"}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          Updated{" "}
                          {new Date(medication.updated_at).toLocaleString()}
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
                          className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold outline-none"
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
                          onClick={() => removeMedication(medication.id)}
                          className="rounded-full bg-red-50 px-4 py-2.5 text-sm font-bold text-[#ed1c2e]"
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
      </div>
    </main>
  );
}
