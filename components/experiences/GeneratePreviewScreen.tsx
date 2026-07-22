"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { InvitationConfetti } from "@/components/experiences/InvitationConfetti";
import { InvitationSparkles } from "@/components/experiences/InvitationSparkles";
import { PreviewEarningsHighlight } from "@/components/experiences/PreviewEarningsHighlight";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import {
  estimateEarnings,
  formatCurrency,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";
import { getGeneratedLaunch } from "@/lib/onboarding/generated-launch";
import { mapLaunchProducts } from "@/lib/onboarding/map-launch-products";
import { getPreviewCreator } from "@/lib/onboarding/preview-creator";
import {
  createLaunchFromOnboarding,
  saveLaunchData,
} from "@/lib/launch/storage";

const DEFAULT_HERO_DESCRIPTION =
  "We created personalized fan experiences based on your upcoming activity — designed to help you connect with fans and earn more.";

const BENEFITS = [
  {
    title: "More connection",
    description: "Turn your activity into moments fans can join.",
    icon: "heart",
  },
  {
    title: "More revenue",
    description: "Monetize access, experiences, and sponsorship.",
    icon: "sparkle",
  },
  {
    title: "We handle the tech",
    description: "Payments, pages, and launch tools included.",
    icon: "shield",
  },
] as const;

export function GeneratePreviewScreen() {
  const router = useRouter();
  const creator = useMemo(() => getPreviewCreator(), []);
  const [heroTitle, setHeroTitle] = useState("Your launch");
  const [heroDescription, setHeroDescription] = useState(DEFAULT_HERO_DESCRIPTION);
  const [estimatedRevenue, setEstimatedRevenue] = useState<string | undefined>();
  const [products, setProducts] = useState<ExperienceProduct[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    const generatedLaunch = getGeneratedLaunch();
    if (generatedLaunch?.status !== "success") return;

    setHeroTitle(generatedLaunch.data.heroTitle);
    setHeroDescription(generatedLaunch.data.heroDescription);
    setEstimatedRevenue(generatedLaunch.data.estimatedRevenue);
    setProducts(mapLaunchProducts(generatedLaunch.data.products));
  }, []);

  const { min, max } = useMemo(() => estimateEarnings(products), [products]);
  const fallbackRevenue = `${formatCurrency(min)}–${formatCurrency(max)}`;

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

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#fff7fa]">
      <InvitationConfetti />
      <InvitationSparkles />
      <GradientGlow />

      <div className="relative z-10">
        <header className="flex justify-center px-5 py-5 sm:py-6">
          <span className="font-meuse-display text-2xl font-extrabold tracking-tight meuse-gradient-text sm:text-[1.75rem]">
            meuse
          </span>
        </header>

        <main className="mx-auto max-w-[1040px] px-4 pb-10 sm:px-6">
          <section className="relative meuse-fade-in-up text-center">
            <p className="font-meuse-display text-3xl font-extrabold tracking-tight text-pink-500 sm:text-4xl">
              You&apos;re Invited!
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start lg:gap-8 lg:text-left">
              <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={creator.avatarUrl}
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-full border-4 border-white object-cover shadow-meuse-card sm:h-24 sm:w-24"
                />
                <div className="text-center lg:text-left">
                  <h1 className="flex flex-wrap items-center justify-center gap-2 text-xl font-bold text-zinc-900 sm:text-2xl lg:justify-start">
                    Welcome to meuse, {creator.name}
                    <SparkleIcon className="h-5 w-5 text-pink-400" />
                  </h1>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
                    {heroDescription}
                  </p>
                </div>
              </div>

              <div className="lg:mt-2">
                <PreviewEarningsHighlight
                  estimatedRevenue={estimatedRevenue}
                  fallbackRevenue={fallbackRevenue}
                />
              </div>
            </div>
          </section>

          <section className="mt-12 sm:mt-14">
            <h2 className="text-center text-lg font-bold text-zinc-900 sm:text-xl">
              Your Personalized Experience
            </h2>

            <div className="mt-6 space-y-5">
              {products.map((product) => (
                <ExperienceCard
                  key={product.id}
                  product={product}
                  isEditing={editingId === product.id}
                  isDragging={draggingId === product.id}
                  onToggleActive={(active) =>
                    updateProduct(product.id, { active })
                  }
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
          </section>

          <section className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-meuse border border-pink-50 bg-white/80 px-4 py-4 text-center shadow-meuse-chip sm:px-5 sm:py-5"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-pink-500">
                  <BenefitIcon name={benefit.icon} />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-12 overflow-hidden rounded-meuse-lg meuse-gradient-bg px-6 py-10 text-center shadow-lg shadow-pink-200/40 sm:px-10 sm:py-12">
            <p className="text-lg font-semibold text-white sm:text-xl">
              Ready to launch these experiences and start earning?
            </p>
            <button
              type="button"
              onClick={handleSignUpToLaunch}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-pink-600 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] sm:text-base"
            >
              Sign Up to Launch
              <SparkleIcon className="h-4 w-4 text-pink-500" />
            </button>
          </section>

          <p className="mt-8 text-center text-xs text-zinc-400 sm:text-sm">
            Made for creators. Built for connection.
          </p>
        </main>
      </div>
    </div>
  );
}

function BenefitIcon({ name }: { name: (typeof BENEFITS)[number]["icon"] }) {
  const className = "h-5 w-5";

  if (name === "heart") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }

  if (name === "sparkle") {
    return <SparkleIcon className={className} />;
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 3 4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-8-6Z" />
      <path d="M9 14h6M12 11v6" />
    </svg>
  );
}
