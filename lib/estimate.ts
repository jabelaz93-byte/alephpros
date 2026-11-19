/** Quote wizard math: turns rates (pricing.ts) and answers into line items. No copy or rates live here. */
import { pricing, type Range } from "./pricing";

export type Line = { name: string; qty: string; low: number; high: number };
export type Estimate = {
  lines: Line[];
  low: number;
  high: number;
  minimumApplied?: boolean;
};

const fmtN = (n: number) => n.toLocaleString("en-US");
const mul = (r: Range, q: number, f = 1): [number, number] => [
  r[0] * q * f,
  r[1] * q * f,
];
const round50 = (n: number) => Math.round(n / 50) * 50;

function total(lines: Line[], minimum = 0): Estimate {
  let low = lines.reduce((a, l) => a + l.low, 0);
  let high = lines.reduce((a, l) => a + l.high, 0);
  let minimumApplied = false;
  if (lines.length && low < minimum) {
    minimumApplied = true;
    high = Math.max(high, minimum * 1.15);
    low = minimum;
  }
  return {
    lines: lines.map((l) => ({
      ...l,
      low: round50(l.low),
      high: round50(l.high),
    })),
    low: round50(low),
    high: round50(high),
    minimumApplied,
  };
}

export const money = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
export const moneyRange = (lo: number, hi: number) =>
  lo === hi ? money(lo) : `${money(lo)} – ${money(hi)}`;

/* ---------------- Painting ---------------- */
export type PaintingInput =
  | {
      scope: "interior";
      sqft: number;
      ceilings: boolean;
      doors: number;
      height: "standard" | "tall" | "vaulted";
      colorChange: boolean;
    }
  | {
      scope: "exterior";
      sqft: number;
      surface: "siding" | "stucco" | "brickTrim";
      stories: "one" | "two" | "three";
      condition: "good" | "fair" | "poor";
    }
  | { scope: "cabinets"; faces: number; interiors: boolean; hardware: boolean };

export function estimatePainting(i: PaintingInput): Estimate {
  const p = pricing.painting;
  const lines: Line[] = [];
  if (i.scope === "interior") {
    if (i.sqft <= 0) return total([]);
    const h = p.interior.ceilingHeight[i.height];
    const [wl, wh] = mul(p.interior.wallsPerFloorSqft, i.sqft, h);
    lines.push({
      name: "Walls",
      qty: `${fmtN(i.sqft)} sq ft of floor area`,
      low: wl,
      high: wh,
    });
    if (i.ceilings) {
      const [l, hi] = mul(p.interior.ceilingsPerFloorSqft, i.sqft, h);
      lines.push({
        name: "Ceilings",
        qty: `${fmtN(i.sqft)} sq ft`,
        low: l,
        high: hi,
      });
    }
    if (i.doors > 0) {
      const [l, hi] = mul(p.interior.perDoor, i.doors);
      lines.push({
        name: "Trim and doors",
        qty: `${i.doors} door${i.doors === 1 ? "" : "s"} with casing`,
        low: l,
        high: hi,
      });
    }
    if (i.colorChange) {
      const [l, hi] = mul(p.interior.colorChange, i.sqft);
      lines.push({
        name: "Primer for color change",
        qty: "Dark to light or bold colors",
        low: l,
        high: hi,
      });
    }
  } else if (i.scope === "exterior") {
    if (i.sqft <= 0) return total([]);
    const f = p.exterior.stories[i.stories] * p.exterior.condition[i.condition];
    const label = {
      siding: "Siding and trim",
      stucco: "Stucco and trim",
      brickTrim: "Trim, fascia and soffits (brick home)",
    }[i.surface];
    const [l, hi] = mul(p.exterior.perHomeSqft[i.surface], i.sqft, f);
    lines.push({
      name: label,
      qty: `${fmtN(i.sqft)} sq ft home, ${i.stories} ${i.stories === "one" ? "story" : "stories"}`,
      low: l,
      high: hi,
    });
  } else {
    if (i.faces <= 0) return total([]);
    const [l, hi] = mul(p.cabinets.perFace, i.faces);
    lines.push({
      name: "Cabinet doors and drawer fronts",
      qty: `${i.faces} faces, sprayed`,
      low: l,
      high: hi,
    });
    if (i.interiors) {
      const [a, b] = mul(p.cabinets.interiorsPerFace, i.faces);
      lines.push({
        name: "Cabinet interiors",
        qty: `${i.faces} boxes`,
        low: a,
        high: b,
      });
    }
    if (i.hardware) {
      const [a, b] = mul(p.cabinets.newHardwarePerFace, i.faces);
      lines.push({
        name: "Install new hardware",
        qty: `${i.faces} pulls or knobs`,
        low: a,
        high: b,
      });
    }
  }
  return total(lines, p.minimum);
}

