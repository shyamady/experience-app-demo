import { OnboardingSectionTitle } from "@/components/onboarding/OnboardingSectionTitle";
import { ParticipationCheckbox } from "@/components/onboarding/ParticipationCheckbox";
import {
  PROJECT_NEED_OPTIONS,
  type ProjectNeedId,
} from "@/lib/onboarding/needs";

type NeedOptionsProps = {
  selectedIds: Set<ProjectNeedId>;
  onToggle: (id: ProjectNeedId) => void;
};

export function NeedOptions({ selectedIds, onToggle }: NeedOptionsProps) {
  return (
    <div className="space-y-2.5">
      <OnboardingSectionTitle>Project needs</OnboardingSectionTitle>
      <div
        className="meuse-fade-in-up flex flex-col gap-2 sm:gap-2.5"
        style={{ animationDelay: "0.12s" }}
      >
        {PROJECT_NEED_OPTIONS.map((option) => {
          const isSelected = selectedIds.has(option.id);

          const card = (
            <button
              type="button"
              onClick={() => onToggle(option.id)}
              aria-pressed={isSelected}
              className={`flex w-full items-center gap-3 rounded-meuse-sm px-3 py-3 text-left transition-all duration-200 sm:gap-3.5 sm:px-4 sm:py-3.5 ${
                isSelected
                  ? "bg-rose-50 shadow-meuse-card"
                  : "border border-zinc-100 bg-white shadow-meuse-chip hover:border-pink-100 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg sm:h-10 sm:w-10 ${
                  isSelected ? "bg-white" : "bg-zinc-50"
                }`}
              >
                {option.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-900 sm:text-[0.9375rem]">
                  {option.title}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-zinc-500 sm:text-[0.8125rem]">
                  {option.description}
                </p>
              </div>
              <ParticipationCheckbox checked={isSelected} />
            </button>
          );

          if (isSelected) {
            return (
              <div
                key={option.id}
                className="rounded-meuse-sm p-[2px] meuse-gradient-border transition-transform duration-200"
              >
                {card}
              </div>
            );
          }

          return <div key={option.id}>{card}</div>;
        })}
      </div>
    </div>
  );
}
