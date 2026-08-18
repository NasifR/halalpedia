import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import NavLinks from "@/components/NavLinks";
import Image from "next/image";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Halalpedia – Find Halal Restaurants in New York City",
  description:
    "Discover verified halal restaurants across all five boroughs of New York City. Filter by zabiha status, cuisine, price, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-stone-50 text-stone-900 min-h-screen`}>
        {/* Header */}
        <header className="sticky top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
    
    {/* Logo */}
    <Link href="/" className="flex items-center shrink-0 ml-10">
      <Image
        src="/logo.png"
        alt="Halalpedia"
        width={70}
        height={70}
        className="object-contain"
        priority
      />
    </Link>

    {/* Navigation */}
    <NavLinks />

    {/* Optional right-side spacer */}
    <div className="w-[120px] hidden md:block" />
    
  </div>
</header>

        <main>{children}</main>

        <footer className="mt-16 border-t border-stone-100 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-stone-400">
            <p>© {new Date().getFullYear()} HalalNYC · Built for the Muslim community of New York</p>
            <p className="mt-1">
              Zabiha status is community-reported. Always verify with the restaurant directly.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
