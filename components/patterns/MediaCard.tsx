import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PhotoPlate } from "@/components/ui/PhotoPlate";
import { SheetCode } from "@/components/ui/SheetCode";
import type { Photo } from "@/data/types";
import type { SystemCode } from "@/lib/systems";

type Props = {
  href: string;
  title: string;
  /** Photo; without one the card shows the system's line drawing. */
  image?: Photo;
  system: SystemCode;
  code?: string;
  line?: string;
  /** Right-aligned detail under the title (price, city). */
  meta?: ReactNode;
  /** contain: product cut-outs on a pale ground · cover: project photos */
  fit?: "cover" | "contain";
};

/**
 * Card for a project or a product. Both lists use this one card so the two collections read the
 * same way (see docs/ARCHITECTURE.md › "Slug pages").
 */
export function MediaCard({
  href,
  title,
  image,
  system,
  code,
  line,
  meta,
  fit = "cover",
}: Props) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef0ed]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 100vw"
            className={`${fit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.02]`}
            style={{ objectPosition: image.position ?? "50% 50%" }}
          />
        ) : (
          <PhotoPlate system={system} />
        )}
      </div>
      <div className="mt-3 flex items-start gap-3">
        {code && <SheetCode code={code} className="mt-0.5" />}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[15px] leading-snug group-hover:underline">
            {title}
          </h3>
          {line && (
            <p className="mt-1 text-[13px] text-muted leading-snug">{line}</p>
          )}
        </div>
        {meta && <div className="shrink-0 text-right text-[14px]">{meta}</div>}
      </div>
    </Link>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}
