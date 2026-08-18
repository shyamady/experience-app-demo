"use client";

import { useCampaign } from "@/lib/dashboard/campaign-context";

export function PublishBar() {
  const { activeCampaign, publishCampaign } = useCampaign();
  const isPublished = activeCampaign.status === "published";

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-zinc-600">
        Ready to go live? Publish to open your experience for registrations and
        sponsors.
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600">
          {isPublished ? "Live" : "Draft"}
        </span>
        {!isPublished && (
          <button
            type="button"
            onClick={() => publishCampaign()}
            className="rounded-full bg-[#FF4F9A] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
          >
            Publish
          </button>
        )}
      </div>
    </section>
  );
}
