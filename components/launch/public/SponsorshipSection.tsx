"use client";

import { useState } from "react";
import { ExperienceCategoryPill } from "@/components/experiences/ExperienceCategoryPill";
import type { PublicOffer } from "@/lib/launch/public-view";

type SponsorshipSectionProps = {
  offers: PublicOffer[];
  creatorName: string;
  canJoin: boolean;
  onJoin: (id: string) => void;
};

export function SponsorshipSection({
  offers,
  creatorName,
  canJoin,
  onJoin,
}: SponsorshipSectionProps) {
  const [questionFor, setQuestionFor] = useState<string | null>(null);

  if (offers.length === 0) return null;

  return (
    <section className="pt-2">
      <h2 className="text-lg font-bold tracking-tight text-zinc-900">
        Help bring this project to life
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Partner with the creator and community behind this launch.
      </p>

      <div className="mt-4 space-y-3">
        {offers.map((offer) => {
          const { product, capacity } = offer;
          return (
            <article
              key={product.id}
              className="rounded-[1.5rem] border border-zinc-100 bg-white p-4 shadow-meuse-chip"
            >
              <ExperienceCategoryPill category={product.category} />
              <h3 className="mt-2 text-base font-semibold text-zinc-900">
                {product.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                {product.description}
              </p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <p className="text-lg font-bold text-zinc-900">
                  ${product.price.toLocaleString()}
                </p>
                {capacity.label && (
                  <p className="text-sm font-medium text-zinc-500">
                    {capacity.tone === "ok"
                      ? `${capacity.total} opportunities`
                      : capacity.label}
                  </p>
                )}
              </div>
              <button
                type="button"
                disabled={!canJoin || capacity.soldOut}
                onClick={() => onJoin(product.id)}
                className={`mt-4 w-full rounded-full py-3 text-sm font-semibold ${
                  !canJoin || capacity.soldOut
                    ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
                    : "text-white meuse-gradient-bg shadow-md shadow-pink-200/50"
                }`}
              >
                {capacity.soldOut ? "SOLD OUT" : "Become a Partner"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setQuestionFor((current) =>
                    current === product.id ? null : product.id,
                  )
                }
                className="mt-2 w-full py-2 text-sm font-medium text-zinc-500"
              >
                Ask a Question
              </button>
              {questionFor === product.id && (
                <p className="mt-1 text-center text-sm text-zinc-500">
                  We’ll pass your question to {creatorName}.
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
