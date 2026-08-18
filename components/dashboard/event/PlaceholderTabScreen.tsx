"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";

type PlaceholderTabScreenProps = {
  title: string;
  description: string;
};

export function PlaceholderTabScreen({
  title,
  description,
}: PlaceholderTabScreenProps) {
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-zinc-200/80 bg-white px-6 py-16 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
          {description}
        </p>
      </div>
    </DashboardShell>
  );
}
