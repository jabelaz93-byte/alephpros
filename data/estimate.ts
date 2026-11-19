/**
 * Quote wizard (/estimate). Prices and formulas live in lib/pricing.ts and lib/estimate.ts.
 * Source: copy deck, closing CTA band, CTA vocabulary, form labels and errors.
 */
import { results } from "./shared";
import type { Seo } from "./types";

export const seo: Seo = {
  title: "Calculate Your Project | AlephPros",
  description:
    "Answer six questions and get an itemized quote in minutes. We'll call to confirm a site visit.",
  path: "/estimate",
};

export const wizard = {
  title: "Start with a number",
  lead: "Answer six questions and get an itemized quote in minutes. We'll call to confirm a site visit.",
  chooseService: "What are we building?",
  back: "Back",
  next: "Next",
  result: results.quote,
  resultNote:
    "This is a range from our current prices. We'll confirm it on a site visit.",
  minimum: "Includes our minimum job charge.",
  send: "Send me this quote",
  onSite: "priced after a site visit, not online.",
  visit: "Request a site visit",
  loading: "Loading the calculator…",
  other:
    "Plumbing, power and smart systems, and property services are priced after a site visit.",
};

export const fields = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  address: "Property address",
  city: "City",
  details: "Project details",
  photos: "Photos (optional)",
};

export const errors = {
  phone: "Enter a phone number we can call.",
  day: "Choose a day for your visit.",
  size: "Add the approximate size so we can price it.",
};
