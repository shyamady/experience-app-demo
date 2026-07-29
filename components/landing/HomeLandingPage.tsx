import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { OnboardingHero } from "@/components/landing/OnboardingHero";
import { CustomerStoriesSection } from "@/components/landing/CustomerStoriesSection";

export function HomeLandingPage() {
  return (
    <div className="min-h-dvh bg-white">
      <LandingNavbar />
      <OnboardingHero />
      <CustomerStoriesSection />

      <footer className="border-t border-pink-50 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center sm:px-6 lg:px-8">
          <p className="font-meuse-display text-base font-extrabold meuse-gradient-text">
            meuse
          </p>
          <p className="text-sm text-zinc-400">
            Turn what you&apos;re already doing into unforgettable fan
            experiences.
          </p>
        </div>
      </footer>
    </div>
  );
}
