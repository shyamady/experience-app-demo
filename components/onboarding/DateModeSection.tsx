import { OnboardingSectionTitle } from "@/components/onboarding/OnboardingSectionTitle";
import { type DateMode } from "@/lib/onboarding/frequency";

type DateModeSectionProps = {
  dateMode: DateMode;
  singleDate: string;
  startDate: string;
  endDate: string;
  onDateModeChange: (mode: DateMode) => void;
  onSingleDateChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

const inputClassName =
  "w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none";

export function DateModeSection({
  dateMode,
  singleDate,
  startDate,
  endDate,
  onDateModeChange,
  onSingleDateChange,
  onStartDateChange,
  onEndDateChange,
}: DateModeSectionProps) {
  return (
    <div className="space-y-2.5">
      <OnboardingSectionTitle>When is the first one?</OnboardingSectionTitle>

      <div className="flex rounded-xl bg-meuse-hint p-1">
        {(["one-day", "multiple-days"] as DateMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onDateModeChange(mode)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
              dateMode === mode
                ? "bg-white text-pink-700 shadow-meuse-chip"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {mode === "one-day" ? "One day" : "Multiple days"}
          </button>
        ))}
      </div>

      {dateMode === "one-day" ? (
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            Date
          </label>
          <input
            type="date"
            value={singleDate}
            onChange={(event) => onSingleDateChange(event.target.value)}
            className={inputClassName}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
              Start date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(event) => onStartDateChange(event.target.value)}
              className={inputClassName}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">
              End date
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => onEndDateChange(event.target.value)}
              className={inputClassName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
