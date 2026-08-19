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
  PEOPLE_MAX,
  PEOPLE_MILESTONES,
  PEOPLE_MIN,
  PEOPLE_STEP,
  RECOMMENDED_FUNDING,
  RECOMMENDED_PEOPLE,
  formatFundingGoal,
  formatPeopleGoal,
  parseMoneyInput,
  peopleContextLabel,
  snapGoalValue,
  type GoalType,
} from "@/lib/onboarding/goal";
import { getOnboardingData, saveOnboardingData } from "@/lib/onboarding/storage";

export function GoalOnboardingScreen() {
  const saved = getOnboardingData();
  const [goalType, setGoalType] = useState<GoalType | null>(
    saved.goalType ?? null,
  );
  const [peopleValue, setPeopleValue] = useState(
    snapGoalValue(
      "people",
      saved.goalType === "people" && saved.goalValue
        ? saved.goalValue
        : RECOMMENDED_PEOPLE,
    ),
  );
  const [fundingValue, setFundingValue] = useState(
    snapGoalValue(
      "funding",
      saved.goalType === "funding" && saved.goalValue
        ? saved.goalValue
        : RECOMMENDED_FUNDING,
    ),
  );
  const [unsure, setUnsure] = useState(Boolean(saved.goalUnsure));
  const [customFunding, setCustomFunding] = useState("");

  const value = goalType === "people" ? peopleValue : fundingValue;
  const canContinue = goalType !== null;

  function selectType(next: GoalType) {
    setGoalType(next);
    setUnsure(false);
  }

  function recommend() {
    if (!goalType) return;
    setUnsure(true);
    if (goalType === "people") setPeopleValue(RECOMMENDED_PEOPLE);
    if (goalType === "funding") setFundingValue(RECOMMENDED_FUNDING);
  }

  function handleContinue() {
    if (!goalType) return;
    saveOnboardingData({
      goalType,
      goalValue: value,
      goalUnsure: unsure,
      needIds: goalType === "funding" ? ["funding"] : ["participants"],
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
            stepLabel="STEP 2 OF 4"
            headline={
              goalType === "people"
                ? "How many people do you want to bring together?"
                : goalType === "funding"
                  ? "How much would make this possible?"
                  : "Set the goal"
            }
            supportingText={
              goalType === "people"
                ? "A rough goal is enough. You can always change it later."
                : goalType === "funding"
                  ? "Set the amount you think the project needs. AI will help turn it into a realistic launch plan."
                  : "Choose whether success is defined by people or money."
            }
          />

          <div className="grid grid-cols-2 gap-3">
            <GoalTypeCard
              emoji="👥"
              title="People"
              description="Bring together enough participants."
              selected={goalType === "people"}
              onClick={() => selectType("people")}
            />
            <GoalTypeCard
              emoji="💰"
              title="Funding"
              description="Reach the amount needed to make the project possible."
              selected={goalType === "funding"}
              onClick={() => selectType("funding")}
            />
          </div>

          {goalType && (
            <div className="rounded-[1.75rem] bg-white px-4 py-5 shadow-meuse-card sm:px-6">
              <p className="text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                {goalType === "people"
                  ? formatPeopleGoal(peopleValue)
                  : formatFundingGoal(fundingValue)}
              </p>
              {goalType === "people" && (
                <p className="mt-2 text-center text-sm text-zinc-500">
                  {peopleContextLabel(peopleValue)}
                </p>
              )}
              {unsure && (
                <p className="mt-2 text-center text-sm font-medium text-pink-500">
                  AI starting estimate — you can change it
                </p>
              )}

              <div className="mt-5">
                <GoalValueSlider
                  type={goalType}
                  min={goalType === "people" ? PEOPLE_MIN : FUNDING_MIN}
                  max={goalType === "people" ? PEOPLE_MAX : FUNDING_MAX}
                  step={goalType === "people" ? PEOPLE_STEP : FUNDING_STEP}
                  milestones={
                    goalType === "people" ? PEOPLE_MILESTONES : FUNDING_MILESTONES
                  }
                  value={value}
                  onChange={(next) => {
                    setUnsure(false);
                    if (goalType === "people") setPeopleValue(next);
                    else setFundingValue(next);
                  }}
                />
              </div>

              {goalType === "funding" && (
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
                      placeholder="$10,000"
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
              )}

              <button
                type="button"
                onClick={recommend}
                className="mt-5 w-full rounded-full bg-rose-50 py-3 text-sm font-semibold text-pink-600"
              >
                ✨ Not sure — recommend for me
              </button>
            </div>
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

function GoalTypeCard({
  emoji,
  title,
  description,
  selected,
  onClick,
}: {
  emoji: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  const card = (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex h-full w-full flex-col items-start rounded-[1.5rem] px-4 py-4 text-left transition-all ${
        selected
          ? "bg-rose-50 shadow-meuse-card"
          : "border border-zinc-100 bg-white shadow-meuse-chip"
      }`}
    >
      <span className="text-2xl">{emoji}</span>
      <p className="mt-2 text-base font-bold text-zinc-900">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
    </button>
  );

  if (selected) {
    return (
      <div className="rounded-[1.5rem] p-[2px] meuse-gradient-border">{card}</div>
    );
  }

  return card;
}
