/**
 * Services: the index (/services), each service (/services/[slug]) and each sub-service
 * (/services/[slug]/[sub]). Service names, leads, offerings and form options live in
 * lib/services.ts; this file holds the page words around them.
 */
import { cta } from "./shared";
import type { Seo } from "./types";

export const seo: Seo = {
  title: "Services | AlephPros",
  description:
    "Every AlephPros service, filed by building system: remodeling, painting, tile and flooring, lighting, electrical, plumbing and property operations.",
  path: "/services",
};

export const index = {
  title: "Services",
  lead: "Every service belongs to one of five building systems, coded like a construction drawing set.",
};

/** Labels used by the service and sub-service templates. */
export const labels = {
  includes: "What's included",
  offerings: "What we do",
  related: "Related services",
  pricedOnline: "Priced online in about two minutes.",
  pricedOnSite: "Priced after a site visit.",
  storeLink: { label: "Browse the lighting store", href: "/lighting-store" },
  formFields: ["Name", "Email", "Phone", "Property address"],
  actionOnline: cta.calculate,
  actionOnSite: cta.visit,
};

/** Teen program line on the skilled-trade training page (sub-service `extra: "teens"`). */
export const teens = {
  // TODO: placeholder; the copy deck asks for one line here but doesn't supply it.
  body: "A program for high-school students who want to try the trades before choosing one.",
  link: {
    label: "Teen program",
    href: "/services/skilled-trade-training/teens",
  },
};

/** More labels for the service and sub-service pages. */
export const pageLabels = {
  priceNow: "Price it now",
  priceNowLead:
    "Answer a few questions for a planning range. We confirm it after measuring on site.",
  subs: (name: string) => `${name}: services`,
  siblings: (name: string) => `More in ${name}`,
  projects: "Projects with this service",
  facts: { system: "Building system", code: "Sheet code", pricing: "Pricing" },
  teens: {
    title: "Teen program",
    ages: "Ages",
    length: "Length",
    cohorts: "Start dates",
    pricing: "Pricing",
    note: "Dates and prices are confirmed each season.",
  },
};
