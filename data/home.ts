/**
 * Home page. Words follow the v4 home design (Designs/V4/80-home-v4-desktop) and, where the
 * design doesn't show a slide, the copy deck (Home › carousel slides).
 * Codes must exist in lib/services.ts; the check at the bottom fails the build if one doesn't.
 * Photos: real AlephPros jobs only, never stock or renders.
 */
import { codeNames } from "@/lib/services";
import { site } from "@/lib/site";
import type { SystemCode } from "@/lib/systems";
import { cta } from "./shared";
import type { Cta, Fact, Photo, SectionHead, Seo, Statement } from "./types";

export const seo: Seo = {
  title: "AlephPros | Construction & Remodeling in Dallas–Fort Worth",
  description:
    "Kitchen and bath remodels, renovations, architectural lighting, electrical, plumbing and finishes across DFW. Priced in writing, built to schedule.",
  path: "/",
};

export const hero = {
  headline: "Integrated construction, remodeling & property operations",
  lead: "Whether you're updating a single room or reimagining your entire home, we bring craftsmanship and coordination from start to finish.",
  action: { label: "View projects", href: "/projects" } satisfies Cta,
};

export type HeroSlide = {
  /** Service code from lib/services.ts. */
  code: string;
  title: string;
  line: string;
  /** Word used in "Calculate your ___ project". */
  ctaWord: string;
  /** Two facts shown under the carousel while this slide is on. */
  facts: [Fact, Fact];
  image?: Photo;
};

export const carousel = {
  label: "Services",
  hint: "Pauses on hover. Arrow keys work.",
  /** Shown instead of `hint` on touch screens (mobile layout). */
  hintTouch: "Swipe or tap a service. Pauses when you touch it.",
  photoToCome: "Photo to come",
  previous: "Previous service",
  next: "Next service",
  /** Milliseconds each slide stays up. */
  duration: 6000,
};

/**
 * Order follows the business: remodeling first, then lighting (chandeliers, permanent
 * lighting), then painting, then flooring.
 */
export const heroSlides: HeroSlide[] = [
  {
    code: "A-101",
    title: "Remodeling",
    line: "Kitchens, baths and whole-home renovations, built while you keep living there.",
    ctaWord: "remodeling",
    facts: [
      {
        label: "Occupied homes",
        text: "Phased room by room, with dust contained and the rest protected.",
      },
      {
        label: "One plan",
        text: "Framing, electrical, plumbing and finishes on a single schedule.",
      },
    ],
  },
  {
    code: "E-201",
    title: "Chandeliers",
    line: "Supplied, assembled and hung, on ceilings up to 23 ft.",
    ctaWord: "chandelier",
    facts: [
      {
        label: "Ceiling height",
        text: "Two-story foyers and vaulted rooms, up to 23 ft. Lifts and reinforced mounts.",
      },
      {
        label: "Fixtures",
        text: "Supplied from our store or yours, assembled and leveled on site.",
      },
    ],
    image: {
      src: "/images/projects/amber-cascade.jpg",
      alt: "Glass globe cascade chandelier in a two-story room, with scaffolding beside it",
      position: "50% 40%",
    },
  },
  {
    code: "E-102",
    title: "Permanent lighting",
    line: "Roofline lighting installed once, controlled from your phone, on every night of the year.",
    ctaWord: "lighting",
    facts: [
      {
        label: "Installed once",
        text: "Track mounted along the roofline, on every night of the year.",
      },
      {
        label: "Phone control",
        text: "Colors, schedules and scenes from an app.",
      },
    ],
    image: {
      src: "/images/projects/roofline.jpg",
      alt: "Brick home at dusk with permanent roofline lighting",
      position: "50% 30%",
    },
  },
  {
    code: "I-101",
    title: "Painting",
    line: "Interior and exterior painting, with surfaces prepared before a brush touches them.",
    ctaWord: "painting",
    facts: [
      {
        label: "Surface prep",
        text: "Walls patched, sanded and primed before the first coat.",
      },
      {
        label: "Inside & out",
        text: "Rooms, trim, cabinets and exteriors, with the site cleaned daily.",
      },
    ],
  },
  {
    code: "I-201",
    title: "Tile & flooring",
    line: "Tile, stone, vinyl and hardwood, laid on a substrate we level and waterproof first.",
    ctaWord: "flooring",
    facts: [
      {
        label: "Substrate first",
        text: "Leveled, sealed and waterproofed before tile goes down.",
      },
      {
        label: "Materials",
        text: "Tile, stone, vinyl and hardwood, priced by the square foot.",
      },
    ],
  },
];

/** Yellow ticker under the hero: service codes and names, linked to their pages. */
export const ticker: { code: string; label: string }[] = [
  { code: "A-102", label: "Kitchen remodeling" },
  { code: "A-103", label: "Bathroom remodeling" },
  { code: "I-102", label: "Interior painting" },
  { code: "I-202", label: "Tile & retiling" },
  { code: "E-102", label: "Permanent lighting" },
  { code: "E-201", label: "Chandeliers" },
  { code: "P-101", label: "Plumbing" },
];

export const statement: Statement & { link: Cta } = {
  dark: "We plan before we build.",
  light:
    "Lean planning, one schedule across every trade, and a crew that keeps you updated. The right work, at the right time, with the right resources.",
  link: { label: "How we build", href: "/how-we-build" },
};

