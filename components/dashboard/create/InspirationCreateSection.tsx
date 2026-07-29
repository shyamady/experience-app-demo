"use client";

import { useState } from "react";
import type { InspirationExperience } from "@/lib/dashboard/create-types";
import {
  MOCK_CREATOR_PROFILE,
  MOCK_INSPIRATION_EXPERIENCES,
} from "@/lib/dashboard/create-mock-data";
import { InspirationCard } from "@/components/dashboard/create/InspirationCard";
import { InspirationDetailDrawer } from "@/components/dashboard/create/InspirationDetailDrawer";

type InspirationCreateSectionProps = {
  onRemix: (experience: InspirationExperience) => void;
  remixingId: string | null;
};

export function InspirationCreateSection({
  onRemix,
  remixingId,
}: InspirationCreateSectionProps) {
  const [selected, setSelected] = useState<InspirationExperience | null>(null);
  const profile = MOCK_CREATOR_PROFILE;

  return (
    <section className="rounded-3xl border border-pink-100/80 bg-white/90 p-5 shadow-meuse-card sm:p-6">
      <div className="max-w-2xl">
        <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
          Get inspired by other creators
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
          Explore experiences that are working and remix them for your audience.
        </p>
      </div>

      <p className="mt-5 text-xs font-medium text-pink-500">
        Recommended for your audience · {profile.category} ·{" "}
        {profile.audienceDemographics}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {MOCK_INSPIRATION_EXPERIENCES.map((experience) => (
          <InspirationCard
            key={experience.id}
            experience={experience}
            onSelect={setSelected}
          />
        ))}
      </div>

      <InspirationDetailDrawer
        experience={selected}
        remixing={Boolean(selected && remixingId === selected.id)}
        onClose={() => {
          if (remixingId) return;
          setSelected(null);
        }}
        onRemix={(experience) => onRemix(experience)}
      />
    </section>
  );
}
