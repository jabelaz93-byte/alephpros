"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoPlate } from "@/components/ui/PhotoPlate";
import type { Photo } from "@/data/types";
import type { SystemCode } from "@/lib/systems";

/** Main photo with thumbnails underneath. With no photos, shows the system's line drawing. */
export function Gallery({
  photos,
  system,
  fit = "cover",
  emptyLabel,
}: {
  photos: Photo[];
  system: SystemCode;
  fit?: "cover" | "contain";
  emptyLabel: string;
}) {
  const [i, setI] = useState(0);
  const main = photos[i];
  const imgFit = fit === "contain" ? "object-contain p-8" : "object-cover";
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef0ed]">
        {main ? (
          <Image
            key={main.src}
            src={main.src}
            alt={main.alt}
            fill
            preload
            sizes="(min-width: 1024px) 55vw, 100vw"
            className={imgFit}
            style={{ objectPosition: main.position ?? "50% 50%" }}
          />
        ) : (
          <PhotoPlate system={system} label={emptyLabel} />
        )}
      </div>
      {photos.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {photos.map((p, n) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => setI(n)}
                aria-label={`Show photo ${n + 1}: ${p.alt}`}
                aria-current={n === i ? "true" : undefined}
                className={`relative block aspect-square w-full overflow-hidden bg-[#eef0ed] ${n === i ? "outline-2 outline-ink outline-offset-2" : "opacity-80 hover:opacity-100"}`}
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="10vw"
                  className={
                    fit === "contain" ? "object-contain p-2" : "object-cover"
                  }
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
