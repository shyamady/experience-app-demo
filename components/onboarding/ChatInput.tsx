import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import { type RefObject } from "react";

type ChatInputProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

export function ChatInput({
  value,
  placeholder,
  onChange,
  onSubmit,
  textareaRef,
}: ChatInputProps) {
  const hasText = value.trim().length > 0;

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (hasText) {
        onSubmit();
      }
    }
  }

  return (
    <div
      className="meuse-fade-in-up rounded-meuse-lg bg-white p-3 shadow-meuse-input sm:p-4"
      style={{ animationDelay: "0.15s" }}
    >
      <div className="flex items-end gap-3">
        <SparkleIcon className="mb-3 ml-1 h-5 w-5 shrink-0 text-pink-300" />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          className="min-h-[3.5rem] flex-1 resize-none bg-transparent py-2 text-base leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:outline-none sm:min-h-[4rem] sm:text-lg"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={!hasText}
          aria-label="Submit"
          className={`mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 sm:h-12 sm:w-12 ${
            hasText
              ? "meuse-gradient-bg text-white shadow-lg shadow-pink-200/60 hover:scale-105 active:scale-95"
              : "bg-zinc-100 text-zinc-300"
          }`}
        >
          <ArrowIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
