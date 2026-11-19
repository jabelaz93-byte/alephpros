/**
 * SEO for the dynamic routes. One factory per route template (like mrdn.digital › templates/).
 * Breadcrumbs match the trail shown on each page.
 */
import {
  systemPages,
  index as systemsIndex,
  seo as systemsSeo,
} from "@/data/building-systems";
import { hub, seo as hwbSeo } from "@/data/how-we-build";
import { docs } from "@/data/legal";
import { catalog, seo as storeSeo } from "@/data/lighting-store";
import { index as projectsIndex, seo as projectsSeo } from "@/data/projects";
import { template as cityT, featured, fill } from "@/data/service-areas";
import type { Discipline } from "@/lib/howWeBuild";
import type { Product } from "@/lib/products";
import { coverPhoto, type Project } from "@/lib/projects";
import {
  cityHref,
  codeLink,
  disciplineHref,
  legalHref,
  productHref,
  projectHref,
  serviceHref,
  subHref,
  systemHref,
} from "@/lib/routes";
import type { Service, SubService } from "@/lib/services";
import type { ServiceAreaCity } from "@/lib/site";
import { type BuildingSystem, getSystem } from "@/lib/systems";
import {
  businessRef,
  clip,
  createNoIndexSeo,
  createPageSeo,
  fitTitle,
  type JsonLd,
  type PageSeo,
  serviceSchema,
} from "./builders";
import { abs } from "./site";

const home = { name: "Home", path: "/" };
const systemsCrumb = { name: systemsIndex.title, path: systemsSeo.path };
const DFW = "Dallas–Fort Worth";

export function systemSeo(sys: BuildingSystem): PageSeo {
  const path = systemHref(sys);
  const description = systemPages[sys.code].seoDescription;
  return createPageSeo({
    name: sys.name,
    title: `${sys.name} | AlephPros`,
    description,
    path,
    pageType: "CollectionPage",
    breadcrumbs: [home, systemsCrumb, { name: sys.name, path }],
    structuredData: [
      serviceSchema({ name: sys.name, description: sys.lead, path }),
    ],
  });
}

export function serviceSeo(s: Service): PageSeo {
  const path = serviceHref(s);
  const sys = getSystem(s.system);
  return createPageSeo({
    name: s.name,
    title: `${s.name} in ${DFW} | AlephPros`,
    description: s.lead,
    path,
    breadcrumbs: [
      home,
      systemsCrumb,
      { name: sys.short, path: systemHref(sys) },
      { name: s.name, path },
    ],
    structuredData: [
      serviceSchema({
        name: s.name,
        description: s.lead,
        path,
        serviceType: sys.name,
      }),
    ],
  });
}

export function subSeo(s: Service, x: SubService): PageSeo {
  const path = subHref(s, x);
  const sys = getSystem(s.system);
  return createPageSeo({
    name: x.name,
    title: `${x.name} in ${DFW} | AlephPros`,
    description: x.lead,
    path,
    breadcrumbs: [
      home,
      systemsCrumb,
      { name: sys.short, path: systemHref(sys) },
      { name: s.name, path: serviceHref(s) },
      { name: x.name, path },
    ],
    structuredData: [
      serviceSchema({
        name: x.name,
        description: x.lead,
        path,
        serviceType: s.name,
      }),
    ],
  });
}

/** Case study. Indexed only when published; never names a place the project doesn't. */
export function projectSeo(p: Project): PageSeo {
  const path = projectHref(p);
  const cover = coverPhoto(p);
  const o = {
    name: p.name,
    title: `${p.name} | AlephPros projects`,
    description: p.summary,
    path,
    openGraphType: "article" as const,
    image: cover ? { path: cover.src, alt: cover.alt } : undefined,
    breadcrumbs: [
      home,
      { name: projectsIndex.title, path: projectsSeo.path },
      { name: p.name, path },
    ],
  };
  if (!p.publish) return createNoIndexSeo(o);
  const service = codeLink(p.services[0]);
  return createPageSeo({
    ...o,
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: p.name,
        description: clip(p.summary, 300),
        url: abs(path),
        creator: businessRef,
        dateCreated: p.completed,
        ...(cover ? { image: abs(cover.src) } : {}),
        ...(service
          ? {
              about: {
                "@type": "Service",
                name: service.label,
                url: abs(service.href),
              },
            }
          : {}),
      },
    ],
  });
}

/** Store fixture. Price is "from" unless the product says it's fixed. */
export function productSeo(p: Product): PageSeo {
  const path = productHref(p);
  const description = `${p.summary ?? p.name} Supplied and installed by AlephPros licensed electricians on a mount rated for its weight.`;
  const offer: JsonLd =
    p.fixedPrice || p.compareAt
      ? {
          "@type": "Offer",
          price: p.priceFrom,
          priceCurrency: "USD",
          url: abs(path),
          seller: businessRef,
        }
      : {
          "@type": "AggregateOffer",
          lowPrice: p.priceFrom,
          priceCurrency: "USD",
          offerCount: 1,
          url: abs(path),
          seller: businessRef,
        };
  return createPageSeo({
    name: p.name,
    title: fitTitle(p.name),
    description,
    path,
    pageType: "ItemPage",
    image: p.image ? { path: p.image, alt: p.name } : undefined,
    breadcrumbs: [
      home,
      { name: catalog.title, path: storeSeo.path },
      { name: p.name, path },
    ],
    structuredData: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: clip(description, 300),
        category: p.category,
        url: abs(path),
        ...(p.image ? { image: abs(p.image) } : {}),
        offers: offer,
      },
    ],
  });
}

export function disciplineSeo(d: Discipline): PageSeo {
  const path = disciplineHref(d.slug);
  return createPageSeo({
    name: d.name,
    title: `${d.name} | How AlephPros builds`,
    description: d.lead,
    path,
    pageType: "AboutPage",
    breadcrumbs: [
      home,
      { name: hub.title, path: hwbSeo.path },
      { name: d.name, path },
    ],
  });
}

/** City page: leads with that city's featured service (data/service-areas.ts › featured). */
export function citySeo(city: ServiceAreaCity): PageSeo {
  const path = cityHref(city);
  const service = codeLink(featured[city]);
  const serviceName = service?.label ?? "Remodeling";
  const place = {
    "@type": "City",
    name: city,
    containedInPlace: { "@type": "State", name: "Texas" },
  };
  return createPageSeo({
    name: fill(cityT.title, city),
    title: `${fill(cityT.title, city)} | AlephPros`,
    description: fill(cityT.description, city, { service: serviceName }),
    path,
    breadcrumbs: [home, { name: city, path }],
    structuredData: [
      serviceSchema({
        name: `${serviceName} in ${city}, TX`,
        description: fill(cityT.lead, city),
        path,
        serviceType: serviceName,
        area: [place],
      }),
    ],
  });
}

/** Legal documents stay noindex until their text is written (data/legal.ts). */
export function legalSeo(slug: string): PageSeo | undefined {
  const d = docs.find((x) => x.slug === slug);
  if (!d) return undefined;
  const path = legalHref(d.slug);
  const o = {
    name: d.title,
    title: `${d.title} | AlephPros`,
    description: `${d.title} of AlephPros (alephpros.com): how we handle the information you send us and the terms for using this website.`,
    path,
    breadcrumbs: [home, { name: d.title, path }],
  };
  return d.sections.length ? createPageSeo(o) : createNoIndexSeo(o);
}
