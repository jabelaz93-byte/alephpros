import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calculator,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  House,
  LampCeiling,
  LayoutGrid,
  ListChecks,
  PanelLeft,
  Phone,
  Search,
  Users,
  X,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/**
 * The one place the site picks an icon library.
 *
 * Components ask for icons by plain name (<Icon name="phone" />) and never import the library
 * directly. To switch libraries, replace the imports and the `icons` map below with the new
 * library's components, keeping the same names. Nothing else in the project changes.
 *
 * Icons are decorative (aria-hidden); put the accessible name on the button or link.
 */
type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number | string;
  }
>;

const icons = {
  sidebar: PanelLeft,
  close: X,
  search: Search,
  chevron: ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  arrow: ArrowRight,
  external: ArrowUpRight,
  home: House,
  projects: LayoutGrid,
  systems: Building2,
  build: ListChecks,
  store: LampCeiling,
  about: Users,
  quote: Calculator,
  visit: CalendarDays,
  phone: Phone,
} satisfies Record<string, IconComponent>;

export type IconName = keyof typeof icons;

/** One stroke weight across the site, matched to the 1.5px dimension lines. */
const STROKE = 1.5;

export function Icon({
  name,
  size = 18,
  className = "",
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Glyph: IconComponent = icons[name];
  return (
    <Glyph
      size={size}
      strokeWidth={STROKE}
      className={`icon ${className}`.trim()}
      aria-hidden="true"
      focusable="false"
    />
  );
}
