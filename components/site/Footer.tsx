import Link from "next/link";
import type { ReactNode } from "react";
import { footer } from "@/data/shared";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

/**
 * Title-block footer, like the corner of a construction drawing, then the link columns and the
 * name fitted to the full width in yellow. Words and links come from data/shared.ts.
 * Mobile: blurb, office and contact in the title block, then one short link list.
 */
export function Footer() {
  const lic = site.licenses[0];
  const legalLine = `${footer.rights} ${lic.label} license ${lic.number}.`;
  return (
    <footer data-theme="night" className="bg-black text-ink">
      <div className="container-page pt-14 lg:pt-16">
        {/* Title block */}
        <div className="grid grid-cols-2 border-[3px] border-ink lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <Cell className="col-span-2 lg:col-span-1">
            <span className="hidden lg:block">
              <Logo href={null} />
            </span>
            <p className="t-small text-ink lg:mt-4 lg:max-w-[40ch]">
              {footer.blurb}
            </p>
          </Cell>
          <Cell
            label="Office"
            className="border-concrete border-t lg:border-t-0 lg:border-l"
          >
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
          </Cell>
          <Cell
            label="Hours"
            className="hidden border-concrete lg:block lg:border-l"
          >
            {site.hours.map((h) => (
              <span key={h.days} className="block">
                {h.days} {h.time}
              </span>
            ))}
          </Cell>
          <Cell
            label="Contact"
            className="border-concrete border-t border-l lg:border-t-0"
          >
            {footer.contact.map((c) => (
              <a key={c.label} href={c.href} className="block hover:underline">
                {c.label}
              </a>
            ))}
            <span className="block lg:hidden">{footer.hoursShort}</span>
          </Cell>
        </div>

        {/* Link columns (desktop) */}
        <nav
          aria-label="Footer"
          className="mt-10 hidden grid-cols-5 gap-8 lg:grid"
        >
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="t-caption text-muted">{col.title}</p>
              <ul className="mt-3 space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="t-small text-ink hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="t-caption text-muted">{footer.serviceAreas.title}</p>
            <p className="t-small mt-3 text-ink">
              {footer.serviceAreas.cities.join(", ")}
            </p>
          </div>
        </nav>

        {/* Short link list (mobile) */}
        <nav aria-label="Footer" className="mt-8 lg:hidden">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {footer.mobileLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="t-small text-ink hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="t-small mt-8 hidden flex-wrap items-center gap-x-7 gap-y-2 text-muted lg:flex">
          <span>{legalLine}</span>
          <span className="flex-1" />
          {footer.legal.map((l) => (
            <Link key={l.label} href={l.href} className="hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* The name at the end, fitted edge to edge. */}
      <div className="container-page pt-10 pb-4 lg:pb-6" aria-hidden="true">
        <svg
          viewBox="0 0 1000 118"
          className="block w-full"
          role="presentation"
        >
          <text
            x="0"
            y="112"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-logo"
            style={{
              fontSize: 142,
              fontWeight: 700,
              fill: "var(--aleph-yellow)",
            }}
          >
            ALEPHPROS
          </text>
        </svg>
      </div>
      <p className="container-page t-caption pb-8 font-normal text-muted lg:hidden">
        {legalLine}
      </p>
    </footer>
  );
}

function Cell({
  label,
  className = "",
  children,
}: {
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`t-small p-5 lg:p-6 ${className}`}>
      {label && <p className="t-caption mb-2 text-muted">{label}</p>}
      <div className="text-ink">{children}</div>
    </div>
  );
}
