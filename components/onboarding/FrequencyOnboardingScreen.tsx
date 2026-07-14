"use client";

import { useState } from "react";
import { AiOnboardingMessage } from "@/components/onboarding/AiOnboardingMessage";
import { CustomFrequencyConfig } from "@/components/onboarding/CustomFrequencyConfig";
import { FrequencyOptions } from "@/components/onboarding/FrequencyOptions";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
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
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-white">
      <OnboardingHeader compact />

      <main className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden px-4 sm:px-6">
        <GradientGlow />

        <div className="relative z-10 mx-auto flex w-full max-w-[700px] flex-col gap-3 sm:gap-4">
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

            <OnboardingNavigation
              backHref="/"
              continueHref="/onboarding/participation"
              canContinue={canContinue}
              onContinue={handleContinue}
            />
          </div>
        </div>
      </main>

      <OnboardingProgress currentStep={2} compact />
    </div>
  );
}
