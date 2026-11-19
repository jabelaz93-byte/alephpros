import Link from "next/link";

/**
 * AlephPros logo: yellow mark + the name set in Mayak Bold.
 * The name is always ALEPHPROS in capitals; that's the logo, not a label.
 * Stand-in until the official logo SVG is added to /public/brand.
 */
export function Logo({
  size = "md",
  href = "/",
}: {
  size?: "sm" | "md";
  href?: string | null;
}) {
  const text = size === "sm" ? "text-[17px]" : "text-[20px]";
  const mark = size === "sm" ? "size-[14px]" : "size-[16px]";
  const inner = (
    <span className="inline-flex items-center gap-2.5">
      <span aria-hidden="true" className={`${mark} shrink-0 bg-yellow`} />
      <span
        className={`font-logo font-bold ${text} leading-none tracking-[0.02em] text-ink`}
      >
        ALEPHPROS
      </span>
    </span>
  );
  if (!href) return inner;
  return (
    <Link
      href={href}
      aria-label="AlephPros home"
      className="inline-flex no-underline"
    >
      {inner}
    </Link>
  );
}
