/**
 * The five building systems. Every service, project, person and testimonial is filed under one
 * of these codes. Names here are the only names used on the site, in the menu and in admin.
 * Source: AlephPros premium copy deck, "Building systems overview".
 */
export type SystemCode = "A" | "I" | "E" | "P" | "G";

export type BuildingSystem = {
  code: SystemCode;
  slug: string;
  /** Full name, used as the page title. */
  name: string;
  /** Short name, used in the menu and in tight spaces. */
  short: string;
  /** One line for indexes. */
  line: string;
  /** Page subhead: what we deliver and for whom. */
  lead: string;
};

export const systems: BuildingSystem[] = [
  {
    code: "A",
    slug: "structural-building",
    name: "Structural & building systems",
    short: "Structural & building",
    line: "Remodels, renovations and structural work, sequenced and permitted.",
    lead: "We remodel kitchens, baths and whole homes across Dallas–Fort Worth, sequencing every trade and permit so your home stays livable while the work gets done.",
  },
  {
    code: "I",
    slug: "surface",
    name: "Surface systems",
    short: "Surface systems",
    line: "Paint, tile, stone, vinyl and hardwood on surfaces prepared to last.",
    lead: "We paint interiors and exteriors and install tile, stone, vinyl and hardwood, preparing every surface underneath so the finish lasts as long as the house.",
  },
  {
    code: "E",
    slug: "electrical-smart",
    name: "Electrical & smart systems",
    short: "Electrical & smart",
    line: "Lighting, chandeliers, panels, EV charging, backup power and smart controls.",
    lead: "Licensed electricians design, install and upgrade the power, lighting and controls that run your home, from a single chandelier to a whole-house generator.",
  },
  {
    code: "P",
    slug: "plumbing-water",
    name: "Plumbing & water systems",
    short: "Plumbing & water",
    line: "Repiping, drains, water heaters and filtration, diagnosed before they fail.",
    lead: "Plumbers repipe, repair and maintain the water, drain and sewer systems inside your walls, and find problems before they become emergencies.",
  },
  {
    code: "G",
    slug: "property-operations",
    name: "Property & operations",
    short: "Property & operations",
    line: "Maintenance, rentals and training for owners of more than one property.",
    lead: "For owners of rental homes, multifamily buildings and portfolios, we maintain the properties, supply the equipment and train the tradespeople that keep them running.",
  },
];

/** Every SystemCode has an entry above, so this always finds one; it throws if the list and the type drift apart. */
export const getSystem = (code: SystemCode): BuildingSystem => {
  const found = systems.find((s) => s.code === code);
  if (!found) throw new Error(`Unknown building system ${code}`);
  return found;
};
export const getSystemBySlug = (slug: string) =>
  systems.find((s) => s.slug === slug);
