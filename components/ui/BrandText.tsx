import { Fragment, type ReactNode } from "react";
import { site } from "@/lib/site";

const NAME = site.name; // "AlephPros"

/**
 * Renders text with every mention of the brand name set in the logo face (Mayak), so the name
 * is always written in its own font, also inside headings and sentences. Used by the shared
 * text components (PageHero, Section, FeatureGrid, IndexRows, …); use it for any new place
 * that renders copy from data/ or lib/.
 */
export function BrandText({ children }: { children?: ReactNode }) {
  if (typeof children !== "string" || !children.includes(NAME))
    return <>{children}</>;
  const parts = children.split(NAME);
  return (
    <>
      {parts.map((part, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: parts of one fixed string, never reordered
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className="brand">{NAME}</span>}
        </Fragment>
      ))}
    </>
  );
}
