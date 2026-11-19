import type { Metadata } from "next";
import { site } from "@/lib/site";
import { abs, areaServed, ids, openingHours, sameAs, seoSite } from "./site";

export type JsonLd = Record<string, unknown>;

/** What every page gets: Next.js metadata plus the JSON-LD blocks to render (components/seo/JsonLd). */
export type PageSeo = {
  metadata: Metadata;
  jsonLd: JsonLd[];
  index: boolean;
  path: string;
};

export type Crumb = { name: string; path: string };

type Options = {
  /** Page name for structured data (usually the H1). */
  name: string;
  /** Full <title>. Keep it under ~60 characters. */
  title: string;
  /** Meta description. Clipped at 160 characters on a word boundary. */
  description: string;
  path: string;
  index?: boolean;
  follow?: boolean;
  /** schema.org page type: WebPage, CollectionPage, ContactPage, AboutPage, ItemPage… */
  pageType?: string;
  openGraphType?: "website" | "article";
  breadcrumbs?: Crumb[];
  /** Extra schema.org objects (Service, Product, the business…). */
  structuredData?: JsonLd[];
  /** Page-specific share image; otherwise the generated site card. */
  image?: { path: string; alt: string; width?: number; height?: number };
};

/** "Name | AlephPros" when it fits in 60 characters; otherwise the name alone (Google cuts ~60). */
export function fitTitle(name: string, suffix = " | AlephPros", max = 60) {
  return `${name}${suffix}`.length <= max ? `${name}${suffix}` : name;
}

/** Trim to 160 characters without cutting a word. */
export function clip(text: string, max = 160) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.–-]$/, "")}…`;
}

export const businessRef = { "@id": ids.business } as const;
export const websiteRef = { "@id": ids.website } as const;

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/**
 * The business itself (home and contact pages). Every fact comes from lib/site.ts, so it always
 * matches the footer and contact page. No ratings: none of the reviews are approved, and
 * self-published reviews aren't eligible for review stars anyway.
 */
export function businessSchema(): JsonLd {
  const lic = site.licenses[0];
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": ids.business,
    name: site.name,
    url: site.url,
    description: site.boilerplate,
    telephone: site.phone.href.replace("tel:", ""),
    image: abs(seoSite.ogImage.path),
    logo: abs(seoSite.ogImage.path),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: "US",
    },
    areaServed,
    openingHoursSpecification: openingHours,
    ...(lic
      ? {
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "license",
            name: `${lic.label} license ${lic.number}`,
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    name: site.name,
    url: site.url,
    inLanguage: seoSite.language,
    publisher: businessRef,
  };
}

/** A service AlephPros provides, as shown on a system, service, sub-service or city page. */
export function serviceSchema(o: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  area?: JsonLd[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: o.name,
    serviceType: o.serviceType ?? o.name,
    description: clip(o.description, 300),
    url: abs(o.path),
    provider: businessRef,
    areaServed: o.area ?? areaServed,
  };
}

export function createPageSeo(o: Options): PageSeo {
  const index = o.index ?? true;
  const follow = o.follow ?? index;
  const description = clip(o.description);
  const url = abs(o.path);
  const image = o.image ?? seoSite.ogImage;
  const images = [
    {
      url: abs(image.path),
      width: image.width,
      height: image.height,
      alt: image.alt,
    },
  ];

  if (process.env.NODE_ENV === "development" && o.title.length > 65) {
    console.warn(`[seo] title over 65 characters on ${o.path}: "${o.title}"`);
  }

  const metadata: Metadata = {
    title: { absolute: o.title },
    description,
    alternates: { canonical: o.path },
    robots: index
      ? {
          index: true,
          follow,
          googleBot: {
            index: true,
            follow,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow, googleBot: { index: false, follow } },
    openGraph: {
      type: o.openGraphType ?? "website",
      url,
      siteName: seoSite.name,
      locale: seoSite.locale,
      title: o.title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description,
      images,
    },
  };

  const page: JsonLd = {
    "@context": "https://schema.org",
    "@type": o.pageType ?? "WebPage",
    name: o.name,
    description,
    url,
    inLanguage: seoSite.language,
    isPartOf: websiteRef,
  };

  return {
    metadata,
    index,
    path: o.path,
    jsonLd: [
      page,
      ...(o.breadcrumbs?.length ? [breadcrumbSchema(o.breadcrumbs)] : []),
      ...(o.structuredData ?? []),
    ],
  };
}

/** Pages that need metadata but must stay out of search (placeholders, drafts, utility pages). */
export function createNoIndexSeo(
  o: Omit<Options, "index" | "follow"> & { follow?: boolean },
): PageSeo {
  return createPageSeo({
    ...o,
    index: false,
    follow: o.follow ?? true,
    structuredData: [],
  });
}
