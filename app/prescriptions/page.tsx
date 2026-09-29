"use client";

import { FormEvent, useState } from "react";

type PrescriptionStatus = "new" | "in_progress" | "completed";

type StatusResult = {
  reference: string;
  status: PrescriptionStatus;
  createdAt: string;
  updatedAt: string;
};

const statusInfo: Record<
  PrescriptionStatus,
  {
    label: string;
    description: string;
  }
> = {
  new: {
    label: "Received",
    description:
      "Bellewood Pharmacy has received your request and it is waiting for review.",
  },
  in_progress: {
    label: "In Progress",
    description:
      "The pharmacy team is currently reviewing or processing your request.",
  },
  completed: {
    label: "Completed",
    description:
      "The pharmacy team has completed this request. Contact Bellewood if you need additional information.",
  },
};

export default function PrescriptionsPage() {
  const [lastName, setLastName] = useState("");
  const [rxNumber, setRxNumber] = useState("");

  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  async function checkStatus(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setChecking(true);
    setResult(null);
    setNotFound(false);
    setError("");

    try {
      const response = await fetch("/api/prescription-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastName,
          rxNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error || "Unable to check prescription status."
        );
      }

      if (!data.found) {
        setNotFound(true);
        return;
      }

      setResult(data.prescription);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to check prescription status."
      );
    } finally {
      setChecking(false);
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

              <h1 className="text-xl font-black">
                PHARMACY
              </h1>
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
            Prescription Status
          </p>

          <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
            Check your prescription.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Enter the last name and prescription number associated
            with your request to view its current status.
          </p>

          <form
            onSubmit={checkStatus}
            className="mt-10 rounded-[28px] bg-white p-7 md:p-9"
          >
            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-black">
                  Last Name
                </label>

                <input
                  required
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  placeholder="Last name"
                  autoComplete="family-name"
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
                  onChange={(e) =>
                    setRxNumber(e.target.value)
                  }
                  placeholder="Prescription number"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
                />
              </div>

              <button
                type="submit"
                disabled={checking}
                className="mt-2 rounded-full bg-[#ed1c2e] px-6 py-4 font-black text-white disabled:opacity-60"
              >
                {checking
                  ? "Checking..."
                  : "Check Prescription Status"}
              </button>

              {result && (
                <div className="rounded-[24px] border border-green-200 bg-green-50 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-green-700">
                    Current Status
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-green-900">
                    {statusInfo[result.status]?.label ||
                      result.status}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-green-800">
                    {statusInfo[result.status]?.description}
                  </p>

                  <div className="mt-5 border-t border-green-200 pt-4">
                    <p className="text-xs font-bold text-green-800">
                      Reference
                    </p>

                    <p className="mt-1 font-black text-green-950">
                      {result.reference}
                    </p>

                    <p className="mt-3 text-xs text-green-700">
                      Last updated{" "}
                      {new Date(
                        result.updatedAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {notFound && (
                <div className="rounded-2xl bg-[#f5f5f5] p-5">
                  <p className="font-black">
                    Prescription not found
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#666]">
                    We could not find a prescription request
                    matching that last name and prescription
                    number. Check the information and try again,
                    or contact Bellewood Pharmacy.
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
