import { TextLink } from "@/components/ui/TextLink";
import type { testimonial as testimonialCopy } from "@/data/home";
import type { Testimonial } from "@/lib/testimonials";

/** One homeowner quote, set large, on a white band. Renders nothing if the review is missing. */
export function HomeTestimonial({
  copy,
  review,
}: {
  copy: typeof testimonialCopy;
  review?: Testimonial;
}) {
  if (!review) return null;
  return (
    <section
      className="bg-plaster py-16 lg:py-24"
      aria-labelledby="review-title"
    >
      <div className="container-page">
        <p id="review-title" className="t-caption text-muted">
          {copy.eyebrow}
        </p>
        <figure className="mt-6 lg:mt-8">
          <blockquote className="max-w-[22ch] font-bold text-[36px] leading-[1.08] tracking-[-0.02em] lg:max-w-none lg:text-[64px]">
            <p>“{review.quote}”</p>
          </blockquote>
          <figcaption className="mt-8 font-semibold text-[14px] lg:mt-10">
            {review.name}, {review.work.toLowerCase()}
          </figcaption>
        </figure>
        <TextLink link={copy.link} className="mt-10 lg:mt-12" />
      </div>
    </section>
  );
}
