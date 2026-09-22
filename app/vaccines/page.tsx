export default function VaccinesPage() {
  const vaccines = [
    {
      title: "Flu Vaccine",
      text: "Ask Bellewood about seasonal flu vaccination availability.",
    },
    {
      title: "COVID-19 Vaccine",
      text: "Contact the pharmacy for current COVID-19 vaccine options.",
    },
    {
      title: "Shingles Vaccine",
      text: "Ask the pharmacy team about shingles vaccination availability.",
    },
    {
      title: "Tdap Vaccine",
      text: "Contact Bellewood for Tdap vaccine scheduling information.",
    },
  ];

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

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Vaccinations
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-tight">
              Protect your health
              <span className="block text-[#ed1c2e]">
                close to home.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Ask Bellewood Pharmacy about available vaccinations and scheduling
              options in Leesburg.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {vaccines.map((vaccine) => (
                <div
                  key={vaccine.title}
                  className="rounded-[24px] bg-white p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ed1c2e] font-black text-white">
                    +
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    {vaccine.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {vaccine.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] bg-white p-8 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Schedule a Vaccine
            </p>

            <h3 className="mt-3 text-3xl font-black">
              Request an appointment.
            </h3>

            <div className="mt-7 grid gap-4">
              <input
                type="text"
                placeholder="First and last name"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                type="tel"
                placeholder="Phone number"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <select
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select vaccine
                </option>
                <option>Flu Vaccine</option>
                <option>COVID-19 Vaccine</option>
                <option>Shingles Vaccine</option>
                <option>Tdap Vaccine</option>
              </select>

              <input
                type="date"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <textarea
                placeholder="Additional notes"
                rows={4}
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <button
                type="button"
                className="rounded-full bg-[#ed1c2e] px-6 py-4 font-bold text-white"
              >
                Request Appointment
              </button>

              <p className="text-center text-xs text-gray-400">
                Demo scheduling experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}