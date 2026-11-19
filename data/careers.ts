/**
 * Careers (/careers). Source: copy deck, Home › "Build with us".
 * TODO: open roles and the application route are not in the copy deck yet.
 */
import type { Seo } from "./types";

export const seo: Seo = {
  title: "Careers | AlephPros",
  description:
    "We're hiring electricians, plumbers, carpenters, painters and project managers in Dallas–Fort Worth.",
  path: "/careers",
};

export const hero = {
  title: "Build with us",
  lead: "We're hiring electricians, plumbers, carpenters, painters and project managers who take pride in finished work.",
};

export type Role = {
  title: string;
  system?: string;
  type: "Full-time" | "Part-time" | "Apprentice";
  summary: string;
};

/** Leave empty until roles are confirmed; the page shows `none` instead. */
export const roles: Role[] = [];

export const labels = {
  rolesTitle: "Open roles",
  none: "No roles are open right now. Send your details and we'll contact you when one is.",
  apply: { label: "Send your details", href: "/contact?topic=careers" },
};
