"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";
import { AddExperiencePanel } from "@/components/experiences/AddExperiencePanel";
import { PathToGoalCard } from "@/components/experiences/PathToGoalCard";
import { PreviewOfferCard } from "@/components/experiences/PreviewOfferCard";
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
import { budgetLinesForProject } from "@/lib/launch/fallback";
import { createLaunchFromOnboarding } from "@/lib/launch/storage";
import {
  extractCityFromData,
  EXPERIENCE_TEMPLATES,
  EXPERIENCE_IMAGES,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";
import { getGeneratedLaunch } from "@/lib/onboarding/generated-launch";
import { mapLaunchProducts } from "@/lib/onboarding/map-launch-products";
import {
  buildPathToGoal,
  formatMoney,
  pathToGoalTotal,
} from "@/lib/onboarding/plan-math";
import {
  getOnboardingData,
  getProjectCategoryLabel,
} from "@/lib/onboarding/storage";
import { getPlaceholderImageUrl } from "@/lib/unsplash/search-photos";

const GOAL_REACHED_STEPS = [
  "Funding closes",
  "Project is confirmed",
  "Participants receive access based on their offer",
  "Project begins",
  "Updates are shared throughout the process",
];

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
    subtitle:
      generated?.heroSubtitle ??
      (generated?.goalValue
        ? `${formatMoney(generated.goalValue)} needed to make it happen`
        : ""),
    description: generated?.heroDescription ?? "",
    imageUrl:
      generated?.heroImageUrl ??
      generated?.products[0]?.imageUrl ??
      getPlaceholderImageUrl(),
  }));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);

  const goalValue =
    onboardingData.goalValue || generated?.goalValue || 2500;

  const budgetLines = useMemo(() => {
    if (generated?.budgetLines && generated.budgetLines.length > 0) {
      return generated.budgetLines;
    }
    return budgetLinesForProject(
      onboardingData.activity,
      getProjectCategoryLabel(onboardingData.projectCategory) || undefined,
      goalValue,
    );
  }, [
    generated,
    goalValue,
    onboardingData.activity,
    onboardingData.projectCategory,
  ]);

  const pathLines = useMemo(
    () => buildPathToGoal(products, goalValue),
    [products, goalValue],
  );
  const pathTotal = pathToGoalTotal(pathLines);
  const milestones = generated?.milestones ?? [];

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

  const removeProduct = useCallback((id: string) => {
    setProducts((previous) => previous.filter((product) => product.id !== id));
    setEditingId((current) => (current === id ? null : current));
  }, []);

  const regenerateProduct = useCallback((id: string) => {
    setProducts((previous) =>
      previous.map((product) => {
        if (product.id !== id) return product;
        const template =
          EXPERIENCE_TEMPLATES[
            Math.floor(Math.random() * EXPERIENCE_TEMPLATES.length)
          ];
        return {
          ...product,
          title: template.title,
          description: template.description,
          price: template.price,
          spots: template.spots,
          category: template.category,
          imageUrl: EXPERIENCE_IMAGES[template.imageKey],
          howItHelps: template.howItHelps,
          access: template.access,
        };
      }),
    );
  }, []);

  const handleCreateLaunch = useCallback(() => {
    createLaunchFromOnboarding(products, {
      title: hero.title,
      description: hero.description,
      coverImageUrl: hero.imageUrl,
      estimateAssumptions: generated?.estimateAssumptions,
      suggestedMinimumGoal: generated?.suggestedGoalRange,
      estimatedBudget: generated?.estimatedBudget,
      budgetLines: generated?.budgetLines ?? budgetLines,
      milestones: generated?.milestones,
      goalType: "funding",
      goalValue,
    });
    router.push("/dashboard/overview");
  }, [budgetLines, generated, goalValue, hero, products, router]);

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

        <div className="relative z-10 mx-auto w-full max-w-[1080px] space-y-8">
          <AiOnboardingMessage
            compact
            stepLabel="PREVIEW · STEP 4 OF 4"
            headline="Your campaign is ready to launch"
            supportingText="One idea, turned into a project people can fund and join."
          />

          <section className="overflow-hidden rounded-[2rem] bg-white shadow-meuse-card">
            <div className="relative h-64 sm:h-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <label className="absolute right-4 bottom-4 cursor-pointer rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-meuse-chip backdrop-blur-sm">
                Change photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setHero((current) => ({
                      ...current,
                      imageUrl: URL.createObjectURL(file),
                    }));
                  }}
                />
              </label>
            </div>
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <input
                value={hero.title}
                onChange={(event) =>
                  setHero((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                className="w-full bg-transparent text-3xl font-bold tracking-tight text-zinc-900 outline-none sm:text-5xl"
              />
              <input
                value={hero.subtitle}
                onChange={(event) =>
                  setHero((current) => ({
                    ...current,
                    subtitle: event.target.value,
                  }))
                }
                className="mt-3 w-full bg-transparent text-lg font-semibold text-pink-500 outline-none sm:text-xl"
                placeholder={`${formatMoney(goalValue)} needed to make it happen`}
              />
              <textarea
                value={hero.description}
                onChange={(event) =>
                  setHero((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                rows={3}
                className="mt-4 w-full resize-none bg-transparent text-base leading-relaxed text-zinc-600 outline-none sm:text-lg"
              />
              <p className="mt-5 text-sm font-semibold text-zinc-400">
                {formatMoney(goalValue)} funding target
              </p>
              <button
                type="button"
                onClick={() =>
                  offersRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-5 inline-flex rounded-full px-6 py-3 text-sm font-bold text-white meuse-gradient-bg shadow-lg shadow-pink-200/40"
              >
                See Ways to Join
              </button>
            </div>
          </section>

          <WhatItTakesCard
            lines={budgetLines}
            goalType="funding"
            goalValue={goalValue}
          />

          <div ref={offersRef} className="space-y-4 scroll-mt-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Ways to Join
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Real offers people can buy — from light support to deep involvement.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <PreviewOfferCard
                  key={product.id}
                  product={product}
                  isEditing={editingId === product.id}
                  onEdit={() =>
                    setEditingId((current) =>
                      current === product.id ? null : product.id,
                    )
                  }
                  onRemove={() => removeProduct(product.id)}
                  onRegenerate={() => regenerateProduct(product.id)}
                  onToggleActive={(active) =>
                    updateProduct(product.id, { active })
                  }
                  onUpdate={(updates) => updateProduct(product.id, updates)}
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
                className="flex w-full items-center justify-center rounded-[1.5rem] border-2 border-dashed border-pink-200 py-5 text-sm font-medium text-pink-500 transition-colors hover:border-pink-300 hover:bg-rose-50"
              >
                + Add Offer
              </button>
            )}
          </div>

          <PathToGoalCard
            lines={pathLines}
            goalValue={goalValue}
            total={pathTotal}
          />

          <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              If we reach the goal
            </h2>
            <ol className="mt-5 space-y-3">
              {GOAL_REACHED_STEPS.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-50 text-sm font-bold text-pink-600">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm font-medium text-zinc-800">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {milestones.length > 0 && (
            <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-6">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                Project timeline
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                What happens after the campaign is funded.
              </p>
              <ol className="mt-5 space-y-4">
                {milestones.map((milestone, index) => (
                  <li key={milestone.title} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-600">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">
                        {milestone.title}
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        {milestone.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div className="flex flex-col gap-2 pb-2">
            <button
              type="button"
              onClick={handleCreateLaunch}
              className="inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
            >
              Create Campaign
            </button>
            <button
              type="button"
              onClick={() =>
                offersRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full py-2 text-sm font-semibold text-zinc-500"
            >
              Edit Project
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
        continueLabel="Create Campaign"
        onContinueClick={handleCreateLaunch}
        canContinue
      />
    </div>
  );
}
