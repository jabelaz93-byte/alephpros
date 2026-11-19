import type { JsonLd as JsonLdData } from "@/data/seo/builders";

/**
 * Renders a page's structured data. `<` is escaped so no value can close the script tag
 * (Next.js JSON-LD guide). Place it once per page, from the page's PageSeo.
 */
export function JsonLd({ data }: { data: JsonLdData[] }) {
  if (!data.length) return null;
  const graph = data.length === 1 ? data[0] : data;
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be raw JSON; `<` is escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
