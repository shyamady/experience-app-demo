"use client";

import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { ActivityOptionCard } from "@/components/landing/ActivityOptionCard";
import { ExamplePrompt } from "@/components/landing/ExamplePrompt";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { useOnboardingStart } from "@/lib/landing/use-onboarding-start";
import { HINT_EXAMPLES, SUGGESTIONS } from "@/lib/onboarding/suggestions";

type OnboardingHeroProps = {
  id?: string;
  showProgress?: boolean;
  embedded?: boolean;
};

export function OnboardingHero({
  id = "get-started",
  showProgress = true,
  embedded = false,
}: OnboardingHeroProps) {
  const {
    inputValue,
    setInputValue,
    selectedId,
    placeholder,
    textareaRef,
    handleSuggestionSelect,
    handleExampleSelect,
    handleSubmit,
  } = useOnboardingStart();

  const hasText = inputValue.trim().length > 0;

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (hasText) handleSubmit();
    }
  }

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden ${
        embedded
          ? "bg-transparent"
          : "min-h-dvh bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,182,213,0.35),transparent_50%),linear-gradient(to_bottom,#fff9fb_0%,#ffffff_45%,#fff4f8_100%)]"
      }`}
    >
      {!embedded && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[18%] h-[420px] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,79,154,0.12)_0%,transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full bg-pink-200/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 bottom-32 h-96 w-96 rounded-full bg-rose-100/30 blur-3xl"
          />
        </>
      )}

      <div
        className={`relative z-10 mx-auto flex w-full max-w-3xl flex-col px-4 sm:px-6 ${
          embedded
            ? "py-4"
            : "min-h-dvh justify-center pb-12 pt-20 sm:pb-16 sm:pt-24"
        }`}
      >
        <div className="mx-auto w-full text-center">
          <h1
            className="meuse-fade-in-up text-[2.5rem] font-bold leading-[1.08] tracking-[-0.03em] text-zinc-900 sm:text-6xl sm:leading-[1.05]"
            style={{ animationDelay: "0.04s" }}
          >
            What&apos;s happening next?
          </h1>
          <p
            className="meuse-fade-in-up mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-zinc-500 sm:text-xl"
            style={{ animationDelay: "0.1s" }}
          >
            Tell us what you&apos;re already doing so we can turn it into a fan
            experience.
          </p>
        </div>

        <div
          className="meuse-fade-in-up relative mx-auto mt-10 w-full sm:mt-12"
          style={{ animationDelay: "0.16s" }}
        >
          <div
            aria-hidden
            className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-pink-200/40 via-pink-100/20 to-transparent blur-sm"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white bg-white/90 p-1 shadow-[0_20px_60px_-12px_rgba(219,39,119,0.18),0_8px_24px_-8px_rgba(0,0,0,0.06)] backdrop-blur-xl">
            <div className="flex items-end gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4">
              <SparkleIcon className="mb-4 ml-0.5 h-5 w-5 shrink-0 text-pink-300 sm:h-6 sm:w-6" />
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={2}
                className="min-h-[4.5rem] flex-1 resize-none bg-transparent py-2 text-lg leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:outline-none sm:min-h-[5rem] sm:text-[1.35rem] sm:leading-relaxed"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!hasText}
                aria-label="Submit"
                className={`mb-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-14 sm:w-14 ${
                  hasText
                    ? "meuse-gradient-bg text-white shadow-lg shadow-pink-300/40 hover:scale-[1.04] active:scale-95"
                    : "bg-zinc-100 text-zinc-300"
                }`}
              >
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="meuse-fade-in-up mx-auto mt-7 w-full sm:mt-8"
          style={{ animationDelay: "0.22s" }}
        >
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {SUGGESTIONS.map((suggestion) => (
              <ActivityOptionCard
                key={suggestion.id}
                emoji={suggestion.emoji}
                label={suggestion.label}
                selected={selectedId === suggestion.id}
                onSelect={() => handleSuggestionSelect(suggestion.id)}
              />
            ))}
          </div>
        </div>

        <div
          className="meuse-fade-in-up mx-auto mt-7 w-full sm:mt-8"
          style={{ animationDelay: "0.28s" }}
        >
          <p className="mb-3 text-center text-xs font-medium tracking-wide text-zinc-400 uppercase sm:text-sm sm:normal-case sm:tracking-normal">
            Try things like:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {HINT_EXAMPLES.map((example) => (
              <ExamplePrompt
                key={example}
                text={example}
                onSelect={handleExampleSelect}
              />
            ))}
          </div>
        </div>

        {showProgress && (
          <div className="mx-auto mt-10 w-full max-w-md">
            <OnboardingProgress currentStep={1} />
          </div>
        )}
      </div>
    </section>
  );
}
