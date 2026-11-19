import Image from "next/image";
import Link from "next/link";
import { SheetCode } from "@/components/ui/SheetCode";
import { TextLink } from "@/components/ui/TextLink";
import type { completedProjects } from "@/data/home";
import { caseStudyHref } from "@/lib/routes";

type Copy = typeof completedProjects;

/**
 * Completed projects.
 * Desktop: the wide card large on the left, one portrait card beside it.
 * Mobile: two portrait cards side by side, then the wide card across both columns.
 */
export function CompletedProjects({ copy }: { copy: Copy }) {
  return (
    <section
      className="container-page pb-20 lg:pb-24"
      aria-labelledby="projects-title"
    >
      <div className="flex items-end justify-between gap-6 border-ink border-t-2 pt-8 lg:pt-10">
        <h2 id="projects-title" className="t-h1">
          {copy.title}
        </h2>
        <span className="hidden lg:block">
          <TextLink link={copy.link} tone="ink" />
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 lg:mt-8 lg:grid-cols-[minmax(0,836fr)_minmax(0,436fr)] lg:gap-6">
        {copy.items.map((p) => (
          <li
            key={p.title}
            className={[
              p.wide && "col-span-2 order-last lg:order-none lg:col-span-1",
              p.mobileOnly && "order-first lg:hidden",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Link
              href={caseStudyHref(p.image.project) ?? p.href}
              className="group block"
            >
              <div
                className={`relative overflow-hidden bg-concrete ${p.wide ? "aspect-[342/180] lg:aspect-[836/440]" : "aspect-[165/240] lg:aspect-[436/440]"}`}
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes={
                    p.wide
                      ? "(min-width: 1024px) 58vw, 100vw"
                      : "(min-width: 1024px) 30vw, 50vw"
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ objectPosition: p.image.position ?? "50% 50%" }}
                />
              </div>

              {/* Caption: portrait cards on mobile show title + short line; everything else shows the code. */}
              <div className="mt-3 flex items-center gap-3">
                {p.wide ? (
                  <SheetCode code={p.code} />
                ) : (
                  <span className="hidden lg:contents">
                    <SheetCode code={p.code} />
                  </span>
                )}
                <span className="font-semibold text-[14px] leading-snug lg:text-[15px]">
                  {p.title}
                </span>
              </div>
              {p.short && (
                <p className="mt-1 text-[12px] text-muted lg:hidden">
                  {p.short}
                </p>
              )}
              <p className="mt-2 hidden text-[12px] text-muted lg:block">
                {p.line}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 lg:hidden">
        <TextLink link={copy.link} tone="ink" />
      </div>
    </section>
  );
}
