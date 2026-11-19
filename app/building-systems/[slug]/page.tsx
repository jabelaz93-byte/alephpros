import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { IndexRows } from "@/components/patterns/IndexRows";
import { CardGrid, MediaCard } from "@/components/patterns/MediaCard";
import { PageHero } from "@/components/patterns/PageHero";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { TextLink } from "@/components/ui/TextLink";
import { index, labels, seo, systemPages } from "@/data/building-systems";
import { band, closingTitle, cta } from "@/data/shared";
import { coverPhoto, published } from "@/lib/projects";
import { projectHref, serviceHref, systemHref } from "@/lib/routes";
import { services } from "@/lib/services";
import { getSystemBySlug, systems } from "@/lib/systems";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sys = getSystemBySlug((await params).slug);
  if (!sys) return {};
  return {
    title: { absolute: `${sys.name} | AlephPros` },
    description: systemPages[sys.code].seoDescription,
    alternates: { canonical: systemHref(sys) },
  };
}

/** /building-systems/[slug]: one system (A, I, E, P, G), its services and its work. */
/**
 * Reads `params` inside <Suspense> (Cache Components): prerendered slugs are complete in the
 * static HTML; any other URL shows the skeleton and then the 404.
 */
export default function SystemPage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SystemPageBody params={params} />
    </Suspense>
  );
}

async function SystemPageBody({ params }: Props) {
  const sys = getSystemBySlug((await params).slug);
  if (!sys) notFound();
  const page = systemPages[sys.code];
  const list = services.filter((s) => s.system === sys.code);
  const work = published().filter((p) => p.system === sys.code);
  const second =
    page.action.href === cta.visit.href ? cta.calculate : cta.visit;

  return (
    <>
      <PageHero
        trail={[
          home,
          { label: index.title, href: seo.path },
          { label: sys.name, href: systemHref(sys) },
        ]}
        code={sys.code}
        title={sys.name}
        lead={sys.lead}
        actions={[page.action, second]}
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="t-h1">{page.intro.title}</h2>
            <p className="t-body-l mt-5 text-muted">{page.intro.body}</p>
          </div>
          {page.method && (
            <div className="border-ink border-t-2 pt-6 lg:border-0 lg:pt-0">
              <p className="t-caption text-muted">{labels.method}</p>
              <h3 className="t-h2 mt-2">{page.method.title}</h3>
              <p className="mt-4 text-[15px] text-muted leading-relaxed">
                {page.method.body}
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section id="services" title={labels.services} lead={labels.servicesLead}>
        <IndexRows
          rows={list.map((s) => ({
            href: serviceHref(s),
            code: s.code,
            title: s.name,
            line: s.short,
            meta: s.subs?.length ? labels.count(s.subs.length) : undefined,
          }))}
        />
      </Section>

      {(page.aside || page.audience) && (
        <Section tone="white">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {page.aside && (
              <div>
                {page.aside.title && (
                  <h2 className="t-h2">{page.aside.title}</h2>
                )}
                <p className="mt-3 text-[15px] text-muted leading-relaxed">
                  {page.aside.body}
                </p>
                {page.aside.link && (
                  <TextLink link={page.aside.link} className="mt-5" />
                )}
              </div>
            )}
            {page.audience && (
              <div>
                <h2 className="t-h2">{labels.audience}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {page.audience.map((a) => (
                    <li
                      key={a}
                      className="rounded-full border-[1.5px] border-concrete px-4 py-2 font-semibold text-[13px]"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section id="work" title={labels.projects} rule>
        {work.length ? (
          <CardGrid>
            {work.map((p) => {
              const cover = coverPhoto(p);
              return (
                <li key={p.slug}>
                  <MediaCard
                    href={projectHref(p)}
                    title={p.name}
                    code={p.services[0]}
                    line={p.summary}
                    system={p.system}
                    image={cover && { src: cover.src, alt: cover.alt }}
                  />
                </li>
              );
            })}
          </CardGrid>
        ) : (
          <p className="notice max-w-[64ch]">{labels.noProjects}</p>
        )}
      </Section>

      <ClosingBand copy={band(closingTitle, page.action)} />
    </>
  );
}
