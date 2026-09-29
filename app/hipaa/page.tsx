export const metadata = {
  title: "Health Information Privacy",
};

export default function HipaaPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#333333]">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <a href="/" className="font-bold text-[#ed1c2e]">← Bellewood Pharmacy</a>

        <p className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
          Patient Privacy
        </p>

        <h1 className="mt-4 text-5xl font-black">
          Health Information Privacy
        </h1>

        <div className="mt-10 rounded-[32px] bg-white p-8 md:p-12">
          <h2 className="text-2xl font-black">
            Notice of Privacy Practices
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Bellewood Pharmacy's official Notice of Privacy Practices should
            describe how protected health information may be used and disclosed
            and how patients can access their privacy rights.
          </p>

          <div className="mt-8 rounded-[24px] bg-[#f8f8f8] p-6">
            <p className="font-black">Need privacy information?</p>
            <p className="mt-2 leading-7 text-gray-500">
              Contact Bellewood Pharmacy directly to request the pharmacy's
              current official Notice of Privacy Practices.
            </p>

            <a
              href="tel:5714101556"
              className="mt-5 inline-block font-bold text-[#ed1c2e]"
            >
              Call (571) 410-1556 →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
