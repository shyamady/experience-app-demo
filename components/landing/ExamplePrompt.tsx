type ExamplePromptProps = {
  text: string;
  selected?: boolean;
  onSelect: () => void;
};

const BASE_CHIP =
  "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200";

const DEFAULT_CHIP = [
  BASE_CHIP,
  "border-pink-100/90 bg-white/80 text-zinc-500",
  "shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]",
  "hover:border-pink-200 hover:bg-white hover:text-pink-600",
  "hover:shadow-[0_6px_16px_-8px_rgba(236,72,153,0.18)]",
  "active:scale-[0.98]",
].join(" ");

const SELECTED_CHIP = [
  BASE_CHIP,
  "border-pink-300 bg-white text-pink-700",
  "shadow-[0_2px_0_0_#f472b6,0_6px_16px_-8px_rgba(236,72,153,0.22)]",
].join(" ");

export function ExamplePrompt({
  text,
  selected = false,
  onSelect,
}: ExamplePromptProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={selected ? SELECTED_CHIP : DEFAULT_CHIP}
    >
      {text}
    </button>
  );
}
