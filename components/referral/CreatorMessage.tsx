import type { ReferralData } from "@/lib/referral/types";

type CreatorMessageProps = {
  creator: ReferralData["creator"];
};

export function CreatorMessage({ creator }: CreatorMessageProps) {
  return (
    <section className="meuse-referral-fade-up overflow-hidden rounded-meuse border border-pink-100 bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6 shadow-meuse-card sm:p-10">
      <div className="flex flex-col items-center text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={creator.avatarUrl}
          alt=""
          className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg ring-2 ring-pink-100 sm:h-24 sm:w-24"
        />
        <blockquote className="mt-6 max-w-lg">
          <p className="text-lg font-medium leading-relaxed text-zinc-700 sm:text-xl">
            &ldquo;{creator.quote}&rdquo;
          </p>
          <footer className="mt-4 text-sm font-semibold text-[#FF4F9A]">
            — {creator.name}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
