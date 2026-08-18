"use client";

import { useState } from "react";

export type ProjectEstimates = {
  estimatedBudget: string;
  estimatedTimeToLaunch: string;
  suggestedMinimumGoal: string;
  recommendedCampaignLength: string;
  estimateAssumptions: string;
};

type ProjectEstimatesCardProps = {
  estimates: ProjectEstimates;
  onChange: (updates: Partial<ProjectEstimates>) => void;
};

const fieldClassName =
  "w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none";

export function ProjectEstimatesCard({
  estimates,
  onChange,
}: ProjectEstimatesCardProps) {
  const [editing, setEditing] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);

  return (
    <section className="rounded-meuse bg-meuse-bubble px-5 py-5 shadow-meuse-card sm:px-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-zinc-500">What it takes</p>
          <p className="mt-1 text-xs text-zinc-400">
            AI-generated starting estimates, not guaranteed facts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing((current) => !current)}
          className="shrink-0 text-sm font-medium text-pink-600 hover:text-pink-700"
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <EstimateField
          editing={editing}
          label="Estimated budget needed"
          value={estimates.estimatedBudget}
          onChange={(estimatedBudget) => onChange({ estimatedBudget })}
        />
        <EstimateField
          editing={editing}
          label="Estimated time to launch"
          value={estimates.estimatedTimeToLaunch}
          onChange={(estimatedTimeToLaunch) =>
            onChange({ estimatedTimeToLaunch })
          }
        />
        <EstimateField
          editing={editing}
          label="Suggested minimum goal"
          value={estimates.suggestedMinimumGoal}
          onChange={(suggestedMinimumGoal) =>
            onChange({ suggestedMinimumGoal })
          }
        />
        <EstimateField
          editing={editing}
          label="Recommended campaign length"
          value={estimates.recommendedCampaignLength}
          onChange={(recommendedCampaignLength) =>
            onChange({ recommendedCampaignLength })
          }
        />
      </div>

      <button
        type="button"
        onClick={() => setShowAssumptions((current) => !current)}
        className="mt-4 text-xs font-medium text-pink-600 hover:text-pink-700"
      >
        {showAssumptions ? "Hide assumptions" : "How was this estimated?"}
      </button>

      {showAssumptions && (
        <div className="mt-2">
          {editing ? (
            <textarea
              value={estimates.estimateAssumptions}
              onChange={(event) =>
                onChange({ estimateAssumptions: event.target.value })
              }
              rows={4}
              className={`${fieldClassName} resize-none font-normal`}
            />
          ) : (
            <p className="text-sm leading-relaxed text-zinc-600">
              {estimates.estimateAssumptions}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function EstimateField({
  editing,
  label,
  value,
  onChange,
}: {
  editing: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-2xl bg-white/80 px-4 py-3">
      <p className="text-[0.625rem] font-semibold tracking-[0.12em] text-zinc-400 uppercase">
        {label}
      </p>
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClassName} mt-1.5`}
        />
      ) : (
        <p className="mt-1 text-lg font-bold text-zinc-900">{value}</p>
      )}
    </div>
  );
}