/* ---------------- Tile & flooring ---------------- */
export type TileMaterial = keyof typeof pricing.tile.labourPerSqft;
export type TileInput = {
  sqft: number;
  material: TileMaterial;
  location: keyof typeof pricing.tile.location;
  removal: keyof typeof pricing.tile.removalPerSqft;
  supply: "customer" | "standard" | "premium";
  leveling: boolean;
};

export const tileMaterialLabel: Record<TileMaterial, string> = {
  porcelain: "Porcelain or ceramic",
  largeFormat: "Large-format porcelain",
  stone: "Marble or natural stone",
  mosaic: "Mosaic",
  lvp: "Luxury vinyl (LVP / LVT)",
};

const tileInstallLabel: Record<TileMaterial, string> = {
  porcelain: "porcelain or ceramic tile",
  largeFormat: "large-format porcelain",
  stone: "marble or natural stone",
  mosaic: "mosaic tile",
  lvp: "luxury vinyl (LVP / LVT)",
};

export function estimateTile(i: TileInput): Estimate {
  const t = pricing.tile;
  if (i.sqft <= 0) return total([]);
  const lines: Line[] = [];
  const loc = t.location[i.location];
  const [l, h] = mul(t.labourPerSqft[i.material], i.sqft, loc);
  lines.push({
    name: `Install ${tileInstallLabel[i.material]}`,
    qty: `${fmtN(i.sqft)} sq ft, ${i.location}`,
    low: l,
    high: h,
  });
  if (i.supply !== "customer") {
    const [a, b] = mul(t.materialPerSqft[i.material][i.supply], i.sqft * 1.1);
    lines.push({
      name: `Material, ${i.supply} range`,
      qty: `${fmtN(Math.ceil(i.sqft * 1.1))} sq ft incl. 10% waste`,
      low: a,
      high: b,
    });
  }
  if (i.removal !== "none") {
    const [a, b] = mul(t.removalPerSqft[i.removal], i.sqft);
    const what = {
      carpet: "carpet",
      vinylOrWood: "vinyl or wood",
      tile: "tile",
    }[i.removal];
    lines.push({
      name: `Remove existing ${what}`,
      qty: "Demolition and haul-off",
      low: a,
      high: b,
    });
  }
  if (i.leveling) {
    const [a, b] = mul(t.levelingPerSqft, i.sqft);
    lines.push({
      name: "Floor leveling",
      qty: `${fmtN(i.sqft)} sq ft`,
      low: a,
      high: b,
    });
  }
  if (i.location === "shower" && i.material !== "lvp") {
    const [a, b] = mul(t.waterproofingPerSqft, i.sqft);
    lines.push({
      name: "Waterproofing membrane",
      qty: "Required in showers",
      low: a,
      high: b,
    });
  }
  return total(lines, t.minimum);
}

/* ---------------- Permanent outdoor lighting ---------------- */
export type OutdoorLightingInput = {
  feet: number;
  system: "govee" | "architectural";
  stories: "one" | "two" | "three";
  newOutlet: boolean;
};

export function estimateOutdoorLighting(i: OutdoorLightingInput): Estimate {
  const o = pricing.outdoorLighting;
  if (i.feet <= 0) return total([]);
  const lines: Line[] = [];
  const label =
    i.system === "govee"
      ? "Govee permanent lights"
      : "Architectural-grade lights";
  const [l, h] = mul(o.perLinearFt[i.system], i.feet, o.stories[i.stories]);
  lines.push({
    name: label,
    qty: `${fmtN(i.feet)} linear ft, ${i.stories} ${i.stories === "one" ? "story" : "stories"}`,
    low: l,
    high: h,
  });
  const c = o.controller[i.system];
  if (c[1] > 0)
    lines.push({
      name: "Controller and app setup",
      qty: "1 system",
      low: c[0],
      high: c[1],
    });
  if (i.newOutlet)
    lines.push({
      name: "New exterior outlet",
      qty: "Weatherproof, by our electrician",
      low: o.newOutlet[0],
      high: o.newOutlet[1],
    });
  return total(lines, o.minimum);
}

