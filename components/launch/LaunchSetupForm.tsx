"use client";

import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { LaunchProductsSummary } from "@/components/launch/LaunchProductsSummary";
import { ToggleSwitch } from "@/components/experiences/ToggleSwitch";
import {
  CUSTOM_FREQUENCY_UNITS,
  FREQUENCY_OPTIONS,
  type CustomFrequencyUnit,
} from "@/lib/onboarding/frequency";
import type { LaunchData, LaunchLocationType } from "@/lib/launch/types";

type LaunchSetupFormProps = {
  data: LaunchData;
  onChange: (updates: Partial<LaunchData>) => void;
};

const fieldClassName =
  "w-full rounded-xl border border-pink-100 bg-white px-3 py-3 text-base text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none sm:py-2.5 sm:text-sm";

const labelClassName = "mb-1.5 block text-xs font-medium text-zinc-500";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-zinc-900">{children}</h2>
  );
}

export function LaunchSetupForm({ data, onChange }: LaunchSetupFormProps) {
  const locationOptions: {
    id: LaunchLocationType;
    label: string;
  }[] = [
    { id: "in-person", label: "In person" },
    { id: "online", label: "Online" },
    { id: "hybrid", label: "Hybrid" },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-5">
        <SectionTitle>Launch title</SectionTitle>
        <input
          type="text"
          value={data.title}
          onChange={(event) => onChange({ title: event.target.value })}
          placeholder="Tokyo Fan Experience"
          className={`${fieldClassName} mt-3`}
        />
      </div>

      <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-5">
        <SectionTitle>First date</SectionTitle>
        <input
          type="date"
          value={data.firstDate}
          onChange={(event) => onChange({ firstDate: event.target.value })}
          className={`${fieldClassName} mt-3`}
        />
      </div>

      <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-5">
        <SectionTitle>Frequency</SectionTitle>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {FREQUENCY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                onChange({
                  frequencyId: option.id,
                  frequencyLabel: option.label,
                })
              }
              className={`rounded-meuse-sm px-3 py-3 text-left text-sm font-medium transition-all sm:py-2.5 ${
                data.frequencyId === option.id
                  ? "bg-rose-50 text-pink-700 ring-2 ring-pink-300"
                  : "border border-zinc-100 bg-white text-zinc-600 shadow-meuse-chip"
              } ${option.fullWidth ? "col-span-2" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {data.frequencyId === "custom" && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm text-zinc-500">Repeat every</span>
            <input
              type="number"
              min={1}
              max={99}
              value={data.customInterval}
              onChange={(event) =>
                onChange({
                  customInterval: Math.max(1, Number(event.target.value) || 1),
                })
              }
              className="w-16 rounded-xl border border-pink-100 bg-white px-2 py-3 text-center text-base shadow-meuse-chip focus:border-pink-300 focus:outline-none sm:py-2 sm:text-sm"
            />
            <div className="relative min-w-[8rem] flex-1">
              <select
                value={data.customUnit}
                onChange={(event) =>
                  onChange({
                    customUnit: event.target.value as CustomFrequencyUnit,
                  })
                }
                className="w-full appearance-none rounded-xl border border-pink-100 bg-white py-3 pl-3 pr-8 text-base shadow-meuse-chip focus:border-pink-300 focus:outline-none sm:py-2 sm:text-sm"
              >
                {CUSTOM_FREQUENCY_UNITS.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-5">
        <SectionTitle>Location</SectionTitle>
        <div className="mt-3 flex flex-wrap gap-2">
          {locationOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange({ locationType: option.id })}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                data.locationType === option.id
                  ? "bg-rose-50 text-pink-700 ring-2 ring-pink-300"
                  : "border border-zinc-100 bg-white text-zinc-600 shadow-meuse-chip"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {(data.locationType === "in-person" ||
          data.locationType === "hybrid") && (
          <div className="mt-4 space-y-3">
            <div>
              <label className={labelClassName}>City</label>
              <input
                type="text"
                value={data.city}
                onChange={(event) => onChange({ city: event.target.value })}
                placeholder="Tokyo, Japan"
                className={fieldClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>Venue or meeting location</label>
              <input
                type="text"
                value={data.venue}
                onChange={(event) => onChange({ venue: event.target.value })}
                placeholder="Shibuya meeting point"
                className={fieldClassName}
              />
            </div>
          </div>
        )}

        {(data.locationType === "online" || data.locationType === "hybrid") && (
          <div className="mt-4 space-y-3">
            <div>
              <label className={labelClassName}>Platform</label>
              <input
                type="text"
                value={data.onlinePlatform}
                onChange={(event) =>
                  onChange({ onlinePlatform: event.target.value })
                }
                placeholder="Zoom, YouTube Live..."
                className={fieldClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>Access details or URL</label>
              <input
                type="text"
                value={data.onlineAccessDetails}
                onChange={(event) =>
                  onChange({ onlineAccessDetails: event.target.value })
                }
                placeholder="Link sent after purchase"
                className={fieldClassName}
              />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-5">
        <SectionTitle>Total spots</SectionTitle>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChange({ totalSpots: 8 })}
            className={`rounded-full px-4 py-2.5 text-sm font-medium ${
              data.totalSpots !== "unlimited"
                ? "bg-rose-50 text-pink-700 ring-2 ring-pink-300"
                : "border border-zinc-100 bg-white text-zinc-600"
            }`}
          >
            Fixed number
          </button>
          <button
            type="button"
            onClick={() => onChange({ totalSpots: "unlimited" })}
            className={`rounded-full px-4 py-2.5 text-sm font-medium ${
              data.totalSpots === "unlimited"
                ? "bg-rose-50 text-pink-700 ring-2 ring-pink-300"
                : "border border-zinc-100 bg-white text-zinc-600"
            }`}
          >
            Unlimited
          </button>
        </div>
        {data.totalSpots !== "unlimited" && (
          <input
            type="number"
            min={1}
            value={data.totalSpots}
            onChange={(event) =>
              onChange({
                totalSpots: Math.max(1, Number(event.target.value) || 1),
              })
            }
            className={`${fieldClassName} mt-3`}
          />
        )}
      </div>

      <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <SectionTitle>Demand validation</SectionTitle>
          <ToggleSwitch
            checked={data.demandValidationEnabled}
            onChange={(enabled) =>
              onChange({
                demandValidationEnabled: enabled,
                validationDecision: enabled ? data.validationDecision : null,
              })
            }
            label="Demand validation"
          />
        </div>

        {data.demandValidationEnabled && (
          <div className="mt-4 space-y-3">
            <div>
              <label className={labelClassName}>Cut-off date</label>
              <input
                type="date"
                value={data.cutOffDate}
                onChange={(event) =>
                  onChange({
                    cutOffDate: event.target.value,
                    validationDecision: "pending",
                  })
                }
                className={fieldClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>Funding goal</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  value={data.fundingGoal || ""}
                  onChange={(event) =>
                    onChange({
                      fundingGoal: Number(event.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className={`${fieldClassName} pl-7`}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-meuse bg-white p-4 shadow-meuse-card sm:p-5">
        <LaunchProductsSummary products={data.products} />
      </div>
    </div>
  );
}
