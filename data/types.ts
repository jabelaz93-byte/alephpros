/**
 * Shapes shared by the page data files in data/.
 * Every page reads its words from its own file here; lists (systems, services, projects,
 * products, team) come from the registries in lib/, so each fact lives in one place.
 */

export type Seo = {
  /** Full <title>. Pages use it as `title: { absolute }`. */
  title: string;
  description: string;
  /** Path used for the canonical URL. */
  path: string;
};

export type Cta = { label: string; href: string };

/** Heading + optional lead, the opening of most sections. */
export type SectionHead = { title: string; lead?: string };

/** Two-tone statement: dark first sentence, muted second. */
export type Statement = { dark: string; light: string };

export type Photo = {
  src: string;
  alt: string;
  position?: string;
  /**
   * Slug of the case study this photo comes from (lib/projects.ts). When that project is
   * published, the photo's space links to its page; until then it shows without a link.
   */
  project?: string;
};

/** Short label + text pair, e.g. a slide fact or a contact route. */
export type Fact = { label: string; text: string };
