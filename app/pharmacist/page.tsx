export default function PharmacistPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#303030]">
      <nav className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ed1c2e] text-lg font-black text-white">
              Rx
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400">
                BELLEWOOD
              </p>
              <p className="text-xl font-black">PHARMACY</p>
            </div>
          </a>

          <a
            href="/"
            className="rounded-full border border-black/10 px-5 py-3 text-sm font-bold transition hover:border-[#ed1c2e] hover:text-[#ed1c2e]"
          >
            Back Home
          </a>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          <div className="relative">
            <div className="overflow-hidden rounded-[36px] bg-white shadow-xl">
              <img
                src="/owner.jpeg"
                alt="Ak Brahmbhatt, PharmD"
                className="h-[540px] w-full object-cover object-top"
              />
            </div>

            <div className="absolute -bottom-5 right-4 rounded-[24px] bg-[#ed1c2e] px-6 py-5 text-white shadow-xl md:-right-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
                Community Pharmacy
              </p>
              <p className="mt-1 text-lg font-black">
                10 Years of Experience
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Meet Your Pharmacist
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
              Ak Brahmbhatt,
              <span className="block text-[#ed1c2e]">PharmD</span>
            </h1>

            <p className="mt-5 text-xl font-bold text-[#777]">
              Pharmacist at Bellewood Pharmacy
            </p>

            <div className="mt-8 space-y-5 text-base leading-8 text-[#666]">
              <p>
                Ak Brahmbhatt brings 10 years of community retail pharmacy
                experience to Bellewood Pharmacy, with a focus on personalized
                service and helping patients feel comfortable asking questions
                about their medications and care.
              </p>

              <p>
                He earned his Doctor of Pharmacy degree from Chicago State
                University and a Bachelor of Science in Nutrition from the
                University of Florida.
              </p>

              <p>
                At Bellewood, the goal is to combine professional pharmacy care
                with the personal attention, accessibility, and familiarity of
                a neighborhood pharmacy.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ed1c2e]">
                  Education
                </p>
                <p className="mt-3 text-lg font-black">
                  Doctor of Pharmacy
                </p>
                <p className="mt-1 text-sm text-[#777]">
                  Chicago State University
                </p>
              </div>

              <div className="rounded-[24px] bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ed1c2e]">
                  Background
                </p>
                <p className="mt-3 text-lg font-black">
                  B.S. Nutrition
                </p>
                <p className="mt-1 text-sm text-[#777]">
                  University of Florida
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="tel:5714101556"
                className="rounded-full bg-[#ed1c2e] px-7 py-4 font-black text-white transition hover:bg-[#d71929]"
              >
                Call Bellewood
              </a>

              <a
                href="https://www.instagram.com/bellewoodpharmacy/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black/15 bg-white px-7 py-4 font-black transition hover:border-[#ed1c2e] hover:text-[#ed1c2e]"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#303030] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6673]">
                Bellewood Pharmacy
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Personal pharmacy care in Leesburg.
              </h2>
            </div>

            <div className="text-sm leading-7 text-white/60">
              <p>521 E Market St, Suite H</p>
              <p>Leesburg, VA 20176</p>
              <p>(571) 410-1556</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
