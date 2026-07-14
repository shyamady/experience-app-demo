"use client";

import type { LaunchData } from "@/lib/launch/types";
import {
  formatCurrency,
  getDaysUntilCutOff,
  isCutOffPassed,
} from "@/lib/launch/formatting";

type ValidationEndedCardProps = {
  data: LaunchData;
  onConfirm: () => void;
  onCancel: () => void;
  onExtend: (newDate: string) => void;
};

export function ValidationEndedCard({
  data,
  onConfirm,
  onCancel,
  onExtend,
}: ValidationEndedCardProps) {
  const goalReached = data.revenueRaised >= data.fundingGoal;

  return (
    <div className="rounded-meuse border border-amber-200 bg-amber-50/50 p-5 shadow-meuse-card">
      <h2 className="text-base font-semibold text-zinc-900">
        Validation period ended
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-white px-3 py-2.5">
          <p className="text-xs text-zinc-500">Final amount raised</p>
          <p className="mt-0.5 font-semibold text-zinc-900">
            {formatCurrency(data.revenueRaised)}
          </p>
        </div>
        <div className="rounded-xl bg-white px-3 py-2.5">
          <p className="text-xs text-zinc-500">Funding goal</p>
          <p className="mt-0.5 font-semibold text-zinc-900">
            {formatCurrency(data.fundingGoal)}
          </p>
        </div>
        <div className="rounded-xl bg-white px-3 py-2.5">
          <p className="text-xs text-zinc-500">Registrations</p>
          <p className="mt-0.5 font-semibold text-zinc-900">
            {data.registrationCount}
          </p>
        </div>
        <div className="rounded-xl bg-white px-3 py-2.5">
          <p className="text-xs text-zinc-500">Goal status</p>
          <p
            className={`mt-0.5 font-semibold ${
              goalReached ? "text-emerald-600" : "text-amber-700"
            }`}
          >
            {goalReached ? "Goal reached" : "Below goal"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full px-4 py-2 text-sm font-semibold text-white meuse-gradient-bg"
        >
          Confirm launch
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700"
        >
          Cancel launch
        </button>
        <button
          type="button"
          onClick={() => {
            const extended = new Date();
            extended.setDate(extended.getDate() + 14);
            onExtend(extended.toISOString().split("T")[0]);
          }}
          className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-medium text-pink-600"
        >
          Extend cut-off date
        </button>
      </div>
    </div>
  );
}

export function shouldShowValidationEndedCard(data: LaunchData): boolean {
  if (!data.demandValidationEnabled || !data.cutOffDate) return false;
  if (!isCutOffPassed(data.cutOffDate)) return false;
  if (data.validationDecision === "confirmed") return false;
  if (data.validationDecision === "cancelled") return false;
  return true;
}

export function DemandValidationPublicCard({ data }: { data: LaunchData }) {
  if (!data.demandValidationEnabled || !data.cutOffDate) return null;
  if (isCutOffPassed(data.cutOffDate)) return null;

  const daysLeft = getDaysUntilCutOff(data.cutOffDate);
  const progress = Math.min(
    100,
    Math.round((data.revenueRaised / data.fundingGoal) * 100),
  );

  return (
    <div className="mt-4 rounded-meuse-sm bg-white p-4 shadow-meuse-chip">
      <p className="text-sm font-semibold text-zinc-900">
        {daysLeft} day{daysLeft === 1 ? "" : "s"} left
      </p>
      <p className="mt-1 text-sm text-zinc-600">
        {formatCurrency(data.revenueRaised)} raised of{" "}
        {formatCurrency(data.fundingGoal)}
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-pink-100">
        <div
          className="h-full rounded-full meuse-gradient-bg transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
