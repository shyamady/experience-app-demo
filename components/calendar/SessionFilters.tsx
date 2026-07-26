import type {
  CalendarExperienceOption,
  SessionFormatFilter,
  SessionStatusFilter,
} from "@/lib/dashboard/calendar-types";

type SessionFiltersProps = {
  experiences: CalendarExperienceOption[];
  experienceId: string;
  status: SessionStatusFilter;
  format: SessionFormatFilter;
  onExperienceChange: (id: string) => void;
  onStatusChange: (status: SessionStatusFilter) => void;
  onFormatChange: (format: SessionFormatFilter) => void;
};

const STATUS_OPTIONS: Array<{ value: SessionStatusFilter; label: string }> = [
  { value: "all", label: "All Statuses" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "selling-fast", label: "Selling Fast" },
  { value: "sold-out", label: "Sold Out" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const selectClass =
  "h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-500/20";

export function SessionFilters({
  experiences,
  experienceId,
  status,
  format,
  onExperienceChange,
  onStatusChange,
  onFormatChange,
}: SessionFiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <select
        value={experienceId}
        onChange={(e) => onExperienceChange(e.target.value)}
        className={selectClass}
        aria-label="Filter by experience"
      >
        <option value="all">All Experiences</option>
        {experiences.map((experience) => (
          <option key={experience.id} value={experience.id}>
            {experience.title}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value as SessionStatusFilter)
        }
        className={selectClass}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="inline-flex rounded-xl bg-zinc-100 p-1">
        {(
          [
            { id: "all", label: "All" },
            { id: "online", label: "Online" },
            { id: "in-person", label: "In Person" },
          ] as const
        ).map((option) => {
          const active = format === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onFormatChange(option.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
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
    </div>
  );
}
