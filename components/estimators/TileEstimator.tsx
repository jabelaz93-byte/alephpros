"use client";

import { useState } from "react";
import {
  estimateTile,
  type TileInput,
  type TileMaterial,
  tileMaterialLabel,
} from "@/lib/estimate";
import { EstimateSheet } from "./EstimateSheet";
import { Check, NumberField, num, Seg } from "./fields";

export function TileEstimator({
  initialMaterial = "porcelain",
}: {
  initialMaterial?: TileMaterial;
}) {
  const [sqft, setSqft] = useState("250");
  const [material, setMaterial] = useState<TileMaterial>(initialMaterial);
  const [location, setLocation] = useState<TileInput["location"]>("floor");
  const [removal, setRemoval] = useState<TileInput["removal"]>("none");
  const [supply, setSupply] = useState<TileInput["supply"]>("standard");
  const [leveling, setLeveling] = useState(false);

  const isVinyl = material === "lvp";
  const loc = isVinyl ? "floor" : location;
  const estimate = estimateTile({
    sqft: num(sqft, 20000),
    material,
    location: loc,
    removal,
    supply,
    leveling,
  });
  const summary = `${tileMaterialLabel[material]}, ${loc}, ${num(sqft).toLocaleString()} sq ft`;

  return (
    <section className="ap-est" aria-labelledby="est-tile">
      <div className="ap-est__inputs">
        <h3 className="ap-est__title" id="est-tile">
          Estimate your tile or flooring
        </h3>
        <NumberField
          label="Area"
          unit="sq ft"
          value={sqft}
          onChange={setSqft}
          max={20000}
          help="Length × width of each room, added together."
        />
        <div className="ap-field">
          <label className="ap-field__label" htmlFor="tile-material">
            Material
          </label>
          <select
            id="tile-material"
            className="ap-input"
            value={material}
            onChange={(e) => setMaterial(e.target.value as TileMaterial)}
          >
            {(Object.keys(tileMaterialLabel) as TileMaterial[]).map((m) => (
              <option key={m} value={m}>
                {tileMaterialLabel[m]}
              </option>
            ))}
          </select>
        </div>
        <Seg
          legend="Where"
          value={loc}
          onChange={setLocation}
          options={
            isVinyl
              ? [{ value: "floor", label: "Floor" }]
              : [
                  { value: "floor", label: "Floor" },
                  { value: "walls", label: "Walls" },
                  { value: "shower", label: "Shower" },
                  { value: "backsplash", label: "Backsplash" },
                ]
          }
        />
        <Seg
          legend="What's there now?"
          value={removal}
          onChange={setRemoval}
          options={[
            { value: "none", label: "Nothing / bare" },
            { value: "carpet", label: "Carpet" },
            { value: "vinylOrWood", label: "Vinyl or wood" },
            { value: "tile", label: "Tile" },
          ]}
        />
        <Seg
          legend="Material supply"
          value={supply}
          onChange={setSupply}
          options={[
            { value: "customer", label: "I'll supply it" },
            { value: "standard", label: "Standard" },
            { value: "premium", label: "Premium" },
          ]}
          help="Standard and premium include 10% extra for cuts and waste."
        />
        <Check
          label="Floor needs leveling"
          checked={leveling}
          onChange={setLeveling}
        />
      </div>
      <EstimateSheet
        estimate={estimate}
        service="tile-flooring"
        summary={summary}
        emptyText="Enter the area to see your range."
      />
    </section>
  );
}
