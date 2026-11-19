# AlephPros website

Marketing site for **AlephPros**, construction and remodeling in Dallas–Fort Worth
(McKinney, TX). Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4
and TypeScript.

## Getting started

Requirements: Node.js 20+ and pnpm (the version is pinned in `package.json` › `packageManager`;
`corepack enable` picks it up).

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `pnpm dev` | Development server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Biome lint + format check |
| `pnpm format` | Biome format, writing changes |

> This Next.js version has breaking changes from older releases. Read `AGENTS.md` and the docs in
> `node_modules/next/dist/docs/` before changing framework code.

## Project structure

The full page tree, and how the slug pages work, is in **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

```
app/                 Routes. Each page.tsx is thin: metadata + sections, words from data/.
  api/quote/         Contact / site-visit form endpoint (forwarding still TODO)
components/
  layout/            Site shell: SiteHeader (server) → Navbar (client) → Drawer (left menu)
  patterns/          Page building blocks: PageHero, Section, IndexRows, FeatureGrid,
                     MediaCard, DetailLayout (shared project/product template), Breadcrumbs
  home/              Home page sections (HeroCarousel, Ticker, BuildingSystems, ClosingBand, …)
  estimators/        Quote calculators (painting, tile, lighting, chandelier, remodel)
  contact/ store/    Contact form, store catalog
  graphics/          Line drawings (SystemDrawing)
  ui/                Small shared pieces: Icon, ButtonLink, SheetCode, TextLink, PhotoPlate
  site/              Logo, Footer
data/                One TypeScript file per page with that page's words (SEO, headings, buttons).
                     shared.ts = header links, CTA vocabulary, footer. types.ts = shared shapes.
lib/                 Registries and logic: systems, services, projects, products, team,
                     testimonials, pricing/estimate, navigation (menu + search), routes (URLs).
styles/              Component CSS, one file per area, loaded from app/globals.css in
                     Tailwind's components layer (layout, navigation, home, forms).
proxy.ts             Real 404 status for unknown slugs (see docs/ARCHITECTURE.md)
public/images/       Real project photos only (no stock, no renders).
public/fonts/        Logo font goes here; not committed (see below).
docs/                ARCHITECTURE.md: page tree, slug pages, adding a page.
```

**Where content lives.** A page's own words are in `data/<page>.ts`. Anything listed in more than
one place (building systems, services and their codes, projects, products, people) lives once in
`lib/` and is read from there. Service codes (e.g. `E-201`) are checked at build time: an
unknown code in `data/home.ts` fails the build.

**Design tokens.** Colours, type scale and the page column are in `app/globals.css`:
`--page-width` (80% of the screen on desktop), `--page-gutter` (mobile/tablet side gap) and
`--rail-offset` (frame rails outside the column). `data-theme="night"` on a section flips the
palette for black bands.

**Icons.** Lucide, used only through `components/ui/Icon.tsx` (`<Icon name="phone" />`). To change
icon library, edit that one file and keep the names.

## Logo font (Mayak Bold)

The logo uses **Mayak Bold** by ParaType, a commercial font. It is **not** in this repository.
Add the licensed web-font file at `public/fonts/Mayak-Bold.woff2` (or `.otf`); `app/globals.css`
loads it automatically. Without it the logo falls back to Archivo Bold. Font files in
`public/fonts/` are ignored by git so the licence isn't redistributed.

## Content still to confirm

Search for `TODO` in `data/` and `lib/`. Notably: project write-ups (`publish: false` until owners
approve), testimonial approvals, team names and licence numbers, FAQ and legal text, social URLs.
