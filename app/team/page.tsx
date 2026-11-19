import { ClosingBand } from "@/components/home/ClosingBand";
import { home } from "@/components/patterns/Breadcrumbs";
import { PageHero } from "@/components/patterns/PageHero";
import { Section } from "@/components/patterns/Section";
import { SheetCode } from "@/components/ui/SheetCode";
import { band, closingTitle, metaFor } from "@/data/shared";
import { action, hero, labels, seo } from "@/data/team";
import { team, teamGroups } from "@/lib/team";

export const metadata = metaFor(seo);

/** /team: people grouped as Leadership · Engineering & design · Field & trades · Client service. */
export default function TeamPage() {
  return (
    <>
      <PageHero
        trail={[home, { label: hero.title, href: seo.path }]}
        title={hero.title}
        lead={hero.lead}
        actions={[action]}
      />
      <Section tone="white">
        <p className="t-body-l max-w-[64ch] text-muted">{hero.intro}</p>
      </Section>
      {teamGroups.map((g) => {
        const people = team.filter((p) => p.group === g);
        if (!people.length) return null;
        return (
          <Section key={g} title={g} rule>
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {people.map((p) => {
                // Names show only once confirmed (lib/team.ts › confirmed).
                const name = p.confirmed ? p.name : labels.unconfirmed;
                const initials = p.confirmed
                  ? p.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                  : "··";
                return (
                  <li key={p.name + p.role}>
                    <div
                      aria-hidden="true"
                      className="grid aspect-[4/5] place-items-center bg-[#eef0ed] font-bold text-[40px] text-[#2b2e30]/40"
                    >
                      {initials}
                    </div>
                    <div className="mt-3 flex items-start gap-3">
                      {p.system && (
                        <SheetCode code={p.system} className="mt-0.5" />
                      )}
                      <div>
                        <h3 className="font-semibold text-[15px]">{name}</h3>
                        <p className="text-[13px] text-muted">{p.role}</p>
                        {p.license && p.confirmed && (
                          <p className="mt-1 text-[12px] text-muted">
                            {labels.license} {p.license}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Section>
        );
      })}
      <ClosingBand copy={band(closingTitle, action)} />
    </>
  );
}