/* ---------------- Chandelier installation ---------------- */
export type ChandelierInput = {
  ceiling: keyof typeof pricing.chandelier.byCeiling;
  weight: keyof typeof pricing.chandelier.byWeight;
  crystal: keyof typeof pricing.chandelier.crystalAssembly;
  wiring: keyof typeof pricing.chandelier.wiring;
  dimmer: boolean;
  removeOld: boolean;
  count: number;
};

export const ceilingLabel = {
  standard: "Up to 10 ft",
  high: "11–16 ft",
  veryHigh: "17–23 ft",
  extreme: "Over 23 ft",
} as const;
export const weightLabel = {
  light: "Under 50 lb",
  medium: "50–100 lb",
  heavy: "100–200 lb",
  veryHeavy: "Over 200 lb",
} as const;

export function estimateChandelier(i: ChandelierInput): Estimate {
  const c = pricing.chandelier;
  const n = Math.max(1, Math.min(20, Math.round(i.count || 1)));
  const multiplier = 1 + (n - 1) * (1 - c.additionalFixtureDiscount);
  const lines: Line[] = [];
  const [l, h] = mul(c.byCeiling[i.ceiling], multiplier);
  lines.push({
    name: "Installation and lift access",
    qty: `${n} fixture${n === 1 ? "" : "s"}, ${ceilingLabel[i.ceiling]} ceiling`,
    low: l,
    high: h,
  });
  const w = c.byWeight[i.weight];
  if (w[1] > 0) {
    const [a, b] = mul(w, n);
    lines.push({
      name: "Reinforced mounting",
      qty: `${weightLabel[i.weight]} fixture`,
      low: a,
      high: b,
    });
  }
  const cr = c.crystalAssembly[i.crystal];
  if (cr[1] > 0) {
    const [a, b] = mul(cr, n);
    lines.push({
      name:
        i.crystal === "multiTier"
          ? "Multi-tier crystal assembly"
          : "Crystal and arm assembly",
      qty: "Hang, level and adjust",
      low: a,
      high: b,
    });
  }
  const wi = c.wiring[i.wiring];
  if (wi[1] > 0) {
    const [a, b] = mul(wi, n);
    lines.push({
      name:
        i.wiring === "newBox"
          ? "New fan-rated box"
          : "New circuit to the ceiling",
      qty: "Licensed electrician",
      low: a,
      high: b,
    });
  }
  if (i.dimmer)
    lines.push({
      name: "Dimmer switch",
      qty: "1 location",
      low: c.dimmer[0],
      high: c.dimmer[1],
    });
  if (i.removeOld) {
    const [a, b] = mul(c.removeOld, n);
    lines.push({
      name: "Remove and dispose of old fixture",
      qty: `${n}`,
      low: a,
      high: b,
    });
  }
  return total(lines);
}

/* ---------------- Kitchen & bath remodel ---------------- */
export type RemodelInput = {
  room: "kitchen" | "bathroom";
  size: "small" | "medium" | "large";
  finish: "standard" | "premium" | "luxury";
  layoutChange: boolean;
};

export const remodelSizeHelp = {
  kitchen: {
    small: "Under 120 sq ft",
    medium: "120–200 sq ft",
    large: "Over 200 sq ft",
  },
  bathroom: {
    small: "Powder or hall bath",
    medium: "Full bath, tub or shower",
    large: "Primary bath, separate shower and tub",
  },
} as const;

export function estimateRemodel(i: RemodelInput): Estimate {
  const r = pricing.remodel;
  const base = r[i.room][i.size][i.finish];
  const lines: Line[] = [
    {
      name: `${i.room === "kitchen" ? "Kitchen" : "Bathroom"} remodeling, ${i.finish} finishes`,
      qty: remodelSizeHelp[i.room][i.size],
      low: base[0],
      high: base[1],
    },
  ];
  if (i.layoutChange) {
    lines.push({
      name: "Layout change",
      qty: "Moving plumbing, walls or openings",
      low: base[0] * r.layoutChange[0],
      high: base[1] * r.layoutChange[1],
    });
  }
  lines.push({
    name: "Permits and inspections",
    qty: "Allowance",
    low: r.permitAllowance[0],
    high: r.permitAllowance[1],
  });
  return total(lines);
}
