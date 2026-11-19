import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { seoSite } from "@/data/seo/site";
import { systems } from "@/lib/systems";

/**
 * The share card for every page (WhatsApp, Facebook, LinkedIn, X, iMessage previews).
 * Set in Mayak, the logo face. Fonts are read from assets/fonts (.ttf: the image renderer
 * can't read woff2). Generated once at build time.
 */
export const alt = seoSite.ogImage.alt;
export const size = {
  width: seoSite.ogImage.width,
  height: seoSite.ogImage.height,
};
export const contentType = "image/png";

const yellow = "#f5c400";

export default async function Image() {
  const [bold, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Mayak-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Mayak-Medium.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000000",
        padding: "64px 72px",
        fontFamily: "Mayak",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ width: 40, height: 40, background: yellow }} />
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: 2,
          }}
        >
          ALEPHPROS
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: yellow,
            lineHeight: 1.02,
          }}
        >
          Construction & remodeling
        </div>
        <div style={{ fontSize: 38, fontWeight: 500, color: "#eceeeb" }}>
          Dallas–Fort Worth · Priced in writing, built to schedule
        </div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {systems.map((s) => (
          <div
            key={s.code}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "2px solid #3a3e40",
              padding: "10px 16px",
              color: "#d8dcd9",
              fontSize: 24,
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: yellow, fontWeight: 700 }}>{s.code}</span>
            {s.short.split(" ")[0]}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Mayak", data: bold, style: "normal", weight: 700 },
        { name: "Mayak", data: medium, style: "normal", weight: 500 },
      ],
    },
  );
}
