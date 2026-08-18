"use client";

import { useState } from "react";
import type { ProjectMilestone } from "@/types/launch";

type ProjectMilestonesCardProps = {
  milestones: ProjectMilestone[];
  onChange: (milestones: ProjectMilestone[]) => void;
};

const fieldClassName =
  "w-full rounded-xl border border-pink-100 bg-white px-3 py-2 text-sm text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none";

export function ProjectMilestonesCard({
  milestones,
  onChange,
}: ProjectMilestonesCardProps) {
  const [editing, setEditing] = useState(false);

  function updateMilestone(index: number, updates: Partial<ProjectMilestone>) {
    onChange(
      milestones.map((milestone, currentIndex) =>
        currentIndex === index ? { ...milestone, ...updates } : milestone,
      ),
    );
  }

  return (
    <section className="rounded-meuse bg-white px-5 py-5 shadow-meuse-card sm:px-6 sm:py-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
            PROJECT MILESTONES
          </p>
          <h2 className="mt-1 text-lg font-bold text-zinc-900">
            Three steps to bring it to life
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setEditing((current) => !current)}
          className="shrink-0 text-sm font-medium text-pink-600 hover:text-pink-700"
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      <ol className="mt-4 space-y-3">
        {milestones.map((milestone, index) => (
          <li
            key={`${milestone.title}-${index}`}
            className="flex gap-3 rounded-2xl bg-rose-50/70 px-4 py-3"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-pink-500 shadow-meuse-chip">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              {editing ? (
                <>
                  <input
                    type="text"
                    value={milestone.title}
                    onChange={(event) =>
                      updateMilestone(index, { title: event.target.value })
                    }
                    className={fieldClassName}
                  />
                  <textarea
                    value={milestone.description}
                    onChange={(event) =>
                      updateMilestone(index, {
                        description: event.target.value,
                      })
                    }
                    rows={2}
                    className={`${fieldClassName} mt-2 resize-none`}
                  />
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-zinc-900">
                    {milestone.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                    {milestone.description}
                  </p>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
