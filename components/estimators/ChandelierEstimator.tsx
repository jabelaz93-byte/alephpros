"use client";

import { useState } from "react";
import {
  type ChandelierInput,
  ceilingLabel,
  estimateChandelier,
  weightLabel,
} from "@/lib/estimate";
import { EstimateSheet } from "./EstimateSheet";
import { Check, NumberField, num, Seg } from "./fields";

export function ChandelierEstimator() {
  const [ceiling, setCeiling] = useState<ChandelierInput["ceiling"]>("high");
  const [weight, setWeight] = useState<ChandelierInput["weight"]>("medium");
  const [crystal, setCrystal] = useState<ChandelierInput["crystal"]>("simple");
  const [wiring, setWiring] = useState<ChandelierInput["wiring"]>("replace");
  const [dimmer, setDimmer] = useState(false);
  const [removeOld, setRemoveOld] = useState(true);
  const [count, setCount] = useState("1");

  const estimate = estimateChandelier({
    ceiling,
    weight,
    crystal,
    wiring,
    dimmer,
    removeOld,
    count: num(count, 20) || 1,
  });
  const summary = `Chandelier install, ${ceilingLabel[ceiling]} ceiling, ${weightLabel[weight]}, ${num(count) || 1} fixture(s)`;

  return (
    <section className="ap-est" aria-labelledby="est-chandelier">
      <div className="ap-est__inputs">
        <h3 className="ap-est__title" id="est-chandelier">
          Estimate your chandelier installation
        </h3>
        <Seg
          legend="Ceiling height"
          value={ceiling}
          onChange={setCeiling}
          options={(
            Object.keys(ceilingLabel) as ChandelierInput["ceiling"][]
          ).map((k) => ({ value: k, label: ceilingLabel[k] }))}
        />
        <Seg
          legend="Fixture weight"
          value={weight}
          onChange={setWeight}
          options={(
            Object.keys(weightLabel) as ChandelierInput["weight"][]
          ).map((k) => ({ value: k, label: weightLabel[k] }))}
          help="Check the product listing. Fixtures over 50 lb need a reinforced mount."
        />
        <Seg
          legend="Assembly"
          value={crystal}
          onChange={setCrystal}
          options={[
            { value: "none", label: "Arrives assembled" },
            { value: "simple", label: "Arms or some crystal" },
            { value: "multiTier", label: "Multi-tier crystal" },
          ]}
        />
        <Seg
          legend="What's on the ceiling now?"
          value={wiring}
          onChange={setWiring}
          options={[
            { value: "replace", label: "A light fixture" },
            { value: "newBox", label: "Box, not rated" },
            { value: "newCircuit", label: "No wiring" },
          ]}
        />
        <NumberField
          label="Number of fixtures"
          unit="fixtures"
          value={count}
          onChange={setCount}
          min={1}
          max={20}
          help="Additional fixtures on the same visit are 10% less each."
        />
        <Check
          label="Add a dimmer switch"
          checked={dimmer}
          onChange={setDimmer}
        />
        <Check
          label="Remove and dispose of the old fixture"
          checked={removeOld}
          onChange={setRemoveOld}
        />
      </div>
      <EstimateSheet
        estimate={estimate}
        service="chandelier-installation"
        summary={summary}
        emptyText="Choose your options to see your range."
      />
    </section>
  );
}
