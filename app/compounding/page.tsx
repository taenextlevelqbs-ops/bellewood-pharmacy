import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "Compounding Services",
  description:
    "Learn about compounding service inquiries at Bellewood Pharmacy in Leesburg, Virginia.",
};

export default function CompoundingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#f8f8f8] text-[#333333]">

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
              Compounding
            </p>

            <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
              Medication options built around individual needs.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Ask the Bellewood Pharmacy team about available compounding
              services and customized medication options.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:5714101556"
                className="rounded-full bg-[#ed1c2e] px-7 py-4 font-bold text-white"
              >
                Inquire for More Details
              </a>

              <a
                href="/prescriptions"
                className="rounded-full border border-gray-300 bg-white px-7 py-4 font-bold"
              >
                Prescription Services
              </a>
            </div>
          </div>

          <div className="rounded-[38px] bg-[#303030] p-9 text-white md:p-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6b77]">
              Talk With Our Team
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Have a compounding question?
            </h2>

            <p className="mt-5 leading-8 text-white/65">
              Compounding availability depends on the prescription and service
              requested. Contact Bellewood Pharmacy so the pharmacy team can
              discuss your needs.
            </p>

            <div className="mt-8 rounded-[24px] bg-white/10 p-6">
              <p className="text-sm text-white/50">Bellewood Pharmacy</p>
              <p className="mt-2 text-xl font-black">(571) 410-1556</p>
              <p className="mt-2 text-sm text-white/50">
                521 E Market St, Suite H, Leesburg, VA 20176
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
