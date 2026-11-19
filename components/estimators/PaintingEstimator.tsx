"use client";

import { useMemo, useState } from "react";
import { estimatePainting, type PaintingInput } from "@/lib/estimate";
import { EstimateSheet } from "./EstimateSheet";
import { Check, NumberField, num, Seg } from "./fields";

type Scope = PaintingInput["scope"];

export function PaintingEstimator({
  initialScope = "interior",
}: {
  initialScope?: Scope;
}) {
  const [scope, setScope] = useState<Scope>(initialScope);
  const [sqft, setSqft] = useState("2000");
  const [ceilings, setCeilings] = useState(true);
  const [doors, setDoors] = useState("12");
  const [height, setHeight] = useState<"standard" | "tall" | "vaulted">(
    "standard",
  );
  const [colorChange, setColorChange] = useState(false);
  const [surface, setSurface] = useState<"siding" | "stucco" | "brickTrim">(
    "brickTrim",
  );
  const [stories, setStories] = useState<"one" | "two" | "three">("one");
  const [condition, setCondition] = useState<"good" | "fair" | "poor">("good");
  const [faces, setFaces] = useState("30");
  const [interiors, setInteriors] = useState(false);
  const [hardware, setHardware] = useState(false);

  const input: PaintingInput = useMemo(() => {
    if (scope === "interior")
      return {
        scope,
        sqft: num(sqft),
        ceilings,
        doors: num(doors, 200),
        height,
        colorChange,
      };
    if (scope === "exterior")
      return { scope, sqft: num(sqft), surface, stories, condition };
    return { scope, faces: num(faces, 300), interiors, hardware };
  }, [
    scope,
    sqft,
    ceilings,
    doors,
    height,
    colorChange,
    surface,
    stories,
    condition,
    faces,
    interiors,
    hardware,
  ]);

  const estimate = estimatePainting(input);
  const summary =
    scope === "cabinets"
      ? `Cabinet painting, ${num(faces)} doors/drawers`
      : `${scope === "interior" ? "Interior" : "Exterior"} painting, ${num(sqft).toLocaleString()} sq ft`;

  return (
    <section className="ap-est" aria-labelledby="est-painting">
      <div className="ap-est__inputs">
        <h3 className="ap-est__title" id="est-painting">
          Estimate your painting project
        </h3>
        <Seg
          legend="What are we painting?"
          value={scope}
          onChange={setScope}
          options={[
            { value: "interior", label: "Interior" },
            { value: "exterior", label: "Exterior" },
            { value: "cabinets", label: "Cabinets" },
          ]}
        />
        {scope === "interior" && (
          <>
            <NumberField
              label="Floor area to paint"
              unit="sq ft"
              value={sqft}
              onChange={setSqft}
              max={20000}
              help="The square footage of the rooms you want painted. A whole house: use its listed size."
            />
            <Seg
              legend="Ceiling height"
              value={height}
              onChange={setHeight}
              options={[
                { value: "standard", label: "8–9 ft" },
                { value: "tall", label: "10–12 ft" },
                { value: "vaulted", label: "Vaulted" },
              ]}
            />
            <Check
              label="Include ceilings"
              checked={ceilings}
              onChange={setCeilings}
            />
            <NumberField
              label="Doors to paint (with trim)"
              unit="doors"
              value={doors}
              onChange={setDoors}
              max={200}
              help="Enter 0 to skip trim and doors."
            />
            <Check
              label="Big color change (dark to light, or bold colors)"
              checked={colorChange}
              onChange={setColorChange}
            />
          </>
        )}
        {scope === "exterior" && (
          <>
            <NumberField
              label="Home size"
              unit="sq ft"
              value={sqft}
              onChange={setSqft}
              max={20000}
              help="The home's listed living area is fine."
            />
            <Seg
              legend="Main exterior surface"
              value={surface}
              onChange={setSurface}
              options={[
                { value: "brickTrim", label: "Brick (trim only)" },
                { value: "siding", label: "Siding" },
                { value: "stucco", label: "Stucco" },
              ]}
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
            <Seg
              legend="Current paint condition"
              value={condition}
              onChange={setCondition}
              options={[
                { value: "good", label: "Good" },
                { value: "fair", label: "Some peeling" },
                { value: "poor", label: "Heavy peeling" },
              ]}
            />
          </>
        )}
        {scope === "cabinets" && (
          <>
            <NumberField
              label="Doors and drawer fronts"
              unit="faces"
              value={faces}
              onChange={setFaces}
              max={300}
              help="Count every door and drawer front. An average kitchen has 25–40."
            />
            <Check
              label="Paint cabinet interiors"
              checked={interiors}
              onChange={setInteriors}
            />
            <Check
              label="Install new hardware I've chosen"
              checked={hardware}
              onChange={setHardware}
            />
          </>
        )}
      </div>
      <EstimateSheet
        estimate={estimate}
        service="painting"
        summary={summary}
        emptyText="Enter a size to see your range."
      />
    </section>
  );
}
