/** 404 page (app/not-found.tsx). */
import { cta } from "./shared";
import type { Cta } from "./types";

export const notFound = {
  code: "404",
  title: "This page isn't on the drawings.",
  lead: "It may have moved when we reorganized the site by building system.",
  actions: [
    { label: "Home", href: "/" },
    { label: "Building systems", href: "/building-systems" },
    cta.calculate,
  ] satisfies Cta[],
};
