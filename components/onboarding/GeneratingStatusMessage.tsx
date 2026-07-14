import { SparkleIcon } from "@/components/icons/SparkleIcon";

type GeneratingStatusMessageProps = {
  message: string;
};

export function GeneratingStatusMessage({
  message,
}: GeneratingStatusMessageProps) {
  return (
    <div
      key={message}
      className="meuse-status-fade flex items-center justify-center gap-2"
    >
      <SparkleIcon className="meuse-status-sparkle h-4 w-4 shrink-0 text-pink-400" />
      <p className="text-sm font-medium text-zinc-600 sm:text-[0.9375rem]">
        {message}
      </p>
    </div>
  );
}
