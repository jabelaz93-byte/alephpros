"use client";

import { useState } from "react";
import {
  estimateOutdoorLighting,
  type OutdoorLightingInput,
} from "@/lib/estimate";
import { EstimateSheet } from "./EstimateSheet";
import { Check, NumberField, num, Seg } from "./fields";

export function OutdoorLightingEstimator() {
  const [feet, setFeet] = useState("150");
  const [system, setSystem] =
    useState<OutdoorLightingInput["system"]>("architectural");
  const [stories, setStories] =
    useState<OutdoorLightingInput["stories"]>("one");
  const [newOutlet, setNewOutlet] = useState(false);

  const estimate = estimateOutdoorLighting({
    feet: num(feet, 3000),
    system,
    stories,
    newOutlet,
  });
  const summary = `Permanent lighting, ${system === "govee" ? "Govee" : "architectural grade"}, ${num(feet)} linear ft`;

  return (
    <section className="ap-est" aria-labelledby="est-lighting">
      <div className="ap-est__inputs">
        <h3 className="ap-est__title" id="est-lighting">
          Estimate your permanent outdoor lighting
        </h3>
        <Seg
          legend="System"
          value={system}
          onChange={setSystem}
          options={[
            { value: "architectural", label: "Architectural grade" },
            { value: "govee", label: "Govee" },
          ]}
          help="Architectural grade: commercial fixtures and a long-term warranty. Govee: app-controlled, budget-friendly."
        />
        <NumberField
          label="Roofline to light"
          unit="linear ft"
          value={feet}
          onChange={setFeet}
          max={3000}
          help="Measure along the front of the house, or count gutter lengths. Not sure? A typical one-story front is 80–150 ft."
        />
        <Seg
          legend="Stories"
          value={stories}
          onChange={setStories}
          options={[
            { value: "one", label: "1" },
            { value: "two", label: "2" },
            { value: "three", label: "3" },
          ]}
        />
        <Check
          label="No exterior outlet near the eaves"
          checked={newOutlet}
          onChange={setNewOutlet}
        />
      </div>
      <EstimateSheet
        estimate={estimate}
        service="architectural-lighting"
        summary={summary}
        emptyText="Enter the linear feet to see your range."
      />
    </section>
  );
}
