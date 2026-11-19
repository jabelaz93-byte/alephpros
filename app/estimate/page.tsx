import Link from "next/link";
import { Suspense } from "react";
import { EstimatePicker } from "@/components/estimators/EstimatePicker";
import { home } from "@/components/patterns/Breadcrumbs";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/patterns/Section";
import { seo, wizard } from "@/data/estimate";
import { metaFor } from "@/data/shared";

export const metadata = metaFor(seo);

/**
 * /estimate: the quote wizard ("Calculate your project").
 * The picker reads ?service= / ?type= on the client, inside <Suspense>, so the page shell stays
 * prerendered under Cache Components.
 */
export default function EstimatePage() {
  return (
    <>
      <PageHero
        trail={[home, { label: wizard.title, href: seo.path }]}
        eyebrow="Calculate your project"
        title={wizard.title}
        lead={wizard.lead}
      />
      <Section tone="white">
        <Suspense
          fallback={<p className="t-small text-muted">{wizard.loading}</p>}
        >
          <EstimatePicker />
        </Suspense>
        <p className="t-small mt-10 max-w-[64ch] text-muted">
          {wizard.other}{" "}
          <Link
            href="/contact#site-visit"
            className="font-semibold text-ink underline underline-offset-4"
          >
            {wizard.visit}
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
