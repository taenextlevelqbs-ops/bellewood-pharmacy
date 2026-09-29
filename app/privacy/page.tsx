export const metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#333333]">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <a href="/" className="font-bold text-[#ed1c2e]">← Bellewood Pharmacy</a>

        <h1 className="mt-10 text-5xl font-black">Privacy</h1>

        <div className="mt-10 space-y-8 rounded-[32px] bg-white p-8 leading-8 text-gray-600 md:p-12">
          <section>
            <h2 className="text-xl font-black text-[#333333]">Website Privacy</h2>
            <p className="mt-3">
              Bellewood Pharmacy respects the privacy of visitors to this website.
              Information submitted through future patient-facing services should
              only be collected and processed through appropriately secured systems.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#333333]">Health Information</h2>
            <p className="mt-3">
              Do not submit sensitive medical or prescription information through
              general website forms unless the page specifically identifies a secure
              patient workflow intended for that purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#333333]">Contact</h2>
            <p className="mt-3">
              Questions about website privacy can be directed to Bellewood Pharmacy
              at (571) 410-1556.
            </p>
          </section>

          <p className="text-sm text-gray-400">
            This website privacy information does not replace Bellewood Pharmacy's
            official Notice of Privacy Practices.
          </p>
        </div>
      </div>
    </main>
  );
}
