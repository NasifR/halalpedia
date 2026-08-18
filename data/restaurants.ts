export type ZabihaStatus = "yes" | "unknown";
export type Borough =
  | "Manhattan"
  | "Queens"
  | "Brooklyn"
  | "Bronx"
  | "Staten Island";
export type PriceRange = "$" | "$$" | "$$$";

export interface Restaurant {
  id: string;
  name: string;
  borough: Borough;
  cuisine: string;
  priceRange: PriceRange;
  zabihaStatus: ZabihaStatus;
  address: string;
  description: string;
  image: string;
  phone?: string;
  hours?: string;
  featured?: boolean; // shown in the homepage featured section
}

export const restaurants: Restaurant[] = [
  // ── FEATURED (shown on homepage) ───────────────────────────────────────────
  {
    id: "1",
    name: "Al Aqsa Halal",
    borough: "Brooklyn",
    cuisine: "Middle Eastern",
    priceRange: "$",
    zabihaStatus: "yes",
    address: "4702 Church Ave, Brooklyn, NY 11203",
    description:
      "Owner-confirmed zabiha halal. Known for their shawarma wraps and grilled meats. A neighborhood staple for over 10 years.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    phone: "(718) 555-0101",
    hours: "Mon–Sun: 10am – 11pm",
    featured: true,
  },
  {
    id: "10",
    name: "The Halal Guys",
    borough: "Manhattan",
    cuisine: "Mediterranean",
    priceRange: "$",
    zabihaStatus: "yes",
    address: "W 53rd St & 6th Ave, New York, NY 10019",
    description:
      "The original NYC halal cart. Iconic white rice, chicken, and gyro over rice. Zabiha certified. Lines wrap around the block on weekend nights.",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80",
    phone: "N/A",
    hours: "Mon–Sun: 11am – 4am",
    featured: true,
  },
  {
    id: "16",
    name: "Zyara Restaurant",
    borough: "Queens",
    cuisine: "Middle Eastern",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "25-11 Steinway St, Astoria, NY 11103",
    description:
      "A beloved Astoria gem serving modern and traditional Middle Eastern cuisine. Every table gets complimentary pita chips and hummus. Known for their shawarma, chicken kabob, and filet mignon kabob. Fresh-baked bread daily.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    phone: "(718) 555-1601",
    hours: "Mon–Sun: 11am – 11pm",
    featured: true,
  },

  // ── REST OF LISTINGS ────────────────────────────────────────────────────────
  {
    id: "2",
    name: "Karachi Delight",
    borough: "Queens",
    cuisine: "Desi",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "73-10 37th Ave, Jackson Heights, NY 11372",
    description:
      "Authentic Pakistani cuisine with certified zabiha halal meat. Famous for biryani, nihari, and seekh kebabs.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
    phone: "(718) 555-0202",
    hours: "Mon–Sun: 11am – 10pm",
  },
  {
    id: "3",
    name: "Mamoun's Falafel",
    borough: "Manhattan",
    cuisine: "Middle Eastern",
    priceRange: "$",
    zabihaStatus: "yes",
    address: "119 Macdougal St, New York, NY 10012",
    description:
      "A Greenwich Village institution since 1971. Vegetarian-friendly with zabiha meat options. Cash only.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    phone: "(212) 555-0303",
    hours: "Mon–Sun: 11am – 3am",
  },
  {
    id: "4",
    name: "Crown Fried Chicken",
    borough: "Bronx",
    cuisine: "American",
    priceRange: "$",
    zabihaStatus: "unknown",
    address: "2301 Grand Concourse, Bronx, NY 10468",
    description:
      "Classic halal fried chicken spot. Halal-certified but zabiha status unconfirmed. Popular for combo meals and wings.",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&q=80",
    phone: "(718) 555-0404",
    hours: "Mon–Sun: 9am – 12am",
  },
  {
    id: "6",
    name: "Punjabi Grocery & Deli",
    borough: "Manhattan",
    cuisine: "Desi",
    priceRange: "$",
    zabihaStatus: "yes",
    address: "114 E 1st St, New York, NY 10009",
    description:
      "24-hour vegetarian deli beloved by cab drivers and night owls. Zabiha halal and vegetarian options only.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
    phone: "(212) 555-0606",
    hours: "Open 24 hours",
  },
  {
    id: "7",
    name: "Sahara Restaurant",
    borough: "Brooklyn",
    cuisine: "Middle Eastern",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "2337 Coney Island Ave, Brooklyn, NY 11223",
    description:
      "Family-owned Lebanese restaurant with zabiha halal certification. Excellent mezze platters and grilled lamb chops.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    phone: "(718) 555-0707",
    hours: "Mon–Sun: 12pm – 11pm",
  },
  {
    id: "8",
    name: "Habibi Egyptian Kitchen",
    borough: "Manhattan",
    cuisine: "Egyptian",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "35 W 46th St, New York, NY 10036",
    description:
      "Modern Egyptian street food in Midtown. Zabiha halal. Try the koshary or the hawawshi — both are exceptional.",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&q=80",
    phone: "(212) 555-0808",
    hours: "Mon–Fri: 11am – 9pm, Sat–Sun: 12pm – 8pm",
  },
  {
    id: "9",
    name: "Al-Rahma Diner",
    borough: "Bronx",
    cuisine: "American",
    priceRange: "$",
    zabihaStatus: "unknown",
    address: "1849 Westchester Ave, Bronx, NY 10472",
    description:
      "Halal diner with classic American breakfast and lunch. Zabiha status not confirmed. Affordable and filling.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
    phone: "(718) 555-0909",
    hours: "Mon–Sun: 7am – 8pm",
  },
  {
    id: "11",
    name: "Desi Village",
    borough: "Queens",
    cuisine: "Desi",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "150-01 Hillside Ave, Jamaica, NY 11432",
    description:
      "Upscale South Asian dining experience. Zabiha halal. Known for slow-cooked curries and their tandoor-fired breads.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    phone: "(718) 555-1101",
    hours: "Mon–Sun: 12pm – 11pm",
  },
  {
    id: "12",
    name: "Casa del Kebab",
    borough: "Brooklyn",
    cuisine: "Turkish",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "811 Atlantic Ave, Brooklyn, NY 11238",
    description:
      "Turkish kebab house with wood-fire grill. Zabiha halal. The Adana kebab and house-made pide bread are must-orders.",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
    phone: "(718) 555-1202",
    hours: "Mon–Sun: 11am – 11pm",
  },
  {
    id: "13",
    name: "Madina Grill",
    borough: "Staten Island",
    cuisine: "Middle Eastern",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "1278 Richmond Ave, Staten Island, NY 10314",
    description:
      "One of the few dedicated halal restaurants on Staten Island. Zabiha certified. Great family-style platters.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    phone: "(718) 555-1303",
    hours: "Mon–Sun: 12pm – 10pm",
  },
  {
    id: "14",
    name: "Spice Corner",
    borough: "Queens",
    cuisine: "Indian",
    priceRange: "$$$",
    zabihaStatus: "unknown",
    address: "45-47 74th St, Elmhurst, NY 11373",
    description:
      "Upscale Indian restaurant. Halal sign displayed but zabiha status is unverified. Great for special occasions.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
    phone: "(718) 555-1404",
    hours: "Mon–Sun: 1pm – 10pm",
  },
  {
    id: "15",
    name: "Moroccan Star",
    borough: "Brooklyn",
    cuisine: "Moroccan",
    priceRange: "$$$",
    zabihaStatus: "yes",
    address: "205 Atlantic Ave, Brooklyn, NY 11201",
    description:
      "Authentic Moroccan dining with zabiha halal certification. Try the lamb tagine or the couscous royale.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    phone: "(718) 555-1505",
    hours: "Mon–Sun: 5pm – 11pm",
  },

  // ── ASTORIA, QUEENS ─────────────────────────────────────────────────────────
  {
    id: "17",
    name: "Nur Thai Astoria",
    borough: "Queens",
    cuisine: "Thai",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "31-05 36th Ave, Astoria, NY 11106",
    description:
      "Named best halal restaurant in Queens by the Queens Chamber of Commerce. Fresh-butchered zabiha-certified meats, hand-crafted mocktails, and authentic Thai flavors you won't find anywhere else in the city.",
    image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&q=80",
    phone: "(718) 555-1701",
    hours: "Tue–Sun: 12pm – 10pm",
  },
  {
    id: "18",
    name: "Mr. Chang Halal Chinese",
    borough: "Queens",
    cuisine: "Chinese",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "25-45 Steinway St, Astoria, NY 11103",
    description:
      "Runner-up in the Queens halal restaurant competition. Halal Chinese fusion on Steinway Street — think lo mein, fried rice, and General Tso's chicken all prepared with zabiha certified meat.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    phone: "(718) 555-1801",
    hours: "Mon–Sun: 11am – 11pm",
  },
  {
    id: "19",
    name: "Dar Lbahja",
    borough: "Queens",
    cuisine: "Moroccan",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "25-62 Steinway St, Astoria, NY 11103",
    description:
      "Halal Moroccan restaurant on Steinway Street. Known for their merguez platter and zaalouk (eggplant dip). Warm, homey atmosphere with traditional décor.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    phone: "(718) 555-1901",
    hours: "Mon–Sun: 12pm – 11pm",
  },
  {
    id: "20",
    name: "Sami's Kebab House",
    borough: "Queens",
    cuisine: "Middle Eastern",
    priceRange: "$",
    zabihaStatus: "yes",
    address: "33-01 Broadway, Astoria, NY 11106",
    description:
      "Top-rated halal kebab spot in Astoria. No-frills, generous portions, and consistently excellent shawarma and falafel. A go-to for the local Muslim community.",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
    phone: "(718) 555-2001",
    hours: "Mon–Sun: 10am – 12am",
  },
  {
    id: "21",
    name: "Levant",
    borough: "Queens",
    cuisine: "Middle Eastern",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "29-11 24th Ave, Astoria, NY 11102",
    description:
      "Modern Levantine cuisine with a relaxed dining room vibe. Halal-certified. Best shawarma in Queens according to many regulars — forget halal carts, this is the real deal.",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&q=80",
    phone: "(718) 555-2101",
    hours: "Mon–Sun: 12pm – 11pm",
  },
  {
    id: "22",
    name: "Astoria BBQ",
    borough: "Queens",
    cuisine: "American BBQ",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "36-17 Ditmars Blvd, Astoria, NY 11105",
    description:
      "Halal American BBQ — smoked beef brisket, short ribs, honey wings, and classic sides like mac & cheese and coleslaw. Staff-confirmed halal. A unique concept that fills a real gap in NYC's halal scene.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    phone: "(718) 555-2201",
    hours: "Wed–Mon: 12pm – 10pm",
  },
  {
    id: "23",
    name: "Duzan",
    borough: "Queens",
    cuisine: "Middle Eastern",
    priceRange: "$$",
    zabihaStatus: "unknown",
    address: "31-20 Steinway St, Astoria, NY 11103",
    description:
      "Lively halal restaurant on Steinway Street with a KBBQ-style concept. Great music, welcoming atmosphere, and an interesting fusion menu. Zabiha status unconfirmed — verify directly.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    phone: "(718) 555-2301",
    hours: "Mon–Sun: 1pm – 12am",
  },
  {
    id: "24",
    name: "Darjeeling Kitchen & Café",
    borough: "Queens",
    cuisine: "Desi",
    priceRange: "$$",
    zabihaStatus: "yes",
    address: "35-13 31st Ave, Astoria, NY 11106",
    description:
      "Cozy South Asian café with halal-certified kitchen. Known for their Darjeeling-style teas, momos, and flavorful curries. A calm escape from the busy Steinway Street corridor.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    phone: "(718) 555-2401",
    hours: "Mon–Sun: 10am – 10pm",
  },
];

export const CUISINES = [
  "All",
  "Middle Eastern",
  "Desi",
  "American",
  "American BBQ",
  "Mediterranean",
  "Turkish",
  "Egyptian",
  "Indian",
  "Moroccan",
  "Chinese",
  "Thai",
];

export const BOROUGHS: (Borough | "All")[] = [
  "All",
  "Manhattan",
  "Queens",
  "Brooklyn",
  "Bronx",
  "Staten Island",
];
