import { BrandText } from "@/components/ui/BrandText";
import { Icon } from "@/components/ui/Icon";

type Item = { title: string; body: string };

/** Short titled blocks with a rule above each (capabilities, methods, outcomes, standards). */
export function FeatureGrid({
  items,
  numbered,
  cols = 2,
}: {
  items: Item[];
  numbered?: boolean;
  cols?: 2 | 3 | 4;
}) {
  const grid =
    cols === 4
      ? "lg:grid-cols-4"
      : cols === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-2";
  return (
    <ul className={`grid gap-x-8 gap-y-8 sm:grid-cols-2 ${grid}`}>
      {items.map((it, i) => (
        <li key={it.title} className="border-ink border-t pt-5">
          {numbered && (
            <span className="block font-bold text-[22px] leading-none tabular-nums">
              {i + 1}
            </span>
          )}
          <h3 className={`font-semibold text-[17px] ${numbered ? "mt-3" : ""}`}>
            <BrandText>{it.title}</BrandText>
          </h3>
          <p className="mt-2 text-[14px] text-muted leading-relaxed">
            <BrandText>{it.body}</BrandText>
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Plain list with check marks (what's included, scope). */
export function TickList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px]">
          <Icon name="check" className="mt-0.5 text-patina" />
          <span>
            <BrandText>{t}</BrandText>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Label/value pairs (project specs, product details, office hours). */
export function FactList({
  facts,
  className = "",
}: {
  facts: [string, string][];
  className?: string;
}) {
  return (
    <dl className={`border-concrete border-t ${className}`}>
      {facts.map(([k, v]) => (
        <div
          key={k}
          className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 border-concrete border-b py-3 text-[14px]"
        >
          <dt className="text-muted">{k}</dt>
          <dd className="font-semibold">
            <BrandText>{v}</BrandText>
          </dd>
        </div>
      ))}
    </dl>
  );
}
