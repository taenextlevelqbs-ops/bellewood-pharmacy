export default function Home() {
  const quickActions = [
    {
      title: "Manage Prescriptions",
      description: "Refill and manage your medications in one place.",
      href: "/prescriptions",
      button: "Manage Prescriptions",
    },
    {
      title: "Schedule a Vaccine",
      description: "Book available vaccinations through Bellewood Pharmacy.",
      href: "/vaccines",
      button: "Schedule a Vaccine",
    },
    {
      title: "Transfer Prescriptions",
      description: "Move your prescriptions to Bellewood Pharmacy.",
      href: "/transfer",
      button: "Transfer Prescriptions",
    },
  ];

  const services = [
    {
      number: "01",
      title: "Prescriptions",
      text: "Affordable prescription services with personalized support.",
    },
    {
      number: "02",
      title: "Professional Supplements",
      text: "Quality wellness products and professional supplements.",
    },
    {
      number: "03",
      title: "Herbal Supplements",
      text: "Herbal and natural wellness products available locally.",
    },
    {
      number: "04",
      title: "Testing Services",
      text: "Ask our pharmacy team about available testing services.",
    },
    {
      number: "05",
      title: "Vaccines",
      text: "Convenient vaccination services from your neighborhood pharmacy.",
    },
    {
      number: "06",
      title: "Medication Support",
      text: "Talk directly with a pharmacy professional about your medications.",
    },
  ];

  const vaccines = [
    "Flu",
    "COVID-19",
    "Shingles",
    "Tdap",
  ];

  return (
    <main className="min-h-screen bg-white text-[#333333]">

      {/* TOP BAR */}
      <div className="bg-[#ed1c2e] px-6 py-2 text-center text-sm font-semibold text-white">
        Se Habla Español • Serving Leesburg, Virginia
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ed1c2e] text-lg font-black text-white">
              Rx
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gray-400">
                BELLEWOOD
              </p>
              <h1 className="text-xl font-black tracking-tight text-[#333333]">
                PHARMACY
              </h1>
            </div>
          </a>

          <div className="hidden items-center gap-6 text-sm font-semibold xl:flex">
            <a href="/" className="hover:text-[#ed1c2e]">
              Home
            </a>

            <a href="#services" className="hover:text-[#ed1c2e]">
              Pharmacy
            </a>

            <a href="/prescriptions" className="hover:text-[#ed1c2e]">
              Prescriptions
            </a>

            <a href="/transfer" className="hover:text-[#ed1c2e]">
              Transfer
            </a>

            <a href="/vaccines" className="hover:text-[#ed1c2e]">
              Vaccines
            </a>

            <a href="#wellness" className="hover:text-[#ed1c2e]">
              Wellness
            </a>

            <a href="/careers" className="hover:text-[#ed1c2e]">
              Careers
            </a>

            <a href="#faq" className="hover:text-[#ed1c2e]">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-full border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 md:block">
              Español
            </button>

            <a
              href="tel:5714101556"
              className="rounded-full bg-[#ed1c2e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#cf1727]"
            >
              Call Us
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f7f7f7]">
        <div className="absolute right-[-130px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#ed1c2e]/10" />
        <div className="absolute bottom-[-170px] left-[-170px] h-[400px] w-[400px] rounded-full bg-gray-200/50" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">

          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Your Local Wellness Pharmacy
            </p>

            <h2 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.04em] text-[#303030] md:text-7xl">
              Pharmacy care
              <span className="block text-[#ed1c2e]">
                made personal.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Prescriptions, supplements, testing, vaccines, wellness support,
              and personal service from a local pharmacy right here in Leesburg.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="/prescriptions"
                className="rounded-full bg-[#ed1c2e] px-7 py-4 font-bold text-white shadow-lg shadow-red-100 transition hover:-translate-y-0.5 hover:bg-[#cf1727]"
              >
                Manage Prescriptions
              </a>

              <a
                href="/transfer"
                className="rounded-full border border-gray-300 bg-white px-7 py-4 font-bold text-[#333333] transition hover:border-[#ed1c2e] hover:text-[#ed1c2e]"
              >
                Transfer Prescriptions
              </a>

            </div>

            <div className="mt-9 flex flex-wrap gap-5 text-sm font-semibold text-gray-500">
              <span>Local Care</span>
              <span>Se Habla Español</span>
              <span>Leesburg, VA</span>
            </div>
          </div>

          {/* SEARCH PANEL */}
          <div className="rounded-[36px] bg-white p-8 shadow-2xl shadow-gray-300/50">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              How can we help?
            </p>

            <h3 className="mt-3 text-3xl font-black">
              Find pharmacy services fast.
            </h3>

            <div className="mt-7 flex overflow-hidden rounded-2xl border border-gray-200 bg-[#fafafa]">

              <input
                type="text"
                placeholder="Search medications, vaccines, services..."
                className="w-full bg-transparent px-5 py-4 text-sm outline-none"
              />

              <button
                type="button"
                className="bg-[#ed1c2e] px-6 font-bold text-white"
              >
                Search
              </button>

            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              <a
                href="/prescriptions"
                className="rounded-2xl bg-[#f7f7f7] p-4 transition hover:bg-red-50"
              >
                <p className="font-bold">Prescription Refills</p>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your medication
                </p>
              </a>

              <a
                href="/vaccines"
                className="rounded-2xl bg-[#f7f7f7] p-4 transition hover:bg-red-50"
              >
                <p className="font-bold">Vaccinations</p>
                <p className="mt-1 text-sm text-gray-500">
                  Schedule an appointment
                </p>
              </a>

              <a
                href="/transfer"
                className="rounded-2xl bg-[#f7f7f7] p-4 transition hover:bg-red-50"
              >
                <p className="font-bold">Transfer Rx</p>
                <p className="mt-1 text-sm text-gray-500">
                  Switch to Bellewood
                </p>
              </a>

              <a
                href="#wellness"
                className="rounded-2xl bg-[#f7f7f7] p-4 transition hover:bg-red-50"
              >
                <p className="font-bold">Wellness</p>
                <p className="mt-1 text-sm text-gray-500">
                  Supplements and support
                </p>
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="relative z-10 mx-auto -mt-6 max-w-7xl px-6">

        <div className="grid gap-5 md:grid-cols-3">

          {quickActions.map((action) => (
            <a
              key={action.title}
              href={action.href}
              className="group rounded-[28px] border border-gray-100 bg-white p-7 shadow-lg shadow-gray-200/60 transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-lg font-black text-[#ed1c2e]">
                Rx
              </div>

              <h3 className="text-2xl font-black">
                {action.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                {action.description}
              </p>

              <p className="mt-6 font-bold text-[#ed1c2e]">
                {action.button} →
              </p>

            </a>
          ))}

        </div>
      </section>

      {/* RX STATUS */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-10 rounded-[38px] bg-[#303030] p-8 text-white md:p-12 lg:grid-cols-2">

          <div className="flex flex-col justify-center">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff5c69]">
              Prescription Status
            </p>

            <h3 className="mt-4 text-4xl font-black">
              Check your prescription.
            </h3>

            <p className="mt-5 max-w-lg leading-8 text-white/65">
              A future Bellewood patient portal could let customers quickly
              check refill status without having to call the pharmacy.
            </p>

          </div>

          <div className="rounded-[28px] bg-white p-7 text-[#333333]">

            <label className="text-sm font-bold">
              Last Name
            </label>

            <input
              type="text"
              placeholder="Enter last name"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
            />

            <label className="mt-5 block text-sm font-bold">
              Prescription Number
            </label>

            <input
              type="text"
              placeholder="Rx number"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
            />

            <button
              type="button"
              className="mt-6 w-full rounded-full bg-[#ed1c2e] px-6 py-4 font-bold text-white"
            >
              Check Status
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Demo patient experience
            </p>

          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#f8f8f8]">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-3xl">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Pharmacy Services
            </p>

            <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Everything you need from your neighborhood pharmacy.
            </h3>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Modern pharmacy convenience with the personal attention of a
              local team.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => (
              <div
                key={service.number}
                className="rounded-[28px] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <p className="text-sm font-black text-[#ed1c2e]">
                  {service.number}
                </p>

                <h4 className="mt-7 text-xl font-black">
                  {service.title}
                </h4>

                <p className="mt-3 leading-7 text-gray-500">
                  {service.text}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* TRANSFER FLOW */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-12 lg:grid-cols-2">

          <div>

            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              New to Bellewood?
            </p>

            <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Switching pharmacies is easier than you think.
            </h3>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
              Bellewood can make the prescription transfer process simple.
            </p>

            <div className="mt-9 space-y-6">

              {[
                {
                  step: "1",
                  title: "Tell us where your prescription is",
                  text: "Provide your current pharmacy and prescription information.",
                },
                {
                  step: "2",
                  title: "Bellewood handles the transfer",
                  text: "Our pharmacy team can coordinate with your current pharmacy.",
                },
                {
                  step: "3",
                  title: "Pick up at Bellewood",
                  text: "Once ready, your prescription is available locally in Leesburg.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ed1c2e] font-black text-white">
                    {item.step}
                  </div>

                  <div>
                    <h4 className="font-black">
                      {item.title}
                    </h4>

                    <p className="mt-1 leading-7 text-gray-500">
                      {item.text}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* TRANSFER MINI FORM */}
          <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/60">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Start a Transfer
            </p>

            <h4 className="mt-3 text-3xl font-black">
              Transfer your prescription.
            </h4>

            <div className="mt-7 grid gap-4">

              <input
                type="text"
                placeholder="Your name"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                type="tel"
                placeholder="Phone number"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                type="text"
                placeholder="Current pharmacy"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <input
                type="text"
                placeholder="Medication name"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <button
                type="button"
                className="mt-2 rounded-full bg-[#ed1c2e] px-6 py-4 font-bold text-white"
              >
                Start Transfer
              </button>

              <p className="text-center text-xs text-gray-400">
                Demo form only
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* VACCINES */}
      <section className="bg-[#303030] text-white">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="grid gap-12 lg:grid-cols-2">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff5c69]">
                Vaccination Services
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Stay protected.
                <span className="block text-[#ff5c69]">
                  Stay local.
                </span>
              </h3>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                Ask Bellewood Pharmacy about available vaccinations and
                scheduling options.
              </p>

              <a
                href="/vaccines"
                className="mt-8 inline-block rounded-full bg-[#ed1c2e] px-7 py-4 font-bold text-white"
              >
                Schedule a Vaccine
              </a>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {vaccines.map((vaccine) => (
                <div
                  key={vaccine}
                  className="rounded-[24px] border border-white/10 bg-white/5 p-6"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ed1c2e] font-black">
                    +
                  </div>

                  <h4 className="mt-5 text-xl font-black">
                    {vaccine}
                  </h4>

                  <p className="mt-2 text-sm text-white/55">
                    Ask about availability.
                  </p>

                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* INSURANCE */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="rounded-[38px] bg-[#f7f7f7] p-8 md:p-12">

          <div className="grid gap-10 lg:grid-cols-2">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
                Insurance Support
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight">
                Have questions about your coverage?
              </h3>

              <p className="mt-5 max-w-xl leading-8 text-gray-600">
                Bring your insurance information to Bellewood Pharmacy and the
                pharmacy team can help answer questions about prescription
                coverage and pricing.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              {[
                "Prescription Coverage",
                "Insurance Questions",
                "Medication Pricing",
                "Pharmacy Support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex min-h-28 items-center justify-center rounded-[20px] bg-white p-5 text-center font-bold shadow-sm"
                >
                  {item}
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* WELLNESS */}
      <section id="wellness" className="bg-[#f8f8f8]">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
                Wellness
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                More than medication.
              </h3>

            </div>

            <p className="max-w-lg leading-7 text-gray-500">
              Bellewood Pharmacy also supports everyday wellness through
              professional supplements and herbal products.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {[
              {
                title: "Professional Supplements",
                text: "Explore professional wellness products available through Bellewood.",
              },
              {
                title: "Herbal Supplements",
                text: "Natural and herbal wellness options available locally.",
              },
              {
                title: "Wellness Support",
                text: "Talk with the pharmacy team about your wellness needs.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] bg-white p-7 shadow-sm"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 font-black text-[#ed1c2e]">
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

        </div>
      </section>

      {/* LOCAL CARE */}
      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="grid gap-12 lg:grid-cols-2">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
                Why Bellewood
              </p>

              <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Big pharmacy convenience.
                <span className="block text-[#ed1c2e]">
                  Local pharmacy service.
                </span>
              </h3>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Get the convenience people expect from a modern pharmacy while
                still receiving personal support from a local team.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {[
                "Personalized Service",
                "Se Habla Español",
                "Direct Pharmacy Support",
                "Local Leesburg Care",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-gray-100 bg-[#f8f8f8] p-6"
                >

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ed1c2e] font-black text-white">
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

      {/* MAP */}
      <section id="location" className="bg-[#f7f7f7]">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="grid overflow-hidden rounded-[36px] bg-white shadow-lg lg:grid-cols-2">

            <div className="p-8 md:p-12">

              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
                Visit Bellewood
              </p>

              <h3 className="mt-4 text-4xl font-black">
                Your neighborhood pharmacy in Leesburg.
              </h3>

              <div className="mt-8 space-y-6">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Address
                  </p>

                  <p className="mt-2 font-bold">
                    521 E Market St, Suite H
                  </p>

                  <p className="text-gray-500">
                    Leesburg, VA 20176
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Phone
                  </p>

                  <a
                    href="tel:5714101556"
                    className="mt-2 block font-bold text-[#ed1c2e]"
                  >
                    (571) 410-1556
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                    Hours
                  </p>

                  <p className="mt-2 font-bold">
                    Monday through Friday
                  </p>

                  <p className="text-gray-500">
                    9:00 AM to 7:00 PM
                  </p>
                </div>

              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=521+E+Market+St+Suite+H+Leesburg+VA+20176"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full bg-[#ed1c2e] px-7 py-4 font-bold text-white"
              >
                Get Directions
              </a>

            </div>

            <div className="min-h-[400px]">

              <iframe
                src="https://maps.google.com/maps?q=521%20E%20Market%20St%20Suite%20H%20Leesburg%20VA%2020176&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="h-full min-h-[400px] w-full border-0"
                loading="lazy"
                title="Bellewood Pharmacy Map"
              />

            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-24">

        <div className="text-center">

          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
            Frequently Asked Questions
          </p>

          <h3 className="mt-4 text-4xl font-black">
            How can we help?
          </h3>

        </div>

        <div className="mt-12 space-y-4">

          <details className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              Can I transfer a prescription from another pharmacy?
            </summary>

            <p className="mt-4 leading-7 text-gray-500">
              Contact Bellewood Pharmacy with your current pharmacy information
              and prescription details to discuss the transfer process.
            </p>
          </details>

          <details className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              How do I know if my insurance is accepted?
            </summary>

            <p className="mt-4 leading-7 text-gray-500">
              Call the pharmacy or bring your insurance information in so the
              Bellewood team can help verify your prescription coverage.
            </p>
          </details>

          <details className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              Can I schedule a vaccine?
            </summary>

            <p className="mt-4 leading-7 text-gray-500">
              Contact Bellewood Pharmacy to ask about currently available
              vaccines and appointment options.
            </p>
          </details>

          <details className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <summary className="cursor-pointer font-bold">
              Does Bellewood Pharmacy speak Spanish?
            </summary>

            <p className="mt-4 leading-7 text-gray-500">
              Sí. Se Habla Español.
            </p>
          </details>

        </div>

      </section>

      {/* CAREERS */}
      <section id="careers" className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="relative overflow-hidden rounded-[38px] bg-[#303030] px-8 py-12 text-white md:px-14 md:py-16">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ed1c2e] opacity-20" />

            <div className="relative grid gap-12 lg:grid-cols-2">

              <div>

                <div className="inline-flex rounded-full bg-[#ed1c2e] px-4 py-2 text-xs font-black uppercase tracking-[0.18em]">
                  Now Hiring
                </div>

                <h3 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                  Join the Bellewood Pharmacy Team.
                </h3>

                <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                  Bellewood Pharmacy is looking for a dependable and friendly
                  Pharmacy Technician in Leesburg.
                </p>

              </div>

              <div className="rounded-[28px] bg-white p-8 text-[#333333]">

                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
                  Open Position
                </p>

                <h4 className="mt-3 text-2xl font-black">
                  Pharmacy Technician
                </h4>

                <p className="mt-4 leading-7 text-gray-500">
                  Support prescription processing, customer service, and daily
                  pharmacy operations in a local independent pharmacy.
                </p>

                <a
                  href="tel:5714101556"
                  className="mt-7 block rounded-full bg-[#ed1c2e] px-6 py-4 text-center font-bold text-white"
                >
                  Contact Us About This Position
                </a>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#ed1c2e]">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-16 md:flex-row md:items-center">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/65">
              Bellewood Pharmacy
            </p>

            <h3 className="mt-2 text-3xl font-black text-white">
              Your health. Your pharmacy. Your community.
            </h3>

          </div>

          <div className="flex flex-wrap gap-3">

            <a
              href="/transfer"
              className="rounded-full bg-white px-7 py-4 font-bold text-[#ed1c2e]"
            >
              Transfer a Prescription
            </a>

            <a
              href="tel:5714101556"
              className="rounded-full border border-white/40 px-7 py-4 font-bold text-white"
            >
              Call Pharmacy
            </a>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#262626] px-6 py-12 text-white">

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">

          <div>

            <p className="text-xl font-black">
              Bellewood Pharmacy
            </p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/50">
              Local pharmacy care serving the Leesburg community.
            </p>

          </div>

          <div>

            <p className="font-bold">
              Pharmacy
            </p>

            <div className="mt-4 space-y-2 text-sm text-white/50">

              <p>
                <a href="/prescriptions">Manage Prescriptions</a>
              </p>

              <p>
                <a href="/transfer">Transfer Prescriptions</a>
              </p>

              <p>
                <a href="/vaccines">Vaccines</a>
              </p>

              <p>
                <a href="#wellness">Wellness</a>
              </p>

            </div>

          </div>

          <div>

            <p className="font-bold">
              Contact
            </p>

            <div className="mt-4 space-y-2 text-sm text-white/50">

              <p>521 E Market St, Suite H</p>

              <p>Leesburg, VA 20176</p>

              <p>(571) 410-1556</p>

            </div>

          </div>

        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/35">
          © 2026 Bellewood Pharmacy. Demo Website.
        </div>

      </footer>

      {/* MOBILE FLOATING CALL BUTTON */}
      <a
        href="tel:5714101556"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-[#ed1c2e] px-5 py-4 font-bold text-white shadow-2xl md:hidden"
      >
        Call Pharmacy
      </a>

    </main>
  );
}