/**
 * Lighting store catalog: fixtures only. Installation is the E-201 service (services.ts) and is
 * priced in the quote wizard, never here.
 * Lighting store catalog, taken from the current alephpros.com store.
 * Room / ceiling / style tags are a first pass from product names — check each one.
 * Images: drop photos into /public/images/products/<slug>.jpg and set `image`.
 */
export type Room =
  | "Hotels & commercial"
  | "Bedrooms"
  | "Hallways & corridors"
  | "Living rooms"
  | "Dining rooms";
export type Ceiling = "High ceilings" | "Standard ceilings" | "Low ceilings";
export type Style =
  | "Minimalist"
  | "Industrial"
  | "Modern"
  | "Luxury"
  | "Classic";
export type Category = "Chandeliers" | "Sconces" | "Ceiling fans";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  priceFrom: number;
  /** Set when on sale: the original price. */
  compareAt?: number;
  /** True when the price is fixed rather than "from". */
  fixedPrice?: boolean;
  rooms: Room[];
  ceilings: Ceiling[];
  styles: Style[];
  adjustable?: boolean;
  bestSeller?: boolean;
  image?: string;
  summary?: string;
  /** Project slug (projects.ts) where AlephPros installed this fixture. */
  installedIn?: string;
};

export const rooms: Room[] = [
  "Hotels & commercial",
  "Bedrooms",
  "Hallways & corridors",
  "Living rooms",
  "Dining rooms",
];
export const ceilings: Ceiling[] = [
  "High ceilings",
  "Standard ceilings",
  "Low ceilings",
];
export const styles: Style[] = [
  "Minimalist",
  "Industrial",
  "Modern",
  "Luxury",
  "Classic",
];
export const categories: Category[] = [
  "Chandeliers",
  "Sconces",
  "Ceiling fans",
];

export const products: Product[] = [
  {
    slug: "golden-era-grand-cascade-clear-crystal-chandelier",
    name: "Golden Era Grand Cascade Clear Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 2999,
    rooms: ["Hallways & corridors", "Living rooms", "Hotels & commercial"],
    ceilings: ["High ceilings"],
    styles: ["Luxury", "Modern"],
    adjustable: true,
    bestSeller: true,
    summary:
      "Seven cascading tiers of K9 crystal on a gold-finished steel frame.",
    installedIn: "grand-cascade-chandelier",
  },
  {
    slug: "golden-era-grand-cascade-fish-scale-crystal-chandelier",
    name: "Golden Era Grand Cascade Fish Scale Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 2699,
    rooms: ["Hallways & corridors", "Living rooms"],
    ceilings: ["High ceilings"],
    styles: ["Luxury", "Modern"],
    adjustable: true,
  },
  {
    slug: "3-layers-extra-large-luxury-crystal-chandelier",
    name: "3 Layers Extra Large Luxury Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 2799,
    rooms: ["Living rooms", "Dining rooms"],
    ceilings: ["High ceilings", "Standard ceilings"],
    styles: ["Luxury"],
  },
  {
    slug: "extra-large-retro-luxury-full-copper-crystal-chandelier",
    name: "Extra Large Retro Luxury Full Copper Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 2749,
    rooms: ["Living rooms", "Dining rooms"],
    ceilings: ["High ceilings"],
    styles: ["Classic", "Luxury"],
  },
  {
    slug: "luxury-spiral-crystal-chandelier",
    name: "Luxury Spiral Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 3198,
    rooms: ["Hallways & corridors", "Hotels & commercial"],
    ceilings: ["High ceilings"],
    styles: ["Modern", "Luxury"],
    bestSeller: true,
  },
  {
    slug: "extra-large-brass-tree-branch-led-chandelier",
    name: "Extra Large Brass Tree Branch LED Chandelier with Crystal Bar Drops",
    category: "Chandeliers",
    priceFrom: 2799,
    rooms: ["Dining rooms", "Living rooms"],
    ceilings: ["Standard ceilings", "High ceilings"],
    styles: ["Modern"],
  },
  {
    slug: "colored-glaze-flower-crystal-chandelier-brass-tree-branch",
    name: "Colored Glaze Flower Crystal Chandelier, Brass Tree Branch",
    category: "Chandeliers",
    priceFrom: 2888,
    fixedPrice: true,
    rooms: ["Dining rooms", "Bedrooms"],
    ceilings: ["Standard ceilings"],
    styles: ["Modern"],
  },
  {
    slug: "luxury-royal-large-multi-layers-candle-crystal-chandelier",
    name: "Luxury Royal Large Multi-layer Candle Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 3659,
    rooms: ["Hallways & corridors", "Hotels & commercial"],
    ceilings: ["High ceilings"],
    styles: ["Classic", "Luxury"],
  },
  {
    slug: "extra-large-european-style-multi-layers-candle-crystal-chandelier",
    name: "Extra Large European-style Multi-layer Candle Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 5099,
    rooms: ["Hotels & commercial", "Hallways & corridors"],
    ceilings: ["High ceilings"],
    styles: ["Classic", "Luxury"],
  },
  {
    slug: "oversized-multi-layers-honeycomb-crystal-chandelier",
    name: "Oversized Multi-layer Honeycomb Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 2899,
    rooms: ["Living rooms", "Hotels & commercial"],
    ceilings: ["High ceilings"],
    styles: ["Modern", "Luxury"],
  },
  {
    slug: "luxury-extra-large-plaza-multi-tier-crystal-chandelier",
    name: "Luxury Extra Large Plaza Multi-tier Crystal Chandelier",
    category: "Chandeliers",
    priceFrom: 2598,
    rooms: ["Hotels & commercial", "Hallways & corridors"],
    ceilings: ["High ceilings"],
    styles: ["Luxury"],
  },
  {
    slug: "oversized-honeycomb-crystal-chandelier-foyer",
    name: "Oversized Honeycomb Crystal Chandelier for Foyers & Entryways",
    category: "Chandeliers",
    priceFrom: 2725,
    compareAt: 2985,
    fixedPrice: true,
    rooms: ["Hallways & corridors"],
    ceilings: ["High ceilings"],
    styles: ["Modern", "Luxury"],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
