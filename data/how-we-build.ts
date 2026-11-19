/**
 * How we build: the hub (/how-we-build) and the five discipline pages (/how-we-build/[slug]).
 * The seven steps and the disciplines (methods, cycles, outcomes) live in lib/howWeBuild.ts.
 * Source: copy deck, "How we build".
 */
import { cta } from "./shared";
import type { Seo, Statement } from "./types";

export const seo: Seo = {
  title: "How We Build | AlephPros",
  description:
    "Seven steps, the same on every project, from the first site visit to the final walkthrough, led by one project manager.",
  path: "/how-we-build",
};

export const hub = {
  title: "How we build",
  statement: {
    dark: "Every project follows the same seven steps.",
    light: "That's why our schedules hold.",
  } satisfies Statement,
  lead: "From the first site visit to the final walkthrough, each AlephPros project runs on one delivery framework, led by one project manager who answers for the whole job.",
  stepsTitle: "The seven steps",
  disciplinesTitle: "The five disciplines",
  action: cta.calculate,
};

/** Section labels on each discipline page. */
export const discipline = {
  why: "Why it matters",
  methods: "How we do it",
  cycle: "The cycle",
  outcomes: "What you get",
  proof: "In practice",
  previous: "Previous discipline",
  next: "Next discipline",
  action: cta.calculate,
};
