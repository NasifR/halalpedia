"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/lib/AuthContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/about", label: "About Us" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  function handleAccountClick() {
    if (user && !isAdmin) {
      // Regular users go straight to profile page
      router.push("/profile");
    } else {
      // Logged-out users and admins open the modal
      setShowAuth(true);
    }
  }

  return (
    <>
      <nav className="grid grid-cols-3 items-center h-14 max-w-5xl mx-auto px-4">
        {/* Left — empty */}
        <div className="flex items-center" />

        {/* Center — nav links */}
        <div className="flex justify-center gap-1">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2.5 text-md font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-200"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right — account button + logo */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={handleAccountClick}
            className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-800 hover:shadow-md"
          >
            {user ? (
              <span className="hidden sm:inline">{user.displayName?.split(" ")[0]}</span>
            ) : (
              <span>Login</span>
            )}
          </button>

        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}