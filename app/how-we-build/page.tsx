import { ClosingBand } from "@/components/home/ClosingBand";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { Statement } from "@/components/home/Statement";
import { home } from "@/components/patterns/Breadcrumbs";
import { IndexRows } from "@/components/patterns/IndexRows";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/patterns/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { hub, seo } from "@/data/how-we-build";
import { howWeBuildSeo } from "@/data/seo/pages";
import { band, closingTitle, cta } from "@/data/shared";
import { disciplines, steps } from "@/lib/howWeBuild";
import { disciplineHref } from "@/lib/routes";

export const metadata = howWeBuildSeo.metadata;

/** /how-we-build: the seven steps and the five disciplines behind them. */
export default function HowWeBuildPage() {
  return (
    <>
      <JsonLd data={howWeBuildSeo.jsonLd} />
      <PageHero
        trail={[home, { label: hub.title, href: seo.path }]}
        title={hub.title}
        lead={hub.lead}
        actions={[hub.action, cta.visit]}
      />
      <Statement copy={hub.statement} />
      <div className="bg-plaster">
        <ProcessSteps
          copy={{
            title: hub.stepsTitle,
            lead: steps.map((s) => s.title.toLowerCase()).join(", "),
            leadShort: hub.stepsTitle,
            link: hub.action,
            steps,
          }}
        />
      </div>
      <Section id="disciplines" title={hub.disciplinesTitle}>
        <IndexRows
          rows={disciplines.map((d, i) => ({
            href: disciplineHref(d.slug),
            code: `0${i + 1}`,
            title: d.name,
            line: d.lead,
          }))}
        />
      </Section>
      <ClosingBand copy={band(closingTitle, hub.action)} />
    </>
  );
}
