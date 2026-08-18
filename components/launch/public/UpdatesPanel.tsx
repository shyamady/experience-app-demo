"use client";

import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import type { CommunityPost, PublicMomentum } from "@/lib/dashboard/community";

type UpdatesPanelProps = {
  posts: CommunityPost[];
  momentum: PublicMomentum;
  onCta?: () => void;
};

export function UpdatesPanel({ posts, momentum, onCta }: UpdatesPanelProps) {
  const metrics = [
    momentum.decisions > 0
      ? `${momentum.decisions} decision${momentum.decisions === 1 ? "" : "s"} made`
      : null,
    momentum.votes > 0 ? `${momentum.votes} votes` : null,
    momentum.ideas > 0
      ? `${momentum.ideas} idea${momentum.ideas === 1 ? "" : "s"} shared`
      : null,
  ].filter((item): item is string => Boolean(item));

  return (
    <section>
      <h2 className="text-lg font-bold tracking-tight text-zinc-900">Updates</h2>
      <p className="mt-1 text-sm text-zinc-500">From the community</p>

      {metrics.length > 0 && (
        <div className="mt-4 rounded-[1.25rem] border border-zinc-100 bg-white px-4 py-3">
          <p className="text-sm font-semibold text-zinc-800">
            This project is moving ✨
          </p>
          <p className="mt-1 text-sm text-zinc-500">{metrics.join(" · ")}</p>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {posts.length === 0 ? (
          <p className="text-sm text-zinc-400">No public updates yet.</p>
        ) : (
          posts.map((post) => (
            <CommunityPostCard key={post.id} post={post} onCta={onCta} />
          ))
        )}
      </div>
    </section>
  );
}
