"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import {
  CUSTOM_PLACEHOLDER,
  DEFAULT_PLACEHOLDER,
  SUGGESTIONS,
  type SuggestionId,
} from "@/lib/onboarding/suggestions";
import { saveOnboardingData } from "@/lib/onboarding/storage";

export function useOnboardingStart() {
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

  function handleExampleSelect(example: string) {
    setInputValue(example);
    setPlaceholder(DEFAULT_PLACEHOLDER);
    focusInputAtEnd(example);
  }

  function handleSubmit() {
    if (!inputValue.trim()) return;
    saveOnboardingData({ activity: inputValue.trim() });
    router.push("/onboarding/frequency");
  }

  return {
    inputValue,
    setInputValue,
    selectedId,
    placeholder,
    textareaRef,
    handleSuggestionSelect,
    handleExampleSelect,
    handleSubmit,
    focusInputAtEnd,
  };
}
