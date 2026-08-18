"use client";

import { useCallback, useState } from "react";
import { AiOnboardingMessage } from "@/components/onboarding/AiOnboardingMessage";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import {
  MobileStickyActionBar,
  MOBILE_STICKY_CTA_PADDING,
} from "@/components/onboarding/MobileStickyActionBar";
import { NeedOptions } from "@/components/onboarding/NeedOptions";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { OnboardingNavigation } from "@/components/onboarding/OnboardingNavigation";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import {
  DEFAULT_NEED_SELECTION,
  type ProjectNeedId,
} from "@/lib/onboarding/needs";
import { getOnboardingData, saveOnboardingData } from "@/lib/onboarding/storage";

const fieldClassName =
  "w-full rounded-meuse-sm border border-zinc-100 bg-white px-3 py-3 text-sm text-zinc-900 shadow-meuse-chip placeholder:text-zinc-400 focus:border-pink-200 focus:outline-none sm:px-4 sm:py-3.5 sm:text-[0.9375rem]";

export function NeedsOnboardingScreen() {
  const [selectedIds, setSelectedIds] = useState<Set<ProjectNeedId>>(() => {
    const saved = getOnboardingData().needIds;
    return new Set(saved.length > 0 ? saved : DEFAULT_NEED_SELECTION);
  });
  const [knownDetails, setKnownDetails] = useState(
    () => getOnboardingData().knownDetails,
  );

  const toggleSelection = useCallback((id: ProjectNeedId) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const canContinue = selectedIds.size > 0;

  function handleContinue() {
    saveOnboardingData({
      needIds: Array.from(selectedIds),
      knownDetails: knownDetails.trim(),
    });
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <OnboardingHeader compact />

      <main
        className={`relative flex-1 overflow-y-auto px-4 pt-2 sm:px-5 sm:pb-6 sm:pt-4 ${MOBILE_STICKY_CTA_PADDING}`}
      >
        <GradientGlow />

        <div className="relative z-10 mx-auto flex w-full max-w-[700px] flex-col gap-4">
          <AiOnboardingMessage
            compact
            stepLabel="STEP 2 OF 4"
            headline="What will help make it real?"
            supportingText="Choose what your project needs. AI will use this to create a realistic starting plan."
            hint="Select one or more"
          />

          <NeedOptions selectedIds={selectedIds} onToggle={toggleSelection} />

          <div className="space-y-2">
            <label
              htmlFor="known-details"
              className="text-sm font-semibold text-zinc-900 sm:text-[0.9375rem]"
            >
              Anything you already know?{" "}
              <span className="font-medium text-zinc-400">(optional)</span>
            </label>
            <textarea
              id="known-details"
              value={knownDetails}
              onChange={(event) => setKnownDetails(event.target.value)}
              placeholder="Paris, around 50 people, ideally this summer…"
              rows={3}
              className={`${fieldClassName} resize-none`}
            />
          </div>

          <div className="hidden sm:block">
            <OnboardingNavigation
              backHref="/"
              continueHref="/onboarding/participation"
              canContinue={canContinue}
              onContinue={handleContinue}
              footerNote="You can change this later."
            />
          </div>
        </div>
      </main>

      <div className="hidden sm:block">
        <OnboardingProgress currentStep={2} compact />
      </div>

      <MobileStickyActionBar
        backHref="/"
        continueHref="/onboarding/participation"
        onContinue={handleContinue}
        canContinue={canContinue}
      />
    </div>
  );
}
