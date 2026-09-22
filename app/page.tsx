export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#3d3d3d]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ed1c2e] text-lg font-bold text-white">
              Rx
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-gray-500">
                BELLEWOOD
              </p>
              <h1 className="text-xl font-black tracking-tight text-[#3d3d3d]">
                PHARMACY
              </h1>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#services" className="transition hover:text-[#ed1c2e]">
              Services
            </a>

            <a href="#about" className="transition hover:text-[#ed1c2e]">
              About
            </a>

            <a href="#location" className="transition hover:text-[#ed1c2e]">
              Location
            </a>

            <a
              href="#careers"
              className="font-bold text-[#ed1c2e] transition hover:text-[#cf1727]"
            >
              We&apos;re Hiring
            </a>
          </div>

          <a
            href="tel:5714101556"
            className="rounded-full bg-[#ed1c2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#cf1727]"
          >
            Call Pharmacy
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f7f7f7]">
        <div className="absolute right-[-160px] top-[-80px] h-[420px] w-[420px] rounded-full bg-[#ed1c2e]/10" />
        <div className="absolute bottom-[-220px] left-[-160px] h-[420px] w-[420px] rounded-full bg-gray-300/20" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-[#ed1c2e]/20 bg-white px-4 py-2 text-sm font-semibold text-[#ed1c2e] shadow-sm">
              Wellness Pharmacy • Se Habla Español
            </div>

            <h2 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#343434] md:text-7xl">
              Better health.
              <span className="block text-[#ed1c2e]">Personal care.</span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
              Bellewood Pharmacy provides affordable prescriptions, wellness
              products, supplements, testing services, and personalized support
              for the Leesburg community.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="tel:5714101556"
                className="rounded-full bg-[#ed1c2e] px-7 py-4 font-semibold text-white shadow-lg shadow-red-100 transition hover:-translate-y-0.5 hover:bg-[#cf1727]"
              >
                Call Bellewood
              </a>

              <a
                href="#services"
                className="rounded-full border border-gray-300 bg-white px-7 py-4 font-semibold text-[#3d3d3d] transition hover:border-[#ed1c2e] hover:text-[#ed1c2e]"
              >
                View Services
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500">
              <p>Leesburg, Virginia</p>
              <p>Independent Pharmacy</p>
              <p>Personalized Service</p>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative">
            <div className="absolute inset-4 rotate-3 rounded-[38px] bg-[#ed1c2e]" />

            <div className="relative rounded-[38px] bg-white p-8 shadow-2xl shadow-gray-300/50 md:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold tracking-[0.2em] text-gray-400">
                    BELLEWOOD
                  </p>
                  <p className="text-3xl font-black text-[#3d3d3d]">
                    PHARMACY
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ed1c2e] text-xl font-bold text-white">
                  Rx
                </div>
              </div>

              <div className="my-8 h-px bg-gray-100" />

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ed1c2e]">
                Wellness Pharmacy
              </p>

              <div className="mt-6 space-y-4">
                {[
                  "Low Price Prescriptions",
                  "Professional Supplements",
                  "Herbal Supplements",
                  "Testing Services",
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-4 rounded-2xl bg-[#f7f7f7] p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ed1c2e] text-sm font-bold text-white">
                      ✓
                    </div>
                    <p className="font-semibold">{service}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl bg-[#343434] p-5 text-white">
                <p className="text-xs uppercase tracking-[0.15em] text-white/50">
                  Need assistance?
                </p>
                <p className="mt-1 text-xl font-bold">(571) 410 1556</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ed1c2e]">
            Our Services
          </p>

          <h3 className="mt-4 text-4xl font-black tracking-tight text-[#343434] md:text-5xl">
            More than just prescriptions.
          </h3>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Bellewood combines traditional pharmacy services with a focus on
            wellness, supplements, and personalized care.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Prescriptions",
              text: "Affordable prescription services with local, personalized support.",
            },
            {
              number: "02",
              title: "Professional Supplements",
              text: "Quality wellness products and professional grade supplements.",
            },
            {
              number: "03",
              title: "Herbal Supplements",
              text: "Herbal and natural wellness options available in store.",
            },
            {
              number: "04",
              title: "Testing Services",
              text: "Convenient testing services available through your local pharmacy.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="group rounded-[28px] border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm font-black text-[#ed1c2e]">{item.number}</p>

              <h4 className="mt-8 text-xl font-bold text-[#343434]">
                {item.title}
              </h4>

              <p className="mt-3 leading-7 text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[#343434] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff5967]">
              Local Care
            </p>

            <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              A pharmacy that knows its community.
            </h3>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              Skip the impersonal experience. Bellewood Pharmacy offers local
              service, direct pharmacist support, and a wellness focused
              approach right here in Leesburg.
            </p>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-[32px] bg-white/5 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff5967]">
                Se Habla Español
              </p>

              <h4 className="mt-4 text-3xl font-bold">
                Pharmacy care you can understand.
              </h4>

              <p className="mt-4 leading-7 text-white/65">
                Bellewood Pharmacy proudly serves English and Spanish speaking
                customers throughout the Leesburg community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="bg-[#f7f7f7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ed1c2e]">
              Visit Us
            </p>

            <p className="mt-3 text-xl font-bold text-[#343434]">
              521 E Market St, Suite H
            </p>

            <p className="mt-1 text-gray-500">Leesburg, VA 20176</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ed1c2e]">
              Call Us
            </p>

            <a
              href="tel:5714101556"
              className="mt-3 block text-xl font-bold text-[#343434] transition hover:text-[#ed1c2e]"
            >
              (571) 410 1556
            </a>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ed1c2e]">
              Pharmacy Hours
            </p>

            <p className="mt-3 text-xl font-bold text-[#343434]">
              Monday through Friday
            </p>

            <p className="mt-1 text-gray-500">9:00 AM to 7:00 PM</p>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="relative overflow-hidden rounded-[40px] bg-[#343434] px-8 py-12 text-white md:px-14 md:py-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ed1c2e] opacity-20" />

            <div className="absolute -bottom-32 right-32 h-72 w-72 rounded-full border-[45px] border-white/5" />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex rounded-full bg-[#ed1c2e] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
                  Now Hiring
                </div>

                <h3 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                  Join the Bellewood
                  <span className="block text-[#ff5967]">
                    Pharmacy Team.
                  </span>
                </h3>

                <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                  Bellewood Pharmacy is looking for a dependable and friendly
                  Pharmacy Technician to join our growing team in Leesburg,
                  Virginia.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                    Pharmacy Technician
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                    Leesburg, VA
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                    Local Pharmacy
                  </span>
                </div>
              </div>

              <div className="rounded-[30px] bg-white p-7 text-[#343434] shadow-2xl md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ed1c2e]">
                  Open Position
                </p>

                <h4 className="mt-3 text-2xl font-black">
                  Pharmacy Technician
                </h4>

                <p className="mt-4 leading-7 text-gray-500">
                  Help our pharmacists provide excellent service to patients
                  while supporting prescription processing, customer service,
                  and daily pharmacy operations.
                </p>

                <div className="mt-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-[#ed1c2e]">
                      ✓
                    </div>

                    <p className="text-sm font-semibold">
                      Friendly and professional environment
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-[#ed1c2e]">
                      ✓
                    </div>

                    <p className="text-sm font-semibold">
                      Independent local pharmacy
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-[#ed1c2e]">
                      ✓
                    </div>

                    <p className="text-sm font-semibold">
                      Serve the Leesburg community
                    </p>
                  </div>
                </div>

                <a
                  href="tel:5714101556"
                  className="mt-8 block w-full rounded-full bg-[#ed1c2e] px-6 py-4 text-center font-bold text-white transition hover:bg-[#cf1727]"
                >
                  Call About This Position
                </a>

                <p className="mt-4 text-center text-xs text-gray-400">
                  Contact Bellewood Pharmacy for position details and
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#ed1c2e]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-14 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">
              Bellewood Pharmacy
            </p>

            <h3 className="mt-2 text-3xl font-black text-white">
              Better care is closer than you think.
            </h3>
          </div>

          <a
            href="tel:5714101556"
            className="rounded-full bg-white px-7 py-4 font-bold text-[#ed1c2e] transition hover:scale-[1.02]"
          >
            Call (571) 410 1556
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#292929] px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Bellewood Pharmacy. Demo Website.</p>
          <p>Leesburg, Virginia</p>
        </div>
      </footer>
    </main>
  );
}