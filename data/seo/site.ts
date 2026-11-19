/**
 * Site-wide SEO defaults. Same strategy as mrdn.digital (src/data/seo): one folder is the
 * single source of truth for everything search engines and social cards read.
 *
 *   site.ts      defaults, the production host, the business facts used in structured data
 *   builders.ts  createPageSeo(): metadata + JSON-LD for one page; schema helpers
 *   pages.ts     SEO for each static route (words come from that page's data/<page>.ts)
 *   templates.ts SEO for each dynamic route (systems, services, projects, products, cities…)
 *   registry.ts  every URL with its index flag and last-modified date → sitemap + checks
 *
 * Rules (from mrdn.digital):
 * 1. Descriptions and structured data must match the visible page. Never add services,
 *    claims, locations, reviews or ratings the page doesn't show.
 * 2. Pages without real content stay noindex until they have it (registry decides).
 */
import { serviceAreas, site } from "@/lib/site";

export const seoSite = {
  name: site.name,
  url: site.url,
  locale: "en_US",
  language: "en-US",
  defaultTitle: "AlephPros | Construction & Remodeling in Dallas–Fort Worth",
  defaultDescription: site.description,
  /** Set GOOGLE_SITE_VERIFICATION in Vercel once Search Console gives you the code. */
  googleVerification: process.env.GOOGLE_SITE_VERIFICATION,
  /** Generated share card (app/opengraph-image.tsx). */
  ogImage: {
    path: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "AlephPros, construction and remodeling in Dallas–Fort Worth",
  },
} as const;

/** Absolute URL on the production host. */
export const abs = (path: string) => new URL(path, `${site.url}/`).toString();

/** Stable @id values so every page's JSON-LD points at the same business and website. */
export const ids = {
  business: `${site.url}/#business`,
  website: `${site.url}/#website`,
} as const;

/** The cities AlephPros serves, as schema.org places. */
export const areaServed = serviceAreas.map((name) => ({
  "@type": "City",
  name,
  containedInPlace: { "@type": "State", name: "Texas" },
}));

const DAY: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};
const ORDER = Object.keys(DAY);

/** "8:00 am" → "08:00". Throws on anything else so a typo in lib/site.ts fails the build. */
function to24(t: string) {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!m) throw new Error(`lib/site.ts hours: can't read time "${t}"`);
  let h = Number(m[1]) % 12;
  if (m[3].toLowerCase() === "pm") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

/** Opening hours from lib/site.ts (e.g. "Mon–Fri", "8:00 am – 6:00 pm"), as schema.org specs. */
export const openingHours = site.hours.map((h) => {
  const [a, b] = h.days.split(/[–-]/).map((d) => d.trim());
  const from = ORDER.indexOf(a);
  const to = b ? ORDER.indexOf(b) : from;
  if (from < 0 || to < 0)
    throw new Error(`lib/site.ts hours: can't read days "${h.days}"`);
  const [opens, closes] = h.time.split(/[–-]/).map(to24);
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ORDER.slice(from, to + 1).map((d) => DAY[d]),
    opens,
    closes,
  };
});

/** Social profiles, only once they're real (lib/site.ts still has placeholder roots). */
export const sameAs = Object.values(site.social).filter(
  (u) => !/\.com\/?$/.test(u),
);
