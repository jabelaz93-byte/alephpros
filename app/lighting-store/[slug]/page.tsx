import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { DetailLayout } from "@/components/patterns/DetailLayout";
import { IndexRows } from "@/components/patterns/IndexRows";
import { CardGrid, MediaCard } from "@/components/patterns/MediaCard";
import { PageSkeleton } from "@/components/patterns/PageSkeleton";
import { Section } from "@/components/patterns/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Price } from "@/components/store/StoreBrowser";
import {
  catalog,
  productLabels as L,
  product,
  seo,
} from "@/data/lighting-store";
import { productSeo } from "@/data/seo/templates";
import { band, closingTitle } from "@/data/shared";
import { getProduct, products } from "@/lib/products";
import { getProject } from "@/lib/projects";
import { productHref, projectHref } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? productSeo(p).metadata : {};
}

/** /lighting-store/[slug]: one fixture, on the shared slug template (components/patterns/DetailLayout). */
/**
 * Reads `params` inside <Suspense> (Cache Components): prerendered slugs are complete in the
 * static HTML; any other URL shows the skeleton and then the 404.
 */
export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductPageBody params={params} />
    </Suspense>
  );
}

async function ProductPageBody({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const facts: [string, string][] = [
    [L.facts.category, p.category],
    [L.facts.rooms, p.rooms.join(", ")],
    [L.facts.ceilings, p.ceilings.join(", ")],
    [L.facts.styles, p.styles.join(", ")],
    ...(p.adjustable ? [[L.facts.adjustable, L.yes] as [string, string]] : []),
  ];
  // Only link a project that is published.
  const installed = p.installedIn ? getProject(p.installedIn) : undefined;
  const related = products
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, 3);
  const quote = {
    label: product.action,
    href: `/contact?${new URLSearchParams({ product: p.name }).toString()}#site-visit`,
  };

  return (
    <>
      <JsonLd data={productSeo(p).jsonLd} />
      <DetailLayout
        trail={[
          home,
          { label: catalog.title, href: seo.path },
          { label: p.name, href: productHref(p) },
        ]}
        system="E"
        label={p.category}
        title={p.name}
        summary={p.summary}
        highlight={{
          label: p.fixedPrice || p.compareAt ? L.price : L.from,
          value: <Price p={p} bare />,
        }}
        facts={facts}
        actions={[quote, product.calculate]}
        note={product.installNote}
        photos={p.image ? [{ src: p.image, alt: p.name }] : []}
        fit="contain"
        emptyPhotoLabel={L.photoToCome}
      >
        {installed && (
          <Section title={L.installedIn} tone="white">
            <IndexRows
              rows={[
                {
                  href: projectHref(installed),
                  code: installed.services[0],
                  title: installed.name,
                  line: installed.summary,
                },
              ]}
            />
          </Section>
        )}
        {related.length > 0 && (
          <Section title={product.related} rule>
            <CardGrid>
              {related.map((x) => (
                <li key={x.slug}>
                  <MediaCard
                    href={productHref(x)}
                    title={x.name}
                    line={x.category}
                    system="E"
                    fit="contain"
                    image={x.image ? { src: x.image, alt: x.name } : undefined}
                    meta={<Price p={x} />}
                  />
                </li>
              ))}
            </CardGrid>
          </Section>
        )}
      </DetailLayout>
      <ClosingBand copy={band(closingTitle, product.calculate)} />
    </>
  );
}
