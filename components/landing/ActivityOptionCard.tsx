import { CheckIcon } from "@/components/icons/CheckIcon";

type ActivityOptionCardProps = {
  emoji: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
};

const BASE_CARD =
  "relative flex h-[4.5rem] w-full flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-2.5 transition-all duration-200 ease-out";

const SELECTED_CARD = [
  BASE_CARD,
  "border-pink-300 bg-white text-pink-700",
  "shadow-[0_3px_0_0_#f472b6,0_10px_28px_-8px_rgba(236,72,153,0.28)]",
].join(" ");

const DEFAULT_CARD = [
  BASE_CARD,
  "border-pink-100/90 bg-white/75 text-zinc-600 backdrop-blur-sm",
  "shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset]",
  "hover:border-pink-200 hover:bg-white hover:text-zinc-800",
  "hover:shadow-[0_2px_0_0_#fbcfe8,0_6px_20px_-8px_rgba(236,72,153,0.12)]",
  "active:scale-[0.98]",
].join(" ");

export function ActivityOptionCard({
  emoji,
  label,
  selected,
  onSelect,
}: ActivityOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={selected ? SELECTED_CARD : DEFAULT_CARD}
    >
      <span
        className={`absolute top-2 right-2 flex h-4 w-4 items-center justify-center transition-opacity duration-200 ${
          selected ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!selected}
      >
        <CheckIcon className="h-3.5 w-3.5 text-pink-500" />
      </span>

      <span className="text-xl leading-none sm:text-[1.35rem]">{emoji}</span>
      <span className="max-w-full px-1 text-center text-[11px] leading-[1.25] font-medium text-balance sm:text-xs">
        {label}
      </span>
    </button>
  );
}
