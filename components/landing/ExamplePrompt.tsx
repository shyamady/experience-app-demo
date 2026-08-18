type ExamplePromptProps = {
  text: string;
  onSelect: (text: string) => void;
};

export function ExamplePrompt({ text, onSelect }: ExamplePromptProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(text)}
      className="rounded-full border border-pink-100/90 bg-white/80 px-3.5 py-1.5 text-sm text-zinc-500 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] transition hover:border-pink-200 hover:bg-white hover:text-pink-600 hover:shadow-[0_6px_16px_-8px_rgba(236,72,153,0.18)]"
    >
      {text}
    </button>
  );
}
