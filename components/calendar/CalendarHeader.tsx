import type { CalendarViewMode } from "@/lib/dashboard/calendar-types";
import { CalendarViewToggle } from "@/components/calendar/CalendarViewToggle";

type CalendarHeaderProps = {
  viewMode: CalendarViewMode;
  onViewModeChange: (mode: CalendarViewMode) => void;
  onAddSession: () => void;
  filters: React.ReactNode;
};

export function CalendarHeader({
  viewMode,
  onViewModeChange,
  onAddSession,
  filters,
}: CalendarHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 md:hidden">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Calendar
          </h1>
          <p className="mt-1 max-w-xl text-sm text-zinc-500">
            Manage your upcoming sessions, availability, and ticket inventory.
          </p>
        </div>
        <p className="hidden max-w-xl text-sm text-zinc-500 md:block">
          Manage your upcoming sessions, availability, and ticket inventory.
        </p>

        <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
          <CalendarViewToggle value={viewMode} onChange={onViewModeChange} />
          <button
            type="button"
            onClick={onAddSession}
            className="hidden h-10 items-center justify-center rounded-xl bg-[#FF4F9A] px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 sm:inline-flex"
          >
            + Add Session
          </button>
        </div>
      </div>

      {filters}
    </div>
  );
}
