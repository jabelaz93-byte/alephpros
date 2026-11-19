/**
 * Every URL on the site with its SEO, its index flag and a last-modified date.
 * app/sitemap.ts lists only the indexable ones. When you change a page's content, update its
 * date here (or the project's `completed` month): the sitemap only claims real changes.
 */
import { docs } from "@/data/legal";
import { disciplines } from "@/lib/howWeBuild";
import { products } from "@/lib/products";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { serviceAreas } from "@/lib/site";
import { systems } from "@/lib/systems";
import type { PageSeo } from "./builders";
import {
  buildingSystemsSeo,
  contactSeoPage,
  estimateSeoPage,
  homeSeo,
  howWeBuildSeo,
  lightingStoreSeo,
  projectsSeoPage,
  teamSeoPage,
} from "./pages";
import {
  citySeo,
  disciplineSeo,
  legalSeo,
  productSeo,
  projectSeo,
  serviceSeo,
  subSeo,
  systemSeo,
} from "./templates";

/** Date the current content was last reviewed (YYYY-MM-DD). Bump per page when it changes. */
const CONTENT = "2026-11-19";

export type RegistryEntry = { seo: PageSeo; lastModified: string };

export function registry(): RegistryEntry[] {
  const at = (seo: PageSeo, lastModified = CONTENT): RegistryEntry => ({
    seo,
    lastModified,
  });
  return [
    at(homeSeo),
    at(buildingSystemsSeo),
    ...systems.map((s) => at(systemSeo(s))),
    ...services.map((s) => at(serviceSeo(s))),
    ...services.flatMap((s) => (s.subs ?? []).map((x) => at(subSeo(s, x)))),
    at(projectsSeoPage()),
    // A project's own date is the month it was finished.
    ...projects.map((p) => at(projectSeo(p), `${p.completed}-01`)),
    at(howWeBuildSeo),
    ...disciplines.map((d) => at(disciplineSeo(d))),
    at(lightingStoreSeo),
    ...products.map((p) => at(productSeo(p))),
    at(estimateSeoPage),
    at(contactSeoPage),
    at(teamSeoPage),
    ...serviceAreas.map((c) => at(citySeo(c))),
    ...docs
      .map((d) => legalSeo(d.slug))
      .filter((s) => s !== undefined)
      .map((s) => at(s)),
  ];
}
