"use client";

import { SparkleIcon } from "@/components/icons/SparkleIcon";
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
  const availability =
    capacity.remaining === "unlimited"
      ? "Open"
      : soldOut
        ? "Sold out"
        : capacity.tone === "urgent"
          ? `${capacity.remaining} spots`
          : `${capacity.remaining} spots`;

  const ctaLabel = soldOut
    ? "Sold out"
    : !canJoin
      ? "Preview only"
      : sponsor
        ? "Sponsor"
        : waitlist
          ? "Join waitlist"
          : "Get Ticket";

  if (sponsor) {
    return (
      <article
        className={`overflow-hidden rounded-[1.75rem] bg-white shadow-meuse-card ${
          selected ? "ring-2 ring-pink-300" : ""
        } ${soldOut ? "opacity-80" : ""}`}
      >
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.12em] ${badgeStyles}`}>
              {badge}
            </span>
            <h3 className="mt-2 text-lg font-bold tracking-tight text-zinc-900">
              {product.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
              {product.description}
            </p>
          </div>
          <div className="shrink-0 sm:w-40 sm:text-right">
            <p className="text-2xl font-bold tracking-tight text-zinc-900">
              {formatMoney(product.price)}
            </p>
            <p className="text-xs font-medium text-zinc-400">per slot</p>
            <p className="mt-1 text-sm font-semibold text-pink-500">
              {availability}
            </p>
            <button
              type="button"
              disabled={!canJoin || soldOut}
              onClick={onJoin}
              className={`mt-3 w-full rounded-full py-2.5 text-sm font-semibold ${
                !canJoin || soldOut
                  ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
                  : "bg-zinc-900 text-white"
              }`}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`meuse-pass-card overflow-hidden transition-transform duration-200 ${
        selected ? "ring-2 ring-pink-300 ring-offset-2" : ""
      } ${soldOut ? "opacity-80" : "hover:-translate-y-0.5"}`}
    >
      <div className="relative overflow-hidden rounded-[28px]">
        <TicketNotches />
        <div className="flex flex-col lg:flex-row">
          <button
            type="button"
            onClick={onSelect}
            disabled={!onSelect}
            className="flex min-h-0 flex-1 items-center gap-3 p-3.5 text-left sm:gap-4 sm:p-4"
          >
            <div className="relative h-[7.5rem] w-[7.5rem] shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-36 sm:rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[0.5625rem] font-bold tracking-[0.1em] shadow-meuse-chip backdrop-blur-sm sm:px-2.5 sm:py-1 sm:text-[0.625rem] ${badgeStyles}`}
              >
                {badge}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-1.5">
                <h3 className="text-base font-bold tracking-tight text-zinc-900 sm:text-lg">
                  {product.title}
                </h3>
                <SparkleIcon className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
              </div>
              <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-zinc-500">
                {product.description}
              </p>
            </div>
          </button>

          <div className="relative flex shrink-0 flex-col justify-between gap-4 px-5 py-4 lg:w-[12.5rem] lg:pl-6">
            <div className="meuse-pass-perforation-x h-px lg:hidden" />
            <div className="meuse-pass-perforation-y absolute top-5 bottom-5 left-0 hidden w-px lg:block" />
            <TicketStubNotches />
            <div>
              <p className="text-2xl font-bold tracking-tight text-zinc-900">
                {formatMoney(product.price)}
              </p>
              <p className="mt-0.5 text-xs font-medium text-zinc-400">
                per ticket
              </p>
              <p className="mt-2 text-sm font-semibold text-pink-500">
                {availability}
              </p>
            </div>
            <button
              type="button"
              disabled={!canJoin || soldOut}
              onClick={onJoin}
              className={`w-full rounded-full py-2.5 text-sm font-semibold ${
                !canJoin || soldOut
                  ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
                  : "text-white meuse-gradient-bg shadow-md shadow-pink-200/50"
              }`}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function TicketNotches() {
  return (
    <>
      <span className="meuse-pass-notch top-1/2 -left-[9px] hidden -translate-y-1/2 lg:block" />
      <span className="meuse-pass-notch top-1/2 -right-[9px] hidden -translate-y-1/2 lg:block" />
      <span className="meuse-pass-notch left-1/2 -top-[9px] -translate-x-1/2 lg:hidden" />
      <span className="meuse-pass-notch left-1/2 -bottom-[9px] -translate-x-1/2 lg:hidden" />
    </>
  );
}

function TicketStubNotches() {
  return (
    <>
      <span className="meuse-pass-notch top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
      <span className="meuse-pass-notch bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />
    </>
  );
}