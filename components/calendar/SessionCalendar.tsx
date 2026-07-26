"use client";

import { useMemo, useState } from "react";
import type { CalendarSession } from "@/lib/dashboard/calendar-types";

type SessionCalendarProps = {
  sessions: CalendarSession[];
  onSelectSession: (session: CalendarSession) => void;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function sessionDotClass(session: CalendarSession): string {
  if (session.status === "cancelled") return "bg-zinc-300 text-zinc-600";
  if (session.status === "draft") return "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200";
  if (session.status === "sold-out") return "bg-rose-50 text-rose-700";
  if (session.format === "in-person") {
    return "bg-rose-50 text-[#FF4F9A]";
  }
  return "bg-sky-50 text-sky-700";
}

export function SessionCalendar({
  sessions,
  onSelectSession,
}: SessionCalendarProps) {
  const [cursor, setCursor] = useState(() => new Date(2026, 7, 1));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const monthLabel = cursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const cells = useMemo(() => {
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const total = Math.ceil((startPad + daysInMonth) / 7) * 7;
    const result: Array<{
      day: number | null;
      dateKey: string | null;
      sessions: CalendarSession[];
    }> = [];

    for (let i = 0; i < total; i++) {
      const dayNum = i - startPad + 1;
      if (dayNum < 1 || dayNum > daysInMonth) {
        result.push({ day: null, dateKey: null, sessions: [] });
        continue;
      }
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      result.push({
        day: dayNum,
        dateKey,
        sessions: sessions.filter((s) => s.date === dateKey),
      });
    }
    return result;
  }, [year, month, sessions]);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50"
          aria-label="Previous month"
        >
          ←
        </button>
        <h2 className="text-sm font-semibold text-zinc-900 sm:text-base">
          {monthLabel}
        </h2>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50"
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-zinc-100 bg-zinc-50/80">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="px-1 py-2 text-center text-[11px] font-semibold tracking-wide text-zinc-400 uppercase sm:text-xs"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((cell, index) => (
          <div
            key={index}
            className={`min-h-[88px] border-b border-r border-zinc-100 p-1.5 sm:min-h-[110px] sm:p-2 ${
              cell.day === null ? "bg-zinc-50/40" : "bg-white"
            }`}
          >
            {cell.day !== null && (
              <>
                <p className="mb-1 text-xs font-medium text-zinc-500">
                  {cell.day}
                </p>
                <div className="space-y-1">
                  {cell.sessions.slice(0, 2).map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => onSelectSession(session)}
                      className={`block w-full truncate rounded-md px-1.5 py-1 text-left text-[10px] font-medium leading-tight sm:text-[11px] ${sessionDotClass(session)}`}
                    >
                      <span className="block truncate">{session.title}</span>
                      <span className="block opacity-80">
                        {session.startTime} ·{" "}
                        {session.format === "online" ? "Online" : "In person"}
                      </span>
                    </button>
                  ))}
                  {cell.sessions.length > 2 && (
                    <p className="px-1 text-[10px] text-zinc-400">
                      +{cell.sessions.length - 2} more
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
