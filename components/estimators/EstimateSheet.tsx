"use client";

import Link from "next/link";
import { type Estimate, money, moneyRange } from "@/lib/estimate";
import { ESTIMATE_NOTE } from "@/lib/pricing";

export function EstimateSheet({
  estimate,
  service,
  summary,
  emptyText,
}: {
  estimate: Estimate;
  /** Service slug passed to the contact form. */
  service: string;
  /** One-line description of the inputs, passed to the contact form. */
  summary: string;
  emptyText: string;
}) {
  const empty = estimate.lines.length === 0;
  const range = moneyRange(estimate.low, estimate.high);
  const href = `/contact?${new URLSearchParams({ service, estimate: range, details: summary }).toString()}#site-visit`;
  return (
    <div className="ap-est__sheet">
      <h3 className="ap-est__title">Your quote</h3>
      {empty ? (
        <p className="flex-1 text-[14px] text-muted">{emptyText}</p>
      ) : (
        <ul className="ap-lines" aria-live="polite">
          {estimate.lines.map((l) => (
            <li key={l.name}>
              <span className="ap-lines__name">{l.name}</span>
              <span className="ap-lines__qty">{l.qty}</span>
              <span className="ap-lines__amt">{moneyRange(l.low, l.high)}</span>
            </li>
          ))}
          {estimate.minimumApplied && (
            <li>
              <span className="ap-lines__name">Minimum job charge</span>
              <span className="ap-lines__qty">
                Small jobs start at {money(estimate.low)}
              </span>
              <span className="ap-lines__amt" />
            </li>
          )}
        </ul>
      )}
      <div className="ap-total" aria-live="polite">
        <span className="ap-total__label">Planning price</span>
        <strong className="ap-total__figure">{empty ? "—" : range}</strong>
        <p className="ap-total__note">{ESTIMATE_NOTE}</p>
      </div>
      <div className="ap-est__actions">
        <Link
          className="ap-btn ap-btn--primary"
          href={href}
          aria-disabled={empty}
        >
          Request a site visit
        </Link>
      </div>
    </div>
  );
}
