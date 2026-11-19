import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { IndexRows } from "@/components/patterns/IndexRows";
import { CardGrid, MediaCard } from "@/components/patterns/MediaCard";
import { PageHero } from "@/components/patterns/PageHero";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { fill, template as T } from "@/data/service-areas";
import { band, closingTitle, cta } from "@/data/shared";
import { coverPhoto, published } from "@/lib/projects";
import { cityFromSlug, cityHref, projectHref, systemHref } from "@/lib/routes";
import { serviceAreas } from "@/lib/site";
import { systems } from "@/lib/systems";
import { slugify } from "@/lib/util";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return serviceAreas.map((c) => ({ city: slugify(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityFromSlug((await params).city);
  if (!city) return {};
  return {
    title: { absolute: `${fill(T.title, city)} | AlephPros` },
    description: fill(T.description, city),
    alternates: { canonical: cityHref(city) },
  };
}

/** /service-areas/[city]: one page per city in lib/site.ts › serviceAreas (13). */
/**
 * Reads `params` inside <Suspense> (Cache Components): prerendered slugs are complete in the
 * static HTML; any other URL shows the skeleton and then the 404.
 */
export default function CityPage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CityPageBody params={params} />
    </Suspense>
  );
}

async function CityPageBody({ params }: Props) {
  const city = cityFromSlug((await params).city);
  if (!city) notFound();
  const work = published().filter((p) => p.city === city);
  const others = serviceAreas.filter((c) => c !== city);

  return (
    <>
      <PageHero
        trail={[home, { label: city, href: cityHref(city) }]}
        eyebrow="Service area"
        title={fill(T.title, city)}
        lead={fill(T.lead, city)}
        actions={[T.action, cta.visit]}
      />
      <Section title={fill(T.systemsTitle, city)}>
        <IndexRows
          rows={systems.map((s) => ({
            href: systemHref(s),
            code: s.code,
            title: s.name,
            line: s.line,
          }))}
        />
      </Section>
      {work.length > 0 && (
        <Section title={fill(T.projectsTitle, city)} rule>
          <CardGrid>
            {work.map((p) => {
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
                  />
                </li>
              );
            })}
          </CardGrid>
        </Section>
      )}
      <Section title={T.nearby} tone="white">
        <ul className="flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c}>
              <Link href={cityHref(c)} className="ap-chip">
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <ClosingBand copy={band(closingTitle, T.action)} />
    </>
  );
}
