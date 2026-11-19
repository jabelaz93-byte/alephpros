/**
 * Services, filed under the five building systems (lib/systems.ts).
 * Code scheme: system letter + service family number. A family is X-n01; its sub-services are X-n02, X-n03…
 * One code means one thing everywhere: pages, projects, pricing, testimonials and admin.
 * Copy follows the AlephPros premium copy deck. Claims not yet confirmed are left out.
 */
import type { EstimatorKind } from "./pricing";
import { type SystemCode, systems } from "./systems";

export type Item = { title: string; body: string };

export type SubService = {
  slug: string;
  code: string;
  name: string;
  /** One line for indexes. */
  short: string;
  lead: string;
  includes: string[];
  estimator?: EstimatorKind;
  /** Optional extra block rendered by the sub-service template. */
  extra?: "teens";
};

export type Service = {
  slug: string;
  code: string;
  system: SystemCode;
  name: string;
  /** One line for indexes and the menu. */
  short: string;
  /** Page subhead. */
  lead: string;
  /** Online quote wizard, when this service is priced online. */
  estimator?: EstimatorKind;
  /** How the price is set: in the quote wizard, or after a site visit. */
  priced: "online" | "on site";
  /** The four capabilities shown on the page. */
  offerings: Item[];
  lists?: { heading: string; items: string[] }[];
  subs?: SubService[];
  /** Options for the request form on this page. */
  form?: { label: string; options: string[] }[];
  /** Related service codes. */
  related?: string[];
  storeLink?: boolean;
};

