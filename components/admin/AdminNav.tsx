"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin#medications", label: "Medications" },
  { href: "/admin/activity", label: "Search Activity" },
  { href: "/availability", label: "Public Availability", external: true },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-black/10 bg-[#303030]">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname === link.href;

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
