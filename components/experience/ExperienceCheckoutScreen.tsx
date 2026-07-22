"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  formatExperiencePrice,
  getAccessBadgeStyles,
} from "@/lib/experience/formatting";
import {
  getExperienceProductById,
  getMockExperience,
} from "@/lib/experience/mock-data";

export function ExperienceCheckoutScreen() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const quantity = Math.max(1, Number(searchParams.get("quantity") ?? "1") || 1);

  const product = useMemo(
    () => (productId ? getExperienceProductById(productId) : undefined),
    [productId],
  );

  const experience = useMemo(() => getMockExperience(), []);
  const subtotal = product ? product.price * quantity : 0;

  if (!product) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-meuse-bubble px-5">
        <p className="text-sm text-zinc-600">No product selected.</p>
        <Link
          href="/experience"
          className="mt-4 text-sm font-semibold text-pink-600 hover:text-pink-700"
        >
          Back to experience
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-meuse-bubble via-white to-white">
      <header className="border-b border-pink-50 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/experience"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
          >
            ← Back
          </Link>
          <span className="font-meuse-display text-lg font-extrabold meuse-gradient-text">
            meuse
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="text-2xl font-bold text-zinc-900">Checkout</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Review your selection for {experience.experience.title}.
        </p>

        <section className="mt-8 rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6">
          <div className="flex gap-4">
            <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-meuse-hint">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide ${getAccessBadgeStyles(product.accessBadge)}`}
              >
                {product.accessBadge}
              </span>
              <h2 className="mt-2 text-base font-semibold text-zinc-900">
                {product.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-600">{product.description}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-pink-50 pt-5 text-sm">
            <Row label="Creator" value={experience.creator.name} />
            <Row label="Quantity" value={String(quantity)} />
            <Row
              label="Price"
              value={formatExperiencePrice(product.price, product.priceType)}
            />
            <Row
              label="Total"
              value={formatExperiencePrice(subtotal, product.priceType)}
              emphasis
            />
          </div>
        </section>

        <div className="mt-6 rounded-meuse border border-pink-100 bg-meuse-hint/60 p-4 text-sm text-zinc-600">
          This is a demo checkout. Payment processing is not connected yet.
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-full py-3.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
        >
          Complete Purchase
        </button>
      </main>
    </div>
  );
}

function Row({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-zinc-500">{label}</span>
      <span
        className={
          emphasis ? "text-base font-bold text-zinc-900" : "font-medium text-zinc-800"
        }
      >
        {value}
      </span>
    </div>
  );
}
