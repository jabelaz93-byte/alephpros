import type { MetadataRoute } from "next";
import { registry } from "@/data/seo/registry";
import { abs } from "@/data/seo/site";

/**
 * Built from data/seo/registry.ts: only indexable pages, each with the date its content last
 * changed. Noindex pages (drafts, placeholders, empty legal docs) are left out automatically.
 * No priority/changefreq: Google ignores them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return registry()
    .filter((e) => e.seo.index)
    .map((e) => ({ url: abs(e.seo.path), lastModified: e.lastModified }));
}
