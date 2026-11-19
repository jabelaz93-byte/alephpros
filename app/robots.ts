import type { MetadataRoute } from "next";
import { abs } from "@/data/seo/site";

/**
 * Crawl rules. Only the API is blocked: noindex pages must stay crawlable so search engines can
 * see their noindex tag (blocking them here would hide it).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: abs("/sitemap.xml"),
  };
}
