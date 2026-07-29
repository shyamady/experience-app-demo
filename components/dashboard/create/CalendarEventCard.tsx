"use client";

import type { CalendarEvent } from "@/lib/dashboard/create-types";
import { CalendarEventIcon } from "@/components/dashboard/create/CalendarIcons";

type CalendarEventCardProps = {
  event: CalendarEvent;
  onSelect: (event: CalendarEvent) => void;
};

export function CalendarEventCard({ event, onSelect }: CalendarEventCardProps) {
  const selectable = event.status === "upcoming";

  return (
    <button
      type="button"
      disabled={!selectable}
      onClick={() => selectable && onSelect(event)}
      className={`flex w-[240px] shrink-0 flex-col rounded-2xl border p-4 text-left transition ${
        selectable
          ? "border-pink-100 bg-white shadow-meuse-chip hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-md"
          : "cursor-not-allowed border-zinc-100 bg-zinc-50 opacity-60"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50">
          <CalendarEventIcon category={event.category} />
        </div>
        {event.status !== "upcoming" && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-500 uppercase">
            {event.status}
          </span>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-zinc-900">
        {event.title}
      </h3>
      <p className="mt-1 text-xs text-zinc-500">
        {event.displayDate} · {event.displayTime}
      </p>
      {event.location && (
        <p className="mt-0.5 truncate text-xs text-zinc-400">{event.location}</p>
      )}

      {selectable && (
        <p className="mt-3 line-clamp-3 border-t border-pink-50 pt-3 text-xs leading-relaxed text-pink-600">
          {event.opportunityLabel}
        </p>
      )}
    </button>
  );
}
