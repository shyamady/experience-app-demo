import type { CalendarViewMode } from "@/lib/dashboard/calendar-types";

type CalendarViewToggleProps = {
  value: CalendarViewMode;
  onChange: (mode: CalendarViewMode) => void;
};

export function CalendarViewToggle({ value, onChange }: CalendarViewToggleProps) {
  return (
    <div className="inline-flex rounded-xl bg-zinc-100 p-1">
      {(
        [
          { id: "calendar", label: "Calendar" },
          { id: "list", label: "List" },
        ] as const
      ).map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${
              active
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
