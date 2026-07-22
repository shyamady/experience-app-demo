"use client";

import { useState } from "react";
import type { ReferralFaq } from "@/lib/referral/types";

type FAQSectionProps = {
  faqs: ReferralFaq[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="meuse-referral-fade-up">
      <h2 className="text-center text-xl font-bold text-zinc-900 sm:text-2xl">
        Frequently Asked Questions
      </h2>

      <div className="mt-6 space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-meuse-chip"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-zinc-900 sm:text-base">
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 text-pink-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronIcon />
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-pink-50 px-5 py-4">
                  <p className="text-sm leading-relaxed text-zinc-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
