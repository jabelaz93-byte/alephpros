"use client";

import { useId } from "react";

export function Seg<T extends string>({
  legend,
  value,
  options,
  onChange,
  help,
}: {
  legend: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  help?: string;
}) {
  const name = useId();
  return (
    <fieldset className="ap-field">
      <legend className="ap-field__label">{legend}</legend>
      <div className="ap-seg">
        {options.map((o) => (
          <label className="ap-seg__opt" key={o.value}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {help && <span className="ap-field__help">{help}</span>}
    </fieldset>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  unit,
  help,
  min = 0,
  max = 100000,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  help?: string;
  min?: number;
  max?: number;
}) {
  const id = useId();
  const n = Number(value.replace(/,/g, ""));
  const invalid =
    value.trim() !== "" && (!Number.isFinite(n) || n < min || n > max);
  return (
    <div className="ap-field">
      <label className="ap-field__label" htmlFor={id}>
        {label}
      </label>
      <span className="ap-input-unit">
        <input
          id={id}
          className="ap-input"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          aria-invalid={invalid}
          aria-describedby={help || invalid ? `${id}-help` : undefined}
          onChange={(e) => onChange(e.target.value.replace(/[^\d,]/g, ""))}
        />
        {unit && <span className="ap-input-unit__unit">{unit}</span>}
      </span>
      {invalid ? (
        <span className="ap-field__error" id={`${id}-help`}>
          Enter a number between {min.toLocaleString()} and{" "}
          {max.toLocaleString()}.
        </span>
      ) : (
        help && (
          <span className="ap-field__help" id={`${id}-help`}>
            {help}
          </span>
        )
      )}
    </div>
  );
}

export function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="ap-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

export const num = (v: string, max = 100000) => {
  const n = Number(v.replace(/,/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0;
};
