import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import {
  CUSTOM_FREQUENCY_UNITS,
  type CustomFrequencyUnit,
} from "@/lib/onboarding/frequency";

type CustomFrequencyConfigProps = {
  interval: number;
  unit: CustomFrequencyUnit;
  onIntervalChange: (value: number) => void;
  onUnitChange: (value: CustomFrequencyUnit) => void;
};

export function CustomFrequencyConfig({
  interval,
  unit,
  onIntervalChange,
  onUnitChange,
}: CustomFrequencyConfigProps) {
  return (
    <div
      className="meuse-fade-in-up rounded-meuse-sm bg-meuse-hint px-3.5 py-3 sm:px-4"
      style={{ animationDelay: "0.05s" }}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Repeat every
      </p>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          max={99}
          value={interval}
          onChange={(event) =>
            onIntervalChange(Math.max(1, Number(event.target.value) || 1))
          }
          className="w-14 rounded-xl border border-pink-100 bg-white px-2.5 py-2 text-center text-sm font-medium text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none"
          aria-label="Repeat interval"
        />
        <div className="relative flex-1">
          <select
            value={unit}
            onChange={(event) =>
              onUnitChange(event.target.value as CustomFrequencyUnit)
            }
            className="w-full appearance-none rounded-xl border border-pink-100 bg-white py-2 pl-3 pr-8 text-sm font-medium text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none"
            aria-label="Repeat unit"
          >
            {CUSTOM_FREQUENCY_UNITS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        </div>
      </div>
    </div>
  );
}
