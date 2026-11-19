import Link from "next/link";
import { BrandText } from "@/components/ui/BrandText";
import { Icon } from "@/components/ui/Icon";
import { SheetCode } from "@/components/ui/SheetCode";

export type IndexRow = {
  href: string;
  title: string;
  code?: string;
  line?: string;
  /** Small text on the right, e.g. "4 services". */
  meta?: string;
};

/** A drawing-set index: one row per page, code · name · one line · arrow. */
export function IndexRows({ rows }: { rows: IndexRow[] }) {
  return (
    <ul className="border-ink border-t">
      {rows.map((r) => (
        <li key={r.href} className="border-concrete border-b">
          <Link
            href={r.href}
            className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-1 py-5 lg:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.3fr)_auto] lg:items-center lg:gap-x-8"
          >
            <span className="pt-0.5 lg:pt-0">
              {r.code ? (
                <SheetCode code={r.code} />
              ) : (
                <span className="block w-6" />
              )}
            </span>
            <span className="font-semibold text-[16px] group-hover:underline lg:text-[18px]">
              <BrandText>{r.title}</BrandText>
            </span>
            <span className="col-start-2 row-start-2 text-[13px] text-muted lg:col-start-auto lg:row-start-auto">
              <BrandText>{r.line}</BrandText>
            </span>
            <span className="col-start-3 row-span-2 row-start-1 flex items-center gap-3 self-center text-muted lg:col-start-auto lg:row-span-1">
              {r.meta && (
                <span className="t-caption hidden lg:inline">{r.meta}</span>
              )}
              <Icon
                name="arrow"
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
