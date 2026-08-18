import type { LaunchData } from "@/lib/launch/types";
import {
  getDaysLeftToJoin,
  getJoinProgress,
  getParticipantAvatars,
  getRecentJoinMessage,
} from "@/lib/launch/public-view";

type LiveProgressSectionProps = {
  data: LaunchData;
};

export function LiveProgressSection({ data }: LiveProgressSectionProps) {
  const progress = getJoinProgress(data);
  const avatars = getParticipantAvatars();
  const recent = getRecentJoinMessage();
  const daysLeft = getDaysLeftToJoin(data);

  if (progress.joined <= 0 && data.status !== "published") {
    return null;
  }

  const overflow = Math.max(0, progress.joined - avatars.length);

  return (
    <section className="rounded-[1.5rem] border border-zinc-100 bg-white px-4 py-5 shadow-meuse-chip sm:px-5">
      {progress.joined > 0 && (
        <h2 className="text-lg font-bold tracking-tight text-zinc-900">
          {progress.joined} people are making this happen
        </h2>
      )}

      {progress.joined > 0 && (
        <div className="mt-3 flex items-center">
          <div className="flex">
            {avatars.map((person, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={person.name}
                src={person.avatarUrl}
                alt=""
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
                style={{ marginLeft: index === 0 ? 0 : -8 }}
              />
            ))}
            {overflow > 0 && (
              <span
                className="flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-100 px-1.5 text-[0.625rem] font-bold text-zinc-600"
                style={{ marginLeft: -8 }}
              >
                +{overflow}
              </span>
            )}
          </div>
        </div>
      )}

      <p className="mt-3 text-sm text-zinc-600">
        <span className="font-semibold text-zinc-900">{progress.joined} joined</span>
        {progress.remaining !== null && (
          <>
            {" "}
            ·{" "}
            <span className="font-medium text-pink-600">
              {progress.remaining} spots left
            </span>
          </>
        )}
      </p>

      <div className="mt-3">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full meuse-gradient-bg transition-all"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-zinc-400">
          {progress.joined} / {progress.goal}
        </p>
      </div>

      {(recent || daysLeft !== null) && (
        <div className="mt-3 space-y-1 text-sm text-zinc-500">
          {recent && <p>🔥 {recent}</p>}
          {daysLeft !== null && (
            <p>
              {daysLeft === 0
                ? "Last day to join"
                : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left to join`}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
