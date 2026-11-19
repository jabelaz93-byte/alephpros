import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { CardGrid, MediaCard } from "@/components/patterns/MediaCard";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/patterns/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { index, reviews, seo } from "@/data/projects";
import { projectsSeoPage } from "@/data/seo/pages";
import { band, closingTitle, cta } from "@/data/shared";
import { completedLabel, coverPhoto, published } from "@/lib/projects";
import { projectHref } from "@/lib/routes";
import { testimonials } from "@/lib/testimonials";

export const metadata = projectsSeoPage().metadata;

/** /projects: completed projects (only entries with `publish: true` in lib/projects.ts). */
export default function ProjectsPage() {
  const list = published();
  return (
    <>
      <JsonLd data={projectsSeoPage().jsonLd} />
      <PageHero
        trail={[home, { label: index.title, href: seo.path }]}
        title={index.title}
        lead={index.lead}
        actions={[cta.calculate, cta.visit]}
      />

      <Section>
        {list.length ? (
          <CardGrid>
            {list.map((p) => {
              const c = coverPhoto(p);
              return (
                <li key={p.slug}>
                  <MediaCard
                    href={projectHref(p)}
                    title={p.name}
                    code={p.services[0]}
                    line={p.summary}
                    system={p.system}
                    image={c && { src: c.src, alt: c.alt }}
                    meta={
                      <span className="text-muted text-[12px]">
                        {completedLabel(p)}
                      </span>
                    }
                  />
                </li>
              );
            })}
          </CardGrid>
        ) : (
          <p className="notice max-w-[64ch]">{index.empty}</p>
        )}
      </Section>

      {testimonials.length > 0 && (
        <Section
          id={reviews.id}
          title={reviews.title}
          lead={reviews.note}
          tone="white"
        >
          <ul className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name + t.work} className="border-ink border-t pt-5">
                <blockquote className="font-bold text-[22px] leading-snug">
                  “{t.quote}”
                </blockquote>
                <p className="mt-4 font-semibold text-[13px]">
                  {t.name}
                  {t.city ? `, ${t.city}` : ""} ·{" "}
                  <span className="text-muted">{t.work}</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <ClosingBand copy={band(closingTitle)} />
    </>
  );
}
