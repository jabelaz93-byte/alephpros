import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/patterns/Section";
import { StoreBrowser } from "@/components/store/StoreBrowser";
import { catalog, product, seo } from "@/data/lighting-store";
import { band, closingTitle, cta, metaFor } from "@/data/shared";

export const metadata = metaFor(seo);

/** /lighting-store: the fixture catalog (12 fixtures, lib/products.ts). */
export default function LightingStorePage() {
  return (
    <>
      <PageHero
        trail={[home, { label: catalog.title, href: seo.path }]}
        code="E-201"
        title={catalog.title}
        lead={catalog.lead}
        actions={[product.calculate, cta.visit]}
      />
      <Section>
        <StoreBrowser />
      </Section>
      <ClosingBand copy={band(closingTitle, product.calculate)} />
    </>
  );
}
