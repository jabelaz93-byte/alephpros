import Link from "next/link";
import type { Cta } from "@/data/types";

/** Trail from Home to the current page. The last item is the page itself (not a link). */
export function Breadcrumbs({ trail }: { trail: Cta[] }) {
  return (
    <nav aria-label="Breadcrumb" className="t-caption font-normal text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              ) : (
                <>
                  <Link
                    href={c.href}
                    className="hover:text-ink hover:underline"
                  >
                    {c.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const home: Cta = { label: "Home", href: "/" };
