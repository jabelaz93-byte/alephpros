/**
 * FAQ (/faq).
 * TODO: the copy deck has no FAQ copy. Add only answers the owner has confirmed; the page
 * hides any group that has no questions.
 */
import { cta } from "./shared";
import type { Seo } from "./types";

export const seo: Seo = {
  title: "FAQ | AlephPros",
  description:
    "Answers about quotes, site visits, permits and scheduling for AlephPros projects in Dallas–Fort Worth.",
  path: "/faq",
};

export const hero = {
  title: "Frequently asked questions",
  lead: "Quotes, site visits, permits and schedules.",
};

export type Question = { q: string; a: string };

export const groups: { title: string; questions: Question[] }[] = [
  { title: "Quotes & pricing", questions: [] },
  { title: "Site visits", questions: [] },
  { title: "Permits & inspections", questions: [] },
  { title: "During the project", questions: [] },
];

export const closing = {
  title: "Still have a question?",
  actions: [cta.visit, cta.calculate],
};
