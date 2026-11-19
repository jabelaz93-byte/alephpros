import type { MetadataRoute } from "next";
import { docs } from "@/data/legal";
import { disciplines } from "@/lib/howWeBuild";
import { products } from "@/lib/products";
import { published } from "@/lib/projects";
import {
  cityHref,
  disciplineHref,
  legalHref,
  productHref,
  projectHref,
  serviceHref,
  subHref,
  systemHref,
} from "@/lib/routes";
import { services } from "@/lib/services";
import { serviceAreas, site } from "@/lib/site";
import { systems } from "@/lib/systems";

/** Every public URL in docs/ARCHITECTURE.md. Unpublished projects are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/projects",
    "/building-systems",
    "/how-we-build",
    "/lighting-store",
    "/estimate",
    "/contact",
    "/team",
    ...published().map(projectHref),
    ...systems.map(systemHref),
    ...services.map(serviceHref),
    ...services.flatMap((s) => (s.subs ?? []).map((x) => subHref(s, x))),
    ...disciplines.map((d) => disciplineHref(d.slug)),
    ...products.map(productHref),
    ...serviceAreas.map(cityHref),
    ...docs.map((d) => legalHref(d.slug)),
  ];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}` }));
}
