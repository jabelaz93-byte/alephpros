import Image from "next/image";
import type { measurement } from "@/data/home";

/**
 * One real measurement, set huge over a project photo that fades in from the page colour.
 * The photo is decorative (the number and line say it), so its alt is empty.
 */
export function Measurement({ copy }: { copy: typeof measurement }) {
  return (
    <section
      className="relative isolate h-[440px] overflow-hidden lg:h-[560px]"
      aria-label={`${copy.value} ${copy.unit}: ${copy.line}`}
    >
      <Image
        src={copy.image.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover grayscale"
        style={{ objectPosition: copy.image.position ?? "50% 50%" }}
      />
      <div
        aria-hidden="true"
        className="-z-10 absolute inset-0 bg-[linear-gradient(to_bottom,var(--vellum)_0%,rgba(244,245,243,0.55)_22%,rgba(60,62,63,0.55)_55%,rgba(0,0,0,0.9)_100%)]"
      />
      <div
        className="container-page flex h-full items-end gap-6 pb-10 text-white lg:gap-16 lg:pb-14"
        aria-hidden="true"
      >
        <p className="flex items-start font-bold leading-[0.8] tracking-[-0.04em]">
          <span className="text-[128px] lg:text-[200px]">{copy.value}</span>
          <span className="ml-2 text-[40px] tracking-normal lg:text-[64px]">
            {copy.unit}
          </span>
        </p>
        <p className="max-w-[18ch] pb-2 font-semibold text-[14px] leading-snug lg:max-w-[42ch] lg:pb-4 lg:text-[17px]">
          <span className="lg:hidden">{copy.lineShort}</span>
          <span className="hidden lg:inline">{copy.line}</span>
        </p>
      </div>
    </section>
  );
}
