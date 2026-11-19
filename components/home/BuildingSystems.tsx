"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { SystemDrawing } from "@/components/graphics/SystemDrawing";
import { SheetCode } from "@/components/ui/SheetCode";
import type { buildingSystems } from "@/data/home";
import type { BuildingSystem } from "@/lib/systems";

type Copy = typeof buildingSystems;

/**
 * Building systems on a black band.
 * Desktop: five cards in a row. Mobile: a sideways rail of large cards (systems with a photo
 * first), with a position bar and "1 / 5".
 * `systems` is passed in from lib/systems.ts so names and slugs have one source.
 */
export function BuildingSystems({
  copy,
  systems,
}: {
  copy: Copy;
  systems: BuildingSystem[];
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const byCode = new Map(systems.map((s) => [s.code, s]));
  // Mobile order: photos first; desktop keeps the drawing-set order (A, I, E, P, G).
  const mobileFirst = (i: { image?: unknown }) =>
    i.image ? "max-lg:order-first" : "";

  const onScroll = () => {
    const rail = railRef.current;
    const card = rail?.querySelector("li");
    if (!rail || !card) return;
    setActive(
      Math.round(rail.scrollLeft / (card.getBoundingClientRect().width + 12)),
    );
  };

  return (
    <section
      data-theme="night"
      className="bg-black py-16 lg:py-20"
      aria-labelledby="systems-title"
    >
      <div className="container-page">
        <div className="grid gap-3 lg:grid-cols-2 lg:items-start lg:gap-12">
          <h2 id="systems-title" className="t-h1">
            {copy.title}
          </h2>
          <p className="t-small max-w-[48ch] text-muted lg:pt-2">
            <span className="lg:hidden">{copy.leadShort}</span>
            <span className="hidden lg:inline">{copy.lead}</span>
          </p>
        </div>

        <ul
          ref={railRef}
          onScroll={onScroll}
          className="relative -mx-6 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 [scrollbar-width:none] lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible lg:px-0"
        >
          {copy.items.map((item) => {
            const sys = byCode.get(item.code);
            if (!sys) return null;
            const href = `/building-systems/${sys.slug}`;
            return (
              <li
                key={item.code}
                className={`w-[82%] shrink-0 snap-start lg:w-auto ${mobileFirst(item)}`}
              >
                <article className="flex h-full flex-col bg-plaster">
                  <div className="relative aspect-[322/390] overflow-hidden bg-[#eef0ed] text-[#2b2e30] lg:aspect-[240/300]">
                    {item.image ? (
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1024px) 18vw, 82vw"
                        className="object-cover"
                        style={{
                          objectPosition: item.image.position ?? "50% 50%",
                        }}
                      />
                    ) : (
                      <SystemDrawing
                        code={item.code}
                        className="absolute inset-x-0 bottom-0 h-full w-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3">
                      <SheetCode
                        code={item.code}
                        tone={item.image ? "solid" : "outline"}
                      />
                      <h3 className="font-semibold text-[15px] text-ink lg:hidden">
                        {sys.name}
                      </h3>
                    </div>
                    <h3 className="mt-4 hidden font-semibold text-[15px] text-ink lg:block">
                      {sys.short}
                    </h3>
                    <p className="mt-3 text-[12px] text-muted leading-snug lg:mt-2">
                      <span className="lg:hidden">
                        {item.detail ?? item.line}
                      </span>
                      <span className="hidden lg:inline">{item.line}</span>
                    </p>
                    {item.featured && (
                      <p className="mt-4 font-semibold text-[12px] text-ink lg:hidden">
                        {item.featured}
                      </p>
                    )}
                    {item.caseHref && (
                      <Link
                        href={item.caseHref}
                        className="mt-3 font-semibold text-[12px] text-ink underline underline-offset-4"
                      >
                        {copy.caseStudy}
                      </Link>
                    )}
                    <Link
                      href={href}
                      className="mt-auto pt-6 font-semibold text-[12px] text-yellow underline decoration-[1.5px] underline-offset-4 lg:pt-8"
                    >
                      <span className="lg:hidden">
                        {copy.linkLabel} {sys.short.toLowerCase()}
                      </span>
                      <span className="hidden lg:inline">{copy.linkLabel}</span>
                      <span className="sr-only"> {sys.name}</span>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {/* Mobile position */}
        <div
          className="mt-6 flex items-center justify-between lg:hidden"
          aria-hidden="true"
        >
          <div className="flex gap-1.5">
            {copy.items.map((i, n) => (
              <span
                key={i.code}
                className={`h-[3px] transition-all ${n === active ? "w-6 bg-yellow" : "w-3 bg-concrete"}`}
              />
            ))}
          </div>
          <span className="t-caption text-muted tabular-nums">
            {Math.min(active + 1, copy.items.length)} / {copy.items.length}
          </span>
        </div>

        <p className="t-caption mt-8 hidden font-normal text-muted lg:block">
          {copy.note}
        </p>
      </div>
    </section>
  );
}
