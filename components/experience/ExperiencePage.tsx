"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CreatorProfile } from "@/components/experience/CreatorProfile";
import { ExperienceDateSelector } from "@/components/experience/ExperienceDateSelector";
import { ExperienceHero } from "@/components/experience/ExperienceHero";
import { MobileCheckoutBar } from "@/components/experience/MobileCheckoutBar";
import { ProductSelector } from "@/components/experience/ProductSelector";
import { PurchaseSummary } from "@/components/experience/PurchaseSummary";
import { GradientGlow } from "@/components/onboarding/GradientGlow";
import { getMaxQuantity } from "@/lib/experience/formatting";
import { getMockExperience } from "@/lib/experience/mock-data";

const DEFAULT_DATE_ID = "aug-19";
const INVENTORY_REFRESH_MS = 280;

export function ExperiencePage() {
  const router = useRouter();
  const data = useMemo(() => getMockExperience(), []);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(
    DEFAULT_DATE_ID,
  );
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [availabilityWarning, setAvailabilityWarning] = useState<string | null>(
    null,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    `Showing availability for ${
      data.dates.find((date) => date.id === DEFAULT_DATE_ID)?.displayDate ??
      "your selected session"
    }`,
  );
  const refreshTimeoutRef = useRef<number | null>(null);

  const selectedSession = useMemo(
    () => data.dates.find((date) => date.id === selectedDateId) ?? null,
    [data.dates, selectedDateId],
  );

  const selectedProduct = useMemo(
    () =>
      data.products.find((product) => product.id === selectedProductId) ?? null,
    [data.products, selectedProductId],
  );

  const selectedInventory = useMemo(() => {
    if (!selectedSession || !selectedProductId) return null;
    return selectedSession.products[selectedProductId] ?? null;
  }, [selectedProductId, selectedSession]);

  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current !== null) {
        window.clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  const handleDateSelect = useCallback(
    (dateId: string) => {
      if (dateId === selectedDateId) return;

      const nextSession = data.dates.find((date) => date.id === dateId);
      if (!nextSession) return;

      if (refreshTimeoutRef.current !== null) {
        window.clearTimeout(refreshTimeoutRef.current);
      }

      const hadSelection = Boolean(selectedProductId);
      const nextInventory = selectedProductId
        ? nextSession.products[selectedProductId]
        : null;
      const selectionUnavailable =
        hadSelection && (!nextInventory || nextInventory.soldOut);

      setSelectedDateId(dateId);
      setIsRefreshing(true);
      setConfirmationMessage(null);

      if (selectionUnavailable) {
        setSelectedProductId(null);
        setQuantity(1);
        setAvailabilityWarning(
          "Your previous selection isn't available on this date. Please choose another ticket.",
        );
      } else {
        setAvailabilityWarning(null);
        if (hadSelection) setQuantity(1);
      }

      refreshTimeoutRef.current = window.setTimeout(() => {
        setConfirmationMessage(
          `Showing availability for ${nextSession.displayDate}`,
        );
        setIsRefreshing(false);
        refreshTimeoutRef.current = null;
      }, INVENTORY_REFRESH_MS);
    },
    [data.dates, selectedDateId, selectedProductId],
  );

  const handleSelect = useCallback((productId: string) => {
    setSelectedProductId(productId);
    setQuantity(1);
    setAvailabilityWarning(null);
  }, []);

  const handleQuantityChange = useCallback(
    (nextQuantity: number) => {
      if (!selectedProduct || !selectedInventory) return;

      const max = getMaxQuantity(
        selectedInventory.remaining,
        selectedProduct.availabilityKind,
      );
      setQuantity(Math.min(Math.max(1, nextQuantity), max));
    },
    [selectedInventory, selectedProduct],
  );

  const handleCheckout = useCallback(() => {
    if (!selectedProduct || !selectedSession || !selectedInventory) return;
    if (selectedInventory.soldOut || isRefreshing) return;

    const params = new URLSearchParams({
      product: selectedProduct.id,
      quantity: String(quantity),
      date: selectedSession.id,
    });
    router.push(`/experience/checkout?${params.toString()}`);
  }, [
    isRefreshing,
    quantity,
    router,
    selectedInventory,
    selectedProduct,
    selectedSession,
  ]);

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
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
                {data.experience.about}
              </p>
            </section>

            <ExperienceDateSelector
              dates={data.dates}
              selectedDateId={selectedDateId}
              onSelect={handleDateSelect}
              isRefreshing={isRefreshing}
            />

            <ProductSelector
              products={data.products}
              session={selectedSession}
              selectedProductId={selectedProductId}
              onSelect={handleSelect}
              isRefreshing={isRefreshing}
              confirmationMessage={confirmationMessage}
              availabilityWarning={availabilityWarning}
            />

            <CreatorProfile creator={data.creator} />
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-8">
              <PurchaseSummary
                product={selectedProduct}
                session={selectedSession}
                inventory={selectedInventory}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onCheckout={handleCheckout}
                availabilityWarning={availabilityWarning}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileCheckoutBar
        product={selectedProduct}
        session={selectedSession}
        inventory={selectedInventory}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
