"use client";

import { PostAuthorRow } from "@/components/community/PostAuthorRow";
import { PostMedia } from "@/components/community/PostMedia";
import {
  formatRelativeTime,
  getPostImages,
  getPostTag,
  type CommunityPost,
} from "@/lib/dashboard/community";

type CommunityPostCardProps = {
  post: CommunityPost;
  compact?: boolean;
  onCta?: () => void;
};

export function CommunityPostCard({
  post,
  compact = false,
  onCta,
}: CommunityPostCardProps) {
  const images = getPostImages(post);
  const tag = getPostTag(post);
  const showTitle = Boolean(post.title);
  const body = showTitle && post.title === post.body ? "" : post.body;

  return (
    <article
      className={
        compact
          ? "border-t border-pink-50 pt-4 first:border-0 first:pt-0"
          : "rounded-[1.75rem] bg-white p-4 shadow-meuse-card sm:p-5"
      }
    >
      <div className="flex items-start justify-between gap-3">
        <PostAuthorRow
          authorName={post.authorName}
          authorRole={post.authorRole}
          authorAvatarUrl={post.authorAvatarUrl}
        />
        <span className="shrink-0 text-xs text-zinc-400">
          {formatRelativeTime(post.createdAt)}
        </span>
      </div>

      <p className="mt-3 text-[0.625rem] font-bold tracking-[0.14em] text-pink-500">
        {tag}
      </p>

      {showTitle && (
        <h3 className="mt-1.5 font-semibold text-zinc-900">{post.title}</h3>
      )}

      {body && (
        <p
          className={`mt-1.5 text-sm leading-relaxed text-zinc-600 ${
            post.kind === "idea" && !showTitle ? "font-medium text-zinc-800" : ""
          }`}
        >
          {post.kind === "idea" && !showTitle ? `“${body}”` : body}
        </p>
      )}

      {post.voteOptions && post.voteOptions.length > 0 && !post.decidedOn && (
        <div className="mt-3 space-y-2">
          {post.voteOptions.map((option) => (
            <div key={option.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-700">{option.label}</span>
                <span className="font-semibold text-zinc-900">{option.percent}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full meuse-gradient-bg"
                  style={{ width: `${option.percent}%` }}
                />
              </div>
            </div>
          ))}
          {post.voterCount ? (
            <p className="text-sm text-zinc-500">{post.voterCount} members voted</p>
          ) : null}
        </div>
      )}

      <PostMedia images={images} compact={compact} />

      <p className="mt-3 text-sm text-zinc-400">
        ❤️ {post.likes}
        <span className="mx-1.5">💬</span>
        {post.comments}
      </p>

      {post.hostNote && (
        <p className="mt-2 text-sm font-medium text-pink-600">{post.hostNote}</p>
      )}

      {post.status === "featured" &&
        post.authorRole === "member" &&
        post.kind === "creation" && (
        <p className="mt-2 text-sm font-medium text-pink-600">
          Featured by the Host ✨
        </p>
      )}

      {post.ctaLabel && (
        <button
          type="button"
          onClick={onCta}
          className="mt-3 rounded-full px-4 py-2 text-sm font-semibold text-pink-600"
        >
          {post.ctaLabel}
        </button>
      )}
    </article>
  );
}
