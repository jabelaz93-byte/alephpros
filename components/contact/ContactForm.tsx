"use client";

import { useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { form, visit } from "@/data/contact";
import { errors as E } from "@/data/estimate";
import { services } from "@/lib/services";
import { serviceAreas, site } from "@/lib/site";
import { systems } from "@/lib/systems";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

/**
 * Contact + site-visit request. Prefilled from the URL when it comes from an estimate or a
 * product (?service=, ?estimate=, ?details=, ?product=). Posts to /api/quote.
 */
export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const preService = params.get("service") ?? "";
  const preEstimate = params.get("estimate") ?? "";
  const preDetails = params.get("details") ?? "";
  const preProduct = params.get("product") ?? "";
  const preSystem = params.get("system") ?? "";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Enter your name.";
    if (!data.phone?.trim()) errs.phone = E.phone;
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email))
      errs.email = "Enter an email like name@example.com.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok)
        throw new Error(
          (await res.json().catch(() => ({}))).error ??
            "The request didn't go through.",
        );
      setStatus({ kind: "sent" });
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error ? err.message : "The request didn't go through.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <output className="notice notice--ok block">
        <p className="font-semibold">{visit.done}</p>
      </output>
    );
  }

  const field = (
    name: string,
    label: string,
    props: Record<string, unknown> = {},
    span = false,
  ) => (
    <div className={span ? "ap-field span-2" : "ap-field"}>
      <label className="ap-field__label" htmlFor={`q-${name}`}>
        {label}
      </label>
      <input
        id={`q-${name}`}
        name={name}
        className="ap-input"
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `q-${name}-err` : undefined}
        {...props}
      />
      {errors[name] && (
        <span className="ap-field__error" id={`q-${name}-err`}>
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <form className="form-grid" onSubmit={onSubmit} noValidate>
      {field("name", form.fields.name, { autoComplete: "name" })}
      {field("phone", form.fields.phone, {
        autoComplete: "tel",
        inputMode: "tel",
      })}
      {field("email", form.fields.email, {
        autoComplete: "email",
        type: "email",
      })}
      {field("address", form.fields.address, {
        autoComplete: "street-address",
      })}
      <div className="ap-field">
        <label className="ap-field__label" htmlFor="q-service">
          {form.fields.system}
        </label>
        <select
          id="q-service"
          name="service"
          className="ap-input"
          defaultValue={preService || preSystem}
        >
          <option value="">Choose a system or service</option>
          {systems.map((sys) => (
            <optgroup key={sys.code} label={`${sys.code} · ${sys.name}`}>
              <option value={sys.code}>
                {sys.name} (not sure which service)
              </option>
              {services
                .filter((s) => s.system === sys.code)
                .map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} {s.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div className="ap-field">
        <label className="ap-field__label" htmlFor="q-city">
          City
        </label>
        <select id="q-city" name="city" className="ap-input" defaultValue="">
          <option value="">Choose a city</option>
          {serviceAreas.map((c) => (
            <option key={c}>{c}</option>
          ))}
          <option value="Other">Somewhere else</option>
        </select>
      </div>

      <fieldset className="ap-field span-2">
        <legend className="ap-field__label">{visit.title} (optional)</legend>
        <div className="form-grid">
          {field("day", visit.day, { type: "date" })}
          <div className="ap-field">
            <label className="ap-field__label" htmlFor="q-window">
              {visit.window}
            </label>
            <select
              id="q-window"
              name="window"
              className="ap-input"
              defaultValue=""
            >
              <option value="">Any time</option>
              {visit.windows.map((w) => (
                <option key={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {preEstimate && (
        <div className="ap-field span-2">
          <span className="ap-field__label">Your online estimate</span>
          <p className="notice">
            <strong>{preEstimate}</strong>
            <br />
            <span className="text-[13px] text-muted">{preDetails}</span>
          </p>
          <input type="hidden" name="estimate" value={preEstimate} />
          <input type="hidden" name="estimateDetails" value={preDetails} />
        </div>
      )}
      {preProduct && <input type="hidden" name="product" value={preProduct} />}

      <div className="ap-field span-2">
        <label className="ap-field__label" htmlFor="q-message">
          {form.fields.message}
        </label>
        <textarea
          id="q-message"
          name="message"
          className="ap-input"
          defaultValue={preProduct ? `I'd like a quote for: ${preProduct}` : ""}
          placeholder="Rooms, sizes, timing, anything we should know."
        />
      </div>
      <div className="span-2 flex flex-wrap items-center gap-4">
        <button
          className="ap-btn ap-btn--primary"
          type="submit"
          disabled={status.kind === "sending"}
        >
          {status.kind === "sending" ? "Sending…" : form.submit}
        </button>
        {status.kind === "error" && (
          <span className="ap-field__error" role="alert">
            {status.message} Call {site.phone.display} or try again.
          </span>
        )}
      </div>
    </form>
  );
}
