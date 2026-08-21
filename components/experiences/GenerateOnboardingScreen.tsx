"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { AddExperiencePanel } from "@/components/experiences/AddExperiencePanel";
import { PathToGoalCard } from "@/components/experiences/PathToGoalCard";
import { PreviewOfferCard } from "@/components/experiences/PreviewOfferCard";
import { ProjectJourneyCard } from "@/components/experiences/ProjectJourneyCard";
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
  pathToGoalParticipants,
  pathToGoalTotal,
} from "@/lib/onboarding/plan-math";
import {
  getOnboardingData,
  getProjectCategoryLabel,
} from "@/lib/onboarding/storage";
import { getPlaceholderImageUrl } from "@/lib/unsplash/search-photos";

function excitingSubtitle(value: string): string {
  const text = value.trim();
  if (!text) return "";
  if (/needed|raise|fund|campaign goal/i.test(text)) return "";
  return text;
}

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
    subtitle: excitingSubtitle(generated?.heroSubtitle ?? ""),
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

  const joinProducts = useMemo(
    () => products.filter((product) => !isSponsorProduct(product)),
    [products],
  );
  const pathLines = useMemo(
    () => buildPathToGoal(joinProducts, goalValue),
    [joinProducts, goalValue],
  );
  const pathTotal = pathToGoalTotal(pathLines);
  const pathParticipants = pathToGoalParticipants(pathLines);
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

        <div className="relative z-10 mx-auto w-full max-w-[1080px] space-y-8 sm:space-y-10">
          <AiOnboardingMessage
            compact
            stepLabel="PREVIEW · STEP 4 OF 4"
            headline="Here's how this can happen"
            supportingText="A project people can join — with a realistic way to make it real."
          />

          <section className="overflow-hidden rounded-[2rem] bg-white shadow-meuse-card">
            <div className="relative h-72 sm:h-[28rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
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
              {hero.subtitle ? (
                <input
                  value={hero.subtitle}
                  onChange={(event) =>
                    setHero((current) => ({
                      ...current,
                      subtitle: event.target.value,
                    }))
                  }
                  className="mt-3 w-full bg-transparent text-lg font-semibold text-pink-500 outline-none sm:text-xl"
                />
              ) : null}
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
              <p className="mt-5 inline-flex rounded-full bg-rose-50 px-3.5 py-1.5 text-sm font-medium text-zinc-600">
                Estimated project cost{" "}
                <span className="ml-1.5 font-bold text-zinc-900">
                  {formatMoney(goalValue)}
                </span>
              </p>
              <button
                type="button"
                onClick={() =>
                  offersRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-5 flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white meuse-gradient-bg shadow-lg shadow-pink-200/40"
              >
                See ways to join
                <SparkleIcon className="h-4 w-4" />
              </button>
            </div>
          </section>

          <div ref={offersRef} className="space-y-4 scroll-mt-16">
            <div>
              <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
                PARTICIPATION
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Ways to join
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                The offers people can buy to become part of this project.
              </p>
            </div>
            <div className="space-y-4">
              {joinProducts.map((product) => (
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
            participants={pathParticipants}
          />

          <WhatItTakesCard
            lines={budgetLines}
            goalType="funding"
            goalValue={goalValue}
          />

          <ProjectJourneyCard milestones={milestones} />

          <section className="overflow-hidden rounded-[2rem] px-6 py-10 text-center shadow-lg shadow-pink-200/40 meuse-gradient-bg sm:px-10 sm:py-14">
            <p className="text-2xl font-bold text-white sm:text-3xl">
              Ready to make this happen?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/85 sm:text-base">
              Turn this plan into a live project your community can join.
            </p>
            <button
              type="button"
              onClick={handleCreateLaunch}
              className="mt-6 inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-pink-600 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Make This Happen
              <SparkleIcon className="h-4 w-4 text-pink-500" />
            </button>
            <button
              type="button"
              onClick={() =>
                offersRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-3 w-full py-2 text-sm font-semibold text-white/80"
            >
              Edit offers
            </button>
          </section>

          <Link
            href="/onboarding/participation"
            className="hidden items-center justify-center gap-1.5 pb-2 text-sm font-medium text-zinc-400 sm:flex"
          >
            <BackArrowIcon className="h-4 w-4" />
            Back
          </Link>
        </div>
      </main>

      <div className="hidden sm:block">
        <OnboardingProgress currentStep={4} compact />
      </div>

      <MobileStickyActionBar
        backHref="/onboarding/participation"
        continueLabel="Make This Happen"
        onContinueClick={handleCreateLaunch}
        canContinue
      />
    </div>
  );
}