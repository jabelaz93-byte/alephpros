/**
 * Homeowner reviews, each filed under the service it was about.
 * TODO: paste the full review text and confirm each person approved its use.
 * All three current reviews are electrical (E), so the home page shows none until remodeling,
 * painting or tile reviews are collected.
 */
export type Testimonial = {
  name: string;
  city?: string;
  service: string;
  work: string;
  quote: string;
  approved: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Martha W.",
    service: "E-101",
    work: "Kitchen lighting",
    quote: "Excellent service from start to finish!",
    approved: false,
  },
  {
    name: "Alex M.",
    service: "E-301",
    work: "Wiring repair",
    quote: "I couldn't be happier with the service!",
    approved: false,
  },
  {
    name: "Daniel G.",
    service: "E-301",
    work: "Panel upgrade",
    quote: "Outstanding experience from beginning to end!",
    approved: false,
  },
];

export const testimonialsFor = (codePrefix: string) =>
  testimonials.filter((t) => t.service.startsWith(codePrefix));
