"use client";

import { useMemo, useState } from "react";
import { LaunchDashboardShell } from "@/components/dashboard/LaunchDashboardShell";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { addHostUpdate, getHostUpdates } from "@/lib/dashboard/host-updates";

export function UpdatesScreen() {
  const { activeCampaign } = useCampaign();
  const [updates, setUpdates] = useState(() =>
    getHostUpdates(activeCampaign.id),
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const count = useMemo(() => updates.length, [updates]);

  function publish() {
    if (!title.trim() || !body.trim()) return;
    addHostUpdate(activeCampaign.id, { title, body });
    setUpdates(getHostUpdates(activeCampaign.id));
    setTitle("");
    setBody("");
  }

  return (
    <LaunchDashboardShell>
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Updates</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Host-only campaign updates. Participants can see these on the Launch Page.
          </p>
        </div>

        <section className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-sm">
          <p className="text-sm font-semibold text-zinc-900">Post an update</p>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            className="mt-3 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-pink-300"
          />
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="What should people know?"
            rows={4}
            className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-pink-300"
          />
          <button
            type="button"
            onClick={publish}
            className="mt-3 rounded-full bg-[#FF4F9A] px-5 py-2 text-sm font-semibold text-white"
          >
            Publish update
          </button>
        </section>

        {updates.map((update, index) => (
          <article
            key={update.id}
            className="rounded-2xl border border-zinc-200/80 bg-white px-5 py-5 shadow-sm"
          >
            <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
              Update #{count - index}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-900">
              {update.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              {new Date(update.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            {update.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={update.imageUrl}
                alt=""
                className="mt-3 h-40 w-full rounded-xl object-cover"
              />
            )}
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {update.body}
            </p>
          </article>
        ))}
      </div>
    </LaunchDashboardShell>
  );
}
