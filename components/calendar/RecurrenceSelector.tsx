import type { SessionFormValues } from "@/lib/dashboard/calendar-types";

type RecurrenceSelectorProps = {
  values: Pick<
    SessionFormValues,
    "recurrenceType" | "recurrenceDay" | "endsAfter"
  >;
  onChange: (patch: Partial<SessionFormValues>) => void;
};

const selectClass =
  "h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-500/20";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function RecurrenceSelector({
  values,
  onChange,
}: RecurrenceSelectorProps) {
  const repeats = values.recurrenceType !== "none";

  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Repeat
        </label>
        <select
          value={values.recurrenceType}
          onChange={(e) =>
            onChange({
              recurrenceType: e.target
                .value as SessionFormValues["recurrenceType"],
            })
          }
          className={selectClass}
        >
          <option value="none">Does not repeat</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Every two weeks</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {repeats && (
        <div className="space-y-3 rounded-xl border border-zinc-100 bg-zinc-50/80 p-3 sm:p-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Repeat day
            </label>
            <select
              value={values.recurrenceDay}
              onChange={(e) => onChange({ recurrenceDay: e.target.value })}
              className={selectClass}
            >
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Ends after (sessions)
            </label>
            <input
              type="number"
              min={1}
              max={52}
              value={values.endsAfter}
              onChange={(e) =>
                onChange({ endsAfter: Number(e.target.value) || 1 })
              }
              className={selectClass}
            />
          </div>

          <p className="text-sm text-zinc-500">
            {values.recurrenceType === "weekly" && "Weekly"}
            {values.recurrenceType === "biweekly" && "Every two weeks"}
            {values.recurrenceType === "monthly" && "Monthly"}
            {values.recurrenceType === "custom" && "Custom"} on{" "}
            {values.recurrenceDay} · Ends after {values.endsAfter} sessions
          </p>
        </div>
      )}
    </div>
  );
}
