import { getRestaurants } from "@/lib/getRestaurants";
import RestaurantList from "@/components/RestaurantList";
import FeaturedCard from "@/components/FeaturedCard";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const restaurants = await getRestaurants();
  const zabihaCount = restaurants.filter((r) => r.zabihaStatus === "yes").length;
  const featured = restaurants.filter((r) => r.featured);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-amber-100 text-green-900 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row items-center gap-10">

            {/* Hero image */}
            <div className="shrink-0">
              <Image
                src="/hero.png"
                alt="Halalpedia"
                width={180}
                height={180}
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>

            {/* Text content */}
            <div className="text-center sm:text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-green-900">
                New York's Halal Guide
              </h1>

              <p className="text-green-900/80 text-lg max-w-xl leading-relaxed">
                Trusted halal restaurant listings across all five boroughs — with clear zabiha status, so you always know what you're eating.
              </p>

              {/* Stats row */}
              <div className="flex justify-center sm:justify-start gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-900">{restaurants.length}</div>
                  <div className="text-green-900/60 text-xs uppercase tracking-widest mt-0.5">Listings</div>
                </div>
                <div className="w-px text-green-900/30" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-900">{zabihaCount}</div>
                  <div className="text-green-900/60 text-xs uppercase tracking-widest mt-0.5">Zabiha Verified</div>
                </div>
                <div className="w-px bg-white/30" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-900">5</div>
                  <div className="text-green-900/60 text-xs uppercase tracking-widest mt-0.5">Boroughs</div>
                </div>
              </div>

              <div>
                <Link
                  href="/restaurants"
                  className="inline-block bg-green-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 hover:text-green-900 transition-colors shadow-md"
                >
                  Browse All Restaurants →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* ── FEATURED ─────────────────────────────────────────────────────── */}
        {featured.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Featured Picks</h2>
                <p className="text-stone-500 text-sm mt-0.5">
                  Editor-selected halal spots worth visiting
                </p>
              </div>
              <Link
                href="/restaurants"
                className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
              >
                See all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {featured.map((r) => (
                <FeaturedCard key={r.id} restaurant={r} />
              ))}
            </div>
          </section>
        )}

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="border-t border-stone-100" />

        {/* ── ALL RESTAURANTS + FILTERS ────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900">All Restaurants</h2>
            <p className="text-stone-500 text-sm mt-0.5">
              Search and filter across all NYC boroughs
            </p>
          </div>
          <RestaurantList restaurants={restaurants} />
        </section>
      </div>
    </div>
  );
}