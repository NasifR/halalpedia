import { getRestaurants } from "@/lib/getRestaurants";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const restaurants = await getRestaurants();

  const restaurantUrls = restaurants.map((r) => ({
    url: `https://halalpedia.nyc/restaurant/${r.id}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://halalpedia.nyc/", lastModified: new Date() },
    { url: "https://halalpedia.nyc/restaurants", lastModified: new Date() },
    { url: "https://halalpedia.nyc/about", lastModified: new Date() },
    ...restaurantUrls,
  ];
}