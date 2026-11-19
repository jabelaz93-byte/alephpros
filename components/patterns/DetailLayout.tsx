import type { ReactNode } from "react";
import { BrandText } from "@/components/ui/BrandText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SheetCode } from "@/components/ui/SheetCode";
import type { Cta, Photo } from "@/data/types";
import type { SystemCode } from "@/lib/systems";
import { Breadcrumbs } from "./Breadcrumbs";
import { FactList } from "./FeatureGrid";
import { Gallery } from "./Gallery";

/**
 * SLUG PAGE TEMPLATE, shared by /projects/[slug] and /lighting-store/[slug].
 *
 * Both are "one thing we can show you" pages, so they use the same frame: gallery on the left,
 * a sticky fact panel on the right (tag, name, one-line summary, key facts, the two actions),
 * then the page's own sections underneath. Keep them looking the same: change this file rather
 * than giving one of them its own layout. See docs/ARCHITECTURE.md › "Slug pages".
 */
type Props = {
  trail: Cta[];
  system: SystemCode;
  /** Service code (projects) shown as a tag; or a plain label (product category). */
  code?: string;
  label?: string;
  title: string;
  summary?: string;
  /** Big figure above the facts, e.g. price or ceiling height. */
  highlight?: { label: string; value: ReactNode };
  facts: [string, string][];
  actions: Cta[];
  note?: string;
  photos: Photo[];
  fit?: "cover" | "contain";
  emptyPhotoLabel: string;
  /** Shown above everything, e.g. "Draft: not published". */
  banner?: string;
  children?: ReactNode;
};

export function DetailLayout(p: Props) {
  return (
    <article>
      {p.banner && (
        <output className="block bg-yellow py-2 text-center font-semibold text-[13px] text-on-yellow">
          {p.banner}
        </output>
      )}
      <div className="container-page pt-8 pb-14 lg:pt-12 lg:pb-20">
        <Breadcrumbs trail={p.trail} />
        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-14">
          <Gallery
            photos={p.photos}
            system={p.system}
            fit={p.fit}
            emptyLabel={p.emptyPhotoLabel}
          />

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3">
              {p.code && (
                <SheetCode code={p.code} tone="solid" className="h-6 px-2" />
              )}
              {p.label && (
                <span className="t-caption text-muted">{p.label}</span>
              )}
            </div>
            <h1 className="mt-4 font-bold text-[32px] leading-[1.08] tracking-[-0.02em] lg:text-[40px]">
              <BrandText>{p.title}</BrandText>
            </h1>
            {p.summary && (
              <p className="mt-4 text-[16px] text-muted leading-relaxed">
                <BrandText>{p.summary}</BrandText>
              </p>
            )}
            {p.highlight && (
              <div className="mt-6">
                <p className="t-caption text-muted">{p.highlight.label}</p>
                <p className="mt-1 font-bold text-[32px] leading-none tabular-nums">
                  {p.highlight.value}
                </p>
              </div>
            )}
            {p.facts.length > 0 && (
              <FactList facts={p.facts} className="mt-6" />
            )}
            <div className="mt-8 flex flex-col gap-3">
              {p.actions.map((a, i) => (
                <ButtonLink
                  key={a.href}
                  link={a}
                  variant={i === 0 ? "primary" : "secondary"}
                  className="w-full"
                />
              ))}
            </div>
            {p.note && <p className="mt-4 text-[12px] text-muted">{p.note}</p>}
          </div>
        </div>
      </div>
      {p.children}
    </article>
  );
}
