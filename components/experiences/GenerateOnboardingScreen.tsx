"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";
import { AddExperiencePanel } from "@/components/experiences/AddExperiencePanel";
import { MakeItHappenCard } from "@/components/experiences/MakeItHappenCard";
import { PlanOfferCard } from "@/components/experiences/PlanOfferCard";
import { PotentialIfBookedCard } from "@/components/experiences/PotentialIfBookedCard";
import { ProjectPlanHero } from "@/components/experiences/ProjectPlanHero";
import { WhatItTakesCard } from "@/components/experiences/WhatItTakesCard";
import { AiOnboardingMessage } from "@/components/onboarding/AiOnboardingMessage";
import { GenerationErrorCard } from "@/components/onboarding/GenerationErrorCard";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import {
  MobileStickyActionBar,
  MOBILE_STICKY_CTA_PADDING,
} from "@/components/onboarding/MobileStickyActionBar";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { isSponsorProduct } from "@/lib/dashboard/commerce";
import {
  extractCityFromData,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";
import { getGeneratedLaunch } from "@/lib/onboarding/generated-launch";
import { mapLaunchProducts } from "@/lib/onboarding/map-launch-products";
import { getPlanMetrics } from "@/lib/onboarding/plan-math";
import { getOnboardingData, getProjectCategoryLabel } from "@/lib/onboarding/storage";
import { budgetLinesForProject } from "@/lib/launch/fallback";
import { createLaunchFromOnboarding } from "@/lib/launch/storage";
import { getPlaceholderImageUrl } from "@/lib/unsplash/search-photos";

export function GenerateOnboardingScreen() {
  const router = useRouter();
  const onboardingData = useMemo(() => getOnboardingData(), []);
  const city = extractCityFromData(onboardingData);
  const generatedLaunch = useMemo(() => getGeneratedLaunch(), []);
  const generated =
    generatedLaunch?.status === "success" ? generatedLaunch.data : null;
  const offersRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<ExperienceProduct[]>(() => {
    if (generated) return mapLaunchProducts(generated.products);
    return [];
  });
  const [hero, setHero] = useState(() => ({
    title: generated?.heroTitle ?? "Your project",
    description: generated?.heroDescription ?? "",
    imageUrl:
      generated?.heroImageUrl ??
      generated?.products[0]?.imageUrl ??
      getPlaceholderImageUrl(),
  }));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);

  const goalType = onboardingData.goalType ?? generated?.goalType ?? "funding";
  const goalValue = onboardingData.goalUnsure
    ? generated?.goalValue ||
      onboardingData.goalValue ||
      (goalType === "people" ? 50 : 10000)
    : onboardingData.goalValue ||
      generated?.goalValue ||
      (goalType === "people" ? 50 : 10000);

  const metrics = useMemo(
    () => getPlanMetrics(products, goalType, goalValue),
    [goalType, goalValue, products],
  );
  const participation = products.filter((product) => !isSponsorProduct(product));
  const sponsors = products.filter((product) => isSponsorProduct(product));
  const budgetLines = useMemo(() => {
    if (generated?.budgetLines && generated.budgetLines.length > 0) {
      return generated.budgetLines;
    }
    const total = goalType === "funding" ? goalValue : Math.max(8000, goalValue * 120);
    return budgetLinesForProject(
      onboardingData.activity,
      getProjectCategoryLabel(onboardingData.projectCategory) || undefined,
      total,
    );
  }, [
    generated,
    goalType,
    goalValue,
    onboardingData.activity,
    onboardingData.projectCategory,
  ]);
  const estimatedNeed =
    goalType === "funding"
      ? goalValue
      : budgetLines.reduce((sum, line) => sum + line.amount, 0) || metrics.revenue;

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

  const handleCreateLaunch = useCallback(() => {
    createLaunchFromOnboarding(products, {
      title: hero.title,
      description: hero.description,
      coverImageUrl: hero.imageUrl,
      estimateAssumptions: generated?.estimateAssumptions,
      suggestedMinimumGoal: generated?.suggestedGoalRange,
      estimatedBudget: generated?.estimatedBudget,
      budgetLines: generated?.budgetLines ?? budgetLines,
      goalType,
      goalValue,
    });
    router.push("/dashboard/overview");
  }, [budgetLines, generated, goalType, goalValue, hero, products, router]);

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

  function offerCard(product: ExperienceProduct, sponsor = false) {
    return (
      <PlanOfferCard
        key={product.id}
        product={product}
        sponsor={sponsor}
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
    );
  }

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

        <div className="relative z-10 mx-auto w-full max-w-[720px] space-y-5">
          <AiOnboardingMessage
            compact
            stepLabel="STEP 4 OF 4"
            headline="Your Project Plan"
            supportingText="Meuse turned your idea into something you can launch and sell. Everything here is a starting estimate you can edit."
          />

          <ProjectPlanHero
            title={hero.title}
            description={hero.description}
            imageUrl={hero.imageUrl}
            onChange={(updates) =>
              setHero((current) => ({
                ...current,
                title: updates.title ?? current.title,
                description: updates.description ?? current.description,
                imageUrl: updates.imageUrl ?? current.imageUrl,
              }))
            }
          />

          <MakeItHappenCard goalType={goalType} goalValue={goalValue} />

          <WhatItTakesCard
            lines={budgetLines}
            goalType={goalType}
            goalValue={goalValue}
          />

          <div ref={offersRef} className="space-y-3">
            <div>
              <h2 className="text-lg font-bold text-zinc-900">
                Ways people can make this happen
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                These are the participation options Meuse suggests based on your goal.
              </p>
            </div>
            {participation.map((product) => offerCard(product))}
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
              Add another way to participate
            </button>
          )}

          <PotentialIfBookedCard
            potential={metrics.participantRevenue}
            target={estimatedNeed}
            onAdjust={() =>
              offersRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          />

          {sponsors.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-zinc-900">
                Sponsorship Opportunities
              </h2>
              {sponsors.map((product) => offerCard(product, true))}
            </div>
          )}

          <div className="flex flex-col gap-2 pb-2">
            <button
              type="button"
              onClick={handleCreateLaunch}
              className="inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
            >
              Create My Launch
            </button>
            <button
              type="button"
              onClick={() =>
                offersRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full py-2 text-sm font-semibold text-zinc-500"
            >
              Edit
            </button>
            <Link
              href="/onboarding/participation"
              className="hidden items-center justify-center gap-1.5 py-2 text-sm font-medium text-zinc-400 sm:inline-flex"
            >
              <BackArrowIcon className="h-4 w-4" />
              Back
            </Link>
          </div>
        </div>
      </main>

      <div className="hidden sm:block">
        <OnboardingProgress currentStep={4} compact />
      </div>

      <MobileStickyActionBar
        backHref="/onboarding/participation"
        continueLabel="Create My Launch"
        onContinueClick={handleCreateLaunch}
        canContinue
      />
    </div>
  );
}
