import { Suspense } from "react";
import { headerLinks } from "@/data/shared";
import { navigation, openByDefault, searchExtras } from "@/lib/navigation";
import { site } from "@/lib/site";
import { Navbar, NavbarFallback } from "./Navbar";

/**
 * Server wrapper for the header. Builds the menu from the data files here on the server and
 * passes only labels and links to the client Navbar, so the page data never ships to the browser.
 *
 * Navbar sits inside <Suspense> because usePathname can suspend under Cache Components on
 * routes with dynamic params that generateStaticParams doesn't cover.
 */
export function SiteHeader() {
  const card = {
    title: "Construction & remodeling",
    lines: [
      `${site.address.city}, ${site.address.region} · Dallas–Fort Worth`,
      site.phone.display,
    ],
  };

  return (
    <Suspense
      fallback={<NavbarFallback links={headerLinks} phone={site.phone} />}
    >
      <Navbar
        links={headerLinks}
        sections={navigation}
        openByDefault={openByDefault}
        searchExtras={searchExtras}
        phone={site.phone}
        card={card}
      />
    </Suspense>
  );
}
