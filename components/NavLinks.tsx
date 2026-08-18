"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/about", label: "About Us" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {links.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`relative px-4 py-2 text-md font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "text-emerald-700 bg-emerald-50"
                : "text-stone-600 hover:text-emerald-700 hover:bg-stone-50"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}