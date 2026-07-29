"use client";

export function LandingNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-meuse-display text-[1.65rem] font-extrabold tracking-tight meuse-gradient-text sm:text-[1.85rem]"
        >
          meuse
        </button>
      </div>
    </header>
  );
}
