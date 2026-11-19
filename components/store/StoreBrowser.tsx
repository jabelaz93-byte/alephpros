"use client";

import { useMemo, useState } from "react";
import { CardGrid, MediaCard } from "@/components/patterns/MediaCard";
import { catalog, productLabels as L } from "@/data/lighting-store";
import { money } from "@/lib/estimate";
import {
  categories,
  ceilings,
  type Product,
  products,
  rooms,
  styles,
} from "@/lib/products";
import { productHref } from "@/lib/routes";

type Filters = {
  category?: string;
  room?: string;
  ceiling?: string;
  style?: string;
  best?: boolean;
};

/** Catalog with filter chips and sorting. All 12 fixtures are in lib/products.ts. */
export function StoreBrowser() {
  const [f, setF] = useState<Filters>({});
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const list = useMemo(() => {
    let l: Product[] = products.filter(
      (p) =>
        (!f.category || p.category === f.category) &&
        (!f.room || p.rooms.includes(f.room as Product["rooms"][number])) &&
        (!f.ceiling ||
          p.ceilings.includes(f.ceiling as Product["ceilings"][number])) &&
        (!f.style || p.styles.includes(f.style as Product["styles"][number])) &&
        (!f.best || p.bestSeller),
    );
    if (sort === "low") l = [...l].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "high") l = [...l].sort((a, b) => b.priceFrom - a.priceFrom);
    return l;
  }, [f, sort]);

  const group = (
    legend: string,
    key: "category" | "room" | "ceiling" | "style",
    values: readonly string[],
  ) => (
    <fieldset className="grid gap-2">
      <legend className="t-caption mb-2 text-muted">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="ap-chip"
          aria-pressed={!f[key]}
          onClick={() => setF({ ...f, [key]: undefined })}
        >
          {L.all}
        </button>
        {values.map((v) => (
          <button
            key={v}
            type="button"
            className="ap-chip"
            aria-pressed={f[key] === v}
            onClick={() => setF({ ...f, [key]: f[key] === v ? undefined : v })}
          >
            {v}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
      <aside aria-label="Filter fixtures" className="grid content-start gap-6">
        {group(catalog.filters.category, "category", categories)}
        {group(catalog.filters.room, "room", rooms)}
        {group(catalog.filters.ceiling, "ceiling", ceilings)}
        {group(catalog.filters.style, "style", styles)}
        <fieldset>
          <legend className="t-caption mb-2 text-muted">{L.collections}</legend>
          <button
            type="button"
            className="ap-chip"
            aria-pressed={!!f.best}
            onClick={() => setF({ ...f, best: !f.best })}
          >
            {L.bestSellers}
          </button>
        </fieldset>
        {Object.values(f).some(Boolean) && (
          <button
            type="button"
            className="t-small w-fit font-semibold underline underline-offset-4"
            onClick={() => setF({})}
          >
            {catalog.filters.clear}
          </button>
        )}
      </aside>

      <div>
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="t-small text-muted" aria-live="polite">
            {L.count(list.length)}
          </p>
          <label className="flex items-center gap-2 text-[13px]">
            {L.sort.label}
            <select
              className="ap-input !min-h-10 w-auto py-1"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
            >
              <option value="featured">{L.sort.featured}</option>
              <option value="low">{L.sort.low}</option>
              <option value="high">{L.sort.high}</option>
            </select>
          </label>
        </div>
        {list.length === 0 ? (
          <p className="notice">{catalog.empty}</p>
        ) : (
          <CardGrid>
            {list.map((p) => (
              <li key={p.slug}>
                <MediaCard
                  href={productHref(p)}
                  title={p.name}
                  line={p.category}
                  system="E"
                  fit="contain"
                  image={p.image ? { src: p.image, alt: p.name } : undefined}
                  meta={<Price p={p} />}
                />
              </li>
            ))}
          </CardGrid>
        )}
        <p className="t-small mt-10 text-muted">{L.sourceNote}</p>
      </div>
    </div>
  );
}

/** Price with "From" for variable prices; `bare` drops it where a label already says it. */
export function Price({ p, bare }: { p: Product; bare?: boolean }) {
  return (
    <span className="tabular-nums">
      {!bare && !p.fixedPrice && !p.compareAt && (
        <span className="text-[12px] text-muted">{L.from} </span>
      )}
      <strong>{money(p.priceFrom)}</strong>
      {p.compareAt && (
        <span className="ml-1 text-[12px] text-muted line-through">
          <span className="sr-only">{L.was} </span>
          {money(p.compareAt)}
        </span>
      )}
    </span>
  );
}
