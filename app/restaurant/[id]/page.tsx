import { restaurants } from "@/data/restaurants";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ZabihaBadge from "@/components/ZabihaBadge";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const restaurant = restaurants.find((r) => r.id === id);
  if (!restaurant) return { title: "Not Found" };
  return {
    title: `${restaurant.name} – HalalNYC`,
    description: restaurant.description,
  };
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { id } = await params;
  const restaurant = restaurants.find((r) => r.id === id);
  if (!restaurant) notFound();

  const { name, image, address, cuisine, priceRange, zabihaStatus, description, borough, phone, hours } = restaurant;
  const mapQuery = encodeURIComponent(address);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Back link */}
      <Link
        href="/restaurants"
        className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-emerald-600 transition-colors"
      >
        ← Back to restaurants
      </Link>

      {/* Hero image */}
      <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden bg-stone-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">{name}</h1>
          <span className="text-xl font-semibold text-stone-500">{priceRange}</span>
        </div>

        {/* Zabiha badge — visible for both yes and unknown on detail page */}
        <ZabihaBadge status={zabihaStatus} size="md" showUnknown />

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-stone-100 text-stone-700 rounded-full px-3 py-1">{cuisine}</span>
          <span className="bg-stone-100 text-stone-700 rounded-full px-3 py-1">{borough}</span>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBlock icon="📍" label="Address" value={address} />
        {phone && <InfoBlock icon="📞" label="Phone" value={phone} />}
        {hours && <InfoBlock icon="🕐" label="Hours" value={hours} />}
        <InfoBlock
          icon="🥩"
          label="Zabiha Status"
          value={
            zabihaStatus === "yes"
              ? "Confirmed zabiha halal"
              : "Halal but zabiha unverified — confirm directly"
          }
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h2 className="font-semibold text-stone-800">About</h2>
        <p className="text-stone-600 leading-relaxed">{description}</p>
      </div>

      {/* ── MENU ───────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="font-semibold text-stone-800">Menu</h2>
        {/* 
          PLACEHOLDER: Replace the div below with an <Image> tag once you have 
          the actual menu photo. Example:
          <Image src="/menus/{id}.jpg" alt={`${name} menu`} width={800} height={1100} className="rounded-2xl w-full" />
        */}
        <div className="rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 flex flex-col items-center justify-center gap-3 py-16 text-stone-400">
          <span className="text-5xl">📋</span>
          <p className="font-medium text-stone-500">Menu coming soon</p>
          <p className="text-xs text-center max-w-xs">
            We're collecting menu photos from each restaurant. Check back soon, or call the restaurant directly.
          </p>
          {/* Replace with your image path: /menus/{id}.jpg */}
          <code className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-400">
            /menus/{id}.jpg
          </code>
        </div>
      </div>

      {/* Map */}
      <div className="space-y-2">
        <h2 className="font-semibold text-stone-800">Location</h2>
        <a
          href={`https://maps.google.com/?q=${mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-48 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors gap-2 text-stone-500 hover:text-emerald-600"
        >
          <span className="text-4xl">🗺️</span>
          <span className="text-sm font-medium">Open in Google Maps</span>
          <span className="text-xs text-stone-400">{address}</span>
        </a>
      </div>

      <p className="text-xs text-stone-400 border-t border-stone-100 pt-4">
        ⚠️ Halal and zabiha status is community-reported. We recommend confirming directly with the restaurant before visiting.
      </p>
    </div>
  );
}

function InfoBlock({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-stone-50 rounded-xl p-4 space-y-1">
      <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
        {icon} {label}
      </div>
      <div className="text-sm text-stone-700">{value}</div>
    </div>
  );
}
