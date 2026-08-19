import type { GoalType } from "@/lib/onboarding/goal";
import { formatGoalAmount } from "@/lib/onboarding/plan-math";

type MakeItHappenCardProps = {
  goalType: GoalType;
  goalValue: number;
};

export function MakeItHappenCard({
  goalType,
  goalValue,
}: MakeItHappenCardProps) {
  return (
    <section className="rounded-meuse bg-white px-5 py-6 text-center shadow-meuse-card sm:px-7">
      <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
        GOAL
      </p>
      <h2 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
        {formatGoalAmount(goalType, goalValue)}
      </h2>
    </section>
  );
}
