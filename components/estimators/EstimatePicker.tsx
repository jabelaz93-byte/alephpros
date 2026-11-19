"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { wizard } from "@/data/estimate";
import { type EstimatorKind, estimatorMeta } from "@/lib/pricing";
import { services } from "@/lib/services";
import { Estimator } from "./Estimator";

const kinds = Object.keys(estimatorMeta) as EstimatorKind[];

/**
 * Picks the estimator from the URL:
 *   /estimate?type=painting          a kind directly
 *   /estimate?service=I-103          any service or sub-service code (sets kind and variant)
 * Codes without an online price (plumbing, power, property) fall back to the first tab with a
 * note pointing to a site visit.
 */
export function resolve(params: URLSearchParams): {
  kind: EstimatorKind;
  variant?: string;
  onSite?: string;
} {
  const type = params.get("type");
  if (type && kinds.includes(type as EstimatorKind))
    return { kind: type as EstimatorKind };
  const code = params.get("service");
  if (code) {
    for (const s of services) {
      if (s.code === code)
        return s.estimator
          ? { kind: s.estimator }
          : { kind: kinds[0], onSite: s.name };
      const x = s.subs?.find((x) => x.code === code);
      if (x) {
        const kind = x.estimator ?? s.estimator;
        return kind
          ? { kind, variant: x.slug }
          : { kind: kinds[0], onSite: x.name };
      }
    }
  }
  return { kind: kinds[0] };
}

export function EstimatePicker() {
  const params = useSearchParams();
  const { kind, variant, onSite } = resolve(
    new URLSearchParams(params.toString()),
  );
  return (
    <div>
      <p className="t-caption mb-3 text-muted">{wizard.chooseService}</p>
      <nav
        aria-label={wizard.chooseService}
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0"
      >
        {kinds.map((k) => (
          <Link
            key={k}
            href={`/estimate?type=${k}`}
            scroll={false}
            className="ap-chip"
            aria-current={k === kind ? "page" : undefined}
          >
            {estimatorMeta[k].name}
          </Link>
        ))}
      </nav>
      {onSite && (
        <p className="notice mt-6">
          {onSite}: {wizard.onSite}{" "}
          <Link
            href="/contact#site-visit"
            className="font-semibold underline underline-offset-4"
          >
            {wizard.visit}
          </Link>
          .
        </p>
      )}
      <div className="mt-8">
        <Estimator
          key={`${kind}-${variant ?? ""}`}
          kind={kind}
          variant={variant}
        />
      </div>
    </div>
  );
}
