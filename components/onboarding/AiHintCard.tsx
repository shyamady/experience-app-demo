import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { HINT_EXAMPLES } from "@/lib/onboarding/suggestions";

export function AiHintCard() {
  return (
    <div
      className="meuse-fade-in-up rounded-meuse-sm bg-meuse-hint px-5 py-4 sm:px-6"
      style={{ animationDelay: "0.35s" }}
    >
      <div className="flex items-start gap-3">
        <SparkleIcon className="mt-0.5 h-4 w-4 shrink-0 text-pink-300" />
        <div>
          <p className="text-sm font-semibold text-zinc-800">Try things like:</p>
          <ul className="mt-2 space-y-1">
            {HINT_EXAMPLES.map((example) => (
              <li
                key={example}
                className="text-sm leading-relaxed text-zinc-500"
              >
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
