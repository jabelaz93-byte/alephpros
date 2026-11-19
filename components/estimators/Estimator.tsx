import type { EstimatorKind } from "@/lib/pricing";
import { ChandelierEstimator } from "./ChandelierEstimator";
import { OutdoorLightingEstimator } from "./OutdoorLightingEstimator";
import { PaintingEstimator } from "./PaintingEstimator";
import { RemodelEstimator } from "./RemodelEstimator";
import { TileEstimator } from "./TileEstimator";

/** Renders the estimator for a kind. `variant` lets sub-pages preselect a scope. */
export function Estimator({
  kind,
  variant,
}: {
  kind: EstimatorKind;
  variant?: string;
}) {
  switch (kind) {
    case "painting":
      return (
        <PaintingEstimator
          initialScope={
            variant === "exterior" || variant === "cabinets"
              ? variant
              : "interior"
          }
        />
      );
    case "tile":
      return (
        <TileEstimator
          initialMaterial={
            variant === "vinyl-flooring"
              ? "lvp"
              : variant === "natural-stone"
                ? "stone"
                : "porcelain"
          }
        />
      );
    case "outdoor-lighting":
      return <OutdoorLightingEstimator />;
    case "chandelier":
      return <ChandelierEstimator />;
    case "remodel":
      return (
        <RemodelEstimator
          initialRoom={
            variant === "bathroom-remodeling" ? "bathroom" : "kitchen"
          }
        />
      );
  }
}
