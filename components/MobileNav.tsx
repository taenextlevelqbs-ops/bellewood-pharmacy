"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavLink = { href: string; label: string };

const additionalLinks: NavLink[] = [
  { href: "/#about", label: "About Bellewood" },
  { href: "/insurance", label: "Insurance" },
];

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    window.addEventListener("keydown", dismissOnEscape);
    return () => window.removeEventListener("keydown", dismissOnEscape);
  }, [open]);

  const menuLinks = [...links, ...additionalLinks];

  return (
    <div className="border-t border-black/5 px-4 py-2 xl:hidden sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="bellewood-mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-sm font-black text-[#303030] transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed1c2e]"
        >
          <span>Explore Bellewood</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <nav
          id="bellewood-mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!open}
          className="mt-2 max-h-[min(65vh,32rem)] overflow-y-auto rounded-2xl border border-black/5 bg-white p-2 shadow-[0_18px_48px_rgba(40,28,24,0.13)]"
        >
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[#46413d] transition-colors hover:bg-[#fbf4f1] hover:text-[#b41d2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ed1c2e]"
            >
              <span>{link.label}</span>
              <span aria-hidden="true" className="text-lg text-[#c71d2c]">→</span>
            </Link>
          ))}
          <a
            href="tel:+15714101556"
            onClick={() => setOpen(false)}
            className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-[#c71d2c] px-4 py-3 text-sm font-black text-white transition-colors hover:bg-[#a71623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c71d2c] focus-visible:ring-offset-2"
          >
            Call Bellewood Pharmacy
          </a>
        </nav>
      </div>
    </div>
  );
}
