import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { preload } from "react-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { seoSite } from "@/data/seo/site";
import { site } from "@/lib/site";
import "./globals.css";

// Archivo with its width axis: display sizes are set wider (font-stretch 115–125%).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/** Site-wide defaults; each page sets its own SEO from data/seo (see data/seo/site.ts). */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seoSite.defaultTitle, template: "%s | AlephPros" },
  description: seoSite.defaultDescription,
  applicationName: site.name,
  formatDetection: { telephone: false },
  ...(seoSite.googleVerification
    ? { verification: { google: seoSite.googleVerification } }
    : {}),
};

/** Weight the logo uses on every page (--logo-weight). Change both together. */
const LOGO_FONT = "/fonts/Mayak-Bold.woff2";

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Load the logo face early so the header logo never flashes in the fallback font.
  preload(LOGO_FONT, {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-vellum text-ink">
        <a
          href="#main"
          className="t-small sr-only z-[60] bg-yellow px-4 py-2 text-on-yellow focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <div className="frame-rails" aria-hidden="true" />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
