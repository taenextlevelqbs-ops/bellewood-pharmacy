export const metadata = {
  title: "Website Terms",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#333333]">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <a href="/" className="font-bold text-[#ed1c2e]">← Bellewood Pharmacy</a>

        <h1 className="mt-10 text-5xl font-black">Website Terms</h1>

        <div className="mt-10 space-y-8 rounded-[32px] bg-white p-8 leading-8 text-gray-600 md:p-12">
          <section>
            <h2 className="text-xl font-black text-[#333333]">
              General Information
            </h2>
            <p className="mt-3">
              Information on this website is provided for general pharmacy and
              service information and is not a substitute for professional
              medical advice, diagnosis, or treatment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#333333]">
              Medication Information
            </h2>
            <p className="mt-3">
              Medication availability, services, and other pharmacy information
              may change. Contact Bellewood Pharmacy directly to confirm current
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#333333]">
              Medical Emergencies
            </h2>
            <p className="mt-3">
              This website and its pharmacy assistant are not emergency medical
              services. For a medical emergency, contact appropriate emergency
              services.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
