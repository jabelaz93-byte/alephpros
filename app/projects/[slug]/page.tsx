import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { DetailLayout } from "@/components/patterns/DetailLayout";
import { TickList } from "@/components/patterns/FeatureGrid";
import { IndexRows } from "@/components/patterns/IndexRows";
import { CardGrid, MediaCard } from "@/components/patterns/MediaCard";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { detail, draft, index, seo } from "@/data/projects";
import { band, closingTitle, cta } from "@/data/shared";
import { getProduct } from "@/lib/products";
import {
  completedLabel,
  coverPhoto,
  type Project,
  projects,
  published,
} from "@/lib/projects";
import { codeLink, estimateHref, productHref, projectHref } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

const isDev = process.env.NODE_ENV === "development";

/** Published projects are live. Drafts are only served by `pnpm dev`, with a banner, to preview the template. */
const find = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug && (p.publish || isDev));

/**
 * Every project slug is listed (drafts included) because Cache Components needs at least one
 * param; drafts return 404 in production builds.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return {
    title: { absolute: `${p.name} | AlephPros projects` },
    description: p.summary,
    alternates: { canonical: projectHref(p) },
    robots: p.publish ? undefined : { index: false },
  };
}

/** /projects/[slug]: one project, on the shared slug template (components/patterns/DetailLayout). */
/**
 * Reads `params` inside <Suspense> (Cache Components): prerendered slugs are complete in the
 * static HTML; any other URL shows the skeleton and then the 404.
 */
export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProjectPageBody params={params} />
    </Suspense>
  );
}

async function ProjectPageBody({ params }: Props) {
  const p = find((await params).slug);
  if (!p) notFound();

  const facts: [string, string][] = [
    [draft.facts.city, p.city],
    [draft.facts.completed, completedLabel(p)],
    ...(p.duration
      ? [
          [draft.facts.duration, `${p.duration.value} ${p.duration.unit}`] as [
            string,
            string,
          ],
        ]
      : []),
    [draft.facts.property, p.propertyType],
    ...(p.occupied
      ? [[draft.facts.occupied, draft.facts.yes] as [string, string]]
      : []),
    ...p.specs,
    ...(p.budgetBand
      ? [[detail.budget, p.budgetBand] as [string, string]]
      : []),
  ];
  const used = p.services.map(codeLink).filter((c) => c !== undefined);
  const fixture = p.product ? getProduct(p.product) : undefined;
  const more = published()
    .filter((x) => x.slug !== p.slug && x.system === p.system)
    .slice(0, 3);

  return (
    <>
      <DetailLayout
        banner={p.publish ? undefined : draft.banner}
        trail={[
          home,
          { label: index.title, href: seo.path },
          { label: p.name, href: projectHref(p) },
        ]}
        system={p.system}
        code={p.services[0]}
        title={p.name}
        summary={p.summary}
        highlight={
          p.measurement && {
            label: p.measurement.label,
            value: p.measurement.value,
          }
        }
        facts={facts}
        actions={[
          { label: detail.action, href: estimateHref(p.services[0]) },
          cta.visit,
        ]}
        photos={p.photos.map((ph) => ({ src: ph.src, alt: ph.alt }))}
        emptyPhotoLabel={draft.photoToCome}
      >
        {(p.challenge || p.approach) && (
          <Section tone="white">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {p.challenge && (
                <div>
                  <h2 className="t-h2">{detail.challenge}</h2>
                  <p className="t-body-l mt-4 text-muted">{p.challenge}</p>
                </div>
              )}
              {p.approach && (
                <div>
                  <h2 className="t-h2">{detail.approach}</h2>
                  <p className="t-body-l mt-4 text-muted">{p.approach}</p>
                </div>
              )}
            </div>
          </Section>
        )}

        <Section>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="t-h2">{detail.scope}</h2>
              <TickList items={p.scope} className="mt-5" />
            </div>
            <div>
              <h2 className="t-h2">{draft.servicesUsed}</h2>
              <div className="mt-5">
                <IndexRows
                  rows={used.map((u) => ({
                    href: u.href,
                    code: u.code,
                    title: u.label,
                  }))}
                />
              </div>
              {fixture && (
                <div className="mt-8">
                  <p className="t-caption text-muted">{draft.fixture}</p>
                  <IndexRows
                    rows={[
                      {
                        href: productHref(fixture),
                        title: fixture.name,
                        line: fixture.summary,
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </Section>

        {more.length > 0 && (
          <Section title={detail.related} rule>
            <CardGrid>
              {more.map((x) => {
                const c = coverPhoto(x);
                return (
                  <li key={x.slug}>
                    <MediaCard
                      href={projectHref(x)}
                      title={x.name}
                      code={x.services[0]}
                      line={x.summary}
                      system={x.system}
                      image={c && { src: c.src, alt: c.alt }}
                    />
                  </li>
                );
              })}
            </CardGrid>
          </Section>
        )}
      </DetailLayout>
      <ClosingBand
        copy={band(closingTitle, {
          label: detail.action,
          href: estimateHref(p.services[0]),
        })}
      />
    </>
  );
}
