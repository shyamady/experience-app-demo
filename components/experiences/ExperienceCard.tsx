"use client";

import { useRef } from "react";
import { GripIcon } from "@/components/icons/GripIcon";
import { ExperienceCategoryPill } from "@/components/experiences/ExperienceCategoryPill";
import { ToggleSwitch } from "@/components/experiences/ToggleSwitch";
import {
  EXPERIENCE_CATEGORIES,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";

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
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`rounded-meuse bg-white shadow-meuse-card transition-all duration-200 ${
        isDragging ? "scale-[0.98] opacity-60" : ""
      } ${product.active ? "" : "opacity-70"}`}
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5">
        <div className="flex items-start gap-3 sm:flex-col">
          <button
            type="button"
            className="mt-1 cursor-grab text-zinc-300 hover:text-zinc-400 active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripIcon className="h-5 w-5" />
          </button>

          <div className="relative w-full overflow-hidden rounded-meuse-sm sm:w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt=""
              className="aspect-[4/3] w-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-zinc-800"
                >
                  Replace image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <ExperienceCategoryPill category={product.category} />
            <ToggleSwitch
              checked={product.active}
              onChange={onToggleActive}
              label={`${product.title} active`}
            />
          </div>

          {isEditing ? (
            <div className="space-y-3">
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
            <>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 sm:text-xl">
                  {product.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div>
                  <span className="text-xs font-medium text-zinc-400">
                    Price
                  </span>
                  <p className="font-semibold text-zinc-900">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-zinc-400">
                    Spots
                  </span>
                  <p className="font-semibold text-zinc-900">
                    {product.spots === "unlimited"
                      ? "Unlimited"
                      : product.spots}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onEdit}
                className="rounded-full border border-pink-100 px-4 py-2 text-sm font-medium text-pink-600 transition-colors hover:bg-rose-50"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
