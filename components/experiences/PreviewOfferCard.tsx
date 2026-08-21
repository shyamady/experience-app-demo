"use client";

import { useState } from "react";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import {
  getPassBadgeLabel,
  getPassBadgeStyles,
  getPassBadgeTone,
} from "@/lib/onboarding/pass-card";
import { formatMoney, numericSpots } from "@/lib/onboarding/plan-math";

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
  const spots = numericSpots(product.spots);
  const badge = getPassBadgeLabel(product.category);
  const badgeStyles = getPassBadgeStyles(getPassBadgeTone(product.category));

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
    <article
      className="group relative overflow-hidden rounded-[1.75rem] bg-white shadow-meuse-card transition-transform duration-200 hover:-translate-y-0.5"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onFocus={() => setShowActions(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setShowActions(false);
        }
      }}
    >
      <div className="relative h-40 sm:h-44">
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
      </div>

      <div className="px-5 py-5">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900">
          {product.title}
        </h3>
        <p className="mt-1 text-2xl font-bold text-zinc-900">
          {formatMoney(product.price)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          {product.description}
        </p>
        {spots > 0 && product.spots !== "unlimited" && (
          <p className="mt-3 text-sm font-semibold text-pink-500">
            {spots} {spots === 1 ? "spot" : "spots"} available
          </p>
        )}

        <button
          type="button"
          className="mt-4 w-full rounded-full py-3 text-sm font-semibold text-white meuse-gradient-bg"
        >
          Join for {formatMoney(product.price)}
        </button>

        <div
          className={`mt-3 flex flex-wrap gap-2 transition-opacity ${
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
            className="rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-600"
          >
            Regenerate
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-500"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
