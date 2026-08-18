import { restaurants } from "@/data/restaurants";
import RestaurantList from "@/components/RestaurantList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Halal Restaurants – HalalNYC",
  description: "Browse all halal restaurants in New York City, filterable by borough, zabiha status, cuisine, and price.",
};

export default function RestaurantsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">All Restaurants</h1>
        <p className="text-stone-500 mt-1 text-sm">
          {restaurants.length} halal restaurants across New York City's five boroughs
        </p>
      </div>

      <RestaurantList restaurants={restaurants} />
    </div>
  );
}
