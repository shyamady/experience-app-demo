"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { GlobalDashboardShell } from "@/components/dashboard/GlobalDashboardShell";
import { CalendarCreateSection } from "@/components/dashboard/create/CalendarCreateSection";
import { InspirationCreateSection } from "@/components/dashboard/create/InspirationCreateSection";
import {
  buildCalendarPrompt,
  buildRemixResult,
} from "@/lib/dashboard/create-mock-data";
import type {
  CalendarEvent,
  InspirationExperience,
} from "@/lib/dashboard/create-types";
import {
  DEFAULT_PLACEHOLDER,
  HINT_EXAMPLES,
} from "@/lib/onboarding/suggestions";
import { saveOnboardingData } from "@/lib/onboarding/storage";

export function CreateExperienceScreen() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [remixingId, setRemixingId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasText = inputValue.trim().length > 0;

  const focusInputAtEnd = useCallback((value: string) => {
    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      const length = value.length;
      textarea.setSelectionRange(length, length);
    });
  }, []);

  function startGeneration(prompt: string) {
    saveOnboardingData({ activity: prompt.trim() });
    router.push("/onboarding/goal");
  }

  function handleExampleSelect(example: string) {
    setInputValue(example);
    focusInputAtEnd(example);
  }

  function handleSubmit() {
    if (!inputValue.trim()) return;
    startGeneration(inputValue);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (hasText) handleSubmit();
    }
  }

  function handleCreateFromEvent(event: CalendarEvent) {
    startGeneration(buildCalendarPrompt(event));
  }

  function handleRemix(experience: InspirationExperience) {
    setRemixingId(experience.id);
    const result = buildRemixResult(experience);
    window.setTimeout(() => {
      startGeneration(result.prompt);
    }, 1200);
  }

  return (
    <GlobalDashboardShell>
      <div className="relative min-h-full overflow-hidden bg-[radial-gradient(ellipse_100%_70%_at_50%_-10%,rgba(255,182,213,0.22),transparent_55%),linear-gradient(to_bottom,#fff9fb_0%,#ffffff_45%,#fff5f9_100%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[8%] h-[320px] w-[min(90%,520px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,79,154,0.08)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[960px] flex-col gap-10 px-4 py-8 sm:gap-12 sm:px-6 sm:py-10 lg:px-8">
          {/* Primary: free-text AI prompt */}
          <section className="mx-auto w-full max-w-2xl">
            <div className="text-center md:hidden">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                Create Experience
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Start with an idea, an upcoming plan, or inspiration from another
                creator.
              </p>
            </div>

            <div className="mt-5 md:mt-0">
              <p className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-pink-500">
                <SparkleIcon className="h-4 w-4" />
                Describe your idea
              </p>

              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-b from-pink-200/30 via-pink-100/10 to-transparent blur-sm"
                />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white bg-white/95 shadow-[0_16px_48px_-12px_rgba(219,39,119,0.14),0_4px_16px_-6px_rgba(0,0,0,0.04)]">
                  <div className="flex items-end gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4">
                    <SparkleIcon className="mb-3.5 ml-0.5 h-5 w-5 shrink-0 text-pink-300" />
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={DEFAULT_PLACEHOLDER}
                      rows={3}
                      className="min-h-[5rem] flex-1 resize-none bg-transparent py-2 text-base leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:outline-none sm:min-h-[5.5rem] sm:text-lg"
                    />
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!hasText}
                      aria-label="Create experience"
                      className={`mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 sm:h-12 sm:w-12 ${
                        hasText
                          ? "meuse-gradient-bg text-white shadow-lg shadow-pink-200/50 hover:scale-[1.04] active:scale-95"
                          : "bg-zinc-100 text-zinc-300"
                      }`}
                    >
                      <ArrowIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-zinc-400">
                  Try things like:
                </p>
                <div className="flex flex-wrap gap-2">
                  {HINT_EXAMPLES.map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => handleExampleSelect(example)}
                      className="rounded-full border border-pink-100/80 bg-white/70 px-3 py-1.5 text-sm text-zinc-500 transition hover:border-pink-200 hover:bg-white hover:text-pink-600"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Secondary paths */}
          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-zinc-400 uppercase">
                Create from your world
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <CalendarCreateSection onCreateFromEvent={handleCreateFromEvent} />
              <InspirationCreateSection
                onRemix={handleRemix}
                remixingId={remixingId}
              />
            </div>
          </div>
        </div>
      </div>
    </GlobalDashboardShell>
  );
}
