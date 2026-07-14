"use client";

import { useCallback, useMemo } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  shouldShowValidationEndedCard,
  ValidationEndedCard,
} from "@/components/launch/DemandValidation";
import { LandingPagePreview } from "@/components/launch/LandingPagePreview";
import { LaunchSetupForm } from "@/components/launch/LaunchSetupForm";
import { PublishSuccessPanel } from "@/components/launch/PublishSuccessPanel";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import {
  getPublishMissingRequirements,
  isLaunchPublishable,
} from "@/lib/launch/validation";

export function LaunchReviewScreen() {
  const { activeCampaign, updateCampaign, publishCampaign } = useCampaign();

  const updateLaunch = useCallback(
    (updates: Parameters<typeof updateCampaign>[0]) => {
      updateCampaign(updates);
    },
    [updateCampaign],
  );

  function handlePublish() {
    if (!isLaunchPublishable(activeCampaign)) return;
    publishCampaign(activeCampaign);
  }

  const missingRequirements = useMemo(
    () => getPublishMissingRequirements(activeCampaign),
    [activeCampaign],
  );
  const canPublish = missingRequirements.length === 0;
  const isPublished = activeCampaign.status === "published";
  const showValidationEnded = shouldShowValidationEndedCard(activeCampaign);

  return (
    <DashboardShell
      title="Preview Launch"
      subtitle="Review and finalize before publishing."
    >
      <div className="px-4 py-5 pb-28 sm:px-6 sm:py-8 sm:pb-8 lg:px-8">
        {isPublished && (
          <div className="mb-6">
            <PublishSuccessPanel data={activeCampaign} />
          </div>
        )}

        {showValidationEnded && (
          <div className="mb-6">
            <ValidationEndedCard
              data={activeCampaign}
              onConfirm={() =>
                updateLaunch({ validationDecision: "confirmed" })
              }
              onCancel={() =>
                updateLaunch({ validationDecision: "cancelled" })
              }
              onExtend={(newDate) =>
                updateLaunch({
                  cutOffDate: newDate,
                  validationDecision: null,
                })
              }
            />
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-2 xl:gap-10">
          <LaunchSetupForm data={activeCampaign} onChange={updateLaunch} />

          <div className="xl:sticky xl:top-8 xl:self-start">
            <LandingPagePreview data={activeCampaign} />
          </div>
        </div>

        <div className="mt-8 hidden flex-col items-center gap-3 border-t border-pink-100 pt-6 sm:flex sm:flex-row sm:justify-end">
          {!canPublish && !isPublished && missingRequirements.length > 0 && (
            <p className="text-xs text-zinc-400 sm:mr-auto">
              Missing: {missingRequirements.join(", ")}
            </p>
          )}
          <button
            type="button"
            onClick={handlePublish}
            disabled={!canPublish || isPublished}
            className={`rounded-full px-8 py-3 text-sm font-semibold transition-all ${
              canPublish && !isPublished
                ? "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50 hover:scale-[1.02]"
                : "cursor-not-allowed bg-zinc-200 text-zinc-400"
            }`}
          >
            Publish Launch
          </button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:hidden">
        {!canPublish && !isPublished && missingRequirements.length > 0 && (
          <p className="mb-2 text-center text-xs text-zinc-400">
            Missing: {missingRequirements.slice(0, 2).join(", ")}
            {missingRequirements.length > 2 ? "…" : ""}
          </p>
        )}
        <button
          type="button"
          onClick={handlePublish}
          disabled={!canPublish || isPublished}
          className={`w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
            canPublish && !isPublished
              ? "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
              : "cursor-not-allowed bg-zinc-200 text-zinc-400"
          }`}
        >
          Publish Launch
        </button>
      </div>
    </DashboardShell>
  );
}
