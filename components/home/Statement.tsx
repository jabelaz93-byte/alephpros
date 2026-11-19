import { TextLink } from "@/components/ui/TextLink";
import type { Cta, Statement as StatementCopy } from "@/data/types";

/** Two-tone statement: the first sentence in ink, the rest muted, then one link. */
export function Statement({ copy }: { copy: StatementCopy & { link?: Cta } }) {
  return (
    <section className="container-page py-16 lg:py-24">
      <p className="max-w-[26ch] text-[30px] font-semibold leading-[1.15] tracking-[-0.01em] lg:max-w-[1180px] lg:text-[44px] lg:leading-[1.12]">
        <span className="text-ink">{copy.dark}</span>{" "}
        <span className="text-muted">{copy.light}</span>
      </p>
      {copy.link && <TextLink link={copy.link} className="mt-8 lg:mt-10" />}
    </section>
  );
}
