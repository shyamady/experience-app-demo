import { CheckIcon } from "@/components/icons/CheckIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { LocationPinIcon } from "@/components/icons/LocationPinIcon";
import { OnboardingSectionTitle } from "@/components/onboarding/OnboardingSectionTitle";
import {
  LOCATION_TYPE_OPTIONS,
  type LocationType,
} from "@/lib/onboarding/location";

type LocationTypeSectionProps = {
  selectedType: LocationType | null;
  onSelect: (type: LocationType) => void;
};

function LocationIcon({ icon }: { icon: "pin" | "globe" }) {
  if (icon === "pin") {
    return <LocationPinIcon className="h-5 w-5" />;
  }
  return <GlobeIcon className="h-5 w-5" />;
}

export function LocationTypeSection({
  selectedType,
  onSelect,
}: LocationTypeSectionProps) {
  return (
    <div className="space-y-2.5">
      <OnboardingSectionTitle>Where is it happening?</OnboardingSectionTitle>

      <div className="grid grid-cols-2 gap-2">
        {LOCATION_TYPE_OPTIONS.map((option) => {
          const isSelected = selectedType === option.id;

          const card = (
            <button
              type="button"
              onClick={() => onSelect(option.id)}
              className={`flex h-full w-full flex-col items-start gap-2 rounded-meuse-sm px-3 py-3 text-left transition-all duration-200 sm:px-3.5 ${
                isSelected
                  ? "bg-rose-50 text-pink-700"
                  : "border border-zinc-100 bg-white text-zinc-700 shadow-meuse-chip hover:border-pink-100"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    isSelected
                      ? "bg-white text-pink-500"
                      : "bg-zinc-50 text-zinc-500"
                  }`}
                >
                  <LocationIcon icon={option.icon} />
                </div>
                {isSelected && (
                  <CheckIcon className="h-3.5 w-3.5 text-pink-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">{option.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-zinc-500">
                  {option.description}
                </p>
              </div>
            </button>
          );

          if (isSelected) {
            return (
              <div
                key={option.id}
                className="rounded-meuse-sm p-[2px] meuse-gradient-border"
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
