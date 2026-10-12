"use client";

import SiteHeader from "@/components/SiteHeader";

import { FormEvent, useState } from "react";

export default function TransferPage() {
  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    currentPharmacy: "",
    currentPharmacyPhone: "",
    medicationName: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "transfer",
          ...form,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Unable to submit transfer.");
      }

      setSuccess(data.reference);

      setForm({
        patientName: "",
        phone: "",
        currentPharmacy: "",
        currentPharmacyPhone: "",
        medicationName: "",
        notes: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit transfer request."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#f7f7f7] text-[#333333]">

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Transfer Prescriptions
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-tight">
              Switching pharmacies
              <span className="block text-[#ed1c2e]">should be simple.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Tell Bellewood where your prescription is currently filled and
              our team can help guide you through the transfer process.
            </p>

            <div className="mt-10 space-y-6">
              {[
                ["1", "Send your information"],
                ["2", "Bellewood reviews your transfer request"],
                ["3", "Our pharmacy team handles the next steps"],
              ].map(([step, title]) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ed1c2e] font-black text-white">
                    {step}
                  </div>
                  <p className="font-black">{title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] bg-white p-8 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Start Transfer
            </p>

            <h3 className="mt-3 text-3xl font-black">
              Transfer to Bellewood.
            </h3>

            <form onSubmit={submit} className="mt-7 grid gap-4">
              <input
                required
                value={form.patientName}
                onChange={(e) => update("patientName", e.target.value)}
                placeholder="Your full name"
                aria-label="Your full name"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Phone number"
                aria-label="Phone number"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                required
                value={form.currentPharmacy}
                onChange={(e) => update("currentPharmacy", e.target.value)}
                placeholder="Current pharmacy"
                aria-label="Current pharmacy"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                type="tel"
                value={form.currentPharmacyPhone}
                onChange={(e) =>
                  update("currentPharmacyPhone", e.target.value)
                }
                placeholder="Current pharmacy phone"
                aria-label="Current pharmacy phone"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                required
                value={form.medicationName}
                onChange={(e) => update("medicationName", e.target.value)}
                placeholder="Medication name"
                aria-label="Medication name"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Additional notes"
                aria-label="Additional notes"
                rows={4}
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <button
                disabled={submitting}
                className="rounded-full bg-[#ed1c2e] px-6 py-4 font-bold text-white disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Transfer Request"}
              </button>

              {success && (
                <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-800">
                  <p className="font-black">Transfer request received.</p>
                  <p className="mt-1">
                    Reference: <strong>{success}</strong>
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
