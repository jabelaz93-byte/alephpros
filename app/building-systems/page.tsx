import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { IndexRows } from "@/components/patterns/IndexRows";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/patterns/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { index, labels, seo } from "@/data/building-systems";
import { buildingSystemsSeo } from "@/data/seo/pages";
import { band, closingTitle, cta } from "@/data/shared";
import { systemHref } from "@/lib/routes";
import { bySystem } from "@/lib/services";

export const metadata = buildingSystemsSeo.metadata;

/** /building-systems: the five systems, indexed like a drawing set. */
export default function BuildingSystemsPage() {
  const systems = bySystem();
  return (
    <>
      <JsonLd data={buildingSystemsSeo.jsonLd} />
      <PageHero
        trail={[home, { label: index.title, href: seo.path }]}
        title={index.title}
        lead={index.lead}
        actions={[cta.calculate, cta.visit]}
      />
      <Section>
        <IndexRows
          rows={systems.map((s) => ({
            href: systemHref(s),
            code: s.code,
            title: s.name,
            line: s.line,
            meta: labels.count(s.services.length),
          }))}
        />
      </Section>
      <Section tone="white">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <h2 className="t-h1">{index.why.title}</h2>
          <p className="t-body-l text-muted">{index.why.body}</p>
        </div>
      </Section>
      <ClosingBand copy={band(closingTitle, index.action)} />
    </>
  );
}
