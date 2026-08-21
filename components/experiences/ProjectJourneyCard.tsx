import { buildProjectJourney } from "@/lib/onboarding/project-journey";
import type { ProjectMilestone } from "@/types/launch";

type ProjectJourneyCardProps = {
  milestones: ProjectMilestone[];
};

export function ProjectJourneyCard({ milestones }: ProjectJourneyCardProps) {
  const steps = buildProjectJourney(milestones);

  return (
    <section className="overflow-hidden rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-7 sm:py-8">
      <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
        EXECUTION
      </p>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
        How this comes to life
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        A clear path from first confirmation to launch.
      </p>

      <ol
        className="mt-6 hidden lg:grid lg:gap-3"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`} className="relative text-center">
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-7 right-[-0.75rem] left-[calc(50%+1.75rem)] h-0.5 bg-gradient-to-r from-pink-200 to-rose-100"
              />
            )}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl shadow-meuse-chip">
              {step.emoji}
            </div>
            <p className="mt-3 text-sm font-bold text-zinc-900">{step.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <ol className="relative mt-6 space-y-4 lg:hidden">
        <span
          aria-hidden
          className="absolute top-4 bottom-4 left-[1.7rem] w-0.5 bg-gradient-to-b from-pink-200 via-rose-100 to-transparent"
        />
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`} className="relative flex gap-4">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-2xl shadow-meuse-chip">
              {step.emoji}
            </div>
            <div className="min-w-0 pt-2">
              <p className="text-sm font-bold text-zinc-900">{step.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-zinc-500">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}