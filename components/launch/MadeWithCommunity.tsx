"use client";

import {
  getCommunityPosts,
  getFeaturedPosts,
  getPostImages,
  KIND_EMOJI,
} from "@/lib/dashboard/community";
import { PostAuthorRow } from "@/components/community/PostAuthorRow";
import { PostMedia } from "@/components/community/PostMedia";

export function MadeWithCommunity({ campaignId }: { campaignId: string }) {
  const featured = getFeaturedPosts(getCommunityPosts(campaignId)).filter(
    (post) => getPostImages(post).length > 0 || post.kind === "creation",
  );
  if (featured.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-sm font-semibold text-zinc-900">
        Made with the community
      </h2>
      <div className="space-y-3">
        {featured.map((post) => (
          <article
            key={post.id}
            className="rounded-meuse-sm border border-zinc-100 bg-white px-4 py-3"
          >
            <p className="text-[0.625rem] font-bold tracking-[0.12em] text-pink-500">
              {KIND_EMOJI[post.kind]}{" "}
              {post.kind === "creation"
                ? "Made by the Community"
                : post.title || "Update"}
            </p>
            {post.title && (
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                {post.title}
              </p>
            )}
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">
              {post.kind === "idea" ? `“${post.body}”` : post.body}
            </p>
            <PostMedia images={getPostImages(post)} compact />
            <div className="mt-3">
              <PostAuthorRow
                authorName={post.authorName}
                authorRole={post.authorRole}
                authorAvatarUrl={post.authorAvatarUrl}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
