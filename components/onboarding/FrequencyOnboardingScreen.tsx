"use client";

import { useState } from "react";
import { AiOnboardingMessage } from "@/components/onboarding/AiOnboardingMessage";
import { CustomFrequencyConfig } from "@/components/onboarding/CustomFrequencyConfig";
import { FrequencyOptions } from "@/components/onboarding/FrequencyOptions";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import {
  MobileStickyActionBar,
  MOBILE_STICKY_CTA_PADDING,
} from "@/components/onboarding/MobileStickyActionBar";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { OnboardingNavigation } from "@/components/onboarding/OnboardingNavigation";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import {
  CUSTOM_FREQUENCY_UNITS,
  type CustomFrequencyUnit,
  type FrequencyId,
} from "@/lib/onboarding/frequency";
import { getFrequencyLabel, saveOnboardingData } from "@/lib/onboarding/storage";

export function FrequencyOnboardingScreen() {
  const [selectedId, setSelectedId] = useState<FrequencyId | null>(null);
  const [customInterval, setCustomInterval] = useState(3);
  const [customUnit, setCustomUnit] = useState<CustomFrequencyUnit>("weeks");

  const canContinue = selectedId !== null;

  function handleContinue() {
    if (!selectedId) return;

    let frequencyLabel = getFrequencyLabel(selectedId);

    if (selectedId === "custom") {
      const unitLabel =
        CUSTOM_FREQUENCY_UNITS.find((unit) => unit.value === customUnit)?.label ??
        "Weeks";
      frequencyLabel = `Every ${customInterval} ${unitLabel.toLowerCase()}`;
    }

    saveOnboardingData({
      frequencyId: selectedId,
      frequencyLabel,
      customInterval,
      customUnit,
    });
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <OnboardingHeader compact />

      <main
        className={`relative flex-1 overflow-y-auto px-4 pt-2 sm:px-6 sm:pb-6 sm:pt-4 ${MOBILE_STICKY_CTA_PADDING}`}
      >
        <GradientGlow />

        <div className="relative z-10 mx-auto flex w-full max-w-[700px] flex-col gap-3 sm:gap-4 sm:justify-center sm:min-h-full">
          <AiOnboardingMessage
            compact
            stepLabel="STEP 2 OF 4"
            headline="How often does this happen?"
            supportingText="This helps us build the right experience for your audience."
          />

          <div className="space-y-3">
            <FrequencyOptions selectedId={selectedId} onSelect={setSelectedId} />

            {selectedId === "custom" && (
              <CustomFrequencyConfig
                interval={customInterval}
                unit={customUnit}
                onIntervalChange={setCustomInterval}
                onUnitChange={setCustomUnit}
              />
            )}

            <div className="hidden sm:block">
              <OnboardingNavigation
                backHref="/"
                continueHref="/onboarding/participation"
                canContinue={canContinue}
                onContinue={handleContinue}
              />
            </div>
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
