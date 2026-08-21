"use client";

import { CheckIcon } from "@/components/icons/CheckIcon";
import { formatMoney } from "@/lib/dashboard/commerce";
import {
  formatGreenlightDays,
  formatPeopleIn,
  getGreenlightState,
} from "@/lib/launch/greenlight";
import type { LaunchData } from "@/lib/launch/types";

type GreenlightProgressProps = {
  data: LaunchData;
  onJoin: () => void;
  compact?: boolean;
  forceGreenlit?: boolean;
};

export function GreenlightProgress({
  data,
  onJoin,
  compact = false,
  forceGreenlit = false,
}: GreenlightProgressProps) {
  const state = getGreenlightState(data);
  const isGreenlit = forceGreenlit || state.isGreenlit;
  const daysCopy = formatGreenlightDays(state.daysLeft);
  const showMinimum =
    state.goalType === "funding" && state.minimumNeeded > 0 && !isGreenlit;

  if (isGreenlit) {
    return (
      <section
        className={`rounded-[1.75rem] bg-white shadow-meuse-card ${
          compact ? "px-4 py-4" : "px-5 py-5 sm:px-6 sm:py-6"
        }`}
      >
        <p className="flex items-center justify-center gap-2 text-lg font-bold text-zinc-900 sm:text-xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          Greenlit — It’s happening
        </p>
        <p className="mt-2 text-center text-sm text-zinc-500">
          {formatPeopleIn(state.people)}
        </p>
        <button
          type="button"
          onClick={onJoin}
          className="mt-4 w-full rounded-full py-3.5 text-sm font-semibold text-white meuse-gradient-bg shadow-md shadow-pink-200/50"
        >
          Choose how to join
        </button>
      </section>
    );
  }

  return (
    <section
      className={`rounded-[1.75rem] bg-white shadow-meuse-card ${
        compact ? "px-4 py-4" : "px-5 py-5 sm:px-6 sm:py-6"
      }`}
    >
      <p className="text-center text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
        {state.percent}% to Greenlight
      </p>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-rose-50">
        <div
          className="h-full rounded-full meuse-gradient-bg transition-[width] duration-700"
          style={{ width: `${Math.max(4, state.percent)}%` }}
        />
      </div>
      <p className="mt-3 text-center text-sm font-medium text-zinc-700">
        {formatPeopleIn(state.people)}
      </p>
      {daysCopy && (
        <p className="mt-1 text-center text-sm text-zinc-500">{daysCopy}</p>
      )}
      <button
        type="button"
        onClick={onJoin}
        className="mt-5 w-full rounded-full py-3.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/40"
      >
        Choose how to join
      </button>
      {showMinimum && (
        <p className="mt-3 text-center text-xs text-zinc-400">
          Minimum needed to happen: {formatMoney(state.minimumNeeded)}
        </p>
      )}
    </section>
  );
}