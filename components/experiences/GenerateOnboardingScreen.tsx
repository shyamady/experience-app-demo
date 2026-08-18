"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";
import { AddExperiencePanel } from "@/components/experiences/AddExperiencePanel";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { ProjectEstimatesCard } from "@/components/experiences/ProjectEstimatesCard";
import { ProjectMilestonesCard } from "@/components/experiences/ProjectMilestonesCard";
import { ProjectOverviewCard } from "@/components/experiences/ProjectOverviewCard";
import { AiOnboardingMessage } from "@/components/onboarding/AiOnboardingMessage";
import { GenerationErrorCard } from "@/components/onboarding/GenerationErrorCard";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import {
  MobileStickyActionBar,
  MOBILE_STICKY_CTA_PADDING,
} from "@/components/onboarding/MobileStickyActionBar";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import {
  extractCityFromData,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";
import { getGeneratedLaunch } from "@/lib/onboarding/generated-launch";
import { mapLaunchProducts } from "@/lib/onboarding/map-launch-products";
import { getOnboardingData } from "@/lib/onboarding/storage";
import {
  createLaunchFromOnboarding,
  saveLaunchData,
} from "@/lib/launch/storage";
import { getPlaceholderImageUrl } from "@/lib/unsplash/search-photos";
import type { ProjectMilestone } from "@/types/launch";

export function GenerateOnboardingScreen() {
  const router = useRouter();
  const onboardingData = useMemo(() => getOnboardingData(), []);
  const city = extractCityFromData(onboardingData);
  const generatedLaunch = useMemo(() => getGeneratedLaunch(), []);
  const generated =
    generatedLaunch?.status === "success" ? generatedLaunch.data : null;

  const [products, setProducts] = useState<ExperienceProduct[]>(() => {
    if (generated) return mapLaunchProducts(generated.products);
    return [];
  });
  const [overview, setOverview] = useState(() => ({
    title: generated?.heroTitle ?? "Your project",
    heroImageUrl:
      generated?.heroImageUrl ??
      generated?.products[0]?.imageUrl ??
      getPlaceholderImageUrl(),
    story: generated?.heroDescription ?? "",
    whyItMatters: generated?.whyItMatters ?? "",
    communityMakesPossible: generated?.communityMakesPossible ?? "",
  }));
  const [estimates, setEstimates] = useState(() => ({
    estimatedBudget: generated?.estimatedBudget ?? "$8,000–$12,000",
    estimatedTimeToLaunch: generated?.estimatedTimeToLaunch ?? "60–90 days",
    suggestedMinimumGoal: generated?.suggestedMinimumGoal ?? "$8,000",
    recommendedCampaignLength:
      generated?.recommendedCampaignLength ?? "30 days",
    estimateAssumptions:
      generated?.estimateAssumptions ??
      "These are AI-generated starting estimates based on similar one-time projects. They are not guaranteed.",
  }));
  const [milestones, setMilestones] = useState<ProjectMilestone[]>(
    () => generated?.milestones ?? [],
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);

  const handleRetry = useCallback(() => {
    router.push("/onboarding/generating");
  }, [router]);

  const updateProduct = useCallback(
    (id: string, updates: Partial<ExperienceProduct>) => {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === id ? { ...product, ...updates } : product,
        ),
      );
    },
    [],
  );

  const handleSignUpToLaunch = useCallback(() => {
    const launch = createLaunchFromOnboarding(products, {
      title: overview.title,
      description: overview.story,
      coverImageUrl: overview.heroImageUrl,
      whyItMatters: overview.whyItMatters,
      communityMakesPossible: overview.communityMakesPossible,
      estimatedBudget: estimates.estimatedBudget,
      estimatedTimeToLaunch: estimates.estimatedTimeToLaunch,
      suggestedMinimumGoal: estimates.suggestedMinimumGoal,
      recommendedCampaignLength: estimates.recommendedCampaignLength,
      estimateAssumptions: estimates.estimateAssumptions,
      milestones,
    });
    saveLaunchData(launch);
    router.push("/dashboard");
  }, [estimates, milestones, overview, products, router]);

  const handleDrop = useCallback(
    (targetId: string) => {
      if (!draggingId || draggingId === targetId) return;

      setProducts((previous) => {
        const items = [...previous];
        const fromIndex = items.findIndex((item) => item.id === draggingId);
        const toIndex = items.findIndex((item) => item.id === targetId);
        if (fromIndex < 0 || toIndex < 0) return previous;

        const [moved] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, moved);
        return items;
      });
      setDraggingId(null);
    },
    [draggingId],
  );

  if (!generatedLaunch || generatedLaunch.status === "error") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <OnboardingHeader compact />

        <main
          className={`relative flex-1 overflow-y-auto px-4 pt-2 sm:px-6 sm:pb-6 sm:py-4 ${MOBILE_STICKY_CTA_PADDING}`}
        >
          <GradientGlow />

          <div className="relative z-10 mx-auto w-full max-w-[1000px]">
            <GenerationErrorCard onRetry={handleRetry} />
          </div>
        </main>

        <div className="hidden sm:block">
          <OnboardingProgress currentStep={4} compact />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#fff7fa]">
      <OnboardingHeader compact />

      <main
        className={`relative flex-1 overflow-y-auto px-4 pt-2 sm:px-6 sm:pb-6 sm:py-4 ${MOBILE_STICKY_CTA_PADDING}`}
      >
        <GradientGlow />

        <div className="relative z-10 mx-auto w-full max-w-[1000px] space-y-5">
          <AiOnboardingMessage
            compact
            stepLabel="STEP 4 OF 4"
            headline="Your Project Plan"
            supportingText="A realistic starting plan and meaningful ways your community can help bring it to life. Everything here is editable."
          />

          <ProjectOverviewCard
            overview={overview}
            onChange={(updates) =>
              setOverview((current) => ({ ...current, ...updates }))
            }
          />

          <ProjectEstimatesCard
            estimates={estimates}
            onChange={(updates) =>
              setEstimates((current) => ({ ...current, ...updates }))
            }
          />

          <ProjectMilestonesCard
            milestones={milestones}
            onChange={setMilestones}
          />

          <div className="space-y-3">
            <div>
              <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
                WAYS TO PARTICIPATE
              </p>
              <h2 className="mt-1 text-lg font-bold text-zinc-900">
                Participation styles
              </h2>
            </div>

            {products.map((product) => (
              <ExperienceCard
                key={product.id}
                product={product}
                isEditing={editingId === product.id}
                isDragging={draggingId === product.id}
                onToggleActive={(active) => updateProduct(product.id, { active })}
                onEdit={() =>
                  setEditingId((current) =>
                    current === product.id ? null : product.id,
                  )
                }
                onUpdate={(updates) => updateProduct(product.id, updates)}
                onDragStart={() => setDraggingId(product.id)}
                onDragEnd={() => setDraggingId(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(product.id)}
              />
            ))}
          </div>

          {showAddPanel ? (
            <AddExperiencePanel
              city={city}
              onAdd={(product) =>
                setProducts((previous) => [...previous, product])
              }
              onClose={() => setShowAddPanel(false)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowAddPanel(true)}
              className="flex w-full items-center justify-center rounded-meuse border-2 border-dashed border-pink-200 py-5 text-sm font-medium text-pink-500 transition-colors hover:border-pink-300 hover:bg-rose-50"
            >
              Add another participation style
            </button>
          )}

          <div className="hidden items-center justify-between gap-3 pb-2 sm:flex">
            <Link
              href="/onboarding/participation"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-800"
            >
              <BackArrowIcon className="h-4 w-4" />
              Back
            </Link>

            <button
              type="button"
              onClick={handleSignUpToLaunch}
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign Up to Launch
            </button>
          </div>
        </div>
      </main>

      <div className="hidden sm:block">
        <OnboardingProgress currentStep={4} compact />
      </div>

      <MobileStickyActionBar
        backHref="/onboarding/participation"
        continueLabel="Sign Up to Launch"
        onContinueClick={handleSignUpToLaunch}
        canContinue
      />
    </div>
  );
}
