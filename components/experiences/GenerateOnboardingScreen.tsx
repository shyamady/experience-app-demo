"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { BackArrowIcon } from "@/components/icons/BackArrowIcon";
import { AddExperiencePanel } from "@/components/experiences/AddExperiencePanel";
import { EstimatedEarningsCard } from "@/components/experiences/EstimatedEarningsCard";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { AiOnboardingMessage } from "@/components/onboarding/AiOnboardingMessage";
import { GenerationErrorCard } from "@/components/onboarding/GenerationErrorCard";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import { MobileStickyActionBar } from "@/components/onboarding/MobileStickyActionBar";
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

export function GenerateOnboardingScreen() {
  const router = useRouter();
  const onboardingData = useMemo(() => getOnboardingData(), []);
  const city = extractCityFromData(onboardingData);
  const generatedLaunch = useMemo(() => getGeneratedLaunch(), []);

  const [products, setProducts] = useState<ExperienceProduct[]>(() => {
    if (generatedLaunch?.status === "success") {
      return mapLaunchProducts(generatedLaunch.data.products);
    }
    return [];
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);

  const heroTitle =
    generatedLaunch?.status === "success"
      ? generatedLaunch.data.heroTitle
      : "AI built your experiences";
  const heroDescription =
    generatedLaunch?.status === "success"
      ? generatedLaunch.data.heroDescription
      : "We created a few ways fans and partners can take part. Edit anything you want.";
  const estimatedRevenue =
    generatedLaunch?.status === "success"
      ? generatedLaunch.data.estimatedRevenue
      : undefined;

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
      title: heroTitle,
      description: heroDescription,
    });
    saveLaunchData(launch);
    router.push("/dashboard");
  }, [heroDescription, heroTitle, products, router]);

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

        <main className="relative flex-1 overflow-y-auto px-4 pb-28 pt-2 sm:px-6 sm:pb-6 sm:py-4">
          <GradientGlow />

          <div className="relative z-10 mx-auto w-full max-w-[1000px]">
            <GenerationErrorCard onRetry={handleRetry} />
          </div>
        </main>

        <OnboardingProgress currentStep={4} compact />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <OnboardingHeader compact />

      <main className="relative flex-1 overflow-y-auto px-4 pb-28 pt-2 sm:px-6 sm:pb-6 sm:py-4">
        <GradientGlow />

        <div className="relative z-10 mx-auto w-full max-w-[1000px] space-y-5">
          <AiOnboardingMessage
            compact
            stepLabel="STEP 4 OF 4"
            headline={heroTitle}
            supportingText={heroDescription}
          />

          <div className="space-y-4">
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
              Add another experience
            </button>
          )}

          <EstimatedEarningsCard
            products={products}
            estimatedRevenue={estimatedRevenue}
          />

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

      <OnboardingProgress currentStep={4} compact />

      <MobileStickyActionBar
        backHref="/onboarding/participation"
        continueLabel="Sign Up to Launch"
        onContinueClick={handleSignUpToLaunch}
        canContinue
      />
    </div>
  );
}
