import type { Metadata } from "next";
import Link from "next/link";
import { BuildingSystems } from "@/components/home/BuildingSystems";
import { ClosingBand } from "@/components/home/ClosingBand";
import { CompletedProjects } from "@/components/home/CompletedProjects";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HomeTestimonial } from "@/components/home/HomeTestimonial";
import { Measurement } from "@/components/home/Measurement";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Statement } from "@/components/home/Statement";
import { Ticker } from "@/components/home/Ticker";
import { JsonLd } from "@/components/seo/JsonLd";
import * as home from "@/data/home";
import { homeSeo } from "@/data/seo/pages";
import { caseStudyHref } from "@/lib/routes";
import { systems } from "@/lib/systems";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = homeSeo.metadata;

/**
 * Home (v4 design). Every word comes from data/home.ts; lists come from lib/.
 * Order: hero + carousel, ticker, statement, completed projects, building systems,
 * measurement, how a project runs, testimonial, closing band.
 */
export default function Home() {
  const review = testimonials.find((t) => t.name === home.testimonial.name);

  return (
    <>
      <JsonLd data={homeSeo.jsonLd} />
      <section
        className="container-page lg:pt-14 lg:pb-0"
        aria-labelledby="home-title"
      >
        {/* Mobile opens straight on the carousel; the headline stays for search engines and screen readers. */}
        <div className="flex flex-col gap-8 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1
              id="home-title"
              className="sr-only lg:not-sr-only lg:max-w-[840px] lg:font-bold lg:text-[44px] lg:leading-[1.08] lg:tracking-[-0.02em]"
            >
              {home.hero.headline}
            </h1>
            <p className="t-small mt-5 hidden max-w-[52ch] text-muted lg:block">
              {home.hero.lead}
            </p>
          </div>
          <Link
            href={home.hero.action.href}
            className="hidden h-12 w-fit shrink-0 items-center rounded-xs border-[1.5px] border-graphite px-8 font-semibold text-[14px] text-ink hover:bg-plaster lg:inline-flex"
          >
            {home.hero.action.label}
          </Link>
        </div>
        <HeroCarousel
          slides={home.heroSlides.map((s) => ({
            ...s,
            caseHref: caseStudyHref(s.image?.project),
          }))}
          copy={home.carousel}
        />
      </section>

      <div className="lg:mt-14">
        <Ticker items={home.ticker} />
      </div>
      <Statement copy={home.statement} />
      <CompletedProjects copy={home.completedProjects} />
      <BuildingSystems
        copy={{
          ...home.buildingSystems,
          items: home.buildingSystems.items.map((i) => ({
            ...i,
            caseHref: caseStudyHref(i.image?.project),
          })),
        }}
        systems={systems}
      />
      <Measurement copy={home.measurement} />
      <ProcessSteps copy={home.process} />
      <HomeTestimonial copy={home.testimonial} review={review} />
      <ClosingBand copy={home.closing} />
    </>
  );
}
