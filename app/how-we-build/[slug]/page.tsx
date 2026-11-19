import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { FeatureGrid } from "@/components/patterns/FeatureGrid";
import { PageHero } from "@/components/patterns/PageHero";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { hub, discipline as L, seo } from "@/data/how-we-build";
import { disciplineSeo } from "@/data/seo/templates";
import { band, closingTitle, cta } from "@/data/shared";
import { disciplines, getDiscipline } from "@/lib/howWeBuild";
import { disciplineHref } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return disciplines.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDiscipline((await params).slug);
  return d ? disciplineSeo(d).metadata : {};
}

/** /how-we-build/[slug]: one discipline (readiness, management, lean, innovation, improvement). */
/**
 * Reads `params` inside <Suspense> (Cache Components): prerendered slugs are complete in the
 * static HTML; any other URL shows the skeleton and then the 404.
 */
export default function DisciplinePage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <DisciplinePageBody params={params} />
    </Suspense>
  );
}

async function DisciplinePageBody({ params }: Props) {
  const d = getDiscipline((await params).slug);
  if (!d) notFound();
  const i = disciplines.findIndex((x) => x.slug === d.slug);
  const prev = disciplines[(i - 1 + disciplines.length) % disciplines.length];
  const next = disciplines[(i + 1) % disciplines.length];

  return (
    <>
      <JsonLd data={disciplineSeo(d).jsonLd} />
      <PageHero
        trail={[
          home,
          { label: hub.title, href: seo.path },
          { label: d.name, href: disciplineHref(d.slug) },
        ]}
        eyebrow={`${hub.disciplinesTitle} · 0${i + 1}`}
        title={d.name}
        lead={d.lead}
        actions={[L.action, cta.visit]}
      />

      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <h2 className="t-h1">{L.why}</h2>
          <p className="t-body-l text-muted">{d.why}</p>
        </div>
      </Section>

      <Section title={L.methods}>
        <FeatureGrid items={d.methods} cols={4} />
      </Section>

      <Section title={L.cycle} tone="white">
        <ol className="flex flex-wrap items-center gap-2">
          {d.cycle.map((step, n) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-xs border-[1.5px] border-ink px-4 py-2 font-semibold text-[14px]">
                <span className="mr-2 text-muted tabular-nums">{n + 1}</span>
                {step}
              </span>
              <Icon
                name={n === d.cycle.length - 1 ? "arrow-left" : "arrow"}
                className="text-muted"
              />
            </li>
          ))}
        </ol>
      </Section>

      <Section title={L.outcomes}>
        <FeatureGrid items={d.outcomes} cols={3} numbered />
      </Section>

      <nav
        aria-label="Disciplines"
        className="container-page grid grid-cols-2 gap-4 border-concrete border-t py-8"
      >
        <Link href={disciplineHref(prev.slug)} className="group">
          <span className="t-caption text-muted">{L.previous}</span>
          <span className="mt-1 flex items-center gap-2 font-semibold group-hover:underline">
            <Icon name="arrow-left" />
            {prev.name}
          </span>
        </Link>
        <Link href={disciplineHref(next.slug)} className="group text-right">
          <span className="t-caption text-muted">{L.next}</span>
          <span className="mt-1 flex items-center justify-end gap-2 font-semibold group-hover:underline">
            {next.name}
            <Icon name="arrow" />
          </span>
        </Link>
      </nav>

      <ClosingBand copy={band(closingTitle, L.action)} />
    </>
  );
}
