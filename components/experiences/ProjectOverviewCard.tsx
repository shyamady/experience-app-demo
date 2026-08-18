"use client";

import { useRef, useState } from "react";

type ProjectOverview = {
  title: string;
  heroImageUrl: string;
  story: string;
  whyItMatters: string;
  communityMakesPossible: string;
};

type ProjectOverviewCardProps = {
  overview: ProjectOverview;
  onChange: (updates: Partial<ProjectOverview>) => void;
};

const fieldClassName =
  "w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none";

export function ProjectOverviewCard({
  overview,
  onChange,
}: ProjectOverviewCardProps) {
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    onChange({ heroImageUrl: URL.createObjectURL(file) });
  }

  return (
    <section className="rounded-meuse bg-white px-5 py-5 shadow-meuse-card sm:px-6 sm:py-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
            PROJECT OVERVIEW
          </p>
          {editing ? (
            <input
              type="text"
              value={overview.title}
              onChange={(event) => onChange({ title: event.target.value })}
              className={`${fieldClassName} mt-2 text-lg font-bold`}
            />
          ) : (
            <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              {overview.title}
            </h2>
          )}
        </div>
        <button
          type="button"
          onClick={() => setEditing((current) => !current)}
          className="shrink-0 text-sm font-medium text-pink-600 hover:text-pink-700"
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={overview.heroImageUrl}
          alt=""
          className="h-44 w-full object-cover sm:h-56"
        />
        {editing && (
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

      <OverviewField
        editing={editing}
        label="Project story"
        value={overview.story}
        onChange={(story) => onChange({ story })}
      />
      <OverviewField
        editing={editing}
        label="Why this project matters"
        value={overview.whyItMatters}
        onChange={(whyItMatters) => onChange({ whyItMatters })}
      />
      <OverviewField
        editing={editing}
        label="What the community will help make possible"
        value={overview.communityMakesPossible}
        onChange={(communityMakesPossible) =>
          onChange({ communityMakesPossible })
        }
      />
    </section>
  );
}

function OverviewField({
  editing,
  label,
  value,
  onChange,
}: {
  editing: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
        {label}
      </p>
      {editing ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          className={`${fieldClassName} mt-1.5 resize-none`}
        />
      ) : (
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{value}</p>
      )}
    </div>
  );
}
