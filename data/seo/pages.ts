/**
 * SEO for the static routes. Titles and descriptions come from each page's own data file
 * (data/<page>.ts › seo), so a page's words stay in one place.
 */
import { seo as systemsSeo } from "@/data/building-systems";
import { hero as contactHero, seo as contactSeo } from "@/data/contact";
import { seo as estimateSeo } from "@/data/estimate";
import { seo as homeSeoData } from "@/data/home";
import { hub, seo as hwbSeo } from "@/data/how-we-build";
import { catalog, seo as storeSeo } from "@/data/lighting-store";
import { index as projectsIndex, seo as projectsSeo } from "@/data/projects";
import { hero as teamHero, seo as teamSeo } from "@/data/team";
import { published } from "@/lib/projects";
import {
  businessRef,
  businessSchema,
  createNoIndexSeo,
  createPageSeo,
  type PageSeo,
  websiteSchema,
} from "./builders";

const home = { name: "Home", path: "/" };

export const homeSeo: PageSeo = createPageSeo({
  name: "AlephPros",
  title: homeSeoData.title,
  description: homeSeoData.description,
  path: "/",
  structuredData: [businessSchema(), websiteSchema()],
});

export const buildingSystemsSeo: PageSeo = createPageSeo({
  name: "Building systems",
  title: systemsSeo.title,
  description: systemsSeo.description,
  path: systemsSeo.path,
  pageType: "CollectionPage",
  breadcrumbs: [home, { name: "Building systems", path: systemsSeo.path }],
});

export const howWeBuildSeo: PageSeo = createPageSeo({
  name: hub.title,
  title: hwbSeo.title,
  description: hwbSeo.description,
  path: hwbSeo.path,
  pageType: "AboutPage",
  breadcrumbs: [home, { name: hub.title, path: hwbSeo.path }],
});

/** Indexed only once at least one project is published; until then the page is a placeholder. */
export const projectsSeoPage = (): PageSeo => {
  const o = {
    name: projectsIndex.title,
    title: projectsSeo.title,
    description: projectsSeo.description,
    path: projectsSeo.path,
    pageType: "CollectionPage",
    breadcrumbs: [home, { name: projectsIndex.title, path: projectsSeo.path }],
  };
  return published().length ? createPageSeo(o) : createNoIndexSeo(o);
};

export const lightingStoreSeo: PageSeo = createPageSeo({
  name: catalog.title,
  title: storeSeo.title,
  description: storeSeo.description,
  path: storeSeo.path,
  pageType: "CollectionPage",
  breadcrumbs: [home, { name: catalog.title, path: storeSeo.path }],
});

export const estimateSeoPage: PageSeo = createPageSeo({
  name: "Calculate your project",
  title: estimateSeo.title,
  description: estimateSeo.description,
  path: estimateSeo.path,
  breadcrumbs: [
    home,
    { name: "Calculate your project", path: estimateSeo.path },
  ],
});

export const contactSeoPage: PageSeo = createPageSeo({
  name: contactHero.title,
  title: contactSeo.title,
  description: contactSeo.description,
  path: contactSeo.path,
  pageType: "ContactPage",
  breadcrumbs: [home, { name: "Contact", path: contactSeo.path }],
  structuredData: [businessSchema()],
});

export const teamSeoPage: PageSeo = createPageSeo({
  name: teamHero.title,
  title: teamSeo.title,
  description: teamSeo.description,
  path: teamSeo.path,
  pageType: "AboutPage",
  breadcrumbs: [home, { name: teamHero.title, path: teamSeo.path }],
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      about: businessRef,
    },
  ],
});
