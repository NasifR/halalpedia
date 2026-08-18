import Link from "next/link";
import Image from "next/image";
import { Restaurant } from "@/data/restaurants";
import ZabihaBadge from "./ZabihaBadge";

export default function FeaturedCard({ restaurant }: { restaurant: Restaurant }) {
  const { id, name, cuisine, borough, priceRange, zabihaStatus, image, description } = restaurant;

  return (
    <Link href={`/restaurant/${id}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
        {/* Taller image for featured cards */}
        <div className="relative h-52 w-full bg-stone-100 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Featured ribbon */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            ★ Featured
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
              {name}
            </h3>
            <span className="text-stone-500 font-medium text-sm shrink-0">{priceRange}</span>
          </div>

          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <span className="font-medium text-stone-700">{cuisine}</span>
            <span>·</span>
            <span>{borough}</span>
          </div>

          <p className="text-stone-500 text-sm line-clamp-2">{description}</p>

          <ZabihaBadge status={zabihaStatus} size="sm" />
        </div>
      </article>
    </Link>
  );
}
