"use client";

import { FormEvent, useState } from "react";

export default function PrescriptionsPage() {
  const [name, setName] = useState("");
  const [rxNumber, setRxNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function submitRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "prescription",
          patientName: name,
          phone,
          rxNumber,
          notes: "Prescription status request",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Unable to submit request.");
      }

      setSuccess(data.reference);
      setName("");
      setPhone("");
      setRxNumber("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit request."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#333333]">
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ed1c2e] text-lg font-black text-white">
              Rx
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400">
                BELLEWOOD
              </p>
              <h1 className="text-xl font-black">PHARMACY</h1>
            </div>
          </a>

          <a
            href="/"
            className="rounded-full border border-gray-200 px-5 py-3 text-sm font-bold"
          >
            Back Home
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-[34px] bg-[#303030] p-8 md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6673]">
            Prescription Support
          </p>

          <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
            Need an update on your prescription?
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Send your prescription information to Bellewood Pharmacy and a
            member of the pharmacy team can review your request.
          </p>

          <form
            onSubmit={submitRequest}
            className="mt-10 rounded-[28px] bg-white p-7 md:p-9"
          >
            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-black">
                  Full Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and last name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black">
                  Prescription Number
                </label>
                <input
                  required
                  value={rxNumber}
                  onChange={(e) => setRxNumber(e.target.value)}
                  placeholder="Prescription number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-full bg-[#ed1c2e] px-6 py-4 font-black text-white disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Send Prescription Request"}
              </button>

              {success && (
                <div className="rounded-2xl bg-green-50 p-4 text-sm text-green-800">
                  <p className="font-black">
                    Request sent successfully.
                  </p>
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
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
