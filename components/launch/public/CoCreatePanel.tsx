"use client";

import { PostAuthorRow } from "@/components/community/PostAuthorRow";
import { PostMedia } from "@/components/community/PostMedia";
import { formatShortDate } from "@/lib/launch/formatting";
import { formatRelativeTime } from "@/lib/dashboard/community";
import type { PublicCoCreateEntry, PublicMomentum } from "@/lib/dashboard/community";

type CoCreatePanelProps = {
  entries: PublicCoCreateEntry[];
  momentum: PublicMomentum;
  onJoin: () => void;
};

export function CoCreatePanel({ entries, momentum, onJoin }: CoCreatePanelProps) {
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
      <h2 className="text-lg font-bold tracking-tight text-zinc-900">
        See what we’re creating together
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Members are helping shape this project before it happens.
      </p>

      {metrics.length > 0 && (
        <p className="mt-3 text-sm text-zinc-500">{metrics.join(" · ")}</p>
      )}

      <div className="mt-4 space-y-3">
        {entries.map((entry) => (
          <CoCreateCard key={entry.id} entry={entry} onJoin={onJoin} />
        ))}
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-pink-100 bg-white px-4 py-5 shadow-meuse-chip">
        <h3 className="font-semibold text-zinc-900">Want a say in what happens?</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
          Members are currently helping shape this project before it happens.
        </p>
        <button
          type="button"
          onClick={onJoin}
          className="mt-4 rounded-full px-5 py-2.5 text-sm font-semibold text-white meuse-gradient-bg"
        >
          Join to Participate
        </button>
      </div>
    </section>
  );
}

function CoCreateCard({
  entry,
  onJoin,
}: {
  entry: PublicCoCreateEntry;
  onJoin: () => void;
}) {
  if (entry.type === "vote") {
    return (
      <article className="rounded-[1.5rem] border border-zinc-100 bg-white p-4 shadow-meuse-chip">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] text-pink-500">
          🗳 COMMUNITY VOTE
        </p>
        <h3 className="mt-2 font-semibold text-zinc-900">{entry.title}</h3>
        <div className="mt-3 space-y-2.5">
          {entry.options.map((option) => (
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
        </div>
        <p className="mt-3 text-sm text-zinc-500">
          {entry.voterCount} members voted
        </p>
        <p className="mt-3 text-sm text-zinc-500">🔒 Join the project to vote</p>
        <button
          type="button"
          onClick={onJoin}
          className="mt-3 text-sm font-semibold text-pink-600"
        >
          Join to vote
        </button>
      </article>
    );
  }

  if (entry.type === "idea") {
    return (
      <article className="rounded-[1.5rem] border border-zinc-100 bg-white p-4 shadow-meuse-chip">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] text-pink-500">
          💡 COMMUNITY IDEA
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-800">
          “{entry.body}”
        </p>
        <div className="mt-3">
          <PostAuthorRow
            authorName={entry.authorName}
            authorRole="member"
            authorAvatarUrl={entry.authorAvatarUrl}
          />
        </div>
        <PostMedia images={entry.imageUrls} />
        <p className="mt-3 text-sm text-zinc-500">❤️ {entry.likes}</p>
        {entry.hostNote && (
          <p className="mt-2 text-sm font-medium text-pink-600">{entry.hostNote}</p>
        )}
      </article>
    );
  }

  if (entry.type === "creation") {
    return (
      <article className="rounded-[1.5rem] border border-zinc-100 bg-white p-4 shadow-meuse-chip">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] text-pink-500">
          🎨 MADE WITH THE COMMUNITY
        </p>
        <h3 className="mt-2 font-semibold text-zinc-900">{entry.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{entry.body}</p>
        <PostMedia images={entry.imageUrls} />
        <div className="mt-3">
          <PostAuthorRow
            authorName={entry.authorName}
            authorRole="member"
            authorAvatarUrl={entry.authorAvatarUrl}
          />
        </div>
        <p className="mt-3 text-sm text-zinc-500">
          {entry.likes} people loved this
        </p>
        <p className="mt-2 text-sm font-medium text-pink-600">
          Featured by the Host ✨
        </p>
      </article>
    );
  }

  if (entry.type === "host-update") {
    return (
      <article className="rounded-[1.5rem] border border-zinc-100 bg-white p-4 shadow-meuse-chip">
        <p className="text-[0.625rem] font-bold tracking-[0.14em] text-pink-500">
          FROM THE HOST
        </p>
        <h3 className="mt-2 font-semibold text-zinc-900">{entry.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{entry.body}</p>
        <PostMedia images={entry.imageUrls} />
        <div className="mt-3">
          <PostAuthorRow
            authorName={entry.authorName}
            authorRole="host"
            authorAvatarUrl={entry.authorAvatarUrl}
            meta={formatRelativeTime(entry.createdAt)}
          />
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[1.5rem] border border-zinc-100 bg-white p-4 shadow-meuse-chip">
      <p className="text-[0.625rem] font-bold tracking-[0.14em] text-pink-500">
        ✓ COMMUNITY DECISION
      </p>
      <h3 className="mt-2 font-semibold text-zinc-900">{entry.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{entry.body}</p>
      {entry.detail && (
        <p className="mt-1 text-sm text-zinc-500">{entry.detail}</p>
      )}
      <p className="mt-3 text-xs text-zinc-400">
        Decision made {formatShortDate(entry.decidedOn)}
      </p>
    </article>
  );
}
