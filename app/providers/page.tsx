export const metadata = {
  title: "For Healthcare Providers",
  description:
    "Contact Bellewood Pharmacy in Leesburg, Virginia for pharmacy coordination and provider support.",
};

export default function ProvidersPage() {
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

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
            For Healthcare Providers
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-black tracking-tight md:text-6xl">
            Local pharmacy support for your patients.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Healthcare offices can contact Bellewood Pharmacy directly for
            pharmacy coordination and questions regarding patient prescriptions.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {[
            ["Prescription Coordination", "Contact Bellewood regarding prescription and pharmacy coordination."],
            ["Patient Transfers", "Connect patients who are interested in transferring prescriptions to Bellewood."],
            ["Direct Support", "Speak directly with the local pharmacy team when assistance is needed."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[28px] bg-white p-8 shadow-sm">
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-gray-500">{text}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-[36px] bg-[#303030] p-8 text-white md:p-12">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b77]">
            Provider Contact
          </p>

          <h2 className="mt-4 text-3xl font-black">
            Contact Bellewood Pharmacy
          </h2>

          <p className="mt-4 text-white/60">
            521 E Market St, Suite H, Leesburg, VA 20176
          </p>

          <a
            href="tel:5714101556"
            className="mt-7 inline-block rounded-full bg-[#ed1c2e] px-7 py-4 font-bold text-white"
          >
            Call (571) 410-1556
          </a>
        </div>
      </section>
    </main>
  );
}
