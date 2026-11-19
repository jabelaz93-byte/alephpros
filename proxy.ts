import { type NextRequest, NextResponse } from "next/server";
import { docs } from "@/data/legal";
import { disciplines } from "@/lib/howWeBuild";
import { products } from "@/lib/products";
import { projects } from "@/lib/projects";
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
import { serviceAreas } from "@/lib/site";
import { systems } from "@/lib/systems";

/**
 * Real 404 status for unknown slugs.
 *
 * With Cache Components the page shell starts streaming before a slug page can call notFound(),
 * so an unknown slug would answer "200 + noindex" (a soft 404). This checks slug URLs against the
 * registries in lib/ first and serves the site's 404 page with status 404 when the slug doesn't
 * exist. Pure data only: no state is kept here.
 */
const dev = process.env.NODE_ENV === "development";

const known = new Set<string>([
  ...systems.map(systemHref),
  ...services.map(serviceHref),
  ...services.flatMap((s) => (s.subs ?? []).map((x) => subHref(s, x))),
  ...projects.filter((p) => p.publish || dev).map(projectHref),
  ...products.map(productHref),
  ...disciplines.map((d) => disciplineHref(d.slug)),
  ...serviceAreas.map(cityHref),
  ...docs.map((d) => legalHref(d.slug)),
]);

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, "");
  if (known.has(path)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", request.url), {
    status: 404,
  });
}

export const config = {
  // Only the slug routes; index pages (/projects, /services → redirect, …) are not matched.
  matcher: [
    "/building-systems/:slug+",
    "/services/:slug+",
    "/projects/:slug+",
    "/lighting-store/:slug+",
    "/how-we-build/:slug+",
    "/service-areas/:slug+",
    "/legal/:slug*",
  ],
};
