export function VerticalVideoPlaceholder() {
  return (
    <div className="mx-auto w-[220px] shrink-0 sm:w-[240px]">
      <div
        role="img"
        aria-label="Video placeholder"
        className="group relative aspect-[9/16] overflow-hidden rounded-[1.35rem] border border-pink-200/70 bg-gradient-to-br from-rose-100 via-pink-50 to-white shadow-[0_20px_48px_-16px_rgba(219,39,119,0.22)] ring-1 ring-pink-100/80 transition duration-300 hover:shadow-[0_24px_56px_-14px_rgba(219,39,119,0.28)]"
      >
        <div className="pointer-events-none absolute inset-[1px] rounded-[1.25rem] ring-1 ring-white/60" />

        <div
          aria-hidden
          className="absolute -top-8 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-pink-200/40 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute right-0 bottom-0 h-24 w-24 rounded-full bg-rose-200/30 blur-xl"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-white/95 shadow-[0_8px_24px_-4px_rgba(219,39,119,0.25)] ring-1 ring-pink-100 transition duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 h-6 w-6 text-pink-500"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-[0.12em] text-pink-400/90 uppercase">
            Video
          </span>
        </div>
      </div>
    </div>
  );
}
