/**
 * Service-area pages (/service-areas/[city]). The city list is in lib/site.ts (serviceAreas).
 * {city} and {service} are replaced per page.
 *
 * Each city leads with a different featured service so the 13 pages don't read as copies of
 * one template (Google treats near-identical city pages as doorway pages). The copy only says
 * what the owner has confirmed: AlephPros has done lighting and remodeling work across DFW,
 * Prosper to Wylie. It never claims a specific job in a city; case studies don't name a city,
 * and the "recent work" on these pages is labelled by service, not by place.
 */
import type { ServiceAreaCity } from "@/lib/site";
import { cta } from "./shared";

export const slugFor = (city: string) =>
  city.toLowerCase().replace(/\s+/g, "-");

/** Featured service per city: a service or sub-service code from lib/services.ts. */
export const featured: Record<ServiceAreaCity, string> = {
  Prosper: "E-201", // Chandelier installation
  Plano: "A-104", // Whole-home renovation
  Frisco: "A-102", // Kitchen remodeling
  McKinney: "A-101", // Remodeling & renovation (home office city)
  Allen: "A-103", // Bathroom remodeling
  Dallas: "E-101", // Architectural lighting
  Richardson: "I-102", // Interior painting
  Garland: "I-201", // Tile & flooring
  Carrollton: "E-102", // Permanent outdoor lighting
  Addison: "I-103", // Exterior painting
  Murphy: "E-103", // Recessed lighting
  Parker: "P-101", // Plumbing
  Wylie: "I-205", // Showers & backsplashes
};

export const template = {
  title: "Construction & remodeling in {city}, TX",
  /** Meta description: leads with the featured service so each city's snippet differs. */
  description:
    "{service} and every other remodeling, lighting, electrical, plumbing and finish job in {city}, TX. Priced in writing, built to schedule.",
  lead: "We plan, build and finish homes in {city} and across Dallas–Fort Worth with one team, one schedule and one price.",
  /** Confirmed by the owner (Nov 2026): jobs across DFW, Prosper to Wylie. */
  worked:
    "AlephPros crews work across {city} and the rest of Dallas–Fort Worth, from Prosper down to Wylie: lighting and chandeliers, whole-home remodels, kitchens, baths, paint and tile.",
  featuredEyebrow: "Featured in {city}",
  recentWork: "Recent {service} work",
  systemsTitle: "Everything we build in {city}",
  systemsLead:
    "Every service belongs to one of five building systems. All of them are available in {city}.",
  nearby: "Nearby cities",
  action: cta.calculate,
};

export const fill = (
  text: string,
  city: string,
  extra: Record<string, string> = {},
) =>
  Object.entries({ city, ...extra }).reduce(
    (t, [k, v]) => t.replaceAll(`{${k}}`, v),
    text,
  );
