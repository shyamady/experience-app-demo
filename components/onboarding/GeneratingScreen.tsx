"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AiGeneratingOrb } from "@/components/onboarding/AiGeneratingOrb";
import { GeneratingProgressBar } from "@/components/onboarding/GeneratingProgressBar";
import { GeneratingStatusMessage } from "@/components/onboarding/GeneratingStatusMessage";
import { GeneratingStepIndicator } from "@/components/onboarding/GeneratingStepIndicator";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import { InputSummaryCard } from "@/components/onboarding/InputSummaryCard";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { saveGeneratedLaunch } from "@/lib/onboarding/generated-launch";
import { requestLaunchGeneration } from "@/lib/onboarding/generate-launch-client";
import {
  GENERATING_FINAL_MESSAGE_HOLD_MS,
  GENERATING_FINAL_MESSAGE_INDEX,
  GENERATING_FINAL_MESSAGE_START_MS,
  GENERATING_MIN_DURATION_MS,
  GENERATING_STATUS_MESSAGES,
  GENERATING_STATUS_SCHEDULE,
  sleep,
} from "@/lib/onboarding/generating";
import {
  GENERATING_PROGRESS_COMPLETE_MS,
  advanceContinuousProgress,
  animateProgressToTarget,
  getDynamicProgressCap,
  getReadyToCompleteAtMs,
} from "@/lib/onboarding/generating-progress";
import {
  getFrequencyLabel,
  getOnboardingData,
  getParticipationLabelList,
  summarizeActivity,
} from "@/lib/onboarding/storage";

export function GeneratingScreen() {
  const router = useRouter();
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [summary] = useState(() => {
    const data = getOnboardingData();

    return {
      activity: summarizeActivity(data.activity),
      frequency: data.frequencyLabel || getFrequencyLabel(data.frequencyId ?? "one-time"),
      participation: getParticipationLabelList(data.participationIds).join(" · "),
    };
  });

  useEffect(() => {
    const timers = GENERATING_STATUS_SCHEDULE.map(({ time, index }) =>
      window.setTimeout(() => setStatusIndex(index), time),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let frameId = 0;
    const data = getOnboardingData();
    const startedAt = performance.now();
    const progressRef = { current: 0 };
    let lastFrameTime = startedAt;
    let isAnimatingToComplete = false;

    const runProgressFrame = (now: number) => {
      if (cancelled || isAnimatingToComplete) return;

      const deltaMs = Math.max(0, now - lastFrameTime);
      lastFrameTime = now;
      const elapsedMs = now - startedAt;
      const targetCap = getDynamicProgressCap(elapsedMs);

      progressRef.current = advanceContinuousProgress(
        progressRef.current,
        deltaMs,
        targetCap,
      );
      setProgress(progressRef.current);

      frameId = window.requestAnimationFrame(runProgressFrame);
    };

    frameId = window.requestAnimationFrame(runProgressFrame);

    async function generateLaunch() {
      let result:
        | { status: "success"; data: Awaited<ReturnType<typeof requestLaunchGeneration>> }
        | { status: "error"; data: null };
      let apiCompletedAt = startedAt;

      try {
        const launch = await requestLaunchGeneration({
          activity: data.activity,
          frequency:
            data.frequencyLabel ||
            getFrequencyLabel(data.frequencyId ?? "one-time"),
          participation: getParticipationLabelList(data.participationIds),
        });

        apiCompletedAt = performance.now();
        result = { status: "success", data: launch };
      } catch {
        apiCompletedAt = performance.now();
        result = { status: "error", data: null };
      }

      if (cancelled) return;

      const readyAt = getReadyToCompleteAtMs(
        startedAt,
        apiCompletedAt,
        GENERATING_MIN_DURATION_MS,
        GENERATING_FINAL_MESSAGE_START_MS,
        GENERATING_FINAL_MESSAGE_HOLD_MS,
      );

      const waitMs = Math.max(0, readyAt - performance.now());
      if (waitMs > 0) {
        await sleep(waitMs);
      }

      if (cancelled) return;

      window.cancelAnimationFrame(frameId);
      isAnimatingToComplete = true;
      setStatusIndex(GENERATING_FINAL_MESSAGE_INDEX);

      const completionStart = progressRef.current;
      await animateProgressToTarget(
        completionStart,
        100,
        GENERATING_PROGRESS_COMPLETE_MS,
        (nextProgress) => {
          if (cancelled) return;
          progressRef.current = nextProgress;
          setProgress(nextProgress);
        },
      );

      if (cancelled) return;

      await sleep(GENERATING_FINAL_MESSAGE_HOLD_MS);

      if (cancelled) return;

      saveGeneratedLaunch(result);
      router.push("/onboarding/generate");
    }

    void generateLaunch();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [router]);

  return (
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-white">
      <OnboardingHeader compact />

      <main className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-5 sm:px-6">
        <GradientGlow />

        <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center gap-5 sm:gap-6">
          <div className="meuse-fade-in-up flex flex-col items-center gap-5 text-center sm:gap-6">
            <AiGeneratingOrb />

            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-[1.75rem]">
                Building your experience
              </h1>
              <p className="text-sm leading-relaxed text-zinc-500 sm:text-[0.9375rem]">
                Turning what you&apos;re already doing into ways your fans can
                participate.
              </p>
            </div>
          </div>

          <div className="flex min-h-[1.75rem] w-full items-center justify-center">
            <GeneratingStatusMessage
              message={GENERATING_STATUS_MESSAGES[statusIndex]}
            />
          </div>

          <InputSummaryCard
            activity={summary.activity}
            frequency={summary.frequency}
            participation={summary.participation}
          />

          <GeneratingProgressBar progress={progress} />
        </div>
      </main>

      <GeneratingStepIndicator />
    </div>
  );
}
