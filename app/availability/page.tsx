"use client";

import { useState } from "react";

export default function AvailabilityPage() {
  const [medication, setMedication] = useState("");
  const [searched, setSearched] = useState(false);

  function checkAvailability(e: React.FormEvent) {
    e.preventDefault();

    if (!medication.trim()) return;

    setSearched(true);
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

          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Looking for a medication?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
            Search for a medication below and connect with Bellewood Pharmacy
            to confirm current availability before making the trip.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[36px] bg-white p-7 shadow-xl shadow-gray-200/70 md:p-10">
          <form onSubmit={checkAvailability}>
            <label
              htmlFor="medication"
              className="text-sm font-bold text-[#333333]"
            >
              Medication Name
            </label>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="medication"
                type="text"
                value={medication}
                onChange={(e) => {
                  setMedication(e.target.value);
                  setSearched(false);
                }}
                placeholder="Example: Amoxicillin"
                className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-[#fafafa] px-5 py-4 outline-none transition focus:border-[#ed1c2e]"
              />

              <button
                type="submit"
                className="rounded-2xl bg-[#ed1c2e] px-7 py-4 font-bold text-white transition hover:bg-[#cf1727]"
              >
                Check Availability
              </button>
            </div>
          </form>

          {searched && (
            <div className="mt-8 rounded-[28px] border border-red-100 bg-red-50 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ed1c2e]">
                Availability Request
              </p>

              <h2 className="mt-2 text-2xl font-black">
                {medication}
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Please contact Bellewood Pharmacy to confirm current
                availability. Medication inventory can change throughout the
                day.
              </p>

              <a
                href="tel:5714101556"
                className="mt-6 inline-block rounded-full bg-[#ed1c2e] px-6 py-3 font-bold text-white"
              >
                Call (571) 410-1556
              </a>
            </div>
          )}

          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-sm leading-6 text-gray-400">
              Medication availability is not guaranteed until confirmed by the
              pharmacy. A valid prescription may be required for prescription
              medications.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div className="rounded-[24px] bg-white p-6">
            <p className="font-black">Search</p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter the medication you are looking for.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <p className="font-black">Confirm</p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Contact Bellewood to confirm current availability.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6">
            <p className="font-black">Pick Up</p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Visit the pharmacy once your medication is confirmed.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
