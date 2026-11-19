/**
 * Projects: the index (/projects) and each project (/projects/[slug]).
 * The projects themselves are in lib/projects.ts (only `publish: true` entries are shown).
 * Source: copy deck, Home › "Completed projects".
 */
import { cta } from "./shared";
import type { Seo } from "./types";

export const seo: Seo = {
  title: "Completed Projects | AlephPros",
  description:
    "Real homes, real measurements, real results: what we built across Dallas–Fort Worth, how long it took, and what a project like it costs.",
  path: "/projects",
};

export const index = {
  title: "Completed projects",
  lead: "Real homes, real measurements, real results. Each project shows what we built, how long it took, and what a project like it costs.",
  filterAll: "All systems",
  empty:
    "Project write-ups are being approved by their owners. Check back soon, or calculate your own project now.",
  cardLink: "View project",
};

export const detail = {
  challenge: "The challenge",
  approach: "How we built it",
  scope: "Scope",
  specs: "Measured",
  duration: "Time on site",
  occupied: "Owners lived in the home during the work",
  product: "Fixture from the lighting store",
  budget: "Budget",
  action: cta.quoteLike,
  related: "More projects like this",
};

export const reviews = {
  id: "reviews",
  title: "From homeowners",
  // TODO: shown before each homeowner has approved their review; confirm before launch.
  note: "First name, project type and city, shared with permission.",
};

export const draft = {
  banner:
    "Draft: this project isn't published yet. You only see it while developing (pnpm dev).",
  photoToCome: "Photos to come",
  facts: {
    city: "City",
    completed: "Completed",
    duration: "Time on site",
    property: "Property",
    occupied: "Occupied during work",
    yes: "Yes",
  },
  servicesUsed: "Services on this job",
  fixture: "Fixture from the lighting store",
};
