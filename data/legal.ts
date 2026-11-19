/**
 * Legal pages (/legal/[doc]): privacy, terms and cookies.
 * TODO: the legal text is not in alephpros-data. Paste the approved text into `sections`;
 * the page shows `pending` until a document has sections.
 */
export type LegalDoc = {
  slug: "privacy" | "terms";
  title: string;
  updated?: string;
  sections: { heading: string; body: string[] }[];
};

export const docs: LegalDoc[] = [
  { slug: "privacy", title: "Privacy policy", sections: [] },
  { slug: "terms", title: "Terms of use", sections: [] },
];

export const labels = {
  updated: "Last updated",
  pending: "This document is being finalized.",
};
