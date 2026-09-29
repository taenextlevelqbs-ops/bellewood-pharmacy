"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const quickQuestions = [
  "What are your hours?",
  "Do you offer compounding?",
  "Check medication availability",
  "How do I transfer a prescription?",
];

function getAnswer(question: string) {
  const q = question.toLowerCase();

  if (
    q.includes("hour") ||
    q.includes("open") ||
    q.includes("close")
  ) {
    return "Bellewood Pharmacy is open Monday through Friday from 9:00 AM to 7:00 PM. For weekend availability, please call the pharmacy.";
  }

  if (
    q.includes("address") ||
    q.includes("location") ||
    q.includes("where")
  ) {
    return "Bellewood Pharmacy is located at 521 E Market St, Suite H, Leesburg, VA 20176.";
  }

  if (
    q.includes("phone") ||
    q.includes("call") ||
    q.includes("contact")
  ) {
    return "You can reach Bellewood Pharmacy at (571) 410-1556.";
  }

  if (
    q.includes("compound") ||
    q.includes("custom medication")
  ) {
    return "Ask the Bellewood Pharmacy team about available compounding services and customized medication options. Call (571) 410-1556 for more details.";
  }

  if (
    q.includes("stock") ||
    q.includes("availability") ||
    q.includes("available") ||
    q.includes("inventory") ||
    q.includes("have ")
  ) {
    return "Medication inventory can change throughout the day. Use our Medication Availability page or call Bellewood Pharmacy to confirm whether a medication is currently available.";
  }

  if (
    q.includes("transfer") ||
    q.includes("switch")
  ) {
    return "Bellewood can help you transfer prescriptions from another pharmacy. Use the Transfer Prescription page to get started or call the pharmacy for assistance.";
  }

  if (
    q.includes("refill") ||
    q.includes("prescription")
  ) {
    return "You can visit the Prescriptions section for refill information and prescription services. For medication-specific questions, please contact the Bellewood pharmacy team directly.";
  }

  if (
    q.includes("vaccine") ||
    q.includes("vaccination") ||
    q.includes("shot")
  ) {
    return "Bellewood Pharmacy offers vaccine information through the Vaccines section. Contact the pharmacy to confirm current vaccine availability and appointment options.";
  }

  if (
    q.includes("insurance") ||
    q.includes("medicare") ||
    q.includes("medicaid")
  ) {
    return "Insurance coverage can vary by plan and prescription. Call Bellewood Pharmacy or bring your insurance information in so the team can help verify your coverage.";
  }

  if (
    q.includes("spanish") ||
    q.includes("español") ||
    q.includes("espanol")
  ) {
    return "Sí. Se Habla Español. You can contact Bellewood Pharmacy at (571) 410-1556.";
  }

  if (
    q.includes("supplement") ||
    q.includes("wellness") ||
    q.includes("herbal")
  ) {
    return "Bellewood offers wellness support, including professional and herbal supplement options. Visit the Wellness section or speak with the pharmacy team for more information.";
  }

  if (
    q.includes("medical advice") ||
    q.includes("dose") ||
    q.includes("dosage") ||
    q.includes("side effect") ||
    q.includes("interaction") ||
    q.includes("should i take") ||
    q.includes("what should i take")
  ) {
    return "For medication, dosage, side effect, interaction, or other medical questions, please speak directly with a pharmacist or healthcare professional. You can call Bellewood Pharmacy at (571) 410-1556.";
  }

  return "I can help with Bellewood Pharmacy hours, location, prescription transfers, refills, vaccines, insurance, wellness, compounding, medication availability, and contact information. For medication-specific or medical questions, please speak directly with the pharmacist.";
}

export default function PharmacyAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm the Bellewood Pharmacy Assistant. How can I help you today?",
    },
  ]);

  function ask(question: string) {
    const trimmed = question.trim();

    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: getAnswer(trimmed) },
    ]);

    setInput("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-[70] flex h-[560px] max-h-[72vh] w-[calc(100vw-2.5rem)] max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-2xl">
          <div className="bg-[#303030] px-6 py-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ed1c2e] text-sm font-black">
                    B
                  </div>

                  <div>
                    <p className="font-black">Bellewood Assistant</p>
                    <p className="text-xs text-white/55">
                      Pharmacy Q&A
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/20"
                aria-label="Close pharmacy assistant"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#f8f8f8] p-4">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "rounded-br-md bg-[#ed1c2e] text-white"
                        : "rounded-bl-md border border-gray-100 bg-white text-gray-600 shadow-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {messages.length === 1 && (
              <div className="mt-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                  Popular Questions
                </p>

                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => ask(question)}
                      className="rounded-full border border-gray-200 bg-white px-3 py-2 text-left text-xs font-bold text-gray-600 transition hover:border-[#ed1c2e] hover:text-[#ed1c2e]"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-100 bg-white p-4"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Bellewood a question..."
                className="min-w-0 flex-1 rounded-full border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-[#ed1c2e]"
              />

              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ed1c2e] font-black text-white transition hover:bg-[#cf1727]"
                aria-label="Send question"
              >
                →
              </button>
            </div>

            <p className="mt-3 text-center text-[10px] leading-4 text-gray-400">
              For medical advice or medication-specific questions, speak directly with a pharmacist.
            </p>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-full bg-[#303030] px-5 py-4 font-bold text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-[#222222]"
        aria-label="Open Bellewood Pharmacy Assistant"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ed1c2e] text-sm font-black">
          B
        </span>

        <span className="hidden sm:inline">
          Ask Bellewood
        </span>
      </button>
    </>
  );
}
