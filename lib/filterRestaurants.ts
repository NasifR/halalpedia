import { Restaurant, ZabihaStatus, Borough, PriceRange } from "@/data/restaurants";

export interface Filters {
  search: string;
  borough: Borough | "All";
  zabihaStatus: ZabihaStatus | "All";
  cuisine: string;
  priceRange: PriceRange | "All";
}

export const defaultFilters: Filters = {
  search: "",
  borough: "All",
  zabihaStatus: "All",
  cuisine: "All",
  priceRange: "All",
};

/**
 * Filters and searches restaurants based on provided filters.
 * All conditions must match (AND logic).
 */
export function filterRestaurants(
  restaurants: Restaurant[],
  filters: Filters
): Restaurant[] {
  const query = filters.search.toLowerCase().trim();

  return restaurants.filter((r) => {
    if (query && !r.name.toLowerCase().includes(query) && !r.cuisine.toLowerCase().includes(query)) {
      return false;
    }
    if (filters.borough !== "All" && r.borough !== filters.borough) return false;
    if (filters.zabihaStatus !== "All" && r.zabihaStatus !== filters.zabihaStatus) return false;
    if (filters.cuisine !== "All" && r.cuisine !== filters.cuisine) return false;
    if (filters.priceRange !== "All" && r.priceRange !== filters.priceRange) return false;
    return true;
  });
}
