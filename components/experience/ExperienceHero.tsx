import type { PublicExperienceData } from "@/lib/experience/types";

type ExperienceHeroProps = {
  creator: PublicExperienceData["creator"];
  experience: PublicExperienceData["experience"];
};

export function ExperienceHero({ creator, experience }: ExperienceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative h-52 sm:h-64 lg:h-72">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={experience.coverImageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-14 flex flex-col items-center text-center sm:-mt-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={creator.avatarUrl}
            alt=""
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:h-28 sm:w-28"
          />

          <span className="mt-4 inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold tracking-wide text-pink-700 ring-1 ring-pink-100">
            {experience.heroBadge}
          </span>

          <p className="mt-3 text-sm font-medium text-pink-500">{creator.name}</p>
          <h1 className="mt-2 max-w-3xl font-meuse-display text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl">
            {experience.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            {experience.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-600">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-meuse-hint px-3 py-1.5">
              <LocationIcon className="h-4 w-4 text-pink-500" />
              {experience.location}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-meuse-hint px-3 py-1.5">
              <CalendarIcon className="h-4 w-4 text-pink-500" />
              {experience.schedule}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
