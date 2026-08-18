import Link from "next/link";
import Image from "next/image";
import { Restaurant } from "@/data/restaurants";
import ZabihaBadge from "./ZabihaBadge";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { id, name, cuisine, borough, priceRange, zabihaStatus, image } = restaurant;

  return (
    <Link href={`/restaurant/${id}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full">
        {/* Image */}
        <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
              {name}
            </h2>
            <span className="text-stone-500 font-medium text-sm shrink-0">{priceRange}</span>
          </div>

          <div className="flex items-center gap-2 text-stone-500 text-sm">
            <span className="font-medium text-stone-700">{cuisine}</span>
            <span>·</span>
            <span>{borough}</span>
          </div>

          {/* Only shows for zabiha === "yes" */}
          <ZabihaBadge status={zabihaStatus} size="sm" />
        </div>
      </article>
    </Link>
  );
}
