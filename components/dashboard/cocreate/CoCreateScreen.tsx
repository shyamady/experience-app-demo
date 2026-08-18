"use client";

import { useMemo, useState } from "react";
import {
  ACTIVE_CO_CREATE,
  CO_CREATE_ACTIONS,
  getCommunityPosts,
  getPostImages,
  getTractionIdea,
  getVisibleFeed,
  NEW_IDEA_COUNT,
  type CoCreatePrompt,
} from "@/lib/dashboard/community";
import { useCampaign } from "@/lib/dashboard/campaign-context";
import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { PostAuthorRow } from "@/components/community/PostAuthorRow";

export function CoCreateScreen() {
  const { activeCampaign } = useCampaign();
  const posts = useMemo(
    () => getCommunityPosts(activeCampaign.id),
    [activeCampaign.id],
  );
  const traction = useMemo(() => getTractionIdea(posts), [posts]);
  const latestVisual = useMemo(
    () => getVisibleFeed(posts).find((post) => getPostImages(post).length > 0) ?? null,
    [posts],
  );
  const [voteQuestion, setVoteQuestion] = useState(
    "Which song should close the night?",
  );
  const [composer, setComposer] = useState<CoCreatePrompt["type"] | null>(null);
  const [draft, setDraft] = useState("");
  const [showVoteDraft, setShowVoteDraft] = useState(false);
  const [publishedNote, setPublishedNote] = useState("");

  function publish() {
    setPublishedNote("Shared with the community.");
    setComposer(null);
    setDraft("");
    setShowVoteDraft(false);
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[0.625rem] font-bold tracking-[0.16em] text-pink-400">
          CO-CREATE ✨
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
          What should we create together next?
        </h1>
      </div>

      <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
        <p className="font-semibold text-zinc-900">{ACTIVE_CO_CREATE.title}</p>
        <p className="mt-1 text-sm text-zinc-500">
          {ACTIVE_CO_CREATE.votes} votes · {ACTIVE_CO_CREATE.comments} comments
        </p>
        <p className="mt-3 text-sm text-zinc-600">
          {NEW_IDEA_COUNT} new ideas from members
        </p>
      </section>

      {latestVisual && (
        <CommunityPostCard post={latestVisual} />
      )}

      {traction && !showVoteDraft && (
        <section className="rounded-[1.75rem] border border-pink-100 bg-rose-50/70 p-5">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-pink-600">
            <SparkleIcon className="h-4 w-4" />
            This idea is getting traction.
          </p>
          <div className="mt-3">
            <PostAuthorRow
              authorName={traction.authorName}
              authorRole={traction.authorRole}
              authorAvatarUrl={traction.authorAvatarUrl}
            />
          </div>
          <p className="mt-2 text-sm text-zinc-700">
            “{traction.title || traction.body}”
          </p>
          <p className="mt-3 text-sm text-zinc-600">
            Turn it into a community vote?
          </p>
          <button
            type="button"
            onClick={() => setShowVoteDraft(true)}
            className="mt-3 rounded-full px-4 py-2 text-sm font-semibold text-white meuse-gradient-bg"
          >
            Create Vote
          </button>
        </section>
      )}

      {showVoteDraft && (
        <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
          <p className="text-sm font-semibold text-zinc-900">Draft vote</p>
          <input
            value={voteQuestion}
            onChange={(event) => setVoteQuestion(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-pink-100 px-4 py-3 text-sm text-zinc-900 focus:border-pink-300 focus:outline-none"
          />
          <div className="mt-3 space-y-2 text-sm text-zinc-700">
            <p>○ Yes</p>
            <p>○ No</p>
            <p>○ Something else</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={publish}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white meuse-gradient-bg"
            >
              Share vote
            </button>
            <button
              type="button"
              onClick={() => setShowVoteDraft(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-500"
            >
              Not now
            </button>
          </div>
        </section>
      )}

      <section className="space-y-2">
        {CO_CREATE_ACTIONS.map((action) => (
          <button
            key={action.type}
            type="button"
            onClick={() => {
              setComposer(action.type);
              setPublishedNote("");
            }}
            className="w-full rounded-[1.5rem] bg-white px-4 py-4 text-left shadow-meuse-chip"
          >
            <p className="font-semibold text-zinc-900">{action.label}</p>
            <p className="mt-0.5 text-sm text-zinc-500">{action.description}</p>
          </button>
        ))}
      </section>

      {composer && (
        <section className="rounded-[1.75rem] bg-white p-5 shadow-meuse-card">
          <p className="text-sm font-semibold text-zinc-900">
            {CO_CREATE_ACTIONS.find((action) => action.type === composer)?.label}
          </p>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={4}
            placeholder="Write it in your own words…"
            className="mt-3 w-full resize-none rounded-2xl border border-pink-100 px-4 py-3 text-sm text-zinc-900 focus:border-pink-300 focus:outline-none"
          />
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={publish}
              disabled={!draft.trim()}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white meuse-gradient-bg disabled:bg-zinc-100 disabled:text-zinc-300"
            >
              Ask Everyone
            </button>
            <button
              type="button"
              onClick={() => setComposer(null)}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-500"
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      {publishedNote && (
        <p className="text-center text-sm text-pink-600">{publishedNote}</p>
      )}
    </div>
  );
}
