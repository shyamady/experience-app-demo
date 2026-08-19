"use client";

import Link from "next/link";
import { useCampaign } from "@/lib/dashboard/campaign-context";

export function PublishBar() {
  const { activeCampaign, publishCampaign } = useCampaign();
  const isPublished = activeCampaign.status === "published";

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-zinc-900">Ready to go live?</p>
        <p className="mt-1 text-sm text-zinc-500">
          Publishing opens participation and sponsorship on your Launch Page.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600">
          Draft
        </span>
        <Link
          href={`/launch/${activeCampaign.slug}`}
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700"
        >
          Preview
        </Link>
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
