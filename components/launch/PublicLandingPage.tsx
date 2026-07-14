import type { LaunchData } from "@/lib/launch/types";
import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import { ExperienceCategoryPill } from "@/components/experiences/ExperienceCategoryPill";
import { DemandValidationPublicCard } from "@/components/launch/DemandValidation";
import {
  formatFirstDateWithFrequency,
  formatSpotsAvailable,
  getLocationDisplay,
} from "@/lib/launch/formatting";

type PublicLandingPageProps = {
  data: LaunchData;
  compact?: boolean;
};

function getCtaLabel(data: LaunchData): string {
  if (data.status !== "published") return "Preview only";
  if (data.salesMode === "waitlist") return "Join Waitlist";
  return "Choose an Experience";
}

const DEMO_ITINERARY = [
  "Day 1 — Neighborhood exploration and local food",
  "Day 2 — Hidden gems and creator meetup",
  "Day 3 — Fan experience finale",
];

export function PublicLandingPage({ data, compact = false }: PublicLandingPageProps) {
  const dateFrequency = formatFirstDateWithFrequency(data);
  const location = getLocationDisplay(data);
  const spots = formatSpotsAvailable(data.totalSpots);

  const participationProducts = data.products.filter(
    (product) => product.active && product.category !== "SPONSOR",
  );
  const sponsorProducts = data.products.filter(
    (product) => product.active && product.category === "SPONSOR",
  );

  return (
    <div
      className={`overflow-hidden bg-white ${
        compact ? "rounded-[2rem] shadow-meuse-card" : "min-h-dvh"
      }`}
    >
      <div className="relative bg-white">
        <div className={`relative w-full ${compact ? "h-36" : "h-44 sm:h-52"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.coverImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        <div className={compact ? "px-4 pb-6" : "mx-auto max-w-lg px-5 pb-10"}>
          <div className="relative z-10 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.avatarUrl}
              alt=""
              className={`relative rounded-full border-[5px] border-white object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] ${
                compact
                  ? "mt-[-2.25rem] h-[4.5rem] w-[4.5rem]"
                  : "mt-[-3.5rem] h-28 w-28 sm:mt-[-4rem] sm:h-[7.5rem] sm:w-[7.5rem]"
              }`}
            />
          </div>

          <div className="mt-4 text-center sm:mt-5">
            <p className="text-sm font-medium text-pink-500">
              {data.creatorName}
            </p>
            <h1 className="mt-1.5 text-xl font-bold text-zinc-900 sm:text-2xl">
              {data.title || "Your launch title"}
            </h1>
          </div>

          {(dateFrequency || location || spots) && (
            <div className="mt-5 space-y-1 rounded-meuse-sm bg-meuse-hint px-4 py-3 text-center text-sm text-zinc-600">
              {dateFrequency && (
                <p className="font-medium text-zinc-800">{dateFrequency}</p>
              )}
              {location && <p>{location}</p>}
              {spots && <p className="text-pink-600">{spots}</p>}
            </div>
          )}

          <DemandValidationPublicCard data={data} />

          {participationProducts.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold text-zinc-900">
                Ways to participate
              </h2>
              <div className="space-y-3">
                {participationProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {sponsorProducts.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 text-sm font-semibold text-zinc-900">
                Sponsor opportunities
              </h2>
              <div className="space-y-3">
                {sponsorProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          <section className="mt-6">
            <h2 className="mb-3 text-sm font-semibold text-zinc-900">
              Itinerary preview
            </h2>
            <div className="rounded-meuse-sm bg-white p-4 shadow-meuse-chip">
              <ul className="space-y-2">
                {DEMO_ITINERARY.map((item) => (
                  <li key={item} className="text-sm text-zinc-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <button
            type="button"
            disabled={data.status !== "published"}
            className={`mt-6 w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
              data.status === "published"
                ? "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
                : "bg-zinc-100 text-zinc-400"
            }`}
          >
            {getCtaLabel(data)}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: ExperienceProduct }) {
  return (
    <div className="overflow-hidden rounded-meuse-sm bg-white shadow-meuse-chip">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.imageUrl}
        alt=""
        className="h-28 w-full object-cover"
      />
      <div className="p-3">
        <ExperienceCategoryPill category={product.category} />
        <p className="mt-1 font-semibold text-zinc-900">{product.title}</p>
        <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-zinc-900">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-400">
            {product.spots === "unlimited"
              ? "Unlimited"
              : `${product.spots} spots`}
          </span>
        </div>
      </div>
    </div>
  );
}
