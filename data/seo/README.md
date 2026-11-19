# AlephPros SEO data

Same strategy as mrdn.digital: this folder is the single source of truth for everything search
engines and share cards read. Pages only call it; nothing here edits HTML directly.

| File | What it holds |
| --- | --- |
| `site.ts` | Defaults, the production host (`lib/site.ts › url`), the business facts used in structured data (address, phone, hours, the 13 cities), the share card |
| `builders.ts` | `createPageSeo()` → Next.js metadata + JSON-LD for one page; `createNoIndexSeo()`; schema helpers (business, website, service, breadcrumbs) |
| `pages.ts` | SEO for each static route. Words come from that page's `data/<page>.ts › seo` |
| `templates.ts` | One factory per dynamic route: system, service, sub-service, project, product, discipline, city, legal |
| `registry.ts` | Every URL with its SEO and last-modified date. `app/sitemap.ts` lists the indexable ones |

What each page gets: title, description (clipped at 160), canonical URL, robots, Open Graph and
X cards with the share image, and JSON-LD rendered by `components/seo/JsonLd`.

| Page | Structured data |
| --- | --- |
| Home, Contact | `GeneralContractor` (address, phone, hours, area served, licence) + `WebSite` |
| Building system, service, sub-service | `Service` provided by the business, area served = the 13 cities |
| City page | `Service` for that city's featured service, area served = that city |
| Store fixture | `Product` with an `Offer` (fixed price) or `AggregateOffer` (from price) |
| Case study (published only) | `CreativeWork` made by the business, about its main service |
| Every page | `WebPage` (or `CollectionPage` / `AboutPage` / `ContactPage` / `ItemPage`) + `BreadcrumbList` matching the on-page breadcrumb |

## Rules

1. **SEO must match the visible page.** Don't add services, claims, places, reviews or ratings
   the page doesn't show. No review stars: reviews aren't approved yet, and Google doesn't show
   stars for reviews a business publishes about itself.
2. **No content, no index.** `/projects` is noindex until a project is published; draft projects
   are noindex (and 404 in production); legal pages are noindex until their text exists. The
   registry and sitemap follow automatically.
3. **Case studies don't name places.** City pages say only what's confirmed (crews work across
   DFW, Prosper to Wylie) and lead with a different featured service each
   (`data/service-areas.ts › featured`); their "recent work" is chosen by service, not by city.
4. **Real dates only.** Bump `CONTENT` (or a page's own date) in `registry.ts` when content
   changes; projects use the month they were completed.

## Photos and case studies

Any photo on the home page (`data/home.ts`: carousel slides, completed-project cards,
building-system cards, the 23 ft band) can name its case study with `image.project: "<slug>"`.
Once that project is published in `lib/projects.ts`, the photo's space links to it.

## After launch

- Google Search Console: verify the domain, put the code in `GOOGLE_SITE_VERIFICATION`
  (Vercel › Environment Variables), submit `/sitemap.xml`.
- Google Business Profile: same name, address and phone as `lib/site.ts`.
- Check structured data with the Rich Results Test and validator.schema.org.
