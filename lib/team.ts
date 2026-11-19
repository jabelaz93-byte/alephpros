/**
 * People, grouped the way the Team page shows them, each tied to the building system they lead.
 * TODO: names and roles were read from the old "Meet the team" page and are not confirmed.
 * Pages show "[Name]" until confirmed is true.
 */
import type { SystemCode } from "./systems";

export type TeamGroup =
  | "Leadership"
  | "Engineering & design"
  | "Field & trades"
  | "Client service";
export type Person = {
  name: string;
  role: string;
  group: TeamGroup;
  system?: SystemCode;
  license?: string;
  confirmed: boolean;
};

export const teamGroups: TeamGroup[] = [
  "Leadership",
  "Engineering & design",
  "Field & trades",
  "Client service",
];

export const team: Person[] = [
  {
    name: "Ross S.",
    role: "General contractor & project manager",
    group: "Leadership",
    confirmed: false,
  },
  {
    name: "Sofia Guzman",
    role: "Construction supervisor",
    group: "Leadership",
    confirmed: false,
  },
  {
    name: "Afrina Johan",
    role: "Marketing",
    group: "Leadership",
    confirmed: false,
  },
  {
    name: "Ravi Kumar",
    role: "Structural engineer",
    group: "Engineering & design",
    system: "A",
    confirmed: false,
  },
  {
    name: "Isabel Moral",
    role: "Civil engineer",
    group: "Engineering & design",
    system: "A",
    confirmed: false,
  },
  {
    name: "Robbert Ryan",
    role: "Architect",
    group: "Engineering & design",
    system: "A",
    confirmed: false,
  },
  {
    name: "Kelvin Lomeli",
    role: "Electrical engineer",
    group: "Engineering & design",
    system: "E",
    confirmed: false,
  },
  {
    name: "Maya Sharma",
    role: "Interior designer",
    group: "Engineering & design",
    system: "I",
    confirmed: false,
  },
  {
    name: "Candace Johnson",
    role: "Master electrician",
    group: "Field & trades",
    system: "E",
    license: "326805",
    confirmed: false,
  },
  {
    name: "Peyton Lewis",
    role: "Plumber",
    group: "Field & trades",
    system: "P",
    confirmed: false,
  },
  {
    name: "Jose Bastian",
    role: "Framing & masonry",
    group: "Field & trades",
    system: "A",
    confirmed: false,
  },
  {
    name: "Jonathan Smith",
    role: "Painter",
    group: "Field & trades",
    system: "I",
    confirmed: false,
  },
  {
    name: "Karen Lobkoff",
    role: "Painter",
    group: "Field & trades",
    system: "I",
    confirmed: false,
  },
  {
    name: "Manuel Santos",
    role: "Painter",
    group: "Field & trades",
    system: "I",
    confirmed: false,
  },
  {
    name: "Carlos Reyes",
    role: "Procurement",
    group: "Client service",
    confirmed: false,
  },
  {
    name: "Nanda Sai",
    role: "Customer service",
    group: "Client service",
    confirmed: false,
  },
];
