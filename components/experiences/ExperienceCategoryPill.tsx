import type { ExperienceCategory } from "@/lib/onboarding/experiences";
import { getCategoryStyles } from "@/lib/onboarding/experiences";

type ExperienceCategoryPillProps = {
  category: ExperienceCategory;
};

export function ExperienceCategoryPill({ category }: ExperienceCategoryPillProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[0.625rem] font-bold tracking-wide sm:text-[0.6875rem] ${getCategoryStyles(category)}`}
    >
      {category}
    </span>
  );
}
