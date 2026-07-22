import type { PublicExperienceData } from "@/lib/experience/types";

type CreatorProfileProps = {
  creator: PublicExperienceData["creator"];
};

export function CreatorProfile({ creator }: CreatorProfileProps) {
  return (
    <section className="rounded-meuse border border-pink-100 bg-white p-6 shadow-meuse-card sm:p-8">
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={creator.avatarUrl}
          alt=""
          className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-rose-50"
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-zinc-900">{creator.name}</h2>
          <p className="mt-1 text-sm font-medium text-pink-500">
            {creator.followerCount}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            {creator.bio}
          </p>
          <button
            type="button"
            className="mt-4 rounded-full border border-pink-200 px-5 py-2.5 text-sm font-semibold text-pink-700 transition-colors hover:bg-rose-50"
          >
            Follow {creator.name.split(" ")[0]}
          </button>
        </div>
      </div>
    </section>
  );
}
