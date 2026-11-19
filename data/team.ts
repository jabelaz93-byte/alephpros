/**
 * Team (/team). People are in lib/team.ts; unconfirmed names show as "[Name]".
 * Source: copy deck, "Meet the Team".
 */
import { cta } from "./shared";
import type { Seo } from "./types";

export const seo: Seo = {
  title: "Our Team | AlephPros",
  description:
    "Engineers, architects, licensed electricians and plumbers, and the craftspeople who finish the work, all on one team.",
  path: "/team",
};

export const hero = {
  title: "Our team",
  lead: "Engineers, architects, licensed electricians and plumbers, and the craftspeople who finish the work, all on one team and all accountable to you.",
  intro:
    "AlephPros brings structural and civil engineering, architecture, interior design and licensed trades under one roof. The person who scopes your project stays with it until handover.",
};

export const labels = {
  license: "License",
  leads: "Leads",
  unconfirmed: "[Name]",
};

export const action = cta.calculate;
