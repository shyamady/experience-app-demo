"use client";

import { useCallback, useState } from "react";
import { AiOnboardingMessage } from "@/components/onboarding/AiOnboardingMessage";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import {
  MobileStickyActionBar,
  MOBILE_STICKY_CTA_PADDING,
} from "@/components/onboarding/MobileStickyActionBar";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { OnboardingNavigation } from "@/components/onboarding/OnboardingNavigation";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { ParticipationOptions } from "@/components/onboarding/ParticipationOptions";
import {
  DEFAULT_PARTICIPATION_SELECTION,
  type ParticipationId,
} from "@/lib/onboarding/participation";
import { saveOnboardingData } from "@/lib/onboarding/storage";

export function ParticipationOnboardingScreen() {
  const [selectedIds, setSelectedIds] = useState<Set<ParticipationId>>(
    () => new Set(DEFAULT_PARTICIPATION_SELECTION),
  );

  const toggleSelection = useCallback((id: ParticipationId) => {
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
      participationIds: Array.from(selectedIds),
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
            stepLabel="STEP 3 OF 4"
            headline="How can fans participate?"
            supportingText="Choose the ways fans can engage with what you're doing."
            hint="Select one or more"
          />

          <ParticipationOptions
            selectedIds={selectedIds}
            onToggle={toggleSelection}
          />

          <div className="hidden sm:block">
            <OnboardingNavigation
              backHref="/onboarding/frequency"
              continueHref="/onboarding/generating"
              canContinue={canContinue}
              onContinue={handleContinue}
              footerNote="You can change this later."
            />
          </div>
        </div>
      </main>

      <div className="hidden sm:block">
        <OnboardingProgress currentStep={3} compact />
      </div>

      <MobileStickyActionBar
        backHref="/onboarding/frequency"
        continueHref="/onboarding/generating"
        onContinue={handleContinue}
        canContinue={canContinue}
      />
    </div>
  );
}
