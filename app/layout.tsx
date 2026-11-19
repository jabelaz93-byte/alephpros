import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";
import "./globals.css";

// Archivo with its width axis: display sizes are set wider (font-stretch 115–125%).
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AlephPros | Construction & remodeling in Dallas–Fort Worth",
    template: "%s | AlephPros",
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
