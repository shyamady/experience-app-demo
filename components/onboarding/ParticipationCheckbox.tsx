import { CheckIcon } from "@/components/icons/CheckIcon";

type ParticipationCheckboxProps = {
  checked: boolean;
};

export function ParticipationCheckbox({ checked }: ParticipationCheckboxProps) {
  return (
    <div
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 sm:h-[1.375rem] sm:w-[1.375rem] ${
        checked
          ? "border-transparent meuse-gradient-bg shadow-sm shadow-pink-200/50"
          : "border-zinc-200 bg-white"
      }`}
      aria-hidden="true"
    >
      {checked && <CheckIcon className="h-3 w-3 text-white" />}
    </div>
  );
}
