/**
 * Every URL on the site is built here, so a slug change happens in one file.
 * The tree is documented in docs/ARCHITECTURE.md.
 */
import type { Product } from "./products";
import { type Project, projects } from "./projects";
import {
  getServiceByCode,
  type Service,
  type SubService,
  services,
} from "./services";
import { serviceAreas } from "./site";
import { type BuildingSystem, getSystem } from "./systems";
import { slugify } from "./util";

export const systemHref = (s: Pick<BuildingSystem, "slug">) =>
  `/building-systems/${s.slug}`;
export const serviceHref = (s: Pick<Service, "slug">) => `/services/${s.slug}`;
export const subHref = (
  s: Pick<Service, "slug">,
  x: Pick<SubService, "slug">,
) => `/services/${s.slug}/${x.slug}`;
export const projectHref = (p: Pick<Project, "slug">) => `/projects/${p.slug}`;
export const productHref = (p: Pick<Product, "slug">) =>
  `/lighting-store/${p.slug}`;
export const disciplineHref = (slug: string) => `/how-we-build/${slug}`;
export const cityHref = (city: string) => `/service-areas/${slugify(city)}`;
export const legalHref = (doc: string) => `/legal/${doc}`;
export const estimateHref = (code?: string) =>
  code ? `/estimate?service=${code}` : "/estimate";

export const cityFromSlug = (slug: string) =>
  serviceAreas.find((c) => slugify(c) === slug);

/** Name and URL for any service or sub-service code ("E-201", "I-202"). */
export function codeLink(
  code: string,
): { code: string; label: string; href: string } | undefined {
  const top = getServiceByCode(code);
  if (top) return { code, label: top.name, href: serviceHref(top) };
  for (const s of services) {
    const x = s.subs?.find((x) => x.code === code);
    if (x) return { code, label: x.name, href: subHref(s, x) };
  }
  return undefined;
}

/** The building system a service code belongs to (its first letter). */
export const systemOfCode = (code: string) =>
  getSystem(code[0] as BuildingSystem["code"]);

/** Link for a photo's case study: only when that project exists and is published. */
export const caseStudyHref = (slug?: string) => {
  const p = slug
    ? projects.find((x) => x.slug === slug && x.publish)
    : undefined;
  return p ? projectHref(p) : undefined;
};
