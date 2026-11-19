"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { Icon } from "@/components/ui/Icon";
import { menuLabel } from "@/data/shared";
import type { Cta } from "@/data/types";
import type { NavSection, SearchEntry } from "@/lib/navigation";
import { Drawer, type DrawerCard } from "./Drawer";

type Phone = { display: string; href: string };

type NavbarProps = {
  /** Inline desktop links (data/shared.ts › headerLinks). */
  links: Cta[];
  sections: NavSection[];
  openByDefault: string[];
  searchExtras: SearchEntry[];
  phone: Phone;
  card: DrawerCard;
};

/**
 * Site header: menu button, logo, phone and the one black button. The menu itself is the
 * Drawer. ⌘K / Ctrl K opens it straight into search.
 */
export function Navbar({
  links,
  sections,
  openByDefault,
  searchExtras,
  phone,
  card,
}: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusSearch = useRef(false);
  const close = useCallback(() => setOpen(false), []);
  // Home on mobile: see-through header over the hero photo until the page scrolls.
  const overlay = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on every navigation (Link clicks also close through onNavigate).
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on route change by design
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch.current = true;
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock the page behind the open drawer and take it out of the tab order.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    for (const el of document.querySelectorAll("#main, body > footer"))
      el.toggleAttribute("inert", open);
    if (!open && document.activeElement?.closest(".drawer"))
      triggerRef.current?.focus();
  }, [open]);

  return (
    <header
      className={`nav${scrolled ? " nav--scrolled" : ""}${overlay ? " nav--overlay" : ""}`}
    >
      <div className="container-page nav__bar">
        <button
          ref={triggerRef}
          type="button"
          className="nav__menu"
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
        >
          <Icon name="sidebar" />
          <span className="nav__menu-label" aria-hidden="true">
            {menuLabel}
          </span>
          <span className="sr-only">Open menu</span>
        </button>
        <Logo />
        <HeaderLinks links={links} pathname={pathname} />
        <HeaderActions phone={phone} />
      </div>

      <div
        className="drawer-scrim"
        data-open={open}
        onClick={close}
        aria-hidden="true"
      />
      <Drawer
        open={open}
        pathname={pathname}
        sections={sections}
        openByDefault={openByDefault}
        searchExtras={searchExtras}
        card={card}
        focusSearch={focusSearch}
        onClose={close}
      />
    </header>
  );
}

/** Desktop only; below 1024px everything is in the Drawer. */
function HeaderLinks({ links, pathname }: { links: Cta[]; pathname?: string }) {
  return (
    <nav className="nav__links" aria-label="Primary">
      {links.map((l) => {
        const current =
          !!pathname &&
          (pathname === l.href || pathname.startsWith(`${l.href}/`));
        return (
          <Link
            key={l.href}
            href={l.href}
            className="nav__link"
            aria-current={current ? "page" : undefined}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

function HeaderActions({ phone }: { phone: Phone }) {
  return (
    <div className="nav__actions">
      <a href={phone.href} className="nav__phone">
        <Icon name="phone" />
        <span>{phone.display}</span>
        <span className="sr-only">Call</span>
      </a>
      <Link href="/estimate" className="nav__cta">
        Calculate your project
      </Link>
    </div>
  );
}

/** Same bar without behaviour; shown until Navbar is ready. */
export function NavbarFallback({
  links,
  phone,
}: {
  links: Cta[];
  phone: Phone;
}) {
  return (
    <header className="nav">
      <div className="container-page nav__bar">
        <span className="nav__menu" aria-hidden="true">
          <Icon name="sidebar" />
          <span className="nav__menu-label">{menuLabel}</span>
        </span>
        <Logo />
        <HeaderLinks links={links} />
        <HeaderActions phone={phone} />
      </div>
    </header>
  );
}
