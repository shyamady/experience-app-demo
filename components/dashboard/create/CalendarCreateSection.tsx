"use client";

import { useMemo, useState } from "react";
import type { CalendarEvent } from "@/lib/dashboard/create-types";
import { MOCK_CALENDAR_EVENTS } from "@/lib/dashboard/create-mock-data";
import { GoogleCalendarIcon } from "@/components/dashboard/create/CalendarIcons";
import { CalendarEventCard } from "@/components/dashboard/create/CalendarEventCard";
import { CalendarEventDrawer } from "@/components/dashboard/create/CalendarEventDrawer";

type CalendarCreateSectionProps = {
  onCreateFromEvent: (event: CalendarEvent) => void;
};

const INITIAL_VISIBLE = 4;

export function CalendarCreateSection({
  onCreateFromEvent,
}: CalendarCreateSectionProps) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  const events = useMemo(() => MOCK_CALENDAR_EVENTS, []);
  const upcoming = events.filter((e) => e.status === "upcoming");
  const visible = showAll ? events : events.slice(0, INITIAL_VISIBLE);

  function handleConnect() {
    setConnecting(true);
    window.setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 700);
  }

  return (
    <section className="rounded-3xl border border-pink-100/80 bg-white/90 p-5 shadow-meuse-card sm:p-6">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
          Create from your calendar
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
          Turn something you are already doing into an experience your audience
          can join.
        </p>
      </div>

      {!connected ? (
        <div className="mt-5 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-pink-200 bg-rose-50/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-meuse-chip">
              <GoogleCalendarIcon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Connect Google Calendar
              </p>
              <p className="mt-0.5 text-sm text-zinc-500">
                Pull in upcoming plans so AI can suggest experiences around
                them.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleConnect}
            disabled={connecting}
            className="h-10 shrink-0 rounded-xl bg-[#FF4F9A] px-4 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-70"
          >
            {connecting ? "Connecting…" : "Connect Google Calendar"}
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-zinc-400">
              {upcoming.length} upcoming · Google Calendar connected
            </p>
            <button
              type="button"
              onClick={() => setConnected(false)}
              className="text-xs font-medium text-zinc-400 transition hover:text-zinc-600"
            >
              Disconnect
            </button>
          </div>

          <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
            {visible.map((event) => (
              <CalendarEventCard
                key={event.id}
                event={event}
                onSelect={setSelectedEvent}
              />
            ))}
          </div>

          {!showAll && events.length > INITIAL_VISIBLE && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="mt-3 text-sm font-semibold text-pink-600 transition hover:text-pink-700"
            >
              View more events
            </button>
          )}
        </div>
      )}

      <CalendarEventDrawer
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onCreate={(event) => {
          setSelectedEvent(null);
          onCreateFromEvent(event);
        }}
      />
    </section>
  );
}
