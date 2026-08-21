"use client";

import { useState } from "react";
import { AiOnboardingMessage } from "@/components/onboarding/AiOnboardingMessage";
import { GoalValueSlider } from "@/components/onboarding/GoalValueSlider";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import {
  MobileStickyActionBar,
  MOBILE_STICKY_CTA_PADDING,
} from "@/components/onboarding/MobileStickyActionBar";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { OnboardingNavigation } from "@/components/onboarding/OnboardingNavigation";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import {
  FUNDING_MAX,
  FUNDING_MILESTONES,
  FUNDING_MIN,
  FUNDING_STEP,
  RECOMMENDED_FUNDING,
  formatFundingGoal,
  fundingContextLabel,
  parseMoneyInput,
  snapGoalValue,
} from "@/lib/onboarding/goal";
import { getOnboardingData, saveOnboardingData } from "@/lib/onboarding/storage";

export function GoalOnboardingScreen() {
  const saved = getOnboardingData();
  const [fundingValue, setFundingValue] = useState(
    snapGoalValue(
      "funding",
      saved.goalType === "funding" && saved.goalValue
        ? saved.goalValue
        : saved.goalValue && saved.goalValue >= FUNDING_MIN
          ? saved.goalValue
          : RECOMMENDED_FUNDING,
    ),
  );
  const [unsure, setUnsure] = useState(Boolean(saved.goalUnsure));
  const [customFunding, setCustomFunding] = useState("");

  function recommend() {
    setUnsure(true);
    setFundingValue(RECOMMENDED_FUNDING);
  }

  function handleContinue() {
    saveOnboardingData({
      goalType: "funding",
      goalValue: fundingValue,
      goalUnsure: unsure,
      needIds: ["funding"],
    });
  }

  function applyCustomFunding() {
    const parsed = parseMoneyInput(customFunding);
    if (!parsed) return;
    setFundingValue(snapGoalValue("funding", parsed));
    setUnsure(false);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <OnboardingHeader compact />

      <main
        className={`relative flex-1 overflow-y-auto px-4 pt-2 sm:px-5 sm:pb-6 sm:pt-4 ${MOBILE_STICKY_CTA_PADDING}`}
      >
        <GradientGlow />

        <div className="relative z-10 mx-auto flex w-full max-w-[700px] flex-col gap-5">
          <AiOnboardingMessage
            compact
            stepLabel="TARGET · STEP 2 OF 4"
            headline="How much funding would help make this happen?"
            supportingText="A rough target is enough. We’ll turn it into offers people can buy."
          />

          <div className="rounded-[1.75rem] bg-white px-4 py-6 shadow-meuse-card sm:px-6">
            <p className="text-center text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              {formatFundingGoal(fundingValue)}
            </p>
            <p className="mt-2 text-center text-sm text-zinc-500">
              {fundingContextLabel(fundingValue)}
            </p>
            {unsure && (
              <p className="mt-2 text-center text-sm font-medium text-pink-500">
                AI starting estimate — you can change it
              </p>
            )}

            <div className="mt-6">
              <GoalValueSlider
                type="funding"
                min={FUNDING_MIN}
                max={FUNDING_MAX}
                step={FUNDING_STEP}
                milestones={FUNDING_MILESTONES}
                value={fundingValue}
                onChange={(next) => {
                  setUnsure(false);
                  setFundingValue(next);
                }}
              />
            </div>

            <div className="mt-5">
              <label className="text-xs font-semibold text-zinc-500">
                Or enter an amount
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  value={customFunding}
                  onChange={(event) => setCustomFunding(event.target.value)}
                  onBlur={applyCustomFunding}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") applyCustomFunding();
                  }}
                  placeholder="$2,500"
                  inputMode="numeric"
                  className="min-w-0 flex-1 rounded-full border border-zinc-100 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-pink-200 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={applyCustomFunding}
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-pink-600"
                >
                  Set
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={recommend}
              className="mt-5 w-full rounded-full bg-rose-50 py-3 text-sm font-semibold text-pink-600"
            >
              ✨ Not sure — recommend for me
            </button>
          </div>

          <div className="hidden sm:block">
            <OnboardingNavigation
              backHref="/"
              continueHref="/onboarding/participation"
              canContinue
              onContinue={handleContinue}
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
        canContinue
      />
    </div>
  );
}
