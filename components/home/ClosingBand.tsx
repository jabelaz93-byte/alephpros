import Link from "next/link";
import type { closing } from "@/data/home";

/** Yellow closing band: one question, the black button, and the phone number. */
export function ClosingBand({ copy }: { copy: typeof closing }) {
  return (
    <section
      className="bg-yellow py-16 text-on-yellow lg:py-24"
      aria-labelledby="closing-title"
    >
      <div className="container-page">
        <h2
          id="closing-title"
          className="max-w-[14ch] font-bold text-[36px] leading-[1.05] tracking-[-0.02em] lg:max-w-none lg:text-[56px]"
        >
          {copy.title}
        </h2>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center lg:mt-10">
          <Link
            href={copy.action.href}
            className="inline-flex h-14 items-center justify-center rounded-xs bg-black px-8 font-bold text-[15px] text-yellow hover:bg-graphite"
          >
            {copy.action.label}
          </Link>
          <a
            href={copy.call.href}
            className="font-bold text-[15px] hover:underline"
          >
            {copy.call.label}
          </a>
        </div>
      </div>
    </section>
  );
}
