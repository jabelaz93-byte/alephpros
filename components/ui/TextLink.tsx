import Link from "next/link";
import type { Cta } from "@/data/types";

/**
 * Underlined text link used to close a section ("How we build", "View more projects").
 * tone patina: green on day pages · yellow: on black sections · ink: plain black.
 */
export function TextLink({
  link,
  tone = "patina",
  className = "",
}: {
  link: Cta;
  tone?: "patina" | "yellow" | "ink";
  className?: string;
}) {
  const color =
    tone === "yellow"
      ? "text-yellow"
      : tone === "ink"
        ? "text-ink"
        : "text-patina";
  return (
    <Link
      href={link.href}
      className={`t-small inline-block font-semibold underline decoration-[1.5px] underline-offset-4 hover:decoration-[2.5px] ${color} ${className}`.trim()}
    >
      {link.label}
    </Link>
  );
}
