"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RootOnboardingScreen } from "@/components/onboarding/RootOnboardingScreen";
import { ConfettiBackground } from "@/components/referral/ConfettiBackground";
import { ReferralHero } from "@/components/referral/ReferralHero";
import { saveReferralCode } from "@/lib/referral/attribution";
import { getMockReferral } from "@/lib/referral/mock-data";

function ReferralInviteContent() {
  const searchParams = useSearchParams();
  const data = useMemo(() => getMockReferral(), []);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const codeFromUrl = searchParams.get("code");
    if (codeFromUrl) {
      saveReferralCode(codeFromUrl);
      setReferralCode(codeFromUrl);
      return;
    }

    // Default attribution when visiting /referral without a code
    const fallback = "geena";
    saveReferralCode(fallback);
    setReferralCode(fallback);
  }, [searchParams]);

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-gradient-to-b from-rose-50/80 via-white to-meuse-bubble">
      <ConfettiBackground />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(255,79,154,0.12),transparent_70%)]" />

      <div className="relative z-10">
        <ReferralHero creator={data.creator} />

        {referralCode && (
          <p className="sr-only">Referral code attributed: {referralCode}</p>
        )}

        <RootOnboardingScreen
          hideHeader
          className="!min-h-0 bg-transparent pt-6 sm:pt-8"
        />
      </div>
    </div>
  );
}

export function ReferralPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-meuse-bubble text-sm text-zinc-500">
          Loading invitation...
        </div>
      }
    >
      <ReferralInviteContent />
    </Suspense>
  );
}
