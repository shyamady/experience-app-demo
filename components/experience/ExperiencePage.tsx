"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { CreatorProfile } from "@/components/experience/CreatorProfile";
import { ExperienceHero } from "@/components/experience/ExperienceHero";
import { ProductSelector } from "@/components/experience/ProductSelector";
import { PurchaseSummary } from "@/components/experience/PurchaseSummary";
import { TrustSection } from "@/components/experience/TrustSection";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import { getMaxQuantity } from "@/lib/experience/formatting";
import { getMockExperience } from "@/lib/experience/mock-data";

export function ExperiencePage() {
  const router = useRouter();
  const data = useMemo(() => getMockExperience(), []);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const selectedProduct = useMemo(
    () => data.products.find((product) => product.id === selectedProductId) ?? null,
    [data.products, selectedProductId],
  );

  const handleSelect = useCallback((productId: string) => {
    setSelectedProductId(productId);
    setQuantity(1);
  }, []);

  const handleQuantityChange = useCallback(
    (nextQuantity: number) => {
      if (!selectedProduct) return;

      const max = getMaxQuantity(
        selectedProduct.remainingSpots,
        selectedProduct.availabilityKind,
      );
      setQuantity(Math.min(Math.max(1, nextQuantity), max));
    },
    [selectedProduct],
  );

  const handleCheckout = useCallback(() => {
    if (!selectedProduct) return;

    const params = new URLSearchParams({
      product: selectedProduct.id,
      quantity: String(quantity),
    });
    router.push(`/experience/checkout?${params.toString()}`);
  }, [quantity, router, selectedProduct]);

  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-meuse-bubble via-white to-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 overflow-hidden">
        <GradientGlow />
      </div>

      <header className="relative z-10 border-b border-pink-50/80 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <span className="font-meuse-display text-xl font-extrabold tracking-tight meuse-gradient-text">
            meuse
          </span>
          <span className="text-xs font-medium text-zinc-500 sm:text-sm">
            Creator experience
          </span>
        </div>
      </header>

      <ExperienceHero creator={data.creator} experience={data.experience} />

      <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6 sm:pb-10 lg:px-8 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
          <div className="space-y-10">
            <section className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6">
              <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                About the Experience
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <AboutBlock
                  title="What Sarah is doing"
                  body={data.experience.about.what}
                />
                <AboutBlock
                  title="Why it's special"
                  body={data.experience.about.why}
                />
                <AboutBlock
                  title="How you can participate"
                  body={data.experience.about.how}
                />
                <AboutBlock
                  title="After you purchase"
                  body={data.experience.about.afterPurchase}
                />
              </div>
            </section>

            <ProductSelector
              products={data.products}
              selectedProductId={selectedProductId}
              onSelect={handleSelect}
            />

            <TrustSection />
            <CreatorProfile creator={data.creator} />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-8">
              <PurchaseSummary
                product={selectedProduct}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>

      <PurchaseSummary
        product={selectedProduct}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onCheckout={handleCheckout}
        variant="mobile"
      />
    </div>
  );
}

function AboutBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-meuse-hint/70 p-4">
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{body}</p>
    </div>
  );
}
