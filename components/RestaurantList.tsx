"use client";

import { useState } from "react";
import { Restaurant } from "@/data/restaurants";
import { filterRestaurants, defaultFilters, Filters } from "@/lib/filterRestaurants";
import FilterBar from "./FilterBar";
import RestaurantCard from "./RestaurantCard";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const filtered = filterRestaurants(restaurants, filters);

  return (
    <div className="space-y-6">
      <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <div className="text-5xl mb-3">🕌</div>
          <p className="text-lg font-medium text-stone-600">No restaurants found</p>
          <p className="text-sm mt-1">Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      )}
    </div>
  );
}
