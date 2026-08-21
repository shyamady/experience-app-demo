"use client";

import { useState } from "react";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import {
  getAvailabilityLabel,
  getPassBadgeLabel,
  getPassBadgeStyles,
  getPassBadgeTone,
} from "@/lib/onboarding/pass-card";
import { formatMoney } from "@/lib/onboarding/plan-math";

type PreviewOfferCardProps = {
  product: ExperienceProduct;
  isEditing: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onRegenerate: () => void;
  onToggleActive: (active: boolean) => void;
  onUpdate: (updates: Partial<ExperienceProduct>) => void;
};

export function PreviewOfferCard({
  product,
  isEditing,
  onEdit,
  onRemove,
  onRegenerate,
  onToggleActive,
  onUpdate,
}: PreviewOfferCardProps) {
  const [showActions, setShowActions] = useState(false);
  const badge = getPassBadgeLabel(product.category);
  const badgeStyles = getPassBadgeStyles(getPassBadgeTone(product.category));
  const availability = getAvailabilityLabel(product.spots, product.category);

  if (isEditing) {
    return (
      <ExperienceCard
        product={product}
        isEditing
        isDragging={false}
        onToggleActive={onToggleActive}
        onEdit={onEdit}
        onUpdate={onUpdate}
        onDragStart={() => undefined}
        onDragEnd={() => undefined}
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => undefined}
      />
    );
  }

  return (
    <div
      className="group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onFocus={() => setShowActions(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setShowActions(false);
        }
      }}
    >
      <article className="meuse-pass-card overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
        <div className="relative overflow-hidden rounded-[28px]">
          <TicketNotches />

          <div className="flex flex-col lg:flex-row">
            <div className="flex min-h-0 flex-1 items-center gap-3 p-3.5 sm:gap-4 sm:p-4">
              <div className="meuse-pass-shimmer relative h-[7.5rem] w-[7.5rem] shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-36 sm:rounded-2xl lg:h-40 lg:w-40">
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
            </div>

            <div className="relative flex shrink-0 flex-col justify-between gap-4 px-5 py-4 lg:w-[12.5rem] lg:pl-6">
              <div className="meuse-pass-perforation-x mx-0 h-px lg:hidden" />
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
                  {availability.value}
                </p>
              </div>

              <button
                type="button"
                className="w-full rounded-full py-2.5 text-sm font-semibold text-white meuse-gradient-bg shadow-md shadow-pink-200/50"
              >
                Get Ticket
              </button>
            </div>
          </div>
        </div>
      </article>

      <div
        className={`mt-2 flex flex-wrap gap-2 px-1 transition-opacity ${
          showActions ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-pink-600"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 shadow-meuse-chip"
        >
          Regenerate
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-500 shadow-meuse-chip"
        >
          Remove
        </button>
      </div>
    </div>
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