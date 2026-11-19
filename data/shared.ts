/**
 * Content shared by every page: header links, the CTA vocabulary and the footer.
 * Source: AlephPros premium copy deck, "Shared components", and the v4 home design.
 */
import type { Metadata } from "next";
import { serviceAreas, site } from "@/lib/site";
import type { Cta, Seo } from "./types";

/**
 * The only button labels the site uses (copy deck, "CTA vocabulary").
 * Never: Get started, Learn more, Submit, Explore, Contact us today.
 */
export const cta = {
  calculate: { label: "Calculate your project", href: "/estimate" },
  visit: { label: "Request a site visit", href: "/contact#site-visit" },
  quoteLike: "Get a quote like this",
  send: "Send message",
  addToQuote: "Add to quote",
  /** "Calculate your chandelier project" etc. */
  calculateFor: (word: string) => `Calculate your ${word} project`,
} as const;

export const results = {
  quote: "Your quote is ready",
  visit: "Visit requested. We'll call to confirm.",
  message: "Message sent. We'll reply within one business day.",
  added: "Added to your quote",
} as const;

/** Inline links in the desktop header (v4 design). The full menu is the left Drawer. */
/** Label on the mobile menu button (desktop shows the icon only). */
export const menuLabel = "Menu";

export const headerLinks: Cta[] = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/building-systems" },
  { label: "Painting", href: "/services/painting" },
  { label: "Lighting", href: "/services/architectural-lighting" },
  { label: "Store", href: "/lighting-store" },
  { label: "Team", href: "/team" },
];

export const footer = {
  blurb:
    "Full-service remodeling and electrical solutions for homes, businesses, and investment properties.",
  contact: [
    { label: site.phone.display, href: site.phone.href },
    { label: "WhatsApp", href: site.whatsapp },
  ],
  columns: [
    {
      title: "Architectural",
      links: [
        {
          label: "Construction & renovations",
          href: "/services/remodeling-renovation",
        },
      ],
    },
    {
      title: "Interiors & finishes",
      links: [
        { label: "Painting", href: "/services/painting" },
        { label: "Tile, flooring & finishes", href: "/services/tile-flooring" },
      ],
    },
    {
      title: "Electrical & lighting",
      links: [
        {
          label: "Architectural lighting",
          href: "/services/architectural-lighting",
        },
        {
          label: "Chandeliers & fixtures",
          href: "/services/chandelier-installation",
        },
        {
          label: "Electrical & smart systems",
          href: "/services/power-smart-systems",
        },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Plumbing & water systems", href: "/services/plumbing" },
        { label: "Property management", href: "/services/property-management" },
        { label: "Team", href: "/team" },
        { label: "Lighting store", href: "/lighting-store" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ] satisfies { title: string; links: Cta[] }[],
  serviceAreas: { title: "Service areas", cities: serviceAreas },
  legal: [
    { label: "Facebook", href: site.social.facebook },
    { label: "Instagram", href: site.social.instagram },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ] satisfies Cta[],
  rights: "© 2026 AlephPros. All rights reserved.",
  /** Mobile footer: one short link list instead of the columns. */
  mobileLinks: [
    { label: "Projects", href: "/projects" },
    { label: "Building systems", href: "/building-systems" },
    { label: "How we build", href: "/how-we-build" },
    { label: "Store", href: "/lighting-store" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/legal/privacy" },
  ] satisfies Cta[],
  /** Short hours line for the mobile contact cell. */
  hoursShort: "Mon–Sat",
} as const;

/** Closing yellow band used at the end of every page (components/home/ClosingBand). */
export const band = (title: string, action: Cta = cta.calculate) => ({
  title,
  action,
  call: {
    label: `Or call ${site.phone.display}`,
    href: site.phone.href,
  } satisfies Cta,
});

/** Closing band heading on inner pages (copy deck, "Closing CTA band"). */
export const closingTitle = "Start with a number.";

/** Page metadata from a page's `seo` block. */
export const metaFor = (seo: Seo): Metadata => ({
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: seo.path },
});
