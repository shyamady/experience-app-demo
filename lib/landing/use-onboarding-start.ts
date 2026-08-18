"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  buildStarterIdea,
  DEFAULT_PLACEHOLDER,
  getInspirationExamples,
  getSuggestion,
  inferStarterContext,
  SUGGESTIONS,
  type SuggestionId,
} from "@/lib/onboarding/suggestions";
import { getOnboardingData, saveOnboardingData } from "@/lib/onboarding/storage";

export function useOnboardingStart() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [selectedId, setSelectedId] = useState<SuggestionId | null>(null);
  const [starterValue, setStarterValue] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const selectedSuggestion = getSuggestion(selectedId);
  const placeholder = selectedSuggestion?.placeholder ?? DEFAULT_PLACEHOLDER;
  const examples = useMemo(
    () => getInspirationExamples(selectedId),
    [selectedId],
  );

  const focusInputAtEnd = useCallback((value: string) => {
    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      const length = value.length;
      textarea.setSelectionRange(length, length);
    });
  }, []);

  const starterContext = useCallback(() => {
    const data = getOnboardingData();
    const inferred = inferStarterContext(
      [data.activity, data.knownDetails, data.locationCity].filter(Boolean).join(" "),
    );
    return {
      city: data.locationCity.trim() || inferred.city,
      destination: inferred.destination || data.locationCity.trim() || inferred.city,
      niche: inferred.niche,
    };
  }, []);

  function applyStarter(id: SuggestionId) {
    const nextStarter = buildStarterIdea(id, starterContext());
    const current = inputValue.trim();
    const hasCustomText =
      current.length > 0 && current !== starterValue?.trim();

    if (hasCustomText) {
      const shouldReplace = window.confirm(
        "Replace your current idea with a new starting sentence?",
      );
      setSelectedId(id);
      if (!shouldReplace) {
        focusInputAtEnd(inputValue);
        return;
      }
    } else {
      setSelectedId(id);
    }

    if (!nextStarter) {
      setInputValue("");
      setStarterValue(null);
      focusInputAtEnd("");
      return;
    }

    setInputValue(nextStarter);
    setStarterValue(nextStarter);
    focusInputAtEnd(nextStarter);
  }

  function handleSuggestionSelect(id: SuggestionId) {
    const suggestion = SUGGESTIONS.find((item) => item.id === id);
    if (!suggestion) return;
    if (id === selectedId) {
      focusInputAtEnd(inputValue);
      return;
    }
    applyStarter(id);
  }

  function handleExampleSelect(example: string) {
    setInputValue(example);
    setStarterValue(null);
    focusInputAtEnd(example);
  }

  function handleSubmit() {
    if (!inputValue.trim()) return;
    saveOnboardingData({
      activity: inputValue.trim(),
      projectCategory: selectedId,
    });
    router.push("/onboarding/needs");
  }

  return {
    inputValue,
    setInputValue,
    selectedId,
    placeholder,
    examples,
    textareaRef,
    handleSuggestionSelect,
    handleExampleSelect,
    handleSubmit,
    focusInputAtEnd,
  };
}
