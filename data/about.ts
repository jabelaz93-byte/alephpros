/**
 * About (/about). Boilerplate and vision are in lib/site.ts.
 * Source: copy deck, "Brand narrative" and Home › "How we work" / "Build with us".
 */
import { cta } from "./shared";
import type { Seo } from "./types";

export const seo: Seo = {
  title: "About AlephPros | Construction & Remodeling, McKinney TX",
  description:
    "A construction and remodeling firm in McKinney, Texas: one project team responsible from first measurement to final walkthrough.",
  path: "/about",
};

export const hero = {
  title: "Every system, one builder",
  lead: "AlephPros plans, builds and maintains the homes and properties of North Texas, one building system at a time.",
};

export const narrative = [
  "Most remodels go wrong in the gaps between trades: the electrician waiting on the framer, the tile setter waiting on the plumber, the homeowner waiting on everyone. AlephPros was built to close those gaps. We organize every home as five building systems (structure, surfaces, electrical, plumbing, and the property itself) and assign each to licensed specialists who work from one plan, one schedule and one budget.",
  "We started in electrical and architectural lighting, where precision is not optional. That discipline now runs through everything we build. Today we remodel kitchens and baths, renovate whole homes, install lighting from single chandeliers to full rooflines, and maintain the properties we've built. The goal is unchanged as we grow: be the builder North Texas homeowners trust with the whole house.",
];

export const standards = {
  title: "How we work",
  items: [
    {
      title: "Licensed specialists",
      body: "Every system is led by a licensed or certified tradesperson.",
    },
    {
      title: "Written scope",
      body: "Every quote is itemized, so you know what each line costs.",
    },
    {
      title: "Protected homes",
      body: "Floors covered, dust contained, and the site cleaned every day.",
    },
    {
      title: "Safe sites",
      body: "Crews trained in jobsite safety before they set foot on yours.",
    },
  ],
};

export const reviews = {
  id: "reviews",
  title: "From homeowners",
  // One testimonial per building system, each with first name, city and project type.
  empty: "Reviews are shown once each homeowner approves their use.",
};

export const careers = {
  title: "Build with us",
  body: "We're hiring electricians, plumbers, carpenters, painters and project managers who take pride in finished work.",
  link: { label: "See open roles", href: "/careers" },
};

export const action = cta.calculate;
