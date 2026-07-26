"use client";

import { useEffect, useRef, useState } from "react";
import { DateOption } from "@/components/experience/DateOption";
import type { ExperienceSessionDate } from "@/lib/experience/types";
import {
  getSessionAvailabilitySummary,
  getSessionWeekday,
  isSessionSoldOut,
} from "@/lib/experience/mock-data";

type ExperienceDateSelectorProps = {
  dates: ExperienceSessionDate[];
  selectedDateId: string | null;
  onSelect: (dateId: string) => void;
  isRefreshing?: boolean;
};

export function ExperienceDateSelector({
  dates,
  selectedDateId,
  onSelect,
  isRefreshing = false,
}: ExperienceDateSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = dates.find((date) => date.id === selectedDateId) ?? null;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function handleSelect(dateId: string) {
    const session = dates.find((date) => date.id === dateId);
    if (!session || isSessionSoldOut(session)) return;
    onSelect(dateId);
    setOpen(false);
  }

  return (
    <section
      ref={containerRef}
      className="relative rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6"
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
          Choose Your Session
        </h2>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Ticket availability and pricing update based on your selected session.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-5 text-left transition-all sm:px-6 sm:py-6 ${
          open
            ? "border-pink-400 bg-rose-50/70 shadow-[0_0_0_1px_rgba(244,114,182,0.35)]"
            : "border-pink-200 bg-gradient-to-br from-white to-rose-50/40 shadow-meuse-chip hover:border-pink-300"
        }`}
      >
        <div className="min-w-0 flex-1">
          {selected ? (
            <>
              <p className="text-sm font-medium text-pink-600">
                {getSessionWeekday(selected.date)}
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                {selected.displayDate}
              </p>
              <p className="mt-2 text-base font-medium text-zinc-700">
                {selected.time} {selected.timezone}
              </p>
              <p
                className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                  isSessionSoldOut(selected)
                    ? "bg-zinc-100 text-zinc-500"
                    : "bg-pink-50 text-pink-700"
                }`}
              >
                {isRefreshing && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-pink-500 meuse-session-status-pulse"
                    aria-hidden="true"
                  />
                )}
                {getSessionAvailabilitySummary(selected)}
              </p>
            </>
          ) : (
            <p className="text-lg font-medium text-zinc-400">
              Select a session date
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-pink-600 shadow-meuse-chip">
            Change
          </span>
          <ChevronIcon
            className={`h-5 w-5 text-pink-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Upcoming session dates"
          className="absolute top-[calc(100%+0.5rem)] left-0 z-30 hidden max-h-80 w-full overflow-y-auto rounded-meuse border border-pink-100 bg-white p-2 shadow-lg shadow-pink-100/60 sm:block"
        >
          <div className="space-y-2 p-1">
            {dates.map((session) => (
              <DateOption
                key={session.id}
                session={session}
                selected={session.id === selectedDateId}
                onSelect={() => handleSelect(session.id)}
              />
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <button
            type="button"
            aria-label="Close session picker"
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[75dvh] overflow-y-auto rounded-t-meuse bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-xl">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />
            <h3 className="mb-1 text-base font-semibold text-zinc-900">
              Select a Session Date
            </h3>
            <p className="mb-4 text-sm text-zinc-500">
              Each session has its own ticket inventory.
            </p>
            <div className="space-y-2">
              {dates.map((session) => (
                <DateOption
                  key={session.id}
                  session={session}
                  selected={session.id === selectedDateId}
                  onSelect={() => handleSelect(session.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