export const services: Service[] = [
  /* ---------------- A — Structural & building systems ---------------- */
  {
    slug: "remodeling-renovation",
    code: "A-101",
    system: "A",
    name: "Remodeling & renovation",
    short: "Kitchens, baths, whole homes and structural work.",
    lead: "We remodel kitchens, baths and whole homes, sequencing every trade and permit so your home stays livable while the work gets done.",
    estimator: "remodel",
    priced: "online",
    offerings: [
      {
        title: "Interior renovation",
        body: "Kitchens, baths, living spaces and whole-home remodels, from layout to final trim.",
      },
      {
        title: "Structural work",
        body: "Wall removals, beams, framing and additions, engineered and inspected before anything closes up.",
      },
      {
        title: "Architectural finishes",
        body: "Millwork, built-ins, ceilings and detailing that give a room its character.",
      },
      {
        title: "Permitting & compliance",
        body: "Drawings, permits and inspections handled by us, on your schedule.",
      },
    ],
    subs: [
      {
        slug: "kitchen-remodeling",
        code: "A-102",
        name: "Kitchen remodeling",
        short: "Layout, cabinetry, counters, lighting and finishes.",
        lead: "From a cabinet and counter refresh to a new layout with new electrical, plumbing and lighting.",
        includes: [
          "Layout and design coordination",
          "Cabinetry and countertops",
          "Backsplash tile",
          "Under-cabinet and pendant lighting",
          "Plumbing fixtures",
          "Paint and trim",
        ],
        estimator: "remodel",
      },
      {
        slug: "bathroom-remodeling",
        code: "A-103",
        name: "Bathroom remodeling",
        short: "Showers, tile, vanities, plumbing and lighting.",
        lead: "Bathrooms rebuilt from the studs out: waterproofed showers, tile, vanities, fixtures and lighting.",
        includes: [
          "Demolition and haul-off",
          "Shower waterproofing",
          "Floor and wall tile",
          "Vanities and fixtures",
          "Lighting and ventilation",
          "Paint",
        ],
        estimator: "remodel",
      },
      {
        slug: "whole-home-renovation",
        code: "A-104",
        name: "Whole-home renovation",
        short: "Every room on one plan, phased while you live there.",
        lead: "Whole-home renovation on one plan and one schedule, phased room by room so the house stays livable.",
        includes: [
          "Wall removal and new layouts",
          "Drywall and texture",
          "Flooring throughout",
          "Lighting and electrical updates",
          "Paint and trim",
          "Final punch list",
        ],
      },
      {
        slug: "structural-work",
        code: "A-105",
        name: "Structural work & additions",
        short: "Framing, wall removal, beams and additions.",
        lead: "Framing, wall removal, beams and additions, engineered, permitted and inspected before anything closes up.",
        includes: [
          "Engineering coordination",
          "Wall removal and beams",
          "Framing",
          "Additions",
          "Insulation",
          "Permits and inspections",
        ],
      },
    ],
    form: [
      {
        label: "Project",
        options: [
          "Kitchen",
          "Bathroom",
          "Whole home",
          "Structural or addition",
          "Not sure yet",
        ],
      },
      {
        label: "Will you live in the home during the work?",
        options: ["Yes", "No", "Partly"],
      },
      {
        label: "Budget",
        options: ["Under $25K", "$25K–$100K", "$100K–$250K", "$250K+"],
      },
    ],
    related: ["I-101", "I-201", "E-101"],
  },

  /* ---------------- I — Surface systems ---------------- */
  {
    slug: "painting",
    code: "I-101",
    system: "I",
    name: "Painting",
    short: "Interior, exterior and cabinet painting.",
    lead: "Interior and exterior painting and cabinet refinishing, with every surface cleaned, repaired and primed before the first finish coat.",
    estimator: "painting",
    priced: "online",
    offerings: [
      {
        title: "Interior painting",
        body: "Walls, ceilings, trim and doors, with furniture moved and floors covered.",
      },
      {
        title: "Exterior painting",
        body: "Siding, trim, soffits and doors, power-washed and sealed first.",
      },
      {
        title: "Cabinet refinishing",
        body: "Doors removed, sanded, primed and sprayed to a smooth finish.",
      },
      {
        title: "Surface prep",
        body: "Patching, sanding, caulking and priming, listed as its own line in your quote.",
      },
    ],
    subs: [
      {
        slug: "interior",
        code: "I-102",
        name: "Interior painting",
        short: "Walls, ceilings, trim and doors.",
        lead: "Rooms painted with furniture moved and covered, walls patched and primed, and two finish coats.",
        includes: [
          "Furniture moved and covered",
          "Patch and sand",
          "Caulk trim gaps",
          "Prime stains and repairs",
          "Two finish coats",
          "Touch-up walkthrough",
        ],
        estimator: "painting",
      },
      {
        slug: "exterior",
        code: "I-103",
        name: "Exterior painting",
        short: "Siding, trim, soffits and doors.",
        lead: "Exteriors power-washed, scraped, sealed and primed, then finished in two coats.",
        includes: [
          "Power washing",
          "Scrape and sand loose paint",
          "Caulk and seal joints",
          "Spot-prime bare wood",
          "Two finish coats",
          "Landscaping protected",
        ],
        estimator: "painting",
      },
      {
        slug: "cabinets",
        code: "I-104",
        name: "Cabinet refinishing",
        short: "Kitchen and bath cabinets sprayed smooth.",
        lead: "Cabinet doors and drawers removed, sanded, primed and sprayed, then rehung and adjusted.",
        includes: [
          "Doors and drawers removed and labeled",
          "Degrease and scuff-sand",
          "Bonding primer",
          "Sprayed finish coats",
          "Hardware reinstalled or replaced",
          "Hinges adjusted",
        ],
        estimator: "painting",
      },
    ],
    form: [
      { label: "Painting", options: ["Interior", "Exterior", "Cabinets"] },
    ],
    related: ["I-201", "A-101"],
  },
  {
    slug: "tile-flooring",
    code: "I-201",
    system: "I",
    name: "Tile & flooring",
    short: "Tile, vinyl, hardwood and natural stone.",
    lead: "Tile, stone, vinyl and hardwood laid on a substrate we level and waterproof first, measured and priced by the square foot.",
    estimator: "tile",
    priced: "online",
    offerings: [
      {
        title: "Flooring",
        body: "Hardwood, laminate, luxury vinyl, tile and stone, measured and installed by the square foot.",
      },
      {
        title: "Tile & stone",
        body: "Showers, backsplashes, fireplaces and floors, with waterproofing in every wet area.",
      },
      {
        title: "Substrate prep",
        body: "Moisture readings, leveling and membranes before anything is laid.",
      },
      {
        title: "Whole-home refresh",
        body: "Floors, paint and trim on one schedule for move-ins, sales and rentals.",
      },
    ],
    subs: [
      {
        slug: "tile",
        code: "I-202",
        name: "Tile",
        short: "Floors, walls, showers and retiling.",
        lead: "Porcelain, ceramic, mosaic and large-format tile on floors and walls, including retiling.",
        includes: [
          "Old tile removal and haul-off",
          "Floor leveling",
          "Waterproofing for wet areas",
          "Porcelain, ceramic, mosaic and large-format",
          "Grout and sealing",
          "Trim and transitions",
        ],
        estimator: "tile",
      },
      {
        slug: "vinyl-flooring",
        code: "I-203",
        name: "Vinyl flooring",
        short: "Waterproof luxury vinyl plank and tile.",
        lead: "Luxury vinyl plank and tile on a leveled subfloor, with baseboards and transitions finished.",
        includes: [
          "Old floor removal",
          "Subfloor leveling",
          "Underlayment",
          "Click-lock or glue-down install",
          "Baseboard and quarter round",
          "Transitions",
        ],
        estimator: "tile",
      },
      {
        slug: "natural-stone",
        code: "I-204",
        name: "Natural stone",
        short: "Marble, travertine and stone floors and walls.",
        lead: "Marble and natural stone on a substrate checked for stiffness, set flat and sealed.",
        includes: [
          "Substrate stiffness check",
          "Large-format handling",
          "Lippage control",
          "Stone sealing",
          "Thresholds",
          "Care instructions",
        ],
        estimator: "tile",
      },
      {
        slug: "showers-backsplashes",
        code: "I-205",
        name: "Showers & backsplashes",
        short: "Waterproofed showers and kitchen backsplashes.",
        lead: "Showers built on a waterproofing membrane, and backsplashes laid out around outlets and edges.",
        includes: [
          "Waterproofing membrane",
          "Niches and benches",
          "Shower pan tile",
          "Backsplash layout",
          "Outlet extenders",
          "Silicone at changes of plane",
        ],
        estimator: "tile",
      },
    ],
    form: [
      {
        label: "Surface",
        options: [
          "Tile",
          "Vinyl",
          "Hardwood",
          "Natural stone",
          "Shower or backsplash",
        ],
      },
    ],
    related: ["I-101", "A-101"],
  },

  /* ---------------- E — Electrical & smart systems ---------------- */
  {
    slug: "architectural-lighting",
    code: "E-101",
    system: "E",
    name: "Architectural lighting",
    short: "Permanent outdoor, recessed and landscape lighting.",
    lead: "Lighting planned for each room and roofline, installed on new circuits where needed and set to dim the way you live.",
    estimator: "outdoor-lighting",
    priced: "online",
    offerings: [
      {
        title: "Permanent outdoor lighting",
        body: "Roofline lighting installed once and controlled from your phone.",
      },
      {
        title: "Recessed lighting",
        body: "Slim LED downlights laid out for each room, on dimmers.",
      },
      {
        title: "Landscape lighting",
        body: "Path, uplight and façade lighting, aimed at night.",
      },
      {
        title: "Lighting design",
        body: "A fixture, switching and dimming plan before anything is installed.",
      },
    ],
    subs: [
      {
        slug: "permanent-outdoor-lighting",
        code: "E-102",
        name: "Permanent outdoor lighting",
        short: "Roofline lighting controlled from your phone.",
        lead: "Roofline lighting measured and priced by the linear foot, installed once and on every night of the year.",
        includes: [
          "Roofline measurement",
          "Color-matched track",
          "Controller and app setup",
          "Outdoor outlet if needed",
          "Scene programming",
          "Warranty registration",
        ],
        estimator: "outdoor-lighting",
      },
      {
        slug: "recessed-lighting",
        code: "E-103",
        name: "Recessed lighting",
        short: "Slim LED downlights laid out for each room.",
        lead: "Canless LED downlights laid out room by room, on new circuits and dimmers where needed.",
        includes: [
          "Layout plan",
          "Canless LED fixtures",
          "New circuits where needed",
          "Dimmer switches",
          "Drywall patching",
          "Color temperature selection",
        ],
      },
      {
        slug: "landscape-lighting",
        code: "E-104",
        name: "Landscape lighting",
        short: "Path, uplight and façade lighting.",
        lead: "Low-voltage path, uplight and façade lighting, designed on a night walk and aimed after dark.",
        includes: [
          "Lighting design walk",
          "Low-voltage transformer",
          "Direct-burial wiring",
          "Uplights and path lights",
          "Timers or smart control",
          "Aiming at night",
        ],
      },
      {
        slug: "lighting-design",
        code: "E-105",
        name: "Lighting design",
        short: "A lighting plan before anything is installed.",
        lead: "A fixture, switching and dimming plan drawn before the first hole is cut, coordinated with your remodel.",
        includes: [
          "Site visit",
          "Fixture schedule",
          "Switching and dimming plan",
          "Remodel coordination",
          "Fixtures from our lighting store",
          "Installation",
        ],
      },
    ],
    form: [
      {
        label: "Lighting",
        options: [
          "Permanent outdoor",
          "Recessed",
          "Landscape",
          "Lighting design",
          "Not sure yet",
        ],
      },
    ],
    related: ["E-201", "E-301"],
    storeLink: true,
  },
  {
    slug: "chandelier-installation",
    code: "E-201",
    system: "E",
    name: "Chandelier installation",
    short: "Chandeliers supplied and hung, on ceilings up to 23 ft.",
    lead: "Chandeliers from our lighting store or yours, assembled on site, hung on a mount rated for their weight and leveled by hand.",
    estimator: "chandelier",
    priced: "online",
    offerings: [
      {
        title: "Assembly",
        body: "Tiers and crystals assembled on site by our crew.",
      },
      {
        title: "Mounting",
        body: "We check what the ceiling can carry and reinforce the mount into framing where needed.",
      },
      {
        title: "High ceilings",
        body: "Two-story foyers and vaulted rooms, up to 23 ft, from lifts or scaffolding.",
      },
      {
        title: "Wiring & dimming",
        body: "Wired to its circuit, on a dimmer, and tested before we leave.",
      },
    ],
    form: [
      {
        label: "Ceiling height",
        options: ["Up to 10 ft", "11–16 ft", "17–23 ft", "Over 23 ft"],
      },
    ],
    related: ["E-101", "E-301"],
    storeLink: true,
  },
  {
    slug: "power-smart-systems",
    code: "E-301",
    system: "E",
    name: "Power & smart systems",
    short: "Panels, rewiring, smart controls, backup power and EV charging.",
    lead: "Panel upgrades, rewiring, smart controls, backup power and EV charging, permitted and installed to code.",
    priced: "on site",
    offerings: [
      {
        title: "Power distribution",
        body: "Panel upgrades, dedicated circuits, rewiring and service changes, sized for how you live now.",
      },
      {
        title: "Smart & low-voltage",
        body: "Lighting control, networking, cameras and controlled access, set up to work together.",
      },
      {
        title: "Backup power",
        body: "Generators and battery backup, permitted and installed to code.",
      },
      {
        title: "EV charging",
        body: "Level 2 chargers on a dedicated circuit.",
      },
    ],
    form: [
      {
        label: "Project",
        options: [
          "Panel or rewiring",
          "Smart home",
          "Generator or battery",
          "EV charger",
          "Repair",
        ],
      },
    ],
    related: ["E-101", "E-201"],
  },

  /* ---------------- P — Plumbing & water systems ---------------- */
  {
    slug: "plumbing",
    code: "P-101",
    system: "P",
    name: "Plumbing",
    short: "Repiping, drains, water heaters and filtration.",
    lead: "We camera-inspect lines, pressure-test supply and check water quality before quoting a repair, so you pay for the fix you need.",
    priced: "on site",
    offerings: [
      {
        title: "Repiping",
        body: "Whole-home repipes and supply-line replacement, with minimal wall openings.",
      },
      {
        title: "Sewer & drainage",
        body: "Camera inspection, clearing, repair and replacement of drain and sewer lines.",
      },
      {
        title: "Water heaters & filtration",
        body: "Tank and tankless water heaters, softeners and whole-home filtration.",
      },
      {
        title: "Maintenance & diagnostics",
        body: "Scheduled inspections for owners who'd rather prevent a leak than repair one.",
      },
    ],
    form: [
      {
        label: "Issue",
        options: [
          "Leak",
          "Low water pressure",
          "Drain or sewer",
          "Water heater",
          "Water quality",
          "Remodel rough-in",
        ],
      },
    ],
    related: ["A-101", "E-301"],
  },

  /* ---------------- G — Property & operations ---------------- */
  {
    slug: "property-management",
    code: "G-101",
    system: "G",
    name: "Property management",
    short: "Maintenance, repairs, vendors and tenant requests.",
    lead: "One team for maintenance, repairs, vendor coordination and tenant requests, with a report each month on what was done and what's coming.",
    priced: "on site",
    offerings: [
      {
        title: "Maintenance coordination",
        body: "Scheduled maintenance so fewer problems become emergencies.",
      },
      {
        title: "Repairs & turns",
        body: "Units repaired and made ready between tenants.",
      },
      {
        title: "Vendor management",
        body: "One point of contact for every trade on the property.",
      },
      {
        title: "Monthly reports",
        body: "What was done this month and what's planned next.",
      },
    ],
    form: [
      {
        label: "Property",
        options: [
          "Single-family rentals",
          "Multifamily",
          "HOA community",
          "Mixed-use",
        ],
      },
    ],
  },
  {
    slug: "equipment-rentals",
    code: "G-201",
    system: "G",
    name: "Equipment rentals",
    short: "Construction and facilities equipment, delivered.",
    lead: "Construction and facilities equipment, delivered, maintained and picked up on your schedule.",
    priced: "on site",
    offerings: [
      {
        title: "Construction equipment",
        body: "Earthmoving, lifts and power equipment for active sites.",
      },
      {
        title: "Facilities equipment",
        body: "Equipment for maintenance in occupied properties.",
      },
      {
        title: "Delivery & pickup",
        body: "Dropped off, staged and collected when you're done.",
      },
      {
        title: "Safety checks",
        body: "Every rental checked before it is delivered.",
      },
    ],
    lists: [
      {
        heading: "Rental terms",
        items: ["Daily", "Weekly", "Monthly", "Long-term"],
      },
    ],
    form: [
      {
        label: "Needed",
        options: ["This week", "Within 30 days", "Planning ahead"],
      },
    ],
  },
  {
    slug: "corporate-rentals",
    code: "G-301",
    system: "G",
    name: "Corporate rentals",
    short: "Furnished homes in Frisco, Dallas and Prosper.",
    lead: "Furnished homes in Frisco, Downtown Dallas and Prosper for relocations, project teams and extended stays.",
    priced: "on site",
    offerings: [
      {
        title: "Fully furnished",
        body: "Move-in ready, with everything a stay needs.",
      },
      {
        title: "Near business centers",
        body: "Close to Frisco, Downtown Dallas and Prosper.",
      },
      { title: "Flexible leases", body: "Short and mid-term stays." },
      {
        title: "One team",
        body: "The home and the stay looked after by the people who maintain it.",
      },
    ],
    lists: [
      { heading: "Locations", items: ["Frisco", "Downtown Dallas", "Prosper"] },
    ],
  },
  {
    slug: "skilled-trade-training",
    code: "G-401",
    system: "G",
    name: "Skilled trade training",
    short: "Hands-on trade training on real jobsites.",
    lead: "Hands-on training in electrical, plumbing, carpentry and finishing work, taught on real jobsites by the people who do it.",
    priced: "on site",
    offerings: [
      {
        title: "Trade fundamentals",
        body: "Electrical, plumbing, carpentry, drywall, painting and tile.",
      },
      {
        title: "Apprenticeship readiness",
        body: "Jobsite habits, coordination and a path into the trades.",
      },
      {
        title: "Safety & certification",
        body: "Safety from day one and preparation for certification.",
      },
      {
        title: "Flexible schedules",
        body: "On site, online or a mix of both.",
      },
    ],
    subs: [
      {
        slug: "teens",
        code: "G-402",
        name: "Teen trades training",
        short: "A 3-week workshop program for ages 13–15.",
        lead: "A supervised 3-week introduction to the trades for ages 13 to 15, in small groups. No experience needed.",
        includes: [
          "15 training days, Monday to Friday",
          "Small, supervised groups",
          "Woodworking, electrical and plumbing basics",
          "Practical assessment",
          "Certificate of completion",
          "Parent or guardian waiver required",
        ],
        extra: "teens",
      },
    ],
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
export const getServiceByCode = (code: string) =>
  services.find((s) => s.code === code);

export const getSub = (slug: string, sub: string) => {
  const s = getService(slug);
  const ss = s?.subs?.find((x) => x.slug === sub);
  return s && ss ? { service: s, sub: ss } : undefined;
};

/** Every code (services and sub-services) with its name, for validating references in other files. */
export const codeNames: Record<string, string> = Object.fromEntries(
  services.flatMap((s) => [
    [s.code, s.name],
    ...(s.subs ?? []).map((x) => [x.code, x.name]),
  ]),
);

/** Systems with their services, in menu order. */
export const bySystem = () =>
  systems.map((sys) => ({
    ...sys,
    services: services.filter((s) => s.system === sys.code),
  }));

/** Teen trades training (G-402) program details. Dates and prices to confirm each season. */
export const teensProgram = {
  ages: "13–15",
  length: "3 weeks, 15 training days",
  cohorts: ["June 12", "June 19", "June 26"],
  weeks: [
    {
      title: "Woodwork & safety foundations",
      days: [
        "Orientation & safety",
        "Intro to woodworking",
        "Cuts & joinery",
        "Build day: wall shelf",
        "Finishing & painting",
      ],
    },
    {
      title: "Electrical & plumbing basics",
      days: [
        "Electrical safety & circuits",
        "Outlets, switches & fixtures",
        "Plumbing fundamentals",
        "Faucet & leak repairs",
        "Toilets & basic pipe work",
      ],
    },
    {
      title: "Maintenance & certification",
      days: [
        "HVAC & weatherproofing",
        "Exterior maintenance",
        "Drywall & interior repairs",
        "Practical assessment",
        "Certification day",
      ],
    },
  ],
  pricing: [
    {
      name: "Standard program",
      price: 450,
      includes:
        "Training, materials, guided instruction, practical exercises and certificate of completion.",
    },
    {
      name: "Program + DeWalt tool kit",
      price: 750,
      includes:
        "Everything in the standard program plus a DeWalt starter tool kit to keep.",
    },
  ],
};
