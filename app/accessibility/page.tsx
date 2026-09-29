export const metadata = {
  title: "Accessibility",
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#333333]">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <a href="/" className="font-bold text-[#ed1c2e]">← Bellewood Pharmacy</a>

        <h1 className="mt-10 text-5xl font-black">Accessibility</h1>

        <div className="mt-10 rounded-[32px] bg-white p-8 leading-8 text-gray-600 md:p-12">
          <p>
            Bellewood Pharmacy aims to provide a website experience that is
            accessible and usable for visitors with a range of abilities and
            assistive technologies.
          </p>

          <p className="mt-6">
            If you experience difficulty accessing information or using a
            feature on this website, please contact the pharmacy so the team can
            provide assistance through another method.
          </p>

          <a
            href="tel:5714101556"
            className="mt-8 inline-block rounded-full bg-[#ed1c2e] px-7 py-4 font-bold text-white"
          >
            Call (571) 410-1556
          </a>
        </div>
      </div>
    </main>
  );
}
