"use client";

import { useCallback, useState } from "react";

type ReferralLinkCardProps = {
  referralUrl: string;
  referralUrlDisplay: string;
  onShare?: () => void;
};

export function ReferralLinkCard({
  referralUrl,
  referralUrlDisplay,
  onShare,
}: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  }, [referralUrl]);

  return (
    <section className="meuse-referral-fade-up rounded-meuse border border-pink-100 bg-white p-6 shadow-meuse-card sm:p-8">
      <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
        Share Your Referral Link
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-zinc-600 sm:text-base">
        Every friend who joins through your link brings you closer to exclusive
        creator rewards.
      </p>

      <div className="mt-6 rounded-2xl border border-pink-100 bg-gradient-to-r from-rose-50/80 to-pink-50/50 px-4 py-3.5 text-center">
        <p className="truncate font-mono text-sm font-semibold text-zinc-800 sm:text-base">
          {referralUrlDisplay}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-[#FF4F9A] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-300/40 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {copied ? "✓ Link Copied!" : "Copy Link"}
        </button>
        <button
          type="button"
          onClick={onShare}
          className="rounded-full border border-pink-200 bg-white px-6 py-3 text-sm font-semibold text-pink-700 transition-all hover:bg-rose-50 hover:scale-[1.02] active:scale-[0.98]"
        >
          Share
        </button>
      </div>
    </section>
  );
}
