import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { TickList } from "@/components/patterns/FeatureGrid";
import { IndexRows } from "@/components/patterns/IndexRows";
import { CardGrid, MediaCard } from "@/components/patterns/MediaCard";
import { PageHero } from "@/components/patterns/PageHero";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { BrandText } from "@/components/ui/BrandText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SheetCode } from "@/components/ui/SheetCode";
import { citySeo } from "@/data/seo/templates";
import { featured, fill, template as T } from "@/data/service-areas";
import { band, closingTitle, cta } from "@/data/shared";
import { coverPhoto, published } from "@/lib/projects";
import {
  cityFromSlug,
  cityHref,
  estimateHref,
  projectHref,
  serviceHref,
  subHref,
  systemHref,
} from "@/lib/routes";
import { services } from "@/lib/services";
import { serviceAreas } from "@/lib/site";
import { systems } from "@/lib/systems";
import { slugify } from "@/lib/util";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return serviceAreas.map((c) => ({ city: slugify(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityFromSlug((await params).city);
  return city ? citySeo(city).metadata : {};
}

/** The featured service for a city, whether it's a service family (A-101) or a sub-service (A-102). */
function featuredService(code: string) {
  for (const s of services) {
    if (s.code === code) {
      return {
        code,
        name: s.name,
        lead: s.lead,
        points: s.offerings.map((o) => o.title),
        href: serviceHref(s),
        online: !!s.estimator,
      };
    }
    const x = s.subs?.find((x) => x.code === code);
    if (x)
      return {
        code,
        name: x.name,
        lead: x.lead,
        points: x.includes,
        href: subHref(s, x),
        online: !!(x.estimator ?? s.estimator),
      };
  }
  throw new Error(`data/service-areas.ts: unknown featured code ${code}`);
}

/**
 * /service-areas/[city]: one page per city, each leading with its own featured service.
 * Recent work is chosen by service, not by place: case studies don't say where a job was.
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
  const seo = citySeo(city);
  const f = featuredService(featured[city]);
  const family = f.code.slice(0, 3);
  const work = published()
    .filter((p) => p.services.some((c) => c === f.code || c.startsWith(family)))
    .slice(0, 3);
  const others = serviceAreas.filter((c) => c !== city);
  const main = f.online
    ? { label: cta.calculate.label, href: estimateHref(f.code) }
    : cta.visit;

  return (
    <>
      <JsonLd data={seo.jsonLd} />
      <PageHero
        trail={[home, { label: city, href: cityHref(city) }]}
        eyebrow="Service area"
        title={fill(T.title, city)}
        lead={fill(T.lead, city)}
        actions={[main, f.online ? cta.visit : cta.calculate]}
      />

      <Section tone="white">
        <p className="t-body-l max-w-[64ch] text-muted">
          <BrandText>{fill(T.worked, city)}</BrandText>
        </p>
      </Section>

      <Section id="featured">
        <div className="grid gap-10 border-[3px] border-ink p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:p-10">
          <div>
            <p className="t-caption text-muted">
              {fill(T.featuredEyebrow, city)}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <SheetCode code={f.code} tone="solid" className="h-6 px-2" />
              <h2 className="t-h1">{f.name}</h2>
            </div>
            <p className="t-body-l mt-5 text-muted">{f.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink link={main} />
              <ButtonLink
                link={{ label: `About ${f.name.toLowerCase()}`, href: f.href }}
                variant="secondary"
              />
            </div>
          </div>
          <TickList items={f.points.slice(0, 6)} className="content-start" />
        </div>
      </Section>

      {work.length > 0 && (
        <Section
          title={fill(T.recentWork, city, { service: f.name.toLowerCase() })}
          rule
        >
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

      <Section
        title={fill(T.systemsTitle, city)}
        lead={fill(T.systemsLead, city)}
      >
        <IndexRows
          rows={systems.map((s) => ({
            href: systemHref(s),
            code: s.code,
            title: s.name,
            line: s.line,
          }))}
        />
      </Section>

      <Section title={T.nearby} tone="white">
        <ul className="flex flex-wrap gap-2">
          {others.map((c) => (
            <li key={c}>
              <Link href={cityHref(c)} className="ap-chip">
                {c} · {featuredService(featured[c]).name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <ClosingBand copy={band(closingTitle, main)} />
    </>
  );
}
