"use client";

import { useState } from "react";
import {
  estimateRemodel,
  type RemodelInput,
  remodelSizeHelp,
} from "@/lib/estimate";
import { EstimateSheet } from "./EstimateSheet";
import { Check, Seg } from "./fields";

export function RemodelEstimator({
  initialRoom = "kitchen",
}: {
  initialRoom?: RemodelInput["room"];
}) {
  const [room, setRoom] = useState<RemodelInput["room"]>(initialRoom);
  const [size, setSize] = useState<RemodelInput["size"]>("medium");
  const [finish, setFinish] = useState<RemodelInput["finish"]>("premium");
  const [layoutChange, setLayoutChange] = useState(false);

  const estimate = estimateRemodel({ room, size, finish, layoutChange });
  const summary = `${room === "kitchen" ? "Kitchen" : "Bathroom"} remodel, ${size}, ${finish} finishes${layoutChange ? ", layout change" : ""}`;

  return (
    <section className="ap-est" aria-labelledby="est-remodel">
      <div className="ap-est__inputs">
        <h3 className="ap-est__title" id="est-remodel">
          Plan your remodel budget
        </h3>
        <Seg
          legend="Room"
          value={room}
          onChange={setRoom}
          options={[
            { value: "kitchen", label: "Kitchen" },
            { value: "bathroom", label: "Bathroom" },
          ]}
        />
        <Seg
          legend="Size"
          value={size}
          onChange={setSize}
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
          help={remodelSizeHelp[room][size]}
        />
        <Seg
          legend="Finish level"
          value={finish}
          onChange={setFinish}
          options={[
            { value: "standard", label: "Standard" },
            { value: "premium", label: "Premium" },
            { value: "luxury", label: "Luxury" },
          ]}
          help={
            finish === "standard"
              ? "Stock cabinets, quartz or granite, porcelain tile."
              : finish === "premium"
                ? "Semi-custom cabinets, quartz, designer tile, upgraded fixtures."
                : "Custom cabinetry, natural stone, statement lighting, high-end fixtures."
          }
        />
        <Check
          label="Change the layout (move plumbing, walls or openings)"
          checked={layoutChange}
          onChange={setLayoutChange}
        />
      </div>
      <EstimateSheet
        estimate={estimate}
        service="remodeling-renovation"
        summary={summary}
        emptyText="Choose your options to see your range."
      />
    </section>
  );
}
