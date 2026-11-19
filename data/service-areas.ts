/**
 * Service-area pages (/service-areas/[city]). The city list is in lib/site.ts (serviceAreas).
 * Wording is a template: {city} is replaced per page.
 */
import { cta } from "./shared";

export const slugFor = (city: string) =>
  city.toLowerCase().replace(/\s+/g, "-");

export const template = {
  title: "Construction & remodeling in {city}, TX",
  description:
    "Kitchen and bath remodels, renovations, lighting, electrical, plumbing and finishes in {city}, TX. Priced in writing, built to schedule.",
  lead: "We plan, build and finish homes in {city} and across Dallas–Fort Worth with one team, one schedule and one price.",
  systemsTitle: "What we build in {city}",
  projectsTitle: "Projects near {city}",
  nearby: "Nearby cities",
  action: cta.calculate,
};

export const fill = (text: string, city: string) =>
  text.replaceAll("{city}", city);
