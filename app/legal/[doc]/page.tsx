import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { home } from "@/components/patterns/Breadcrumbs";
import { PageHero } from "@/components/patterns/PageHero";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { docs, labels } from "@/data/legal";
import { legalHref } from "@/lib/routes";

type Props = { params: Promise<{ doc: string }> };

const getDoc = (slug: string) => docs.find((d) => d.slug === slug);

export function generateStaticParams() {
  return docs.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getDoc((await params).doc);
  if (!d) return {};
  return {
    title: { absolute: `${d.title} | AlephPros` },
    alternates: { canonical: legalHref(d.slug) },
  };
}

/** /legal/[doc]: privacy and terms. Text lives in data/legal.ts. */
/**
 * Reads `params` inside <Suspense> (Cache Components): prerendered slugs are complete in the
 * static HTML; any other URL shows the skeleton and then the 404.
 */
export default function LegalPage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LegalPageBody params={params} />
    </Suspense>
  );
}

async function LegalPageBody({ params }: Props) {
  const d = getDoc((await params).doc);
  if (!d) notFound();
  return (
    <>
      <PageHero
        trail={[home, { label: d.title, href: legalHref(d.slug) }]}
        eyebrow="Legal"
        title={d.title}
        lead={d.updated ? `${labels.updated} ${d.updated}` : undefined}
      />
      <Section tone="white">
        {d.sections.length === 0 ? (
          <p className="notice max-w-[64ch]">{labels.pending}</p>
        ) : (
          <div className="grid max-w-[72ch] gap-10">
            {d.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="t-h2">{s.heading}</h2>
                {s.body.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="mt-4 text-[15px] text-muted leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
