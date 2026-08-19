import { getCampaignProgress } from "@/lib/dashboard/campaign-progress";
import { getCampaignDisplayStatus } from "@/lib/dashboard/campaign-status";
import { formatMoney } from "@/lib/dashboard/commerce";
import type { LaunchData } from "@/lib/launch/types";
import {
  formatDaysLeftCopy,
  getParticipantAvatars,
  getRecentJoinMessage,
} from "@/lib/launch/public-view";

type LiveProgressSectionProps = {
  data: LaunchData;
  onJoin: () => void;
  canJoin: boolean;
};

export function LiveProgressSection({
  data,
  onJoin,
  canJoin,
}: LiveProgressSectionProps) {
  const progress = getCampaignProgress(data);
  const status = getCampaignDisplayStatus(data);
  const isPeople = progress.goalType === "people";
  const showProof = status !== "draft" && progress.people > 0;
  const avatars = showProof ? getParticipantAvatars(data.id) : [];
  const recent = showProof ? getRecentJoinMessage(data.id) : null;
  const overflow = Math.max(0, progress.people - avatars.length);
  const daysCopy = formatDaysLeftCopy(progress.daysLeft);
  const barWidth = Math.max(status === "draft" ? 0 : 4, progress.percent);

  if (status === "greenlit") {
    return (
      <section className="overflow-hidden rounded-[1.75rem] bg-white px-5 py-7 shadow-meuse-card sm:px-7">
        <div className="rounded-[1.25rem] bg-gradient-to-br from-rose-50 via-white to-pink-50 px-5 py-6 text-center">
          <p className="text-sm font-bold tracking-[0.16em] text-pink-500">
            🎉 GREENLIT
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            This is happening.
          </h2>
          <p className="mt-4 text-lg font-semibold text-zinc-900">
            {progress.people} people joined
          </p>
          <p className="text-base text-zinc-500">
            {formatMoney(progress.raised)} committed
          </p>
        </div>
        {canJoin ? (
          <>
            <p className="mt-5 text-center text-sm font-medium text-zinc-600">
              More ways to participate are still open
            </p>
            <button
              type="button"
              onClick={onJoin}
              className="mt-3 w-full rounded-full py-3.5 text-sm font-semibold text-white meuse-gradient-bg"
            >
              Join the Project
            </button>
          </>
        ) : (
          <p className="mt-5 text-center text-sm font-medium text-zinc-500">
            Participation closed
          </p>
        )}
      </section>
    );
  }

  if (status === "ended" || status === "cancelled") {
    return (
      <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card">
        <p className="text-sm font-bold tracking-[0.14em] text-zinc-500">
          {status === "cancelled" ? "LAUNCH ENDED" : "PROJECT COMPLETE"}
        </p>
        <p className="mt-3 text-2xl font-bold text-zinc-900">
          {progress.people} participants
        </p>
        <p className="mt-1 text-lg font-semibold text-zinc-800">
          {formatMoney(progress.raised)} raised
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.75rem] bg-white px-5 py-6 shadow-meuse-card sm:px-6">
      {isPeople ? (
        <>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            {progress.people} / {progress.goalValue} people joined
          </h2>
          <div className="mt-4 h-3.5 overflow-hidden rounded-full bg-pink-100">
            <div
              className="h-full rounded-full meuse-gradient-bg transition-[width] duration-700"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          {progress.remaining > 0 && (
            <p className="mt-4 text-lg font-bold text-zinc-900">
              {progress.remaining} more{" "}
              {progress.remaining === 1 ? "person" : "people"} make this happen
            </p>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            {formatMoney(progress.raised)} / {formatMoney(progress.goalValue)}
          </h2>
          <div className="mt-4 h-3.5 overflow-hidden rounded-full bg-pink-100">
            <div
              className="h-full rounded-full meuse-gradient-bg transition-[width] duration-700"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-zinc-800">
            {progress.percent}% funded
          </p>
          {progress.remaining > 0 && (
            <p className="mt-2 text-lg font-bold text-zinc-900">
              {formatMoney(progress.remaining)} more to go
            </p>
          )}
        </>
      )}

      {daysCopy && (
        <p className="mt-2 text-sm font-medium text-pink-600">{daysCopy}</p>
      )}

      {showProof && avatars.length > 0 && (
        <div className="mt-5 flex items-center">
          <div className="flex">
            {avatars.map((person, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={person.name}
                src={person.avatarUrl}
                alt=""
                className="h-9 w-9 rounded-full border-2 border-white object-cover"
                style={{ marginLeft: index === 0 ? 0 : -8 }}
              />
            ))}
            {overflow > 0 && (
              <span
                className="flex h-9 min-w-9 items-center justify-center rounded-full border-2 border-white bg-rose-50 px-1.5 text-[0.625rem] font-bold text-pink-600"
                style={{ marginLeft: -8 }}
              >
                +{overflow}
              </span>
            )}
          </div>
          {recent && (
            <p className="ml-3 text-sm text-zinc-500">{recent}</p>
          )}
        </div>
      )}

      {canJoin && (
        <button
          type="button"
          onClick={onJoin}
          className="mt-5 w-full rounded-full py-3.5 text-sm font-semibold text-white meuse-gradient-bg shadow-lg shadow-pink-200/40"
        >
          Join the Project
        </button>
      )}
    </section>
  );
}
