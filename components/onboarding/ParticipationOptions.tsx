import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { GamepadIcon } from "@/components/icons/GamepadIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { StarIcon } from "@/components/icons/StarIcon";
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
    case "sparkle":
      return <SparkleIcon className={className} />;
    case "star":
      return <StarIcon className={className} />;
  }
}

export function ParticipationOptions({
  selectedIds,
  onToggle,
}: ParticipationOptionsProps) {
  return (
    <div
      className="meuse-fade-in-up flex flex-col gap-3"
      style={{ animationDelay: "0.12s" }}
    >
      {PARTICIPATION_OPTIONS.map((option) => {
        const isSelected = selectedIds.has(option.id);

        const card = (
          <button
            type="button"
            onClick={() => onToggle(option.id)}
            aria-pressed={isSelected}
            className={`flex w-full items-start gap-3.5 rounded-[1.5rem] px-4 py-4 text-left transition-all duration-200 sm:gap-4 sm:px-5 sm:py-5 ${
              isSelected
                ? "bg-rose-50 shadow-meuse-card"
                : "border border-zinc-100 bg-white shadow-meuse-chip hover:border-pink-100 hover:shadow-md"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${
                isSelected
                  ? "bg-white text-pink-500"
                  : "bg-zinc-50 text-zinc-500"
              }`}
            >
              <ParticipationIcon
                icon={option.icon}
                className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-zinc-900 sm:text-lg">
                {option.title}
              </p>
              <p className="mt-1 text-sm leading-snug text-zinc-500">
                {option.description}
              </p>
              <p className="mt-2 text-xs font-medium tracking-wide text-pink-400">
                {option.examples}
              </p>
            </div>
            <ParticipationCheckbox checked={isSelected} />
          </button>
        );

        if (isSelected) {
          return (
            <div
              key={option.id}
              className="rounded-[1.5rem] p-[2px] meuse-gradient-border transition-transform duration-200"
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
