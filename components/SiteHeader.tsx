import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Pharmacy" },
  { href: "/prescriptions", label: "Prescriptions" },
  { href: "/transfer", label: "Transfer" },
  { href: "/vaccines", label: "Vaccines" },
  { href: "/availability", label: "Availability" },
  { href: "/wellness", label: "Wellness" },
  { href: "/pharmacist", label: "Our Pharmacist" },
  { href: "/careers", label: "Careers" },
  { href: "/#faq", label: "FAQ" },
];

type SiteHeaderProps = {
  announcement?: boolean;
};

export default function SiteHeader({
  announcement = false,
}: SiteHeaderProps) {
  return (
    <>
      {announcement && (
        <div className="bg-[#7d1420] px-4 py-2 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
          Se Habla Español <span aria-hidden="true">·</span> Proudly serving Leesburg, Virginia
        </div>
      )}
      <header className="site-header sticky top-0 z-50 border-b border-black/5 bg-[#fffefa]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed1c2e] focus-visible:ring-offset-4"
            aria-label="Bellewood Pharmacy home"
          >
            <Image
              src="/comanylogo.png"
              alt="Bellewood Pharmacy"
              width={245}
              height={82}
              priority={announcement}
              className="h-12 w-auto object-contain sm:h-[3.5rem]"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden flex-1 justify-center xl:flex">
            <ul className="flex items-center gap-4 2xl:gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md px-1 py-3 text-[13px] font-bold text-[#46413d] transition-colors hover:text-[#c71d2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ed1c2e]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
            <a
              href="tel:+15714101556"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c71d2c] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#a71623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c71d2c] focus-visible:ring-offset-2 sm:px-5"
            >
              <span className="hidden sm:inline">Call the Pharmacy</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
        <MobileNav links={links} />
      </header>
    </>
  );
}
