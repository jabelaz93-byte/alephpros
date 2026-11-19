/**
 * Company facts only: who AlephPros is and how to reach it. Every value here is verified;
 * anything still to confirm is marked TODO and kept off the pages.
 * Services live in services.ts, the process in howWeBuild.ts, proof in projects.ts and testimonials.ts.
 */
export const site = {
  name: "AlephPros",
  url: "https://www.alephpros.com",
  /** One line used in meta tags, the footer and search results. */
  description:
    "Construction and remodeling in Dallas–Fort Worth. Planned before it's built, priced in writing, built to schedule.",
  /** Boilerplate for About, press and the Google profile. */
  boilerplate:
    "AlephPros is a construction and remodeling firm based in McKinney, Texas, serving the Dallas–Fort Worth area. We deliver kitchen and bath remodels, structural renovations, architectural lighting, electrical and smart-home systems, plumbing, painting and surface finishes, with one project team responsible from first measurement to final walkthrough.",
  /** Internal positioning line; not shown as a headline. */
  positioning:
    "AlephPros plans, builds and maintains the homes and properties of North Texas, one building system at a time.",
  /** Supplied by the owner (Nov 2026). */
  vision:
    "Our goal is to become one of the biggest construction firms in the region. We are starting with home remodeling and will grow as our experience does.",
  phone: { display: "(469) 610-9328", href: "tel:+14696109328" },
  whatsapp: "https://wa.me/14696109328",
  address: {
    street: "7300 State Hwy 121, Ste 300",
    city: "McKinney",
    region: "TX",
    postal: "75070",
  },
  hours: [
    { days: "Mon–Fri", time: "8:00 am – 6:00 pm" },
    { days: "Sat", time: "8:00 am – 5:00 pm" },
  ],
  // TODO: paste the exact profile URLs.
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  /** Licenses shown in the footer. Add only numbers that exist. */
  licenses: [
    {
      label: "Master Electrician",
      holder: "Candace Johnson",
      number: "326805",
      system: "E" as const,
    },
  ],
} as const;

/** Cities with a service-area page. */
export const serviceAreas = [
  "Addison",
  "Allen",
  "Carrollton",
  "Dallas",
  "Frisco",
  "Garland",
  "McKinney",
  "Murphy",
  "Parker",
  "Plano",
  "Prosper",
  "Richardson",
  "Wylie",
] as const;
