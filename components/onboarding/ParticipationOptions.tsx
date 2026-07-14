import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { GamepadIcon } from "@/components/icons/GamepadIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { UsersIcon } from "@/components/icons/UsersIcon";
import { ParticipationCheckbox } from "@/components/onboarding/ParticipationCheckbox";
import {
  PARTICIPATION_OPTIONS,
  type ParticipationId,
  type ParticipationOption,
} from "@/lib/onboarding/participation";

type ParticipationOptionsProps = {
  selectedIds: Set<ParticipationId>;
  onToggle: (id: ParticipationId) => void;
};

function ParticipationIcon({
  icon,
  className,
}: {
  icon: ParticipationOption["icon"];
  className?: string;
}) {
  switch (icon) {
    case "eye":
      return <EyeIcon className={className} />;
    case "gamepad":
      return <GamepadIcon className={className} />;
    case "chat":
      return <ChatBubbleIcon className={className} />;
    case "users":
      return <UsersIcon className={className} />;
    case "heart":
      return <HeartIcon className={className} />;
  }
}

export function ParticipationOptions({
  selectedIds,
  onToggle,
}: ParticipationOptionsProps) {
  return (
    <div
      className="meuse-fade-in-up flex flex-col gap-2 sm:gap-2.5"
      style={{ animationDelay: "0.12s" }}
    >
      {PARTICIPATION_OPTIONS.map((option) => {
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
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${
                isSelected
                  ? "bg-white text-pink-500"
                  : "bg-zinc-50 text-zinc-500"
              }`}
            >
              <ParticipationIcon
                icon={option.icon}
                className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5"
              />
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
  );
}
