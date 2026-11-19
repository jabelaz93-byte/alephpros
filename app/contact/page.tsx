import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { home } from "@/components/patterns/Breadcrumbs";
import { FactList } from "@/components/patterns/FeatureGrid";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/patterns/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextLink } from "@/components/ui/TextLink";
import {
  hero,
  office,
  routes,
  seo,
  serviceAreaLine,
  visit,
} from "@/data/contact";
import { metaFor } from "@/data/shared";
import { cityHref } from "@/lib/routes";
import { serviceAreas, site } from "@/lib/site";

export const metadata = metaFor(seo);

/** /contact: three routes (price, visit, talk), the request form (#site-visit) and the office. */
export default function ContactPage() {
  return (
    <>
      <PageHero
        trail={[home, { label: "Contact", href: seo.path }]}
        title={hero.title}
        lead={hero.lead}
      />

      <Section>
        <ul className="grid gap-6 md:grid-cols-3">
          {routes.map((r, i) => (
            <li
              key={r.title}
              className="flex flex-col border-[3px] border-ink p-6"
            >
              <h2 className="t-h3">{r.title}</h2>
              <p className="mt-2 flex-1 text-[14px] text-muted">{r.body}</p>
              <ButtonLink
                link={r.action}
                variant={i === 0 ? "primary" : "secondary"}
                className="mt-6 w-full"
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section id={visit.id} title={visit.title} lead={hero.lead} tone="white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
          <div>
            <h3 className="t-h3">{office.title}</h3>
            <FactList
              className="mt-4"
              facts={[
                [
                  "Address",
                  `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`,
                ],
                ...site.hours.map((h) => [h.days, h.time] as [string, string]),
                ["Phone", site.phone.display],
              ]}
            />
            <TextLink
              link={{ label: "WhatsApp", href: site.whatsapp }}
              className="mt-5"
            />
            <p className="mt-10 text-[14px] text-muted">{serviceAreaLine}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
              {serviceAreas.map((c) => (
                <li key={c}>
                  <Link
                    href={cityHref(c)}
                    className="underline underline-offset-4 hover:text-patina"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
