"use client";

import type { InspirationExperience } from "@/lib/dashboard/create-types";

type InspirationCardProps = {
  experience: InspirationExperience;
  onSelect: (experience: InspirationExperience) => void;
};

export function InspirationCard({
  experience,
  onSelect,
}: InspirationCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(experience)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-pink-100/80 bg-white text-left shadow-meuse-chip transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-md"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-rose-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={experience.thumbnail}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="line-clamp-2 text-sm font-semibold text-white">
            {experience.title}
          </p>
          <p className="mt-0.5 text-xs text-white/75">
            {experience.creatorName}
          </p>
        </div>
        {experience.relevanceLabel && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-pink-600 backdrop-blur-sm">
            {experience.relevanceLabel}
          </span>
        )}
      </div>

      <div className="space-y-1.5 p-3">
        <p className="text-xs text-zinc-500">
          {experience.creatorCategory}
          {experience.location ? ` · ${experience.location}` : ""}
        </p>
        <p className="text-xs font-semibold text-zinc-800">
          {experience.performanceSignal}
        </p>
      </div>
    </button>
  );
}
