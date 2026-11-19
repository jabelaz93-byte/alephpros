import { TextLink } from "@/components/ui/TextLink";
import type { process } from "@/data/home";

/**
 * The seven steps.
 * Desktop: a dimension line with a tick at each step, the steps in seven columns under it.
 * Mobile: a numbered list with a rule between steps.
 */
export function ProcessSteps({ copy }: { copy: typeof process }) {
  const n = copy.steps.length;
  return (
    <section
      className="container-page py-16 lg:py-24"
      aria-labelledby="process-title"
    >
      <h2 id="process-title" className="t-h1">
        {copy.title}
      </h2>
      <p className="t-small mt-3 text-muted">
        <span className="lg:hidden">{copy.leadShort}</span>
        <span className="hidden lg:inline">{copy.lead}</span>
      </p>

      {/* Dimension line (desktop) */}
      <div className="relative mt-12 hidden h-6 lg:block" aria-hidden="true">
        <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-ink" />
        {[...copy.steps.map((s) => s.title), "end"].map((tick, i) => (
          <span
            key={tick}
            className="absolute top-0 h-6"
            style={{ left: `${(i / n) * 100}%` }}
          >
            <span className="absolute top-0 left-0 h-6 w-[1.5px] bg-ink" />
            <span className="absolute top-1/2 left-0 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-ink" />
          </span>
        ))}
      </div>

      <ol className="mt-6 border-ink border-t-2 lg:mt-4 lg:grid lg:grid-cols-7 lg:gap-6 lg:border-0">
        {copy.steps.map((s, i) => (
          <li
            key={s.title}
            className="flex gap-6 border-concrete border-b py-5 lg:block lg:border-0 lg:py-0"
          >
            <span className="w-6 shrink-0 font-bold text-[22px] leading-none tabular-nums lg:block lg:w-auto lg:text-[32px]">
              {i + 1}
            </span>
            <div className="lg:mt-4">
              <h3 className="font-semibold text-[15px]">{s.title}</h3>
              <p className="mt-1 text-[12px] text-muted leading-snug lg:mt-2 lg:max-w-[18ch]">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <TextLink link={copy.link} className="mt-8 lg:mt-10" />
    </section>
  );
}
