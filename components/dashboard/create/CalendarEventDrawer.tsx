"use client";

import type { CalendarEvent } from "@/lib/dashboard/create-types";
import { CalendarEventIcon } from "@/components/dashboard/create/CalendarIcons";

type CalendarEventDrawerProps = {
  event: CalendarEvent | null;
  onClose: () => void;
  onCreate: (event: CalendarEvent) => void;
};

export function CalendarEventDrawer({
  event,
  onClose,
  onCreate,
}: CalendarEventDrawerProps) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-[slideIn_0.2s_ease-out]">
        <div className="flex items-start justify-between gap-3 border-b border-pink-50 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-pink-500 uppercase">
              Calendar event
            </p>
            <h2 className="mt-1 text-lg font-semibold text-zinc-900">
              {event.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-rose-50/50 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-meuse-chip">
              <CalendarEventIcon category={event.category} className="text-xl" />
            </div>
            <div className="min-w-0 text-sm">
              <p className="font-medium text-zinc-900">
                {event.displayDate} · {event.displayTime}
              </p>
              {event.location && (
                <p className="mt-0.5 text-zinc-500">{event.location}</p>
              )}
            </div>
          </div>

          {event.description && (
            <p className="mt-5 text-sm leading-relaxed text-zinc-600">
              {event.description}
            </p>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-zinc-900">
              AI-generated product ideas
            </h3>
            <ul className="mt-3 space-y-2">
              {event.productIdeas.map((idea) => (
                <li
                  key={idea.title}
                  className="flex items-center justify-between rounded-xl border border-pink-100 bg-white px-3.5 py-3"
                >
                  <span className="text-sm font-medium text-zinc-800">
                    {idea.title}
                  </span>
                  <span className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
                    {idea.type}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-pink-600">
            {event.opportunityLabel}
          </p>
        </div>

        <div className="flex gap-2 border-t border-pink-50 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onCreate(event)}
            className="h-11 flex-[1.4] rounded-xl bg-[#FF4F9A] text-sm font-semibold text-white transition hover:brightness-95"
          >
            Create Experience from This Event
          </button>
        </div>
      </div>
    </div>
  );
}
