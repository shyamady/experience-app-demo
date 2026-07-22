"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { AiHintCard } from "@/components/onboarding/AiHintCard";
import { AiMessageBubble } from "@/components/onboarding/AiMessageBubble";
import { ChatInput } from "@/components/onboarding/ChatInput";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { SuggestionChips } from "@/components/onboarding/SuggestionChips";
import {
  CUSTOM_PLACEHOLDER,
  DEFAULT_PLACEHOLDER,
  SUGGESTIONS,
  type SuggestionId,
} from "@/lib/onboarding/suggestions";
import { saveOnboardingData } from "@/lib/onboarding/storage";

type RootOnboardingScreenProps = {
  hideHeader?: boolean;
  className?: string;
};

export function RootOnboardingScreen({
  hideHeader = false,
  className = "",
}: RootOnboardingScreenProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [selectedId, setSelectedId] = useState<SuggestionId | null>(null);
  const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusInputAtEnd = useCallback((value: string) => {
    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.focus();
      const length = value.length;
      textarea.setSelectionRange(length, length);
    });
  }, []);

  function handleSuggestionSelect(id: SuggestionId) {
    const suggestion = SUGGESTIONS.find((item) => item.id === id);
    if (!suggestion) return;

    setSelectedId(id);

    if (id === "something-else") {
      setPlaceholder(CUSTOM_PLACEHOLDER);
      focusInputAtEnd(inputValue);
      return;
    }

    setPlaceholder(DEFAULT_PLACEHOLDER);
    setInputValue(suggestion.prompt ?? "");
    focusInputAtEnd(suggestion.prompt ?? "");
  }

  function handleSubmit() {
    if (!inputValue.trim()) return;
    saveOnboardingData({ activity: inputValue.trim() });
    router.push("/onboarding/frequency");
  }

  return (
    <div
      className={`flex min-h-screen flex-col ${
        hideHeader ? "bg-transparent" : "bg-white"
      } ${className}`}
    >
      {!hideHeader && <OnboardingHeader />}

      <main className="relative flex flex-1 flex-col items-center justify-center px-4 pb-4 sm:px-6">
        {!hideHeader && <GradientGlow />}

        <div className="relative z-10 w-full max-w-[760px] space-y-5 sm:space-y-6">
          <AiMessageBubble />
          <ChatInput
            value={inputValue}
            placeholder={placeholder}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            textareaRef={textareaRef}
          />
          <SuggestionChips
            selectedId={selectedId}
            onSelect={handleSuggestionSelect}
          />
          <AiHintCard />
        </div>
      </main>

      <OnboardingProgress currentStep={1} />
    </div>
  );
}
