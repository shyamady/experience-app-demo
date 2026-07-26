"use client";

import type { ExperienceSessionDate } from "@/lib/experience/types";
import {
  getAvailableProductCount,
  isSessionSoldOut,
} from "@/lib/experience/mock-data";

type DateOptionProps = {
  session: ExperienceSessionDate;
  selected: boolean;
  onSelect: () => void;
};

export function DateOption({ session, selected, onSelect }: DateOptionProps) {
  const soldOut = isSessionSoldOut(session);
  const availableCount = getAvailableProductCount(session);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={soldOut}
      className={`flex w-full items-start justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all ${
        soldOut
          ? "cursor-not-allowed border-zinc-100 bg-zinc-50 opacity-60"
          : selected
            ? "border-pink-400 bg-rose-50 shadow-[0_0_0_1px_rgba(244,114,182,0.35)]"
            : "border-pink-100 bg-white hover:border-pink-200 hover:bg-rose-50/40"
      }`}
    >
      <div className="min-w-0">
        <p className="font-semibold text-zinc-900">{session.displayDate}</p>
        <p className="mt-0.5 text-sm text-zinc-600">
          {session.time} {session.timezone}
        </p>
        <p className="mt-1.5 text-xs text-zinc-500">
          {soldOut
            ? "No tickets available"
            : `${availableCount} ticket${availableCount === 1 ? "" : "s"} available · inventory updates on select`}
        </p>
      </div>

      {session.label && (
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide ${
            session.label === "Sold Out"
              ? "bg-zinc-200 text-zinc-500"
              : "bg-pink-100 text-pink-700"
          }`}
        >
          {session.label}
        </span>
      )}
    </button>
  );
}
