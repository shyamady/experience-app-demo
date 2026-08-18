"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ExperienceCategoryPill } from "@/components/experiences/ExperienceCategoryPill";
import {
  formatExperiencePrice,
  getAccessBadgeStyles,
} from "@/lib/experience/formatting";
import {
  getExperienceDateById,
  getExperienceProductById,
  getMockExperience,
} from "@/lib/experience/mock-data";
import { getCampaignBySlug } from "@/lib/launch/storage";
import { formatCurrency } from "@/lib/launch/formatting";

export function ExperienceCheckoutScreen() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const dateId = searchParams.get("date");
  const campaignSlug = searchParams.get("campaign");
  const quantity = Math.max(1, Number(searchParams.get("quantity") ?? "1") || 1);

  const campaign = useMemo(
    () => (campaignSlug ? getCampaignBySlug(campaignSlug) : null),
    [campaignSlug],
  );

  const launchProduct = useMemo(
    () => campaign?.products.find((product) => product.id === productId),
    [campaign, productId],
  );

  const experienceProduct = useMemo(
    () => (productId ? getExperienceProductById(productId) : undefined),
    [productId],
  );

  const session = useMemo(
    () => (dateId ? getExperienceDateById(dateId) : undefined),
    [dateId],
  );

  const experience = useMemo(() => getMockExperience(), []);
  const title = campaign?.title ?? experience.experience.title;
  const creatorName = campaign?.creatorName ?? experience.creator.name;
  const backHref = campaign ? `/launch/${campaign.slug}` : "/experience";
  const price = launchProduct?.price ?? experienceProduct?.price ?? 0;
  const subtotal = price * quantity;
  const imageUrl = launchProduct?.imageUrl ?? experienceProduct?.imageUrl;
  const productTitle = launchProduct?.title ?? experienceProduct?.title;
  const productDescription =
    launchProduct?.description ?? experienceProduct?.description;

  if (!launchProduct && !experienceProduct) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-5">
        <p className="text-sm text-zinc-600">No way to join selected.</p>
        <Link
          href={backHref}
          className="mt-4 text-sm font-semibold text-pink-600 hover:text-pink-700"
        >
          Back to launch
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b border-zinc-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href={backHref}
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
        <h1 className="text-2xl font-bold text-zinc-900">Join</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Review how you want to be part of {title}.
        </p>

        <section className="mt-8 rounded-meuse border border-zinc-100 bg-white p-5 shadow-meuse-card sm:p-6">
          <div className="flex gap-4">
            <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              {launchProduct ? (
                <ExperienceCategoryPill category={launchProduct.category} />
              ) : experienceProduct ? (
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide ${getAccessBadgeStyles(experienceProduct.accessBadge)}`}
                >
                  {experienceProduct.accessBadge}
                </span>
              ) : null}
              <h2 className="mt-2 text-base font-semibold text-zinc-900">
                {productTitle}
              </h2>
              <p className="mt-1 text-sm text-zinc-600">{productDescription}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-zinc-100 pt-5 text-sm">
            <Row label="Creator" value={creatorName} />
            {session && (
              <Row
                label="Date"
                value={`${session.displayDate} · ${session.time} ${session.timezone}`}
              />
            )}
            <Row label="Quantity" value={String(quantity)} />
            <Row
              label="Contribution"
              value={
                experienceProduct
                  ? formatExperiencePrice(
                      experienceProduct.price,
                      experienceProduct.priceType,
                    )
                  : formatCurrency(price)
              }
            />
            <Row
              label="Total"
              value={
                experienceProduct
                  ? formatExperiencePrice(subtotal, experienceProduct.priceType)
                  : formatCurrency(subtotal)
              }
              emphasis
            />
          </div>
        </section>

        <div className="mt-6 rounded-meuse border border-zinc-100 bg-zinc-50 p-4 text-sm text-zinc-600">
          This is a demo checkout. Payment processing is not connected yet.
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-full py-3.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
        >
          Complete Join
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
