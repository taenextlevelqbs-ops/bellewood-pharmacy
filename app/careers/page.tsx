export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#333333]">
      {/* NAV */}
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
            className="rounded-full border border-gray-200 px-5 py-3 text-sm font-bold transition hover:border-[#ed1c2e] hover:text-[#ed1c2e]"
          >
            Back Home
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Careers
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-tight">
              Join the Bellewood
              <span className="block text-[#ed1c2e]">
                Pharmacy Team.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Bellewood Pharmacy is looking for a dependable and friendly
              Pharmacy Technician to support patients and daily pharmacy
              operations in Leesburg.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <p className="text-sm font-black text-[#ed1c2e]">
                  Position
                </p>
                <h3 className="mt-3 text-xl font-black">
                  Pharmacy Technician
                </h3>
              </div>

              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <p className="text-sm font-black text-[#ed1c2e]">
                  Location
                </p>
                <h3 className="mt-3 text-xl font-black">
                  Leesburg, Virginia
                </h3>
              </div>

              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <p className="text-sm font-black text-[#ed1c2e]">
                  Environment
                </p>
                <h3 className="mt-3 text-xl font-black">
                  Local Pharmacy
                </h3>
              </div>

              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <p className="text-sm font-black text-[#ed1c2e]">
                  Focus
                </p>
                <h3 className="mt-3 text-xl font-black">
                  Patient Service
                </h3>
              </div>
            </div>
          </div>

          {/* APPLICATION */}
          <div className="rounded-[34px] bg-white p-8 shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Apply Now
            </p>

            <h3 className="mt-3 text-3xl font-black">
              Pharmacy Technician Application
            </h3>

            <p className="mt-3 leading-7 text-gray-500">
              Submit your information and Bellewood Pharmacy can follow up with
              you about the opportunity.
            </p>

            <div className="mt-7 grid gap-4">
              <input
                type="text"
                placeholder="Full name"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                type="email"
                placeholder="Email address"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                type="tel"
                placeholder="Phone number"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <select
                defaultValue=""
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              >
                <option value="" disabled>
                  Pharmacy technician experience
                </option>
                <option>No experience</option>
                <option>Less than 1 year</option>
                <option>1 to 2 years</option>
                <option>3+ years</option>
              </select>

              <select
                defaultValue=""
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              >
                <option value="" disabled>
                  Certification status
                </option>
                <option>Certified</option>
                <option>Not certified</option>
                <option>Currently pursuing certification</option>
              </select>

              <select
                defaultValue=""
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              >
                <option value="" disabled>
                  Availability
                </option>
                <option>Full time</option>
                <option>Part time</option>
                <option>Weekdays</option>
                <option>Flexible</option>
              </select>

              <textarea
                placeholder="Tell us a little about yourself"
                rows={5}
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <button
                type="button"
                className="rounded-full bg-[#ed1c2e] px-6 py-4 font-bold text-white transition hover:bg-[#cf1727]"
              >
                Submit Application
              </button>

              <p className="text-center text-xs text-gray-400">
                Demo application form only
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE DETAILS */}
      <section className="bg-[#303030] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff5c69]">
                The Role
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Help provide great pharmacy care.
              </h3>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                Pharmacy technicians help support prescription processing,
                customer service, inventory, and daily pharmacy operations.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Prescription Support",
                "Customer Service",
                "Daily Pharmacy Operations",
                "Team Collaboration",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ed1c2e] font-black">
                    ✓
                  </div>

                  <p className="mt-5 text-lg font-bold">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY WORK HERE */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
            Why Bellewood
          </p>

          <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Work in a local pharmacy environment.
          </h3>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Local Team",
              text: "Work closely with a small pharmacy team serving the Leesburg community.",
            },
            {
              title: "Patient Focus",
              text: "Build relationships with customers and provide more personalized service.",
            },
            {
              title: "Hands On Experience",
              text: "Support the day to day operations of an independent pharmacy.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] bg-white p-7 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 font-black text-[#ed1c2e]">
                +
              </div>

              <h4 className="mt-6 text-xl font-black">
                {item.title}
              </h4>

              <p className="mt-3 leading-7 text-gray-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-[#ed1c2e]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-14 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">
              Interested?
            </p>

            <h3 className="mt-2 text-3xl font-black text-white">
              Talk with Bellewood Pharmacy.
            </h3>
          </div>

          <a
            href="tel:5714101556"
            className="rounded-full bg-white px-7 py-4 font-bold text-[#ed1c2e]"
          >
            Call (571) 410-1556
          </a>
        </div>
      </section>
    </main>
  );
}