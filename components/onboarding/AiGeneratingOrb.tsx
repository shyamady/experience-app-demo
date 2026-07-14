import { SparkleIcon } from "@/components/icons/SparkleIcon";

export function AiGeneratingOrb() {
  return (
    <div
      className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32"
      aria-hidden="true"
    >
      <div className="meuse-orb-glow absolute inset-0 rounded-full" />
      <div className="meuse-orb-ring absolute inset-0 rounded-full" />
      <div className="absolute inset-[10%] rounded-full bg-white shadow-meuse-card" />
      <div className="meuse-orb-core absolute inset-[22%] rounded-full" />

      <SparkleIcon className="meuse-orb-sparkle meuse-orb-sparkle-1 absolute h-3 w-3 text-pink-400" />
      <SparkleIcon className="meuse-orb-sparkle meuse-orb-sparkle-2 absolute h-2.5 w-2.5 text-pink-300" />
      <SparkleIcon className="meuse-orb-sparkle meuse-orb-sparkle-3 absolute h-2 w-2 text-purple-300" />
    </div>
  );
}
