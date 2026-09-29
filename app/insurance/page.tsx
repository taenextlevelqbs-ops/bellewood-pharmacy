export default function InsurancePage() {
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

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">

        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
            Insurance Support
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Questions about your prescription coverage?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
            Insurance coverage can vary by plan and prescription. The
            Bellewood Pharmacy team can help you verify your coverage.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">

          <div className="rounded-[28px] bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 font-black text-[#ed1c2e]">
              1
            </div>
            <h2 className="mt-6 text-xl font-black">
              Bring Your Information
            </h2>
            <p className="mt-3 leading-7 text-gray-500">
              Have your current insurance card and prescription information available.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 font-black text-[#ed1c2e]">
              2
            </div>
            <h2 className="mt-6 text-xl font-black">
              Contact Bellewood
            </h2>
            <p className="mt-3 leading-7 text-gray-500">
              Speak with the pharmacy team about your specific insurance plan.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 font-black text-[#ed1c2e]">
              3
            </div>
            <h2 className="mt-6 text-xl font-black">
              Verify Coverage
            </h2>
            <p className="mt-3 leading-7 text-gray-500">
              Bellewood can help determine coverage for your prescription and plan.
            </p>
          </div>

        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[36px] bg-[#303030] p-8 text-white md:p-12">

          <div className="grid gap-8 md:grid-cols-2 md:items-center">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b77]">
                Need Help?
              </p>

              <h2 className="mt-4 text-3xl font-black">
                Let our pharmacy team help.
              </h2>

              <p className="mt-4 leading-7 text-white/60">
                Call Bellewood Pharmacy to ask about insurance coverage for
                your prescription.
              </p>
            </div>

            <div className="md:text-right">
              <a
                href="tel:5714101556"
                className="inline-block rounded-full bg-[#ed1c2e] px-7 py-4 font-bold text-white"
              >
                Call (571) 410-1556
              </a>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}
