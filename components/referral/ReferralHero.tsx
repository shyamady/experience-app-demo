import type { ReferralData } from "@/lib/referral/types";

type ReferralHeroProps = {
  creator: ReferralData["creator"];
};

export function ReferralHero({ creator }: ReferralHeroProps) {
  const firstName = creator.name.split(" ")[0] ?? creator.name;

  return (
    <section className="relative z-10 px-4 pb-2 pt-8 text-center sm:px-6 sm:pt-10">
      <span className="font-meuse-display text-2xl font-extrabold tracking-tight meuse-gradient-text sm:text-3xl">
        meuse
      </span>

      <div className="relative mx-auto mt-8 w-fit">
        <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-pink-200/60 via-rose-100/40 to-amber-100/50 blur-md" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={creator.avatarUrl}
          alt=""
          className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-[0_12px_40px_rgba(255,79,154,0.25)] sm:h-36 sm:w-36"
        />
        <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#FF4F9A] text-white shadow-lg ring-4 ring-white sm:h-9 sm:w-9">
          <VerifiedIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </span>
      </div>

      <p className="mt-6 text-sm font-medium text-pink-500 sm:text-base">
        ✨ {firstName} invites you!
      </p>
      <h1 className="mx-auto mt-3 max-w-2xl font-meuse-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        Launch your next creator experience with Meuse
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg">
        Turn what you&apos;re already doing into premium fan experiences in
        minutes.
      </p>
    </section>
  );
}

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.745 3.745 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}
