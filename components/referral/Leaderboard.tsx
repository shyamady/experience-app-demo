import type { LeaderboardEntry } from "@/lib/referral/types";

type LeaderboardProps = {
  entries: LeaderboardEntry[];
};

export function Leaderboard({ entries }: LeaderboardProps) {
  const topThree = entries.filter((entry) => !entry.isCurrentUser).slice(0, 3);
  const currentUser = entries.find((entry) => entry.isCurrentUser);

  return (
    <section className="meuse-referral-fade-up rounded-meuse border border-pink-100 bg-white p-6 shadow-meuse-card sm:p-8">
      <h2 className="text-center text-xl font-bold text-zinc-900">
        Top Referrers
      </h2>

      <div className="mt-6 space-y-3">
        {topThree.map((entry) => (
          <LeaderboardRow key={entry.rank} entry={entry} />
        ))}
      </div>

      {currentUser && (
        <div className="mt-4 border-t border-pink-50 pt-4">
          <LeaderboardRow entry={currentUser} highlight />
        </div>
      )}
    </section>
  );
}

function LeaderboardRow({
  entry,
  highlight = false,
}: {
  entry: LeaderboardEntry;
  highlight?: boolean;
}) {
  const medal =
    entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : null;

  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 ${
        highlight
          ? "bg-gradient-to-r from-pink-50 to-rose-50 ring-1 ring-pink-200"
          : "bg-meuse-hint/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center text-sm font-bold text-zinc-500">
          {medal ?? entry.rank}
        </span>
        <span
          className={`font-semibold ${highlight ? "text-[#FF4F9A]" : "text-zinc-900"}`}
        >
          {entry.name}
        </span>
      </div>
      <span className="text-sm font-medium text-zinc-600">
        {entry.referrals} referral{entry.referrals === 1 ? "" : "s"}
      </span>
    </div>
  );
}
