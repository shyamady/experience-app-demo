type ExamplePromptProps = {
  text: string;
  onSelect: (text: string) => void;
};

export function ExamplePrompt({ text, onSelect }: ExamplePromptProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(text)}
      className="rounded-full px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-pink-50 hover:text-pink-600"
    >
      {text}
    </button>
  );
}
