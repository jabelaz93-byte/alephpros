# AlephPros: page architecture

The site's page tree. Every URL here has a route in `app/`, a data file in `data/`, and an entry
in `app/sitemap.ts`. URLs are built only in `lib/routes.ts`. Anything outside this tree is a 404.

```
/                                   Home                                     app/page.tsx
│
├── /projects                       Completed projects (published only)      app/projects/page.tsx
│   └── /projects/[slug]            Project page (from the project template) app/projects/[slug]/page.tsx   ◆ slug page
│
├── /building-systems               The five systems                         app/building-systems/page.tsx
│   ├── /structural-building        A  Structural & building systems         app/building-systems/[slug]/page.tsx
│   │   └── /services/remodeling-renovation          A-101                   app/services/[slug]/page.tsx
│   │       ├── /kitchen-remodeling                  A-102                   app/services/[slug]/[sub]/page.tsx
│   │       ├── /bathroom-remodeling                 A-103
│   │       ├── /whole-home-renovation               A-104
│   │       └── /structural-work                     A-105
│   ├── /surface                    I  Surface systems
│   │   ├── /services/painting                       I-101
│   │   │   ├── /interior                            I-102
│   │   │   ├── /exterior                            I-103
│   │   │   └── /cabinets                            I-104
│   │   └── /services/tile-flooring                  I-201
│   │       ├── /tile                                I-202
│   │       ├── /vinyl-flooring                      I-203
│   │       ├── /natural-stone                       I-204
│   │       └── /showers-backsplashes                I-205
│   ├── /electrical-smart           E  Electrical & smart systems
│   │   ├── /services/architectural-lighting         E-101
│   │   │   ├── /permanent-outdoor-lighting          E-102
│   │   │   ├── /recessed-lighting                   E-103
│   │   │   ├── /landscape-lighting                  E-104
│   │   │   └── /lighting-design                     E-105
│   │   ├── /services/chandelier-installation        E-201
│   │   └── /services/power-smart-systems            E-301
│   ├── /plumbing-water             P  Plumbing & water systems
│   │   └── /services/plumbing                       P-101
│   └── /property-operations        G  Property & operations
│       ├── /services/property-management            G-101
│       ├── /services/equipment-rentals              G-201
│       ├── /services/corporate-rentals              G-301
│       └── /services/skilled-trade-training         G-401
│           └── /teens                               G-402
│
├── /how-we-build                   Seven steps + five disciplines           app/how-we-build/page.tsx
│   ├── /project-readiness                                                   app/how-we-build/[slug]/page.tsx
│   ├── /project-management
│   ├── /lean-construction
│   ├── /innovation-and-systems
│   └── /continuous-improvement
│
├── /lighting-store                 Catalog (12 fixtures)                    app/lighting-store/page.tsx
│   └── /lighting-store/[slug]      Product page                             app/lighting-store/[slug]/page.tsx  ◆ slug page
│
├── /estimate                       Quote wizard ("Calculate your project")  app/estimate/page.tsx
├── /contact                        Contact + site visit request (#site-visit) app/contact/page.tsx
├── /team                           Team                                     app/team/page.tsx
├── /service-areas/[city]           13 city pages                            app/service-areas/[city]/page.tsx
├── /legal/[doc]                    Privacy, terms                           app/legal/[doc]/page.tsx
└── 404                                                                      app/not-found.tsx
```

Service URLs are flat (`/services/painting/interior`), not nested under the system URL. The tree
shows where each service *belongs*; the breadcrumb on each page shows the same path
(Home / Building systems / Surface systems / Painting / Interior painting).

## Slug pages: project and product look the same

Some pages are generated from a slug. Two of them are "one thing we can show you" pages and
**must look relatively the same**:

| Page | Route | Data |
| --- | --- | --- |
| Project (case study) | `/projects/[slug]` | `lib/projects.ts` (one entry per job, `publish: true` to show it) |
| Product | `/lighting-store/[slug]` | `lib/products.ts` (one entry per fixture) |

Both render through one template, **`components/patterns/DetailLayout.tsx`**:

1. Breadcrumb
2. Gallery on the left (`Gallery.tsx`; a line-drawing plate until photos exist)
3. Sticky fact panel on the right: tag (service code or category) · name · one-line summary ·
   highlight figure (ceiling height or price) · facts · two actions
4. The page's own sections underneath (scope and services used / installed-in and related fixtures)

Their list pages use one card, **`components/patterns/MediaCard.tsx`**, so `/projects` and
`/lighting-store` read alike too. To change how either looks, change the shared template, not
one page, so the two stay in step. A future slug collection (case studies by city, a second store
category) should use the same template.

The other slug routes (`/building-systems/[slug]`, `/services/[slug]`, `/services/[slug]/[sub]`,
`/how-we-build/[slug]`, `/service-areas/[city]`, `/legal/[doc]`) are content pages built from
`components/patterns/PageHero` + `Section` + `IndexRows`.

## How slug pages are built

- **Prerendered.** Each slug route exports `generateStaticParams` from its registry in `lib/`, so
  every page in the tree is static HTML at build time.
- **`params` inside `<Suspense>`.** Required by Cache Components for instant navigation; the
  skeleton (`PageSkeleton`) only ever shows for URLs that weren't prerendered.
- **Real 404s.** `proxy.ts` checks slug URLs against the same registries and serves the 404 page
  with status 404 for anything unknown (otherwise Cache Components would stream a "soft 404").
- **Unpublished projects.** Listed in `generateStaticParams` (Cache Components needs at least one
  param) but 404 in production. In `pnpm dev` they show with a yellow "Draft" banner so the
  template can be previewed.

## Pages not in the tree

`/about`, `/services` (index), `/faq` and `/careers` are not routes. Links that pointed at them
now go to `/team`, `/building-systems` and `/contact`, and `next.config.ts` redirects `/about` and
`/services` temporarily. Their data files (`data/about.ts`, `data/faq.ts`, `data/careers.ts`) are
kept for when those pages are added. Old alephpros.com URLs from the copy deck redirect
permanently (see `next.config.ts › redirects`).

## SEO

Every page's title, description, canonical, robots, share card and structured data come from
`data/seo/` (same strategy as mrdn.digital). `data/seo/registry.ts` lists every URL with its
index flag and date; `app/sitemap.ts` is built from it. Rules and coverage:
[`data/seo/README.md`](../data/seo/README.md). The share card is `app/opengraph-image.tsx`
(Mayak, from `assets/fonts/*.ttf`).

## Adding a page

1. Add the route under `app/` and its words in `data/<page>.ts`.
2. Add its URL builder to `lib/routes.ts` if it has a slug.
3. Add its SEO in `data/seo/pages.ts` or `templates.ts` and an entry in `data/seo/registry.ts`
   (the sitemap follows), add slug routes to `proxy.ts`, and add it to the tree above.
