import Link from "next/link";
import type { Cta } from "@/data/types";

/**
 * The site's three buttons, all links.
 * primary:   black with yellow type (the "Calculate your project" button)
 * yellow:    yellow with black type (on photos and black bands)
 * secondary: outlined, for the second action
 */
export function ButtonLink({
  link,
  variant = "primary",
  className = "",
}: {
  link: Cta;
  variant?: "primary" | "yellow" | "secondary";
  className?: string;
}) {
  const look =
    variant === "yellow"
      ? "bg-yellow text-on-yellow hover:brightness-95"
      : variant === "secondary"
        ? "border-[1.5px] border-graphite text-ink hover:bg-plaster"
        : "bg-black text-yellow hover:bg-graphite";
  const external = /^(tel:|mailto:|https?:)/.test(link.href);
  const cls =
    `inline-flex h-12 items-center justify-center rounded-xs px-6 text-center font-bold text-[15px] ${look} ${className}`.trim();
  return external ? (
    <a href={link.href} className={cls}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}
