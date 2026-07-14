import { OnboardingSectionTitle } from "@/components/onboarding/OnboardingSectionTitle";
import {
  ONLINE_PLATFORMS,
  type OnlinePlatform,
} from "@/lib/onboarding/location";

type OnlinePlatformSelectorProps = {
  selectedPlatform: OnlinePlatform | null;
  otherValue: string;
  onSelect: (platform: OnlinePlatform) => void;
  onOtherChange: (value: string) => void;
};

export function OnlinePlatformSelector({
  selectedPlatform,
  otherValue,
  onSelect,
  onOtherChange,
}: OnlinePlatformSelectorProps) {
  return (
    <div className="meuse-fade-in-up space-y-2.5">
      <OnboardingSectionTitle>Platform</OnboardingSectionTitle>

      <div className="flex flex-wrap gap-2">
        {ONLINE_PLATFORMS.map((platform) => {
          const isSelected = selectedPlatform === platform.id;

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => onSelect(platform.id)}
              className={`rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-200 sm:text-sm ${
                isSelected
                  ? "bg-rose-50 text-pink-700 ring-2 ring-pink-300"
                  : "border border-zinc-100 bg-white text-zinc-600 shadow-meuse-chip hover:border-pink-100"
              }`}
            >
              {platform.label}
            </button>
          );
        })}
      </div>

      {selectedPlatform === "other" && (
        <input
          type="text"
          value={otherValue}
          onChange={(event) => onOtherChange(event.target.value)}
          placeholder="Enter platform name"
          className="w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm text-zinc-900 shadow-meuse-chip placeholder:text-zinc-400 focus:border-pink-300 focus:outline-none"
        />
      )}
    </div>
  );
}
