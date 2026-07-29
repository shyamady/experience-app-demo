"use client";

import { OnboardingHero } from "@/components/landing/OnboardingHero";

type RootOnboardingScreenProps = {
  hideHeader?: boolean;
  className?: string;
};

export function RootOnboardingScreen({
  className = "",
}: RootOnboardingScreenProps) {
  return (
    <div className={`flex min-h-screen flex-col bg-transparent ${className}`}>
      <OnboardingHero embedded showProgress />
    </div>
  );
}
