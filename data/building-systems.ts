/**
 * Building systems: the index page (/building-systems) and one page per system
 * (/building-systems/[slug]). Names, codes and one-liners come from lib/systems.ts; services
 * under each system come from lib/services.ts. This file holds the words only these pages use.
 * Source: copy deck, "Building systems overview" and the five system sections.
 */
import type { SystemCode } from "@/lib/systems";
import { cta } from "./shared";
import type { Cta, SectionHead, Seo } from "./types";

export const seo: Seo = {
  title: "Building Systems | AlephPros",
  description:
    "Five building systems, each led by licensed specialists: structure, surfaces, electrical, plumbing and property operations, planned together and built in sequence.",
  path: "/building-systems",
};

export const index = {
  title: "Building systems",
  lead: "We organize every project as five building systems, each led by licensed specialists, so structure, surfaces, power, water and the property itself are planned together and built in sequence.",
  why: {
    title: "Built in the right order",
    body: "Walls close only after wiring and plumbing are inspected. Tile goes down only after the floor is level and sealed. Lights go up only after the ceiling can carry them. Planning by system is how we keep each trade from undoing the last one's work.",
  },
  action: cta.calculate,
};

export type SystemPage = {
  seoDescription: string;
  intro: SectionHead & { body: string };
  /** Method block, where the system has one. */
  method?: { title: string; body: string };
  /** Extra cross-link block (store, remodel tie-in). */
  aside?: { title?: string; body: string; link?: Cta };
  quoteHeading: string;
  action: Cta;
  /** Who we work with, where the copy deck lists it. */
  audience?: string[];
  /** What the proof block should show; filled from lib/projects.ts. */
  proofNote: string;
};

export const systemPages: Record<SystemCode, SystemPage> = {
  A: {
    seoDescription:
      "Kitchen, bath and whole-home renovations across DFW, permitted, sequenced and delivered while you live in the home.",
    intro: {
      title: "Built around your household",
      body: "Most of our renovations happen in homes that stay occupied. We phase the work room by room, contain dust, protect what isn't being touched, and tell you each week which rooms are open and which are closed. You'll always know what's happening next.",
    },
    method: {
      title: "One plan, every trade",
      body: "Framing, electrical, plumbing and finishes are scheduled on a single plan, so no trade waits on another and nothing gets torn out twice. One project manager answers for the whole job.",
    },
    quoteHeading: "Price your renovation",
    action: {
      label: cta.calculateFor("remodeling"),
      href: "/estimate?service=A-101",
    },
    audience: [
      "Homeowners",
      "Property investors",
      "Multifamily and hospitality owners",
    ],
    proofNote: "One featured renovation with before/after, duration and city.",
  },
  I: {
    seoDescription:
      "Tile, stone, vinyl, hardwood and painting across DFW, laid on substrates we level, seal and prepare first.",
    intro: {
      title: "The finish is only as good as what's under it",
      body: "Cracked grout and peeling paint almost always start below the surface. Before we install, we check moisture, level the substrate, waterproof wet areas and prime what needs priming. It takes a day longer and saves years.",
    },
    quoteHeading: "Price your floors or paint",
    action: {
      label: cta.calculateFor("flooring"),
      href: "/estimate?service=I-201",
    },
    proofNote:
      "One painting project and one tile project, each with area and duration.",
  },
  E: {
    seoDescription:
      "Architectural lighting, chandelier installation, panel upgrades, EV charging, backup power and smart-home systems across DFW.",
    intro: {
      title: "Where precision is not optional",
      body: "Electrical is where AlephPros began. Every circuit is load-calculated, every fixture is mounted for its weight, and every job is inspected before we leave. It's the standard we now hold across every system we build.",
    },
    aside: {
      title: "Chandeliers & fixtures",
      body: "Choose from our catalog and we'll install it, or bring your own. Every fixture is installed on a mount rated for its weight.",
      link: { label: "Browse the lighting store", href: "/lighting-store" },
    },
    quoteHeading: "Price your electrical project",
    action: {
      label: cta.calculateFor("lighting"),
      href: "/estimate?service=E-101",
    },
    proofNote: "Featured chandelier project; confirm measurements per project.",
  },
  P: {
    seoDescription:
      "Repiping, drains, sewer lines, water heaters and filtration across DFW, diagnosed first, repaired right.",
    intro: {
      title: "Diagnose first",
      body: "We camera-inspect lines, pressure-test supply and check water quality before quoting a repair, so you pay for the fix you need and nothing you don't.",
    },
    aside: {
      body: "On every kitchen and bath remodel, our plumbers rough in and inspect before walls close, on the same schedule as the rest of the build.",
    },
    quoteHeading: "Request a plumbing assessment",
    // Plumbing is assessed on site rather than priced in the wizard.
    action: cta.visit,
    proofNote: "A repipe or drain project with home age and duration.",
  },
  G: {
    seoDescription:
      "Property management, equipment rentals, corporate rentals and skilled-trade training for owners of more than one property in DFW.",
    intro: {
      title: "For owners of more than one property",
      body: "For owners of rental homes, multifamily buildings and portfolios, we maintain the properties, supply the equipment and train the tradespeople that keep them running.",
    },
    quoteHeading: "Request a property review",
    action: { label: "Request a property review", href: "/contact?system=G" },
    proofNote: "Hide stats (stays, properties, guests) until confirmed.",
  },
};
