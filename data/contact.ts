/**
 * Contact (/contact), including the site-visit request (#site-visit).
 * Phone, address and hours come from lib/site.ts. Source: copy deck, "Contact".
 */
import { site } from "@/lib/site";
import { cta, results } from "./shared";
import type { Seo } from "./types";

export const seo: Seo = {
  title: "Contact AlephPros | McKinney, TX",
  description:
    "Call, write or book a site visit. We answer within one business day, and we'll call to confirm any visit you request.",
  path: "/contact",
};

export const hero = {
  title: "Contact AlephPros",
  lead: "Call, write or book a site visit. We answer within one business day, and we'll call to confirm any visit you request.",
};

export const routes = [
  {
    title: "Get a price",
    body: "Answer six questions and see an itemized quote now.",
    action: cta.calculate,
  },
  {
    title: "Book a site visit",
    body: "Pick a day and time window; we'll call to confirm.",
    action: cta.visit,
  },
  {
    title: "Talk to us",
    body: "Phone and office hours.",
    action: { label: site.phone.display, href: site.phone.href },
  },
];

export const visit = {
  id: "site-visit",
  title: "Request a site visit",
  day: "Preferred day",
  window: "Time window",
  windows: ["Morning 8–12", "Afternoon 12–4", "Late afternoon 4–6"],
  done: results.visit,
};

export const form = {
  title: "Send us a message",
  fields: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Property address",
    system: "Building system",
    message: "Message",
  },
  submit: cta.send,
  done: results.message,
};

export const office = { title: "Office", mapLabel: "Map" };

export const serviceAreaLine =
  "Serving McKinney, Frisco, Plano, Allen, Prosper, Dallas and nearby cities.";
