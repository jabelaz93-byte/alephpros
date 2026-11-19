/**
 * How we build: the seven-step delivery framework (the same on every project) and the five
 * disciplines behind it. This is the only process on the site; nothing else describes steps.
 * Source: AlephPros premium copy deck, "How we build".
 */
import type { Item } from "./services";

export const statement = {
  dark: "Every project follows the same seven steps.",
  light: "That's why our schedules hold.",
  lead: "From the first site visit to the final walkthrough, each AlephPros project runs on one delivery framework, led by one project manager who answers for the whole job.",
};

export const steps: Item[] = [
  {
    title: "Plan",
    body: "We measure, photograph and scope the work, and agree on what done looks like.",
  },
  {
    title: "Assemble",
    body: "We assign the leads for each building system the project touches.",
  },
  {
    title: "Coordinate",
    body: "Trades, materials, permits and inspections go onto one schedule you can see.",
  },
  {
    title: "Execute",
    body: "Crews build in sequence, with the site protected and cleaned every day.",
  },
  {
    title: "Monitor",
    body: "Your project manager checks quality, schedule and budget each week and reports to you.",
  },
  {
    title: "Optimize",
    body: "When something changes on site, we adjust the plan in writing before work continues.",
  },
  {
    title: "Deliver",
    body: "Final inspection, walkthrough, punch list closed, and a record of what was installed.",
  },
];

export type Discipline = {
  slug: string;
  name: string;
  /** Page subhead. */
  lead: string;
  /** Why it matters, in homeowner terms. */
  why: string;
  methods: Item[];
  /** The discipline's own cycle; the last step feeds the first. */
  cycle: string[];
  outcomes: Item[];
};

