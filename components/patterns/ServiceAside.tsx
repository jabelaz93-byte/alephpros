import { FactList } from "@/components/patterns/FeatureGrid";
import { labels, pageLabels } from "@/data/services";
import type { BuildingSystem } from "@/lib/systems";

/** Fact panel in the hero of service and sub-service pages. */
export function ServiceAside({
  system,
  code,
  online,
}: {
  system: BuildingSystem;
  code: string;
  online: boolean;
}) {
  return (
    <FactList
      facts={[
        [pageLabels.facts.system, `${system.code} · ${system.name}`],
        [pageLabels.facts.code, code],
        [
          pageLabels.facts.pricing,
          online ? labels.pricedOnline : labels.pricedOnSite,
        ],
      ]}
    />
  );
}
