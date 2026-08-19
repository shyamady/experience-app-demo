"use client";

import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import { getPassBadgeLabel, getPassBadgeStyles, getPassBadgeTone } from "@/lib/onboarding/pass-card";
import {
  formatMoney,
  numericSpots,
  offerPotential,
} from "@/lib/onboarding/plan-math";

type PlanOfferCardProps = {
  product: ExperienceProduct;
  isEditing: boolean;
  isDragging: boolean;
  sponsor?: boolean;
  onEdit: () => void;
  onToggleActive: (active: boolean) => void;
  onUpdate: (updates: Partial<ExperienceProduct>) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: () => void;
};

export function PlanOfferCard({
  product,
  isEditing,
  isDragging,
  sponsor = false,
  onEdit,
  onToggleActive,
  onUpdate,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: PlanOfferCardProps) {
  if (isEditing) {
    return (
      <ExperienceCard
        product={product}
        isEditing
        isDragging={isDragging}
        onToggleActive={onToggleActive}
        onEdit={onEdit}
        onUpdate={onUpdate}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
  }

  const spots = numericSpots(product.spots);
  const potential = offerPotential(product);
  const badge = getPassBadgeLabel(product.category);
  const badgeStyles = getPassBadgeStyles(getPassBadgeTone(product.category));

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`overflow-hidden rounded-[1.75rem] bg-white shadow-meuse-card transition-all ${
        isDragging ? "opacity-60" : "hover:-translate-y-0.5"
      } ${product.active ? "" : "opacity-70"} ${
        sponsor ? "ring-1 ring-zinc-200" : ""
      }`}
    >
      <div className="relative h-44 sm:h-52">
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
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900">
            {product.title}
          </h3>
          <button
            type="button"
            onClick={onEdit}
            className="shrink-0 text-sm font-semibold text-pink-600"
          >
            Edit
          </button>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
          {product.description}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-bold text-zinc-900">
              {formatMoney(product.price)}
            </p>
            <p className="text-sm font-semibold text-zinc-500">
              {spots} {sponsor ? (spots === 1 ? "available" : "available") : spots === 1 ? "spot" : "spots"}
            </p>
          </div>
          {!sponsor && (
            <p className="text-sm font-semibold text-pink-500">
              Potential: {formatMoney(potential)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
