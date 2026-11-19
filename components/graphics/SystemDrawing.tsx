import type { ReactNode } from "react";
import type { SystemCode } from "@/lib/systems";

/**
 * Line drawing for a building system that has no project photo yet. Drawn like an elevation:
 * one 1.5px stroke, a ground line, no fills. Replace with a real photo in data/home.ts.
 */
const drawings: Record<SystemCode, ReactNode> = {
  // Kitchen elevation: three pendants over an upper cabinet, counter and base cabinets.
  A: (
    <>
      <path d="M0 12h240" />
      <path d="M60 12v22M120 12v22M180 12v22" />
      <path d="M52 34h16l-3 8H55zM112 34h16l-3 8h-10zM172 34h16l-3 8h-10z" />
      <rect x="22" y="58" width="196" height="56" />
      <path d="M8 146h224" />
      <path d="M22 146v104M62 146v104M102 146v104M142 146v104M182 146v104M218 146v104" />
    </>
  ),
  // Floor in perspective, with a door in the back wall.
  I: (
    <>
      <rect x="150" y="34" width="44" height="104" />
      <path d="M0 150h240" />
      <path d="M0 250 70 150M40 250 95 150M80 250 120 150M120 250 145 150M160 250 170 150M200 250 195 150M240 250 220 150" />
      <path d="M8 170h232M0 192h240M0 218h240" />
    </>
  ),
  E: (
    <>
      <path d="M0 12h240M120 12v60" />
      <path d="M80 72h80l-12 28H92z" />
      <path d="M0 250h240" />
    </>
  ),
  // Bathroom: mirror and vanity on the left, tiled shower wall on the right.
  P: (
    <>
      <rect x="14" y="22" width="56" height="80" />
      <path d="M8 138h76M14 138v112M78 138v112" />
      <ellipse cx="38" cy="128" rx="18" ry="6" />
      <rect x="116" y="18" width="104" height="232" />
      <path d="M116 50h104M116 82h104M116 114h104M116 146h104M116 178h104M116 210h104" />
      <path d="M142 18v232M168 18v232M194 18v232" />
    </>
  ),
  // Property: a house with a second gable, door and window.
  G: (
    <>
      <path d="M14 250V120l62-62 62 62v130" />
      <path d="M138 150l38-40 40 40v100" />
      <rect x="48" y="186" width="28" height="64" />
      <rect x="160" y="160" width="32" height="34" />
      <path d="M0 250h240" />
    </>
  ),
};

export function SystemDrawing({
  code,
  className = "",
}: {
  code: SystemCode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 262"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
      className={className}
    >
      {drawings[code]}
    </svg>
  );
}
