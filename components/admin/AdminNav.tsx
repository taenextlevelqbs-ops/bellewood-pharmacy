"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin#medications", label: "Medications" },
  { href: "/admin/catalog", label: "Drug Catalog" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/activity", label: "Search Activity" },
  {
    href: "/availability",
    label: "Public Availability",
    external: true,
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    if (href.startsWith("/admin#")) {
      return pathname === "/admin";
    }

    return pathname === href;
  }

  const currentPage =
    links.find(
      (link) =>
        !link.external &&
        !link.href.includes("#") &&
        isActive(link.href)
    )?.label || "Admin Menu";

  return (
    <nav className="relative z-40 border-b border-black/10 bg-[#303030]">
      {/* MOBILE */}
      <div className="mx-auto max-w-7xl px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-left text-sm font-black text-white"
        >
          <span>{currentPage}</span>

          <span
            className={`text-lg transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {open && (
          <div className="absolute left-4 right-4 top-[76px] overflow-hidden rounded-2xl border border-white/10 bg-[#303030] p-2 shadow-2xl">
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                    active
                      ? "bg-[#ed1c2e] text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <span>{link.external ? "↗" : "›"}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="mx-auto hidden max-w-7xl gap-2 px-6 py-3 md:flex">
        {links.map((link) => {
          const active = isActive(link.href);

          return (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                active
                  ? "bg-[#ed1c2e] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
              {link.external ? " ↗" : ""}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