export const disciplines: Discipline[] = [
  {
    slug: "project-readiness",
    name: "Project readiness",
    lead: "Labor, materials, permits and budget are lined up before work begins, so day one starts with everything on site.",
    why: "Most remodels lose their first week to things that could have been ordered a month earlier: a vanity on backorder, a permit still in review, a crew booked elsewhere. Readiness is the work we do before we touch your home.",
    methods: [
      {
        title: "Preconstruction planning",
        body: "Scope, drawings and sequence agreed before a start date is set.",
      },
      {
        title: "Procurement coordination",
        body: "Long-lead items ordered first and tracked until they're on site.",
      },
      {
        title: "Project controls",
        body: "Budget, schedule and risks reviewed with you before work begins.",
      },
      {
        title: "Continuous improvement",
        body: "Lead times from past projects shape the next plan.",
      },
    ],
    cycle: [
      "Plan",
      "Forecast",
      "Coordinate",
      "Procure",
      "Execute",
      "Measure",
      "Improve",
    ],
    outcomes: [
      {
        title: "Day one starts on time",
        body: "Permits approved and crew booked before the date is set.",
      },
      {
        title: "Materials before the crew",
        body: "Fixtures and finishes delivered and checked first.",
      },
      {
        title: "A budget that holds",
        body: "Allowances priced from real quotes, not guesses.",
      },
    ],
  },
  {
    slug: "project-management",
    name: "Project management",
    lead: "One project manager leads the team, the schedule and the budget from first visit to handover.",
    why: "When five trades each answer for their own part, nobody answers for the whole house. Every project has one project manager who owns the schedule, the budget and the quality of the finished work.",
    methods: [
      {
        title: "Team assembly",
        body: "The right leads for each building system, chosen at the start.",
      },
      {
        title: "Scheduling & coordination",
        body: "One master schedule shared with every trade and with you.",
      },
      {
        title: "Risk & procurement",
        body: "Problems named early, with a plan and a price before they cost time.",
      },
      {
        title: "Quality & closeout",
        body: "Inspections at each stage, then a walkthrough and a written punch list.",
      },
    ],
    cycle: [
      "Plan",
      "Assemble",
      "Coordinate",
      "Execute",
      "Monitor",
      "Optimize",
      "Deliver",
    ],
    outcomes: [
      {
        title: "One person to call",
        body: "Your project manager, from first visit to handover.",
      },
      {
        title: "A schedule you can see",
        body: "Updated each week and sent to you.",
      },
      {
        title: "A clean handover",
        body: "Punch list closed and a record of what was installed.",
      },
    ],
  },
  {
    slug: "lean-construction",
    name: "Lean construction",
    lead: "We pull-plan each trade's work so nobody waits, nothing is ordered twice, and less is thrown away.",
    why: "Most delays on a remodel are waiting: for a delivery, an inspection, another trade. Lean planning removes the waiting. Each trade commits to the work it can finish this week, and the next trade's start is built from that promise.",
    methods: [
      {
        title: "Pull planning",
        body: "We plan backward from the finish date, so every task has a reason to start.",
      },
      {
        title: "Visual workflow",
        body: "The week's work is posted where every trade, and you, can see it.",
      },
      {
        title: "Collaborative planning",
        body: "Trade leads plan together, so handoffs are agreed before they happen.",
      },
      {
        title: "Continuous improvement",
        body: "Each week we check what slipped and why, and fix the cause.",
      },
    ],
    cycle: [
      "Plan",
      "Align",
      "Coordinate",
      "Execute",
      "Measure",
      "Improve",
      "Repeat",
    ],
    outcomes: [
      {
        title: "No waiting between trades",
        body: "Handoffs agreed before the work starts.",
      },
      {
        title: "Less ordered, less wasted",
        body: "Materials measured and ordered once.",
      },
      {
        title: "A schedule that holds",
        body: "Built from what each trade has committed to.",
      },
    ],
  },
  {
    slug: "innovation-and-systems",
    name: "Innovation & systems",
    lead: "Shared schedules, photo logs and online quotes keep you and every trade looking at the same plan.",
    why: "A remodel generates hundreds of small decisions. When they live in texts and memory, they get lost. We keep quotes, schedules, photos and changes in one system, so you can see what was decided, and so can every trade on site.",
    methods: [
      {
        title: "One system of record",
        body: "Quotes, schedules and changes kept in one place.",
      },
      {
        title: "Field capture",
        body: "Measurements, photos and site notes captured on the job, not later.",
      },
      {
        title: "Automatic updates",
        body: "Visit confirmations and reminders sent without anyone chasing them.",
      },
      {
        title: "Continuous improvement",
        body: "Data from finished projects improves the next quote.",
      },
    ],
    cycle: [
      "Plan",
      "Align",
      "Coordinate",
      "Execute",
      "Measure",
      "Improve",
      "Repeat",
    ],
    outcomes: [
      {
        title: "A quote in minutes",
        body: "Itemized online, confirmed on site.",
      },
      {
        title: "Updates without chasing",
        body: "Visit confirmations and progress sent to you.",
      },
      {
        title: "Every decision on file",
        body: "Photos and approvals kept with your project.",
      },
    ],
  },
  {
    slug: "continuous-improvement",
    name: "Continuous improvement",
    lead: "Every finished project is reviewed, and what we learn changes how we build the next one.",
    why: "A builder that doesn't review its work repeats its mistakes. After every project we look at what held, what slipped and what it cost, and write the answer into how we quote, schedule and build.",
    methods: [
      {
        title: "Performance tracking",
        body: "Schedule, budget and quality tracked on every job.",
      },
      {
        title: "Handoff reviews",
        body: "Each handoff between trades reviewed for delays.",
      },
      {
        title: "Lessons learned",
        body: "A short review at closeout, written down and shared.",
      },
      {
        title: "Written standards",
        body: "Standards updated so the fix carries to every crew.",
      },
    ],
    cycle: [
      "Monitor",
      "Review",
      "Analyze",
      "Refine",
      "Measure",
      "Improve",
      "Repeat",
    ],
    outcomes: [
      {
        title: "Better with every project",
        body: "What we learn goes into the next plan.",
      },
      {
        title: "Fixed at the source",
        body: "Causes corrected, not just symptoms.",
      },
      {
        title: "Standards written down",
        body: "The same quality from every crew.",
      },
    ],
  },
];

export const getDiscipline = (slug: string) =>
  disciplines.find((d) => d.slug === slug);
