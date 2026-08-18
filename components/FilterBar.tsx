"use client";

import { Filters } from "@/lib/filterRestaurants";
import { BOROUGHS, CUISINES } from "@/data/restaurants";

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
}

const SELECT_CLASS =
  "w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer";

export default function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const update = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  const hasActiveFilters =
    filters.borough !== "All" ||
    filters.zabihaStatus !== "All" ||
    filters.cuisine !== "All" ||
    filters.priceRange !== "All" ||
    filters.search !== "";

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white pl-10 pr-4 py-3 text-sm text-stone-800 shadow-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Filter dropdowns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="relative">
          <select
            value={filters.borough}
            onChange={(e) => update("borough", e.target.value)}
            className={SELECT_CLASS}
            aria-label="Filter by borough"
          >
            {BOROUGHS.map((b) => (
              <option key={b} value={b}>
                {b === "All" ? "All Boroughs" : b}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">▾</span>
        </div>

        <div className="relative">
          <select
            value={filters.zabihaStatus}
            onChange={(e) => update("zabihaStatus", e.target.value)}
            className={SELECT_CLASS}
            aria-label="Filter by zabiha status"
          >
            <option value="All">Zabiha: All</option>
            <option value="yes">Zabiha ✓ Only</option>
            <option value="unknown">Unverified</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">▾</span>
        </div>

        <div className="relative">
          <select
            value={filters.cuisine}
            onChange={(e) => update("cuisine", e.target.value)}
            className={SELECT_CLASS}
            aria-label="Filter by cuisine"
          >
            {CUISINES.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Cuisines" : c}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">▾</span>
        </div>

        <div className="relative">
          <select
            value={filters.priceRange}
            onChange={(e) => update("priceRange", e.target.value)}
            className={SELECT_CLASS}
            aria-label="Filter by price range"
          >
            <option value="All">Any Price</option>
            <option value="$">$ – Budget</option>
            <option value="$$">$$ – Mid-range</option>
            <option value="$$$">$$$ – Upscale</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">▾</span>
        </div>
      </div>

      {/* Results count + clear */}
      <div className="flex items-center justify-between text-sm text-stone-500">
        <span>
          <strong className="text-stone-800">{resultCount}</strong> restaurant{resultCount !== 1 ? "s" : ""} found
        </span>
        {hasActiveFilters && (
          <button
            onClick={() =>
              onChange({ search: "", borough: "All", zabihaStatus: "All", cuisine: "All", priceRange: "All" })
            }
            className="text-emerald-600 hover:text-emerald-800 font-medium underline underline-offset-2"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
