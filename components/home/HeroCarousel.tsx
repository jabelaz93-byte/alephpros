"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SheetCode } from "@/components/ui/SheetCode";
import type { carousel as carouselCopy, HeroSlide } from "@/data/home";
import { cta } from "@/data/shared";

type Props = { slides: HeroSlide[]; copy: typeof carouselCopy };

/**
 * Service carousel.
 * Desktop: a finished-project photo beside a black panel that names the service and starts the
 * quote wizard for it, with the slide's two facts underneath.
 * Mobile: the photo fills the screen under the see-through header, the panel sits on the photo,
 * and services are pills you can tap; swipe left or right to move.
 * Advances on a timer; pauses on hover, focus and touch, and never moves on its own when the
 * visitor prefers reduced motion. Arrow keys work.
 */
export function HeroCarousel({ slides, copy }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);
  const slide = slides[index];
  const running = !paused && !reduced;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={copy.label}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        setPaused(true);
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start == null || end == null) return;
        // Swipes on the photo only; the pill row scrolls sideways on its own.
        if ((e.target as HTMLElement).closest("[data-pills]")) return;
        if (end - start < -40) go(index + 1);
        if (end - start > 40) go(index - 1);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div className="grid lg:grid-cols-[minmax(0,880fr)_minmax(0,400fr)] lg:gap-6">
        {/* Photo. Mobile: full bleed, pulled up under the header. */}
        <div className="relative -mx-6 -mt-16 h-[min(780px,100svh)] overflow-hidden bg-black lg:mx-0 lg:mt-0 lg:aspect-[880/620] lg:h-auto">
          {slides.map((s, i) => (
            <div
              key={s.code}
              aria-hidden={i !== index}
              className={`absolute inset-0 transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              {s.image ? (
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  preload={i === 0}
                  className="object-cover"
                  style={{ objectPosition: s.image.position ?? "50% 50%" }}
                />
              ) : (
                <PhotoToCome
                  title={s.title}
                  code={s.code}
                  label={copy.photoToCome}
                />
              )}
            </div>
          ))}

          {/* Mobile: shade the top for the header and the bottom for the panel. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_22%,rgba(0,0,0,0)_38%,rgba(0,0,0,0.88)_72%)] lg:hidden"
          />

          {/* Progress bars, one per slide */}
          <div
            className="absolute inset-x-6 top-[76px] flex gap-2 lg:top-6"
            aria-hidden="true"
          >
            {slides.map((s, i) => (
              <span
                key={s.code}
                className="relative h-[3px] flex-1 overflow-hidden bg-white/35"
              >
                {i < index && <span className="absolute inset-0 bg-white" />}
                {i === index && (
                  <span
                    key={`${index}-${reduced}`}
                    className="absolute inset-y-0 left-0 bg-white"
                    style={
                      reduced
                        ? { width: "100%" }
                        : {
                            animation: `ap-progress ${copy.duration}ms linear forwards`,
                            animationPlayState: running ? "running" : "paused",
                          }
                    }
                    onAnimationEnd={() => {
                      if (
                        !window.matchMedia("(prefers-reduced-motion: reduce)")
                          .matches
                      )
                        go(index + 1);
                    }}
                  />
                )}
              </span>
            ))}
          </div>

          {/* Previous / next (desktop; mobile swipes) */}
          <div className="absolute bottom-6 left-6 hidden items-center gap-2 lg:flex">
            <RoundButton
              label={copy.previous}
              icon="chevron-left"
              onClick={() => go(index - 1)}
            />
            <RoundButton
              label={copy.next}
              icon="chevron-right"
              onClick={() => go(index + 1)}
            />
            <span
              className="t-small ml-2 font-semibold text-white tabular-nums"
              aria-live="polite"
            >
              {index + 1} / {slides.length}
            </span>
          </div>
        </div>

        {/* Service panel. Mobile: laid over the bottom of the photo. */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col bg-transparent pb-6 text-white lg:static lg:bg-black lg:p-8">
          <SheetCode
            code={slide.code}
            tone="solid"
            className="h-6 self-start px-2"
          />
          <h2 className="mt-3 font-bold text-[44px] leading-none tracking-[-0.02em] lg:mt-5 lg:text-[40px]">
            {slide.title}
          </h2>
          <p className="t-small mt-2 max-w-[30ch] text-white/85 lg:mt-3 lg:max-w-[34ch] lg:text-white/60">
            {slide.line}
          </p>
          <Link
            href={`/estimate?service=${slide.code}`}
            className="mt-6 inline-flex h-14 items-center justify-center rounded-xs bg-yellow px-6 text-center text-[15px] font-bold text-on-yellow hover:brightness-95 lg:mt-7"
          >
            {cta.calculateFor(slide.ctaWord)}
          </Link>
          {slide.caseHref && (
            <Link
              href={slide.caseHref}
              className="mt-3 font-semibold text-[13px] text-yellow underline underline-offset-4"
            >
              {copy.caseStudy}
            </Link>
          )}

          <ul
            data-pills
            className="-mx-6 mt-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:mt-8 lg:block lg:overflow-visible lg:px-0"
          >
            {slides.map((s, i) => {
              const on = i === index;
              return (
                <li
                  key={s.code}
                  className="shrink-0 lg:border-white/20 lg:border-t"
                >
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={on ? "true" : undefined}
                    className={`relative flex h-10 items-center gap-4 whitespace-nowrap rounded-full border-[1.5px] px-4 text-[14px] font-semibold lg:h-[52px] lg:w-full lg:rounded-none lg:border-0 lg:px-0 lg:text-[15px] lg:font-normal ${
                      on
                        ? "border-white bg-white text-black lg:bg-transparent lg:font-semibold lg:text-white"
                        : "border-white/70 text-white lg:text-white/60 lg:hover:text-white"
                    }`}
                  >
                    {on && (
                      <span
                        aria-hidden="true"
                        className="absolute -top-px left-0 hidden h-[3px] w-1/2 bg-yellow lg:block"
                      />
                    )}
                    <span
                      className={`t-caption hidden w-12 text-left lg:inline ${on ? "text-yellow" : ""}`}
                    >
                      {s.code}
                    </span>
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="t-caption mt-4 font-normal text-white/75 lg:hidden">
            {copy.hintTouch}
          </p>
          <p className="t-caption mt-auto hidden pt-6 font-normal text-white/50 lg:block">
            {copy.hint}
          </p>
        </div>
      </div>

      {/* The slide's facts (desktop) */}
      <dl className="mt-5 hidden grid-cols-2 gap-6 lg:grid" aria-live="polite">
        {slide.facts.map((f) => (
          <div key={f.label} className="flex items-center gap-6">
            <dt className="t-h2 shrink-0 font-bold">{f.label}</dt>
            <dd className="max-w-[34ch] text-[13px] text-muted leading-snug">
              {f.text}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function RoundButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: "chevron-left" | "chevron-right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border-[1.5px] border-white text-white hover:bg-white/15"
    >
      <Icon name={icon} size={16} />
    </button>
  );
}

function PhotoToCome({
  title,
  code,
  label,
}: {
  title: string;
  code: string;
  label: string;
}) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#16181a]">
      <span
        aria-hidden="true"
        className="font-logo text-[22vw] text-white/5 leading-none lg:text-[12vw]"
      >
        {code}
      </span>
      <span className="t-caption absolute top-28 left-6 bg-black/70 px-3 py-1.5 text-white lg:top-auto lg:bottom-24">
        {label}: {title.toLowerCase()}
      </span>
    </div>
  );
}