export type HomeProject = {
  code: string;
  title: string;
  /** Desktop caption. */
  line: string;
  /** Mobile caption under the small portrait cards. */
  short?: string;
  href: string;
  image: Photo;
  /** Full-width card (desktop: first and large; mobile: last, across both columns). */
  wide?: boolean;
  /** Only in the mobile layout, which shows three cards instead of two. */
  mobileOnly?: boolean;
};

export const completedProjects: SectionHead & {
  link: Cta;
  items: HomeProject[];
} = {
  title: "Completed projects",
  link: { label: "View more projects", href: "/projects" },
  // TODO: point each card at its project page once the entry in lib/projects.ts is published.
  items: [
    {
      code: "E-102",
      title: "Permanent roofline lighting",
      line: "Two-story brick home, warm white, installed at dusk.",
      href: "/projects",
      image: {
        src: "/images/projects/roofline.jpg",
        alt: "Two-story brick home with warm white roofline lighting at dusk",
        position: "50% 30%",
      },
      wide: true,
    },
    {
      code: "E-201",
      title: "Tiered crystal chandelier",
      line: "Vaulted room, hung from scaffolding.",
      short: "E-201, vaulted room",
      href: "/projects",
      image: {
        src: "/images/projects/crystal-tiered.jpg",
        alt: "Tiered crystal chandelier in a vaulted room, scaffolding beside it",
        position: "50% 40%",
      },
    },
    {
      code: "E-201",
      title: "Aurora pendant",
      line: "Two-story foyer, glass pendants hung to set heights.",
      short: "E-201, two-story foyer",
      href: "/projects",
      image: {
        src: "/images/projects/tubes-foyer.jpg",
        alt: "Cascade of glass tube pendants in a two-story foyer",
        position: "50% 35%",
      },
      mobileOnly: true,
    },
  ],
};

export type HomeSystem = {
  code: SystemCode;
  /** Short list of what the system covers (desktop card). */
  line: string;
  /** Longer list for the bigger mobile card. Falls back to `line`. */
  detail?: string;
  /** "Featured: …" line on the mobile card, when the system has a featured job. */
  featured?: string;
  /** Project photo; without one the card shows the system's line drawing. */
  image?: Photo;
};

export const buildingSystems: SectionHead & {
  leadShort: string;
  linkLabel: string;
  note: string;
  items: HomeSystem[];
} = {
  title: "Building systems",
  lead: "Every service belongs to a system, coded like a construction drawing set. Each system is shown through work we've finished.",
  leadShort:
    "Every service belongs to a system, coded like a construction drawing set.",
  // "Explore" is on the copy deck's never-use list; the design uses it, so it stays here to change in one place.
  linkLabel: "Explore",
  note: "Line drawings mark systems where project photos are still to come.",
  items: [
    { code: "A", line: "Kitchens, baths, interiors, structural" },
    { code: "I", line: "Painting, tile, flooring, finishes" },
    {
      code: "E",
      line: "Lighting, chandeliers, panels, smart homes",
      detail:
        "Architectural lighting, chandeliers, panels, EV charging, smart homes.",
      featured: "Featured: gold flush mount install",
      image: {
        src: "/images/projects/flushmount.jpg",
        alt: "Gold flush-mount fixture with glass bulbs, seen from below",
      },
    },
    { code: "P", line: "Repiping, heaters, drains, filtration" },
    { code: "G", line: "Management, rentals, trade training" },
  ],
};

export const measurement = {
  value: "23",
  unit: "ft",
  line: "Ceilings we hang chandeliers under, with lifts, scaffolding and reinforced mounts.",
  lineShort: "Ceilings we hang chandeliers under.",
  image: {
    src: "/images/projects/tubes-foyer.jpg",
    alt: "",
    position: "50% 35%",
  } satisfies Photo,
};

export const process: SectionHead & {
  leadShort: string;
  link: Cta;
  steps: { title: string; body: string }[];
} = {
  title: "How a project runs",
  lead: "Our delivery framework: plan, assemble, coordinate, execute, monitor, optimize, deliver.",
  leadShort: "Our delivery framework, in seven steps.",
  link: { label: "How we build", href: "/how-we-build" },
  steps: [
    { title: "Plan", body: "Scope, budget and schedule from your quote" },
    { title: "Assemble", body: "The right team and prequalified trades" },
    { title: "Coordinate", body: "One master schedule, materials ordered" },
    { title: "Execute", body: "Crew on site, daily progress updates" },
    { title: "Monitor", body: "Quality and safety checks" },
    { title: "Optimize", body: "Changes priced and approved first" },
    { title: "Deliver", body: "Walkthrough, warranty, handover" },
  ],
};

export const testimonial = {
  eyebrow: "From a homeowner",
  /** Name of the review in lib/testimonials.ts. TODO: shown before approval; confirm before launch. */
  name: "Martha W.",
  link: { label: "Read more reviews", href: "/about#reviews" } satisfies Cta,
};

export const closing = {
  title: "Tell us what you're building.",
  action: cta.calculate,
  call: {
    label: `Or call ${site.phone.display}`,
    href: site.phone.href,
  } satisfies Cta,
};

// Every code on the page must be a real service code.
for (const code of [
  ...heroSlides.map((s) => s.code),
  ...ticker.map((t) => t.code),
  ...completedProjects.items.map((p) => p.code),
]) {
  if (!codeNames[code])
    throw new Error(`data/home.ts uses unknown service code ${code}`);
}
