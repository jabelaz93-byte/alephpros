/**
 * Left menu (the Drawer) and its search. Built from the data files, so the menu always matches
 * the pages: a new building system, discipline or service shows up in the menu and its search
 * as soon as it is added to systems.ts, howWeBuild.ts or services.ts.
 *
 * Same shape as the BOAZ Labs site: sections → items → optional children.
 */
import type { IconName } from "@/components/ui/Icon";
import { disciplines } from "./howWeBuild";
import { products } from "./products";
import { published } from "./projects";
import { services } from "./services";
import { site } from "./site";
import { systems } from "./systems";

export type NavLink = {
  label: string;
  href: string;
  /** Sheet code shown as a small badge, e.g. "E" or "E-201". */
  code?: string;
};

export type NavItem = {
  label: string;
  /** Omit for a group that only opens and closes. */
  href?: string;
  /** Name of an icon in components/ui/Icon.tsx. */
  icon: IconName;
  /** Number shown on the row. Defaults to the number of children. */
  count?: number;
  children?: NavLink[];
};

export type NavSection = { title: string; items: NavItem[] };

/** Extra pages the search can find that aren't rows in the menu. */
export type SearchEntry = {
  label: string;
  href: string;
  where: string;
  code?: string;
};

const projectCount = published().length;

export const navigation: NavSection[] = [
  {
    title: "Explore",
    items: [
      { label: "Home", href: "/", icon: "home" },
      {
        label: "Projects",
        href: "/projects",
        icon: "projects",
        count: projectCount || undefined,
      },
      {
        label: "Building systems",
        href: "/building-systems",
        icon: "systems",
        children: systems.map((s) => ({
          label: s.short,
          href: `/building-systems/${s.slug}`,
          code: s.code,
        })),
      },
      {
        label: "How we build",
        href: "/how-we-build",
        icon: "build",
        children: disciplines.map((d) => ({
          label: d.name,
          href: `/how-we-build/${d.slug}`,
        })),
      },
      {
        label: "Lighting store",
        href: "/lighting-store",
        icon: "store",
        count: products.length,
      },
      { label: "Team", href: "/team", icon: "about" },
    ],
  },
  {
    title: "Get in touch",
    items: [
      { label: "Calculate your project", href: "/estimate", icon: "quote" },
      {
        label: "Request a site visit",
        href: "/contact#site-visit",
        icon: "visit",
      },
      {
        label: `Call ${site.phone.display}`,
        href: site.phone.href,
        icon: "phone",
      },
    ],
  },
];

/** Groups that start expanded in the drawer. */
export const openByDefault = ["Building systems"];

/** Services and sub-services: searchable, but too many to list as rows. */
export const searchExtras: SearchEntry[] = [
  ...services.flatMap((s) => [
    {
      label: s.name,
      href: `/services/${s.slug}`,
      where: "Services",
      code: s.code,
    },
    ...(s.subs ?? []).map((x) => ({
      label: x.name,
      href: `/services/${s.slug}/${x.slug}`,
      where: s.name,
      code: x.code,
    })),
  ]),
  { label: "Contact", href: "/contact", where: "Pages" },
];
