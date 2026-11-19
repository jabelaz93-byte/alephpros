import type { ReactNode } from "react";
import { TextLink } from "@/components/ui/TextLink";
import type { Cta } from "@/data/types";

type Props = {
  id?: string;
  title?: string;
  lead?: string;
  link?: Cta;
  /** day: page colour · white: plaster band · night: black band */
  tone?: "day" | "white" | "night";
  /** Thick rule above the heading (as on "Completed projects"). */
  rule?: boolean;
  children: ReactNode;
};

/** One page section: optional heading row, then content, in the page column. */
export function Section({
  id,
  title,
  lead,
  link,
  tone = "day",
  rule,
  children,
}: Props) {
  const bg =
    tone === "white" ? "bg-plaster" : tone === "night" ? "bg-black" : "";
  const headId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      data-theme={tone === "night" ? "night" : undefined}
      className={`${bg} py-14 lg:py-20`}
      aria-labelledby={title ? headId : undefined}
    >
      <div className="container-page">
        {title && (
          <div
            className={`mb-8 flex flex-col gap-3 lg:mb-10 lg:flex-row lg:items-end lg:justify-between ${rule ? "border-ink border-t-2 pt-8" : ""}`}
          >
            <div>
              <h2 id={headId} className="t-h1">
                {title}
              </h2>
              {lead && (
                <p className="t-small mt-3 max-w-[60ch] text-muted">{lead}</p>
              )}
            </div>
            {link && (
              <TextLink
                link={link}
                tone={tone === "night" ? "yellow" : "ink"}
              />
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
