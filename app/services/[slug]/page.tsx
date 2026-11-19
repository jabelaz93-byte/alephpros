import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Estimator } from "@/components/estimators/Estimator";
import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { FeatureGrid, TickList } from "@/components/patterns/FeatureGrid";
import { IndexRows } from "@/components/patterns/IndexRows";
import { CardGrid, MediaCard } from "@/components/patterns/MediaCard";
import { PageHero } from "@/components/patterns/PageHero";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { ServiceAside } from "@/components/patterns/ServiceAside";
import { TextLink } from "@/components/ui/TextLink";
import {
  index as systemsIndex,
  seo as systemsSeo,
} from "@/data/building-systems";
import { labels, pageLabels } from "@/data/services";
import { band, closingTitle, cta } from "@/data/shared";
import { coverPhoto, projectsFor } from "@/lib/projects";
import {
  codeLink,
  estimateHref,
  projectHref,
  serviceHref,
  subHref,
  systemHref,
} from "@/lib/routes";
import { getService, services } from "@/lib/services";
import { getSystem } from "@/lib/systems";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: { absolute: `${s.name} in Dallas–Fort Worth | AlephPros` },
    description: s.lead,
    alternates: { canonical: serviceHref(s) },
  };
}

/** /services/[slug]: a service family (A-101, I-101, E-201…), under its building system. */
/**
 * Reads `params` inside <Suspense> (Cache Components): prerendered slugs are complete in the
 * static HTML; any other URL shows the skeleton and then the 404.
 */
export default function ServicePage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ServicePageBody params={params} />
    </Suspense>
  );
}

async function ServicePageBody({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const system = getSystem(service.system);
  const online = service.priced === "online";
  const main = online
    ? { label: labels.actionOnline.label, href: estimateHref(service.code) }
    : labels.actionOnSite;
  const related = (service.related ?? [])
    .map(codeLink)
    .filter((r) => r !== undefined);
  const work = projectsFor(service.code.slice(0, 3));

  return (
    <>
      <PageHero
        trail={[
          home,
          { label: systemsIndex.title, href: systemsSeo.path },
          { label: system.short, href: systemHref(system) },
          { label: service.name, href: serviceHref(service) },
        ]}
        code={service.code}
        title={service.name}
        lead={service.lead}
        actions={[main, online ? cta.visit : cta.calculate]}
        aside={
          <ServiceAside system={system} code={service.code} online={online} />
        }
      />

      <Section id="what-we-do" title={labels.offerings} tone="white">
        <FeatureGrid
          items={service.offerings}
          cols={service.offerings.length === 4 ? 4 : 3}
        />
      </Section>

      {service.lists && service.lists.length > 0 && (
        <Section>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {service.lists.map((l) => (
              <div key={l.heading} className="border-ink border-t pt-5">
                <h2 className="t-h3">{l.heading}</h2>
                <TickList items={l.items} className="mt-4" />
              </div>
            ))}
          </div>
        </Section>
      )}

      {service.subs && service.subs.length > 0 && (
        <Section id="services" title={pageLabels.subs(service.name)}>
          <IndexRows
            rows={service.subs.map((x) => ({
              href: subHref(service, x),
              code: x.code,
              title: x.name,
              line: x.short,
            }))}
          />
        </Section>
      )}

      {service.estimator && (
        <Section
          id="price"
          title={pageLabels.priceNow}
          lead={pageLabels.priceNowLead}
          tone="white"
        >
          <Estimator kind={service.estimator} />
        </Section>
      )}

      {service.storeLink && (
        <Section>
          <TextLink link={labels.storeLink} />
        </Section>
      )}

      {work.length > 0 && (
        <Section title={pageLabels.projects} rule>
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

      {related.length > 0 && (
        <Section title={labels.related}>
          <IndexRows
            rows={related.map((r) => ({
              href: r.href,
              code: r.code,
              title: r.label,
            }))}
          />
        </Section>
      )}

      <ClosingBand copy={band(closingTitle, main)} />
    </>
  );
}
