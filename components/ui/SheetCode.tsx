/**
 * Building-system sheet code ("E-201", "A"), drawn like a drawing-sheet number.
 * outline: thin box in the current text color (day pages, dark cards)
 * solid:   yellow tag (carousel panel, the system that has a photo)
 */
export function SheetCode({
  code,
  tone = "outline",
  className = "",
}: {
  code: string;
  tone?: "outline" | "solid";
  className?: string;
}) {
  const look =
    tone === "solid" ? "bg-yellow text-on-yellow" : "border border-current";
  return (
    <span
      className={`inline-grid h-5 min-w-6 shrink-0 place-items-center rounded-xs px-1.5 text-[11px] font-semibold leading-none tracking-[0.02em] ${look} ${className}`.trim()}
    >
      {code}
    </span>
  );
}
