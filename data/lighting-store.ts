/**
 * Lighting store: the catalog (/lighting-store) and each product (/lighting-store/[slug]).
 * Products, rooms, ceilings, styles and categories are in lib/products.ts.
 */
import { cta } from "./shared";
import type { Seo } from "./types";

export const seo: Seo = {
  title: "Lighting Store | AlephPros",
  description:
    "Chandeliers, sconces and ceiling fans, supplied and installed by licensed electricians on mounts rated for their weight.",
  path: "/lighting-store",
};

export const catalog = {
  title: "Lighting store",
  lead: "Choose from our catalog and we'll install it, or bring your own. Every fixture is installed on a mount rated for its weight.",
  filters: {
    category: "Fixture",
    room: "Room",
    ceiling: "Ceiling",
    style: "Style",
    clear: "Clear filters",
  },
  empty: "No fixtures match these filters.",
};

export const product = {
  specs: "Specifications",
  install: "Installation",
  installNote:
    "Installed by a licensed electrician on a mount rated for the fixture's weight.",
  action: cta.addToQuote,
  calculate: {
    label: cta.calculateFor("chandelier"),
    href: "/estimate?service=E-201",
  },
  related: "Other fixtures",
};
