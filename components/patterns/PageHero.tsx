import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SheetCode } from "@/components/ui/SheetCode";
import type { Cta } from "@/data/types";
import { Breadcrumbs } from "./Breadcrumbs";

type Props = {
  title: string;
  lead?: string;
  /** Building-system or service code shown as a yellow tag above the title. */
  code?: string;
  /** Small line above the title when there's no code. */
  eyebrow?: string;
  trail?: Cta[];
  /** First is the main (black) button, the rest are outlined. */
  actions?: Cta[];
  /** Right-hand column on desktop (facts, a figure). */
  aside?: ReactNode;
};

/** Opening section for every page except home. */
export function PageHero({
  title,
  lead,
  code,
  eyebrow,
  trail,
  actions,
  aside,
}: Props) {
  return (
    <section
      className="container-page pt-8 pb-12 lg:pt-12 lg:pb-16"
      aria-labelledby="page-title"
    >
      {trail && <Breadcrumbs trail={trail} />}
      <div
        className={`mt-8 grid gap-10 lg:mt-12 ${aside ? "lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end" : ""}`}
      >
        <div>
          {code ? (
            <SheetCode code={code} tone="solid" className="h-6 px-2" />
          ) : (
            eyebrow && <p className="t-caption text-muted">{eyebrow}</p>
          )}
          <h1
            id="page-title"
            className="mt-4 max-w-[20ch] font-bold text-[36px] leading-[1.05] tracking-[-0.02em] lg:text-[52px]"
          >
            {title}
          </h1>
          {lead && (
            <p className="t-body-l mt-5 max-w-[56ch] text-muted">{lead}</p>
          )}
          {actions && actions.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((a, i) => (
                <ButtonLink
                  key={a.href}
                  link={a}
                  variant={i === 0 ? "primary" : "secondary"}
                />
              ))}
            </div>
          )}
        </div>
        {aside && <div>{aside}</div>}
      </div>
    </section>
  );
}
