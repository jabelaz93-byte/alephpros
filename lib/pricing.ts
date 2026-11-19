/**
 * AlephPros pricing: the single place for quote wizard rates. Rates only; service names and copy live in services.ts.
 *
 * IMPORTANT: every number below is a PLACEHOLDER based on typical
 * Dallas–Fort Worth ranges. Replace them with AlephPros's real rates
 * before launch. Each rate is a [low, high] pair in US dollars.
 */

export type Range = readonly [number, number];
export type EstimatorKind =
  | "painting"
  | "tile"
  | "outdoor-lighting"
  | "chandelier"
  | "remodel";

/** Each quote wizard prices one service (code from services.ts); names match the service names. */
export const estimatorMeta: Record<
  EstimatorKind,
  { name: string; short: string; service: string }
> = {
  painting: {
    name: "Painting",
    short: "Interior, exterior or cabinets, by the square foot.",
    service: "I-101",
  },
  tile: {
    name: "Tile & flooring",
    short: "Tile, vinyl or stone, by area and material.",
    service: "I-201",
  },
  "outdoor-lighting": {
    name: "Permanent outdoor lighting",
    short: "Roofline lighting, by the linear foot.",
    service: "E-102",
  },
  chandelier: {
    name: "Chandelier installation",
    short: "By ceiling height, weight and wiring.",
    service: "E-201",
  },
  remodel: {
    name: "Kitchen & bathroom remodeling",
    short: "Planning budget by size and finish level.",
    service: "A-101",
  },
};

export const pricing = {
  painting: {
    interior: {
      wallsPerFloorSqft: [2.0, 3.0] as Range, // per sq ft of floor area painted
      ceilingsPerFloorSqft: [0.75, 1.2] as Range,
      perDoor: [75, 115] as Range, // trim + door, per door
      ceilingHeight: { standard: 1, tall: 1.12, vaulted: 1.28 }, // 8–9 ft, 10–12 ft, vaulted / 2-story
      colorChange: [0.35, 0.6] as Range, // extra per floor sq ft for primer on dark-to-light changes
    },
    exterior: {
      perHomeSqft: {
        siding: [2.4, 3.6] as Range,
        stucco: [2.6, 4.0] as Range,
        brickTrim: [0.9, 1.5] as Range,
      },
      stories: { one: 1, two: 1.2, three: 1.38 },
      condition: { good: 1, fair: 1.12, poor: 1.28 },
    },
    cabinets: {
      perFace: [110, 165] as Range, // per door or drawer front
      newHardwarePerFace: [12, 25] as Range, // labour to install customer-chosen hardware
      interiorsPerFace: [35, 60] as Range,
    },
    minimum: 850,
  },
  tile: {
    labourPerSqft: {
      porcelain: [7, 12] as Range,
      largeFormat: [10, 17] as Range,
      stone: [14, 24] as Range,
      mosaic: [18, 30] as Range,
      lvp: [2.75, 4.5] as Range,
    },
    materialPerSqft: {
      // when AlephPros supplies material
      porcelain: { standard: [3, 6] as Range, premium: [7, 14] as Range },
      largeFormat: { standard: [5, 9] as Range, premium: [10, 20] as Range },
      stone: { standard: [8, 14] as Range, premium: [16, 35] as Range },
      mosaic: { standard: [12, 20] as Range, premium: [22, 45] as Range },
      lvp: { standard: [2.5, 4] as Range, premium: [4.5, 7] as Range },
    },
    location: { floor: 1, walls: 1.15, shower: 1.35, backsplash: 1.25 },
    removalPerSqft: {
      none: [0, 0] as Range,
      carpet: [0.75, 1.25] as Range,
      vinylOrWood: [1.5, 2.5] as Range,
      tile: [2.5, 4.5] as Range,
    },
    levelingPerSqft: [1.5, 3.25] as Range,
    waterproofingPerSqft: [6, 10] as Range,
    minimum: 1200,
  },
  outdoorLighting: {
    perLinearFt: { govee: [16, 24] as Range, architectural: [30, 45] as Range },
    controller: { govee: [0, 0] as Range, architectural: [250, 400] as Range },
    stories: { one: 1, two: 1.15, three: 1.3 },
    newOutlet: [180, 350] as Range,
    minimum: 1500,
  },
  chandelier: {
    byCeiling: {
      standard: [225, 375] as Range,
      high: [450, 750] as Range,
      veryHigh: [800, 1400] as Range,
      extreme: [1400, 2400] as Range,
    },
    byWeight: {
      light: [0, 0] as Range,
      medium: [75, 175] as Range,
      heavy: [250, 500] as Range,
      veryHeavy: [450, 900] as Range,
    },
    crystalAssembly: {
      none: [0, 0] as Range,
      simple: [100, 250] as Range,
      multiTier: [300, 700] as Range,
    },
    wiring: {
      replace: [0, 0] as Range,
      newBox: [150, 300] as Range,
      newCircuit: [350, 750] as Range,
    },
    dimmer: [120, 190] as Range,
    removeOld: [60, 150] as Range,
    additionalFixtureDiscount: 0.1, // 10% off each additional fixture on the same visit
  },
  remodel: {
    kitchen: {
      small: {
        standard: [28000, 42000],
        premium: [42000, 65000],
        luxury: [65000, 95000],
      },
      medium: {
        standard: [38000, 58000],
        premium: [58000, 90000],
        luxury: [90000, 140000],
      },
      large: {
        standard: [52000, 80000],
        premium: [80000, 125000],
        luxury: [125000, 200000],
      },
    } as Record<string, Record<string, Range>>,
    bathroom: {
      small: {
        standard: [12000, 19000],
        premium: [19000, 30000],
        luxury: [30000, 45000],
      },
      medium: {
        standard: [17000, 27000],
        premium: [27000, 42000],
        luxury: [42000, 65000],
      },
      large: {
        standard: [25000, 40000],
        premium: [40000, 62000],
        luxury: [62000, 95000],
      },
    } as Record<string, Record<string, Range>>,
    layoutChange: [0.12, 0.22] as Range, // added share of the base for moving plumbing / walls
    permitAllowance: [400, 1500] as Range,
  },
} as const;

export const ESTIMATE_NOTE =
  "This is a planning price, not a final quote. We confirm it after measuring on site.";
