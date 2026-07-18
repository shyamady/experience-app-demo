"use client";

import { useRef } from "react";
import { GripIcon } from "@/components/icons/GripIcon";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { ToggleSwitch } from "@/components/experiences/ToggleSwitch";
import {
  EXPERIENCE_CATEGORIES,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";
import {
  formatPassId,
  getAvailabilityLabel,
  getPassBadgeLabel,
  getPassBadgeStyles,
  getPassBadgeTone,
  getPassIncludesCopy,
} from "@/lib/onboarding/pass-card";

type ExperienceCardProps = {
  product: ExperienceProduct;
  isEditing: boolean;
  isDragging: boolean;
  onToggleActive: (active: boolean) => void;
  onEdit: () => void;
  onUpdate: (updates: Partial<ExperienceProduct>) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: () => void;
};

const fieldClassName =
  "w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none";

export function ExperienceCard({
  product,
  isEditing,
  isDragging,
  onToggleActive,
  onEdit,
  onUpdate,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: ExperienceCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const badge = getPassBadgeLabel(product.category);
  const badgeStyles = getPassBadgeStyles(getPassBadgeTone(product.category));
  const includes = getPassIncludesCopy(product.category);
  const availability = getAvailabilityLabel(product.spots);
  const passId = formatPassId(product.id);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onUpdate({ imageUrl: url });
  }

  function handleSpotsChange(value: string) {
    if (value === "unlimited") {
      onUpdate({ spots: "unlimited" });
      return;
    }

    const parsed = Number(value);
    onUpdate({ spots: Number.isFinite(parsed) && parsed > 0 ? parsed : 1 });
  }

  return (
    <div
      draggable={!isEditing}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`meuse-pass-card transition-all duration-300 ${
        isDragging ? "scale-[0.985] opacity-60" : "hover:-translate-y-0.5"
      } ${product.active ? "" : "opacity-70 grayscale-[0.25]"}`}
    >
      <div className="relative overflow-hidden rounded-[28px]">
        <TicketNotches />

        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 cursor-grab items-center justify-center rounded-full bg-white/90 text-zinc-400 shadow-meuse-chip backdrop-blur-sm hover:text-zinc-600 active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute top-3 right-3 z-20">
          <div className="rounded-full bg-white/90 px-2 py-1.5 shadow-meuse-chip backdrop-blur-sm">
            <ToggleSwitch
              checked={product.active}
              onChange={onToggleActive}
              label={`${product.title} active`}
            />
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4 p-4 pt-14 sm:p-5 sm:pt-14">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-zinc-800"
                >
                  Replace
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">
                Category
              </label>
              <select
                value={product.category}
                onChange={(event) =>
                  onUpdate({
                    category: event.target
                      .value as ExperienceProduct["category"],
                  })
                }
                className={fieldClassName}
              >
                {EXPERIENCE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">
                Title
              </label>
              <input
                type="text"
                value={product.title}
                onChange={(event) => onUpdate({ title: event.target.value })}
                className={fieldClassName}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-500">
                Description
              </label>
              <textarea
                value={product.description}
                onChange={(event) =>
                  onUpdate({ description: event.target.value })
                }
                rows={3}
                className={`${fieldClassName} resize-none`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">
                  Price
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                    $
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={product.price}
                    onChange={(event) =>
                      onUpdate({ price: Number(event.target.value) || 0 })
                    }
                    className={`${fieldClassName} pl-7`}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">
                  Spots
                </label>
                <select
                  value={
                    product.spots === "unlimited"
                      ? "unlimited"
                      : String(product.spots)
                  }
                  onChange={(event) => handleSpotsChange(event.target.value)}
                  className={fieldClassName}
                >
                  <option value="unlimited">Unlimited</option>
                  {[5, 6, 8, 10, 30, 50, 100].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={onEdit}
              className="text-sm font-medium text-pink-600 hover:text-pink-700"
            >
              Done editing
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="flex min-h-0 flex-1 flex-col justify-center p-3.5 pb-4 sm:p-4 lg:min-h-[15.5rem]">
              <div className="flex h-full items-center gap-3 sm:gap-4">
                <div className="meuse-pass-shimmer relative aspect-square h-[8.5rem] w-[8.5rem] shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-40 sm:rounded-2xl lg:h-44 lg:w-44">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[0.5625rem] font-bold tracking-[0.08em] shadow-meuse-chip backdrop-blur-sm sm:gap-1.5 sm:px-2 sm:py-1 sm:text-[0.625rem] sm:tracking-[0.12em] ${badgeStyles}`}
                    >
                      <DiamondIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {badge}
                    </span>
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <div className="flex items-start gap-1.5">
                    <h3 className="text-base font-bold tracking-tight text-zinc-900 sm:text-lg">
                      {product.title}
                    </h3>
                    <SparkleIcon className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                  </div>
                  <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-zinc-500 sm:line-clamp-4">
                    {product.description}
                  </p>

                  <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-rose-50/90 px-2.5 py-2 sm:mt-3 sm:gap-2.5 sm:rounded-2xl sm:px-3.5 sm:py-2.5">
                    <ShieldStarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pink-500 sm:h-4 sm:w-4" />
                    <p className="line-clamp-2 text-[0.6875rem] leading-relaxed text-zinc-600 sm:text-xs sm:text-[0.8125rem]">
                      <span className="font-semibold text-zinc-800">Includes:</span>{" "}
                      {includes}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex shrink-0 flex-col lg:w-[11.5rem]">
              <div className="meuse-pass-perforation-x mx-5 h-px lg:hidden" />
              <div className="meuse-pass-perforation-y absolute top-5 bottom-5 left-0 hidden w-px lg:block" />

              <TicketStubNotches />

              <div className="flex flex-1 flex-col justify-between gap-4 px-5 py-4 lg:pl-6 lg:pr-5">
                <div className="space-y-4">
                  <div>
                    <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-zinc-400">
                      INVESTMENT
                    </p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="border-t border-dashed border-pink-100 pt-3">
                    <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-zinc-400">
                      AVAILABILITY
                    </p>
                    <p className="mt-1 text-lg font-bold text-pink-600">
                      {availability.value}
                    </p>
                    {availability.urgency && (
                      <p className="mt-0.5 text-[0.625rem] font-bold tracking-[0.1em] text-pink-500">
                        {availability.urgency}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={onEdit}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/50 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <LockIcon className="h-3.5 w-3.5" />
                    Edit Pass
                  </button>

                  <div>
                    <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-zinc-400">
                      PASS ID
                    </p>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-pink-500">
                      {passId}
                    </p>
                    <div className="meuse-pass-barcode mt-2 w-full" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5 3.8 9.2 12 21.5l8.2-12.3L12 2.5Zm0 2.7 5.2 4.3H6.8L12 5.2Z" />
    </svg>
  );
}

function ShieldStarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 5 6v5c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" />
      <path d="m12 8.5.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 10.6l2-.3L12 8.5Z" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
