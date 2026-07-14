import { CheckIcon } from "@/components/icons/CheckIcon";
import {
  SUGGESTIONS,
  type SuggestionId,
} from "@/lib/onboarding/suggestions";

type SuggestionChipsProps = {
  selectedId: SuggestionId | null;
  onSelect: (id: SuggestionId) => void;
};

export function SuggestionChips({ selectedId, onSelect }: SuggestionChipsProps) {
  return (
    <div
      className="meuse-fade-in-up flex flex-wrap gap-2.5 sm:gap-3"
      style={{ animationDelay: "0.25s" }}
    >
      {SUGGESTIONS.map((suggestion) => {
        const isSelected = selectedId === suggestion.id;

        const chip = (
          <button
            type="button"
            onClick={() => onSelect(suggestion.id)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:text-[0.9375rem] ${
              isSelected
                ? "bg-rose-50 text-pink-700"
                : "bg-white text-zinc-700 shadow-meuse-chip hover:border-pink-100 hover:shadow-md"
            }`}
          >
            <span>{suggestion.emoji}</span>
            <span>{suggestion.label}</span>
            {isSelected && <CheckIcon className="h-3.5 w-3.5 text-pink-500" />}
          </button>
        );

        if (isSelected) {
          return (
            <div
              key={suggestion.id}
              className="rounded-full p-[2px] meuse-gradient-border"
            >
              {chip}
            </div>
          );
        }

        return <div key={suggestion.id}>{chip}</div>;
      })}
    </div>
  );
}
