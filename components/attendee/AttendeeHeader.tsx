import type { AttendeeProfile } from "@/lib/attendee/types";

type AttendeeHeaderProps = {
  profile: AttendeeProfile;
  title?: string;
  subtitle?: string;
  showWelcome?: boolean;
};

export function AttendeeHeader({
  profile,
  title,
  subtitle,
  showWelcome = false,
}: AttendeeHeaderProps) {
  return (
    <header className="border-b border-pink-50 bg-white/90 backdrop-blur-sm">
      <div className="flex w-full items-start justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <div className="min-w-0 flex-1">
          {showWelcome ? (
            <>
              <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                Welcome back, {profile.firstName}
              </h1>
              <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                Everything you need for your upcoming experience is here.
              </p>
            </>
          ) : (
            <>
              {title && (
                <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-zinc-600 sm:text-base">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-pink-100 bg-white text-zinc-500 shadow-meuse-chip hover:bg-rose-50"
          >
            <BellIcon className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-meuse-chip sm:h-11 sm:w-11"
          />
        </div>
      </div>
    </header>
  );
}

function BellIcon({ className }: { className?: string }) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
