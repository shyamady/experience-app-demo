"use client";

import { useMemo, useState } from "react";
import { AttendeeShell } from "@/components/attendee/AttendeeShell";
import { ContentCard } from "@/components/attendee/ContentCard";
import { getMockContent } from "@/lib/attendee/mock-data";
import type { ContentType } from "@/lib/attendee/types";
import { getContentTypeLabel } from "@/lib/attendee/formatting";

const FILTERS: Array<{ id: "all" | ContentType; label: string }> = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "replay", label: "Replay" },
  { id: "video", label: "Video" },
  { id: "download", label: "Download" },
  { id: "gift", label: "Gift" },
];

export function AttendeeContentScreen() {
  const allContent = useMemo(() => getMockContent(), []);
  const [activeFilter, setActiveFilter] = useState<"all" | ContentType>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return allContent;
    return allContent.filter((item) => item.contentType === activeFilter);
  }, [activeFilter, allContent]);

  return (
    <AttendeeShell
      title="Content"
      subtitle="Everything you've unlocked from your experiences."
    >
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-pink-600 text-white shadow-md shadow-pink-200/50"
                    : "border border-pink-100 bg-white text-zinc-600 hover:bg-rose-50"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p className="mb-4 text-sm text-zinc-500">
          {filtered.length} item{filtered.length === 1 ? "" : "s"}
          {activeFilter !== "all" &&
            ` · ${getContentTypeLabel(activeFilter)}`}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      </div>
    </AttendeeShell>
  );
}
