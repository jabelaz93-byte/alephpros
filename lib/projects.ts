/**
 * PROJECT TEMPLATE: how every completed job is documented.
 *
 * Projects are the main proof on the site. Each one is filed under its building system and the
 * service codes it used (lib/services.ts), so system pages, service pages, How we build and the home
 * page all pull from this one list. Most projects will be construction (A); the template fits any system.
 *
 * Rules
 * - Write it so a homeowner understands it: what we built, where, how long, what it took.
 * - Only real facts from the job. Leave an optional field out rather than guess.
 * - Keep lists short: scope up to 6 lines, specs up to 6 pairs.
 * - Set `publish: true` only when the owner has approved the photos.
 * - Location is optional: case studies don't have to say where the job was. Leave `city` out
 *   unless the owner wants it shown.
 * - Photos: /public/images/projects/<slug>/<file>.jpg, real jobs only, no renders or stock.
 *
 * Copy NEW_PROJECT at the bottom of this file to start a new entry.
 */
import type { SystemCode } from "./systems";

export type PropertyType =
  | "Single-family home"
  | "Townhome"
  | "Multifamily"
  | "Commercial"
  | "Rental property";
export type BudgetBand = "Under $25K" | "$25K–$100K" | "$100K–$250K" | "$250K+";
export type PhotoStage = "before" | "during" | "after";

export type ProjectPhoto = {
  /** Path under /public, e.g. /images/projects/frisco-kitchen/after-1.jpg */
  src: string;
  /** What the photo shows, in plain words. Required for screen readers. */
  alt: string;
  stage: PhotoStage;
};

export type Project = {
  /** URL slug: what + where, e.g. "kitchen-remodel-frisco". */
  slug: string;
  /** Display name: what + where, e.g. "Kitchen remodel, Frisco". */
  name: string;
  /** Optional. City from the service areas list (lib/site.ts), only if the owner wants it shown. */
  city?: string;
  /** Month the work was finished, YYYY-MM. */
  completed: string;
  /** Working time on site. */
  duration?: { value: number; unit: "days" | "weeks" | "months" };
  propertyType: PropertyType;
  /** True if the owners lived in the home while we worked. */
  occupied?: boolean;

  /** Main building system. */
  system: SystemCode;
  /** Service codes used on the job; the first one is the main service. */
  services: string[];

  /** One sentence: what we built and the result. Shown on cards. */
  summary: string;
  /** The problem we were solving, one or two sentences. Optional. */
  challenge?: string;
  /** How we solved it, one or two sentences. Optional. */
  approach?: string;
  /** What we did, up to 6 short lines. */
  scope: string[];
  /** Measured facts, up to 6 label/value pairs (area, ceiling height, materials, fixtures). */
  specs: [string, string][];
  /** One real measurement shown with a dimension line, e.g. { label: "Ceiling", value: "23′-0″" }. */
  measurement?: { label: string; value: string };

  /** Cover photo first, then the rest in story order (before, during, after). */
  photos: ProjectPhoto[];
  /** Lighting store product slug, when the fixture came from the store. */
  product?: string;
  /** Shown only if the owner agreed to share it. */
  budgetBand?: BudgetBand;

  /** Owner approved the photos for the website. */
  publish: boolean;
  /** Pin to the home page and system pages. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "grand-cascade-chandelier",
    name: "Golden Era Grand Cascade chandelier, Prosper",
    city: "Prosper",
    completed: "2024-07",
    propertyType: "Single-family home",
    system: "E",
    services: ["E-201"],
    summary:
      "A seven-tier K9 crystal chandelier on a gold-finished steel frame, hung under a 23-foot ceiling.",
    scope: [
      "Lift access for a 23 ft ceiling",
      "Mount rated for a 218 lb fixture",
      "Crystal tier assembly",
      "Height set on adjustable chain",
    ],
    // TODO: height and diameter repeat the Aurora entry; confirm against the job.
    specs: [
      ["Fixture height", "156 in (13 ft)"],
      ["Diameter", "66 in (5.5 ft)"],
      ["Weight", "About 218 lb"],
      ["Crystal", "K9"],
      ["Frame", "Steel, gold finish"],
      ["Bulbs", "21 × E12"],
    ],
    measurement: { label: "Ceiling", value: "23′-0″" },
    photos: [],
    product: "golden-era-grand-cascade-clear-crystal-chandelier",
    publish: false,
  },
  {
    slug: "aurora-pendant-chandelier",
    // TODO: the old site describes Aurora as a tiered crystal chandelier; the photo used as "Aurora"
    // in the designs shows glass tubes. Confirm which photo belongs to this project.
    name: "Aurora pendant chandelier, Plano",
    city: "Plano",
    completed: "2025-01",
    propertyType: "Single-family home",
    system: "E",
    services: ["E-201"],
    summary:
      "A gold-and-clear crystal chandelier under a 23-foot ceiling, on a mount reinforced into the framing.",
    challenge: "The existing electrical box could not carry the fixture.",
    approach:
      "The crew reinforced the mount into a vertical stud before hanging it, then set each glass candle to the owner's chosen height.",
    scope: [
      "Mount reinforced into framing",
      "Fixture hung and cables adjusted",
      "Each candle set to height",
    ],
    specs: [
      ["Fixture height", "156 in (13 ft)"],
      ["Diameter", "66 in (5.5 ft)"],
      ["Weight", "About 120 lb"],
      ["Materials", "Iron and K9 crystal"],
      ["Finish", "Gold and clear"],
      ["Bulbs", "45 × E12"],
    ],
    measurement: { label: "Ceiling", value: "23′-0″" },
    photos: [],
    publish: false,
  },
];

/** Starting point for a new project entry. Copy it into the list above and fill every field you can. */
export const NEW_PROJECT: Project = {
  slug: "kitchen-remodel-frisco",
  name: "Kitchen remodel, Frisco",
  city: "Frisco",
  completed: "2026-10",
  duration: { value: 6, unit: "weeks" },
  propertyType: "Single-family home",
  occupied: true,
  system: "A",
  services: ["A-102", "I-202", "E-103"],
  summary: "One sentence: what we built and the result.",
  challenge: "Optional: the problem we were solving.",
  approach: "Optional: how we solved it.",
  scope: ["Up to six short lines"],
  specs: [["Area", "240 sq ft"]],
  measurement: { label: "Ceiling", value: "9′-0″" },
  photos: [
    {
      src: "/images/projects/kitchen-remodel-frisco/after-1.jpg",
      alt: "Finished kitchen with island and pendant lights",
      stage: "after",
    },
  ],
  budgetBand: "$25K–$100K",
  publish: false,
};

/** Only projects the owner approved. Every page reads through these helpers. */
export const published = () => projects.filter((p) => p.publish);
export const getProject = (slug: string) =>
  published().find((p) => p.slug === slug);
export const projectsFor = (codePrefix: string) =>
  published().filter((p) => p.services.some((c) => c.startsWith(codePrefix)));
export const coverPhoto = (p: Project) => p.photos[0];

/** "July 2024" from "2024-07". */
export const completedLabel = (p: Project) => {
  const [y, m] = p.completed.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};
