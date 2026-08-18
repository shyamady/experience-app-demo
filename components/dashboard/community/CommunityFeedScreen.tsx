"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addCommunityPost,
  CONTRIBUTE_OPTIONS,
  getCommunityPosts,
  getPendingPosts,
  getPostImages,
  getVisibleFeed,
  setPostStatus,
  type AuthorRole,
  type CommunityPost,
  type ContributionKind,
} from "@/lib/dashboard/community";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { PostAuthorRow } from "@/components/community/PostAuthorRow";
import { PostMedia } from "@/components/community/PostMedia";

export function CommunityFeedScreen() {
  const router = useRouter();
  const { activeCampaign } = useCampaign();
  const [posts, setPosts] = useState(() =>
    getCommunityPosts(activeCampaign.id),
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [kind, setKind] = useState<ContributionKind | null>(null);
  const [body, setBody] = useState("");
  const [asMember, setAsMember] = useState(false);
  const [sent, setSent] = useState(false);

  const refresh = useCallback(() => {
    setPosts(getCommunityPosts(activeCampaign.id));
  }, [activeCampaign.id]);

  const feed = useMemo(() => getVisibleFeed(posts), [posts]);
  const pending = useMemo(() => getPendingPosts(posts), [posts]);

  function submit() {
    if (!kind || !body.trim()) return;
    const role: AuthorRole = asMember ? "member" : "host";
    addCommunityPost(activeCampaign.id, {
      authorName: asMember ? "You" : activeCampaign.creatorName.split(" ")[0] || "Host",
      authorRole: role,
      kind,
      body: body.trim(),
      status: asMember ? "pending" : "approved",
    });
    setBody("");
    setKind(null);
    setSheetOpen(false);
    setSent(asMember);
    refresh();
  }

  function review(postId: string, status: "approved" | "featured") {
    setPostStatus(activeCampaign.id, postId, status);
    refresh();
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
          COMMUNITY
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
          Making it happen together
        </h1>
      </div>

      {pending.length > 0 && (
        <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
          <p className="text-sm font-semibold text-zinc-900">
            Community Contributions
          </p>
          <p className="mt-1 text-sm text-pink-600">
            {pending.length} waiting for you
          </p>
          <div className="mt-4 space-y-4">
            {pending.map((post) => (
              <PendingCard
                key={post.id}
                post={post}
                onApprove={() => review(post.id, "approved")}
                onFeature={() => review(post.id, "featured")}
              />
            ))}
          </div>
        </section>
      )}

      {sent && (
        <section className="rounded-[1.75rem] bg-rose-50 px-5 py-4 text-center">
          <p className="font-semibold text-zinc-900">Sent to the Host ✨</p>
          <p className="mt-1 text-sm text-zinc-600">
            Your contribution will appear once it’s approved.
          </p>
        </section>
      )}

      <section className="space-y-3">
        {feed.map((post) => (
          <CommunityPostCard
            key={post.id}
            post={post}
            onCta={() => router.push("/dashboard/co-create")}
          />
        ))}
      </section>

      <button
        type="button"
        onClick={() => {
          setSheetOpen(true);
          setSent(false);
        }}
        className="fixed right-4 bottom-20 z-30 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-300/50 md:bottom-8"
      >
        + Contribute
      </button>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/30 p-3 md:items-center">
          <div className="w-full max-w-md rounded-[1.75rem] bg-white p-5 shadow-2xl">
            {!kind ? (
              <>
                <h2 className="text-lg font-bold text-zinc-900">
                  What do you want to contribute?
                </h2>
                <div className="mt-4 space-y-2">
                  {CONTRIBUTE_OPTIONS.map((option) => (
                    <button
                      key={option.kind}
                      type="button"
                      onClick={() => setKind(option.kind)}
                      className="flex w-full items-center gap-3 rounded-2xl bg-rose-50/70 px-4 py-3 text-left"
                    >
                      <span className="text-lg">{option.emoji}</span>
                      <span className="text-sm font-semibold text-zinc-800">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-zinc-900">
                  {CONTRIBUTE_OPTIONS.find((option) => option.kind === kind)?.label}
                </p>
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  rows={4}
                  placeholder="Share it with the community…"
                  className="mt-3 w-full resize-none rounded-2xl border border-pink-100 px-4 py-3 text-sm focus:border-pink-300 focus:outline-none"
                />
                <label className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                  <input
                    type="checkbox"
                    checked={asMember}
                    onChange={(event) => setAsMember(event.target.checked)}
                  />
                  Send for Host review (member)
                </label>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={submit}
                    disabled={!body.trim()}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white meuse-gradient-bg disabled:bg-zinc-100 disabled:text-zinc-300"
                  >
                    Contribute
                  </button>
                  <button
                    type="button"
                    onClick={() => setKind(null)}
                    className="rounded-full px-4 py-2 text-sm font-medium text-zinc-500"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setSheetOpen(false);
                setKind(null);
              }}
              className="mt-4 w-full text-center text-sm text-zinc-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PendingCard({
  post,
  onApprove,
  onFeature,
}: {
  post: CommunityPost;
  onApprove: () => void;
  onFeature: () => void;
}) {
  const images = getPostImages(post);

  return (
    <div className="rounded-2xl bg-rose-50/70 px-4 py-3">
      <PostAuthorRow
        authorName={post.authorName}
        authorRole={post.authorRole}
        authorAvatarUrl={post.authorAvatarUrl}
      />
      <p className="mt-2 font-semibold text-zinc-900">
        {post.title || `“${post.body}”`}
      </p>
      {post.title && (
        <p className="mt-1 text-sm text-zinc-600">{post.body}</p>
      )}
      <PostMedia images={images} compact />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onApprove}
          className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-800 shadow-meuse-chip"
        >
          Approve
        </button>
        {post.kind === "creation" || post.kind === "idea" || post.kind === "vote" ? (
          <button
            type="button"
            onClick={onFeature}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-pink-600"
          >
            Feature ✨
          </button>
        ) : (
          <button
            type="button"
            onClick={onApprove}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-500"
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
}
