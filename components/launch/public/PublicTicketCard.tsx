"use client";

import { formatMoney } from "@/lib/dashboard/commerce";
import {
  getPassBadgeLabel,
  getPassBadgeStyles,
  getPassBadgeTone,
} from "@/lib/onboarding/pass-card";
import type { PublicOffer } from "@/lib/launch/public-view";

type PublicTicketCardProps = {
  offer: PublicOffer;
  selected?: boolean;
  canJoin: boolean;
  waitlist?: boolean;
  sponsor?: boolean;
  onSelect?: () => void;
  onJoin: () => void;
};

export function PublicTicketCard({
  offer,
  selected = false,
  canJoin,
  waitlist = false,
  sponsor = false,
  onSelect,
  onJoin,
}: PublicTicketCardProps) {
  const { product, capacity } = offer;
  const soldOut = capacity.soldOut;
  const badge = getPassBadgeLabel(product.category);
  const badgeStyles = getPassBadgeStyles(getPassBadgeTone(product.category));
  const claimedLabel =
    capacity.total === "unlimited"
      ? `${capacity.sold} claimed`
      : `${capacity.sold} / ${capacity.total} claimed`;
  const remainingLabel =
    capacity.remaining === "unlimited"
      ? null
      : soldOut
        ? "SOLD OUT"
        : capacity.tone === "urgent"
          ? `🔥 Only ${capacity.remaining} left`
          : sponsor
            ? `${capacity.remaining} available`
            : `${capacity.remaining} spots left`;
  const earlyBenefit = product.benefits?.find((item) =>
    item.toLowerCase().startsWith("early supporters paid"),
  );
  const earlyPriceMatch = earlyBenefit?.match(/\$[\d,]+/);
  const showGreenlitPricing = Boolean(earlyPriceMatch);

  const ctaLabel = soldOut
    ? "SOLD OUT"
    : !canJoin
      ? "Preview only"
      : sponsor
        ? "Become a Partner"
        : waitlist
          ? `Join waitlist · ${formatMoney(product.price)}`
          : `Join for ${formatMoney(product.price)}`;

  return (
    <article
      className={`overflow-hidden rounded-[1.75rem] bg-white shadow-meuse-card transition-transform duration-200 ${
        selected ? "ring-2 ring-pink-300" : ""
      } ${soldOut ? "opacity-80" : "hover:-translate-y-0.5"}`}
    >
      <button
        type="button"
        onClick={onSelect}
        disabled={!onSelect}
        className="relative block h-48 w-full sm:h-56"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.12em] shadow-meuse-chip backdrop-blur-sm ${badgeStyles}`}
        >
          {badge}
        </span>
      </button>

      <div className="px-5 py-5">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900">
          {product.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
          {product.description}
        </p>
        <p className="mt-4 text-2xl font-bold text-zinc-900">
          {showGreenlitPricing && earlyPriceMatch ? (
            <>
              <span className="mr-2 text-lg font-semibold text-zinc-400 line-through">
                {earlyPriceMatch[0]}
              </span>
              {formatMoney(product.price)}
            </>
          ) : (
            formatMoney(product.price)
          )}
        </p>
        {showGreenlitPricing && (
          <p className="mt-1 text-xs font-medium text-zinc-500">
            Early supporters helped make this happen, so they received the best
            price.
          </p>
        )}
        <p className="mt-1 text-sm font-medium text-zinc-600">{claimedLabel}</p>
        {capacity.total !== "unlimited" && (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
            <div
              className={`h-full rounded-full transition-[width] duration-700 ${
                soldOut ? "bg-zinc-300" : "meuse-gradient-bg"
              }`}
              style={{ width: `${capacity.percentFilled}%` }}
            />
          </div>
        )}
        {remainingLabel && (
          <p
            className={`mt-2 text-sm font-semibold ${
              soldOut || capacity.tone === "urgent"
                ? "text-pink-600"
                : "text-zinc-500"
            }`}
          >
            {remainingLabel}
          </p>
        )}
        <button
          type="button"
          disabled={!canJoin || soldOut}
          onClick={onJoin}
          className={`mt-4 w-full rounded-full py-3.5 text-sm font-semibold transition-transform active:scale-[0.99] ${
            !canJoin || soldOut
              ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
              : sponsor
                ? "bg-zinc-900 text-white"
                : "text-white meuse-gradient-bg shadow-md shadow-pink-200/50"
          }`}
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
}
