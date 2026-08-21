"use client";

import {
  CAMPAIGN_PHASE_OPTIONS,
  type CampaignPhase,
} from "@/lib/launch/campaign-phase";

type CampaignPhaseSelectorProps = {
  phase: CampaignPhase;
  onChange: (phase: CampaignPhase) => void;
};

export function CampaignPhaseSelector({
  phase,
  onChange,
}: CampaignPhaseSelectorProps) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 shadow-meuse-chip">
      <span className="text-zinc-400">Status:</span>
      <select
        value={phase}
        onChange={(event) => onChange(event.target.value as CampaignPhase)}
        className="bg-transparent font-semibold text-zinc-800 outline-none"
      >
        {CAMPAIGN_PHASE_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
