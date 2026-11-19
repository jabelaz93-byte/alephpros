"use client";

import Link from "next/link";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Logo } from "@/components/site/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { NavItem, NavSection, SearchEntry } from "@/lib/navigation";

export type DrawerCard = { title: string; lines: string[] };

type DrawerProps = {
  open: boolean;
  pathname: string;
  sections: NavSection[];
  openByDefault: string[];
  searchExtras: SearchEntry[];
  card: DrawerCard;
  /** Set to true before opening to land in the search box. */
  focusSearch: RefObject<boolean>;
  onClose: () => void;
};

type Result = {
  label: string;
  href: string;
  where: string;
  icon?: IconName;
  code?: string;
};

const EXTERNAL = /^(https?:|mailto:|tel:)/;

/**
 * Left sidebar menu: brand, search, grouped sections with icons, expandable groups with counts,
 * a contact card and a close row.
 * Focus moves in on open and back to the trigger on close; Tab stays inside; Escape closes.
 * Search finds every menu row, building system and service (by name or sheet code).
 */
export function Drawer({
  open,
  pathname,
  sections,
  openByDefault,
  searchExtras,
  card,
  focusSearch,
  onClose,
}: DrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [shortcut, setShortcut] = useState("Ctrl K");

  const isActive = (href?: string) =>
    !!href &&
    !EXTERNAL.test(href) &&
    (href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`));

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const s = new Set(openByDefault);
    for (const sec of sections)
      for (const i of sec.items)
        if (i.children?.some((c) => isActive(c.href))) s.add(i.label);
    return s;
  });

  const toggle = (label: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setShortcut("⌘K");
  }, []);

  // A closed drawer is out of the tab order and the accessibility tree.
  useEffect(() => {
    panelRef.current?.toggleAttribute("inert", !open);
  }, [open]);

  // Focus on open, Escape to close, keep Tab inside.
  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const t = setTimeout(() => {
      if (focusSearch.current) searchRef.current?.focus();
      else closeRef.current?.focus();
      focusSearch.current = false;
    }, 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled])",
      );
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, focusSearch]);

  const index = useMemo<Result[]>(() => {
    const rows = sections.flatMap((sec) =>
      sec.items.flatMap((i) => [
        ...(i.href
          ? [{ label: i.label, href: i.href, where: sec.title, icon: i.icon }]
          : []),
        ...(i.children ?? []).map((c) => ({
          label: c.label,
          href: c.href,
          where: i.label,
          icon: i.icon,
          code: c.code,
        })),
      ]),
    );
    const seen = new Set(rows.map((r) => r.href));
    return [...rows, ...searchExtras.filter((e) => !seen.has(e.href))];
  }, [sections, searchExtras]);

  const q = query.trim().toLowerCase();
  const results = q
    ? index
        .filter(
          (r) =>
            r.label.toLowerCase().includes(q) ||
            r.where.toLowerCase().includes(q) ||
            r.code?.toLowerCase().startsWith(q),
        )
        .slice(0, 20)
    : [];

  return (
    <aside
      id="site-drawer"
      ref={panelRef}
      className="drawer"
      data-open={open}
      aria-label="Site menu"
      aria-hidden={!open}
    >
      <div className="drawer__head">
        <Link
          href="/"
          className="drawer__brand"
          aria-label="AlephPros home"
          onNavigate={onClose}
        >
          <Logo size="sm" href={null} />
        </Link>
        <button
          ref={closeRef}
          type="button"
          className="drawer__icon-btn"
          onClick={onClose}
        >
          <Icon name="close" />
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      <label className="drawer__search">
        <Icon name="search" />
        <span className="sr-only">Search the site</span>
        <input
          id="drawer-search"
          ref={searchRef}
          type="search"
          placeholder="Search services and pages"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <kbd>{shortcut}</kbd>
      </label>

      <nav className="drawer__body" aria-label="Main">
        {q ? (
          <section className="drawer__section">
            <p className="drawer__label" aria-live="polite">
              {results.length === 0
                ? "No matches"
                : `${results.length} ${results.length === 1 ? "result" : "results"}`}
            </p>
            {results.length === 0 ? (
              <p className="drawer__empty">
                Nothing matches “{query}”. Try a service like “tile” or a code
                like “E-201”, or{" "}
                <Link href="/contact" onNavigate={onClose}>
                  ask us directly
                </Link>
                .
              </p>
            ) : (
              <ul className="drawer__list">
                {results.map((r) => (
                  <li key={r.href + r.label}>
                    <ItemLink
                      href={r.href}
                      className="drawer__row drawer__row--result"
                      onNavigate={onClose}
                    >
                      {r.code ? (
                        <SheetCode code={r.code} />
                      ) : (
                        <Icon name={r.icon ?? "search"} />
                      )}
                      <span className="drawer__result">
                        <span>{r.label}</span>
                        <span className="drawer__where">{r.where}</span>
                      </span>
                    </ItemLink>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          sections.map((sec) => (
            <section key={sec.title} className="drawer__section">
              <p className="drawer__label">{sec.title}</p>
              <ul className="drawer__list">
                {sec.items.map((item) => (
                  <li key={item.label}>
                    <Row
                      item={item}
                      isActive={isActive}
                      expanded={expanded.has(item.label)}
                      onToggle={toggle}
                      onNavigate={onClose}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </nav>

      <div className="drawer__foot">
        <div className="drawer__card">
          <p className="drawer__card-title">{card.title}</p>
          {card.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <button
          type="button"
          className="drawer__row drawer__collapse"
          onClick={onClose}
        >
          <Icon name="sidebar" />
          Close menu
        </button>
      </div>
    </aside>
  );
}

/** Building-system sheet code, e.g. "E" or "E-201". */
function SheetCode({ code }: { code: string }) {
  return <span className="drawer__code">{code}</span>;
}

/** Internal links use next/link (and close the drawer); tel:, mailto: and web links open normally. */
function ItemLink({
  href,
  className,
  onNavigate,
  current,
  children,
}: {
  href: string;
  className: string;
  onNavigate: () => void;
  current?: boolean;
  children: ReactNode;
}) {
  if (EXTERNAL.test(href)) {
    const web = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        target={web ? "_blank" : undefined}
        rel={web ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      aria-current={current ? "page" : undefined}
      onNavigate={onNavigate}
    >
      {children}
    </Link>
  );
}

function Row({
  item,
  isActive,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  isActive: (href?: string) => boolean;
  expanded: boolean;
  onToggle: (label: string) => void;
  onNavigate: () => void;
}) {
  const web = !!item.href?.startsWith("http");
  const hasChildren = !!item.children?.length;
  const count = item.count ?? item.children?.length ?? 0;
  const groupId = `drawer-group-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
  const current =
    isActive(item.href) && !item.children?.some((c) => isActive(c.href));

  const inner = (
    <>
      <Icon name={item.icon} />
      <span className="drawer__text">{item.label}</span>
      {count > 0 && <span className="drawer__count">{count}</span>}
      {web && <Icon name="external" className="drawer__ext" />}
    </>
  );

  return (
    <>
      <div className="drawer__rowwrap">
        {item.href ? (
          <ItemLink
            href={item.href}
            className="drawer__row"
            onNavigate={onNavigate}
            current={current}
          >
            {inner}
          </ItemLink>
        ) : (
          <button
            type="button"
            className="drawer__row"
            aria-expanded={expanded}
            aria-controls={groupId}
            onClick={() => onToggle(item.label)}
          >
            {inner}
          </button>
        )}
        {hasChildren && (
          <button
            type="button"
            className="drawer__chev"
            aria-expanded={expanded}
            aria-controls={groupId}
            onClick={() => onToggle(item.label)}
          >
            <Icon name="chevron" />
            <span className="sr-only">
              {expanded ? "Hide" : "Show"} {item.label}
            </span>
          </button>
        )}
      </div>

      {hasChildren && (
        <ul id={groupId} className="drawer__sub" hidden={!expanded}>
          {item.children?.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="drawer__subrow"
                aria-current={isActive(c.href) ? "page" : undefined}
                onNavigate={onNavigate}
              >
                {c.code && <SheetCode code={c.code} />}
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
