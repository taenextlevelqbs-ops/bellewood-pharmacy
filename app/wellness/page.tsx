export const metadata = {
  title: "Wellness",
  description:
    "Explore wellness support, professional supplements, herbal products, and compounding inquiries at Bellewood Pharmacy in Leesburg, VA.",
};

const services = [
  {
    title: "Professional Supplements",
    text: "Explore professional wellness products available through Bellewood Pharmacy.",
  },
  {
    title: "Herbal Supplements",
    text: "Ask about natural and herbal wellness options available locally.",
  },
  {
    title: "Wellness Support",
    text: "Talk directly with the Bellewood pharmacy team about your wellness needs.",
  },
  {
    title: "Compounding Services",
    text: "Ask about customized medication options and available compounding services.",
    href: "/compounding",
  },
];

export default function WellnessPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#333333]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-xl font-black">
            Bellewood <span className="text-[#ed1c2e]">Pharmacy</span>
          </a>
          <a href="/" className="text-sm font-bold text-gray-500 hover:text-[#ed1c2e]">
            Back to Home
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
            Wellness
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
            More than medication.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore wellness support and products available through your local
            Bellewood Pharmacy team in Leesburg.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[30px] bg-white p-8 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 font-black text-[#ed1c2e]">
                +
              </div>

              <h2 className="mt-6 text-2xl font-black">{service.title}</h2>
              <p className="mt-3 leading-7 text-gray-500">{service.text}</p>

              {service.href && (
                <a
                  href={service.href}
                  className="mt-6 inline-block font-bold text-[#ed1c2e]"
                >
                  Learn More →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
