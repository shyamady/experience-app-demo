"use client";

import { useEffect, useRef, useState } from "react";
import type { CalendarSession } from "@/lib/dashboard/calendar-types";
import {
  formatCurrency,
  getInventoryStatusLabel,
} from "@/lib/dashboard/calendar-mock-data";
import { SessionStatusBadge } from "@/components/calendar/SessionStatusBadge";

type SessionCardProps = {
  session: CalendarSession;
  onView: (session: CalendarSession) => void;
  onEdit: (session: CalendarSession) => void;
  onDuplicate: (session: CalendarSession) => void;
  onCancel: (session: CalendarSession) => void;
};

export function SessionCard({
  session,
  onView,
  onEdit,
  onDuplicate,
  onCancel,
}: SessionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <article className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-pink-200 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => onView(session)}
          className="min-w-0 flex-1 text-left"
        >
          <h3 className="text-base font-semibold text-zinc-900">
            {session.title}
          </h3>
          <p className="mt-0.5 truncate text-sm text-zinc-500">
            {session.experienceTitle}
          </p>
        </button>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            aria-label="Session actions"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
              {[
                { label: "View Details", action: () => onView(session) },
                { label: "Edit Session", action: () => onEdit(session) },
                { label: "Duplicate", action: () => onDuplicate(session) },
                {
                  label: "Cancel Session",
                  action: () => onCancel(session),
                  danger: true,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    item.action();
                  }}
                  className={`block w-full px-3 py-2 text-left text-sm transition hover:bg-zinc-50 ${
                    item.danger ? "text-rose-600" : "text-zinc-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
        <span>
          {session.displayDate} · {session.startTime} {session.timezone}
        </span>
        <span className="text-zinc-300">·</span>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
            session.format === "online"
              ? "bg-sky-50 text-sky-700 ring-sky-600/20"
              : "bg-rose-50 text-[#FF4F9A] ring-pink-500/20"
          }`}
        >
          {session.format === "online" ? "Online" : "In Person"}
        </span>
        <SessionStatusBadge status={session.status} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600">
        <span>
          <span className="font-semibold text-zinc-900">
            {session.attendeeCount}
          </span>{" "}
          attendees
        </span>
        <span>
          <span className="font-semibold text-zinc-900">
            {formatCurrency(session.revenue)}
          </span>{" "}
          revenue
        </span>
      </div>

      <ul className="mt-3 space-y-1 border-t border-zinc-100 pt-3">
        {session.inventory.map((item) => {
          const capacityLabel =
            item.capacity === null ? "∞" : String(item.capacity);
          const status = getInventoryStatusLabel(item);
          return (
            <li
              key={item.productId}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="truncate text-zinc-700">
                {item.productName}:{" "}
                <span className="text-zinc-500">
                  {item.sold} / {capacityLabel} sold
                </span>
              </span>
              <span
                className={`shrink-0 text-xs font-medium ${
                  status === "Sold Out"
                    ? "text-rose-600"
                    : status === "Paused"
                      ? "text-zinc-400"
                      : status.startsWith("Only")
                        ? "text-amber-600"
                        : "text-emerald-600"
                }`}
              >
                {status}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
