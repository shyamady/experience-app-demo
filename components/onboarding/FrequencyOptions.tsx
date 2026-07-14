import { CheckIcon } from "@/components/icons/CheckIcon";
import { OnboardingSectionTitle } from "@/components/onboarding/OnboardingSectionTitle";
import {
  FREQUENCY_OPTIONS,
  type FrequencyId,
} from "@/lib/onboarding/frequency";

type FrequencyOptionsProps = {
  selectedId: FrequencyId | null;
  onSelect: (id: FrequencyId) => void;
};

export function FrequencyOptions({
  selectedId,
  onSelect,
}: FrequencyOptionsProps) {
  return (
    <div className="space-y-2.5">
      <OnboardingSectionTitle>How often will this happen?</OnboardingSectionTitle>

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {FREQUENCY_OPTIONS.map((option) => {
          const isSelected = selectedId === option.id;

          const card = (
            <button
              type="button"
              onClick={() => onSelect(option.id)}
              className={`flex w-full items-center justify-between rounded-meuse-sm px-3 py-2.5 text-left transition-all duration-200 sm:px-3.5 sm:py-3 ${
                isSelected
                  ? "bg-rose-50 text-pink-700"
                  : "bg-white text-zinc-700 shadow-meuse-chip hover:shadow-md"
              }`}
            >
              <span className="text-sm font-medium leading-tight sm:text-[0.9375rem]">
                {option.label}
              </span>
              {isSelected && (
                <CheckIcon className="h-3.5 w-3.5 shrink-0 text-pink-500" />
              )}
            </button>
          );

          if (isSelected) {
            return (
              <div
                key={option.id}
                className={`rounded-meuse-sm p-[2px] meuse-gradient-border ${
                  option.fullWidth ? "col-span-2" : ""
                }`}
              >
                {card}
              </div>
            );
          }

          return (
            <div
              key={option.id}
              className={option.fullWidth ? "col-span-2" : undefined}
            >
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}
