import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Estimator } from "@/components/estimators/Estimator";
import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { FactList, TickList } from "@/components/patterns/FeatureGrid";
import { IndexRows } from "@/components/patterns/IndexRows";
import { PageHero } from "@/components/patterns/PageHero";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { ServiceAside } from "@/components/patterns/ServiceAside";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  index as systemsIndex,
  seo as systemsSeo,
} from "@/data/building-systems";
import { subSeo } from "@/data/seo/templates";
import { labels, pageLabels } from "@/data/services";
import { band, closingTitle, cta } from "@/data/shared";
import { money } from "@/lib/estimate";
import { estimateHref, serviceHref, subHref, systemHref } from "@/lib/routes";
import { getSub, services, teensProgram } from "@/lib/services";
import { getSystem } from "@/lib/systems";

type Props = { params: Promise<{ slug: string; sub: string }> };

export function generateStaticParams() {
  return services.flatMap((s) =>
    (s.subs ?? []).map((x) => ({ slug: s.slug, sub: x.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, sub } = await params;
  const hit = getSub(slug, sub);
  return hit ? subSeo(hit.service, hit.sub).metadata : {};
}

/** /services/[slug]/[sub]: one sub-service (A-102, I-202, G-402…). */
/**
 * Reads `params` inside <Suspense> (Cache Components): prerendered slugs are complete in the
 * static HTML; any other URL shows the skeleton and then the 404.
 */
export default function SubServicePage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SubServicePageBody params={params} />
    </Suspense>
  );
}

async function SubServicePageBody({ params }: Props) {
  const { slug, sub } = await params;
  const hit = getSub(slug, sub);
  if (!hit) notFound();
  const { service, sub: item } = hit;
  const system = getSystem(service.system);
  const kind = item.estimator ?? service.estimator;
  const online = !!kind;
  const main = online
    ? { label: labels.actionOnline.label, href: estimateHref(item.code) }
    : labels.actionOnSite;
  const siblings = (service.subs ?? []).filter((x) => x.slug !== item.slug);

  return (
    <>
      <JsonLd data={subSeo(service, item).jsonLd} />
      <PageHero
        trail={[
          home,
          { label: systemsIndex.title, href: systemsSeo.path },
          { label: system.short, href: systemHref(system) },
          { label: service.name, href: serviceHref(service) },
          { label: item.name, href: subHref(service, item) },
        ]}
        code={item.code}
        title={item.name}
        lead={item.lead}
        actions={[main, online ? cta.visit : cta.calculate]}
        aside={
          <ServiceAside system={system} code={item.code} online={online} />
        }
      />

      <Section id="included" title={labels.includes} tone="white">
        <TickList
          items={item.includes}
          className="max-w-[72ch] sm:grid-cols-2 sm:gap-x-10"
        />
      </Section>

      {item.extra === "teens" && (
        <Section id="program" title={pageLabels.teens.title}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
            <div>
              <FactList
                facts={[
                  [pageLabels.teens.ages, teensProgram.ages],
                  [pageLabels.teens.length, teensProgram.length],
                  [pageLabels.teens.cohorts, teensProgram.cohorts.join(", ")],
                ]}
              />
              <h3 className="t-h3 mt-8">{pageLabels.teens.pricing}</h3>
              <ul className="mt-3 grid gap-3">
                {teensProgram.pricing.map((p) => (
                  <li
                    key={p.name}
                    className="border-concrete border-b pb-3 text-[14px]"
                  >
                    <span className="flex justify-between gap-4 font-semibold">
                      {p.name}
                      <span className="tabular-nums">{money(p.price)}</span>
                    </span>
                    <span className="mt-1 block text-muted">{p.includes}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] text-muted">
                {pageLabels.teens.note}
              </p>
            </div>
            <ol className="grid gap-6 sm:grid-cols-3">
              {teensProgram.weeks.map((w, i) => (
                <li key={w.title} className="border-ink border-t pt-4">
                  <span className="t-caption text-muted">Week {i + 1}</span>
                  <h3 className="mt-1 font-semibold text-[15px]">{w.title}</h3>
                  <ul className="mt-3 grid gap-1.5 text-[13px] text-muted">
                    {w.days.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      )}

      {kind && (
        <Section
          id="price"
          title={pageLabels.priceNow}
          lead={pageLabels.priceNowLead}
        >
          <Estimator kind={kind} variant={item.slug} />
        </Section>
      )}

      {siblings.length > 0 && (
        <Section
          title={pageLabels.siblings(service.name)}
          tone={kind ? "white" : "day"}
        >
          <IndexRows
            rows={siblings.map((x) => ({
              href: subHref(service, x),
              code: x.code,
              title: x.name,
              line: x.short,
            }))}
          />
        </Section>
      )}

      <ClosingBand copy={band(closingTitle, main)} />
    </>
  );
}
