"use client";

import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Pharmacy" },
  { href: "/prescriptions", label: "Prescriptions" },
  { href: "/transfer", label: "Transfer" },
  { href: "/vaccines", label: "Vaccines" },
  { href: "/#wellness", label: "Wellness" },
  { href: "/pharmacist", label: "Meet the Pharmacist" },
  { href: "/careers", label: "Careers" },
  { href: "/#faq", label: "FAQ" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-100 xl:hidden">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Open navigation menu"
          className="flex w-full items-center justify-between rounded-2xl bg-[#f5f5f5] px-5 py-3.5 text-sm font-black text-[#333333]"
        >
          <span>Menu</span>

          <span
            className={`text-xl transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {open && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold text-[#444] transition hover:bg-[#f7f7f7] hover:text-[#ed1c2e]"
              >
                <span>{link.label}</span>
                <span className="text-gray-300">›</span>
              </a>
            ))}

            <a
              href="tel:5714101556"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-xl bg-[#ed1c2e] px-4 py-3.5 text-sm font-black text-white"
            >
              Call Bellewood Pharmacy
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
