import { SystemDrawing } from "@/components/graphics/SystemDrawing";
import type { SystemCode } from "@/lib/systems";

/**
 * Stand-in for a photo we don't have yet: the system's line drawing on a pale plate with a
 * "Photo to come" label. Real AlephPros jobs only; never fill this with stock.
 */
export function PhotoPlate({
  system,
  label,
}: {
  system: SystemCode;
  label?: string;
}) {
  return (
    <div className="absolute inset-0 bg-[#eef0ed] text-[#2b2e30]">
      <SystemDrawing
        code={system}
        className="absolute inset-x-[12%] bottom-0 h-[78%] w-[76%]"
      />
      {label && (
        <span className="t-caption absolute top-4 left-4 bg-white/80 px-2 py-1 font-normal text-[#2b2e30]">
          {label}
        </span>
      )}
    </div>
  );
}
