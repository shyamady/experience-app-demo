import { ExperienceCategoryPill } from "@/components/experiences/ExperienceCategoryPill";
import type { PublicOffer } from "@/lib/launch/public-view";
import { getOfferBenefits } from "@/lib/launch/public-view";

type ParticipatePanelProps = {
  offers: PublicOffer[];
  selectedId: string | null;
  canJoin: boolean;
  waitlist: boolean;
  onSelect: (id: string) => void;
  onJoin: (id: string) => void;
};

export function ParticipatePanel({
  offers,
  selectedId,
  canJoin,
  waitlist,
  onSelect,
  onJoin,
}: ParticipatePanelProps) {
  return (
    <section>
      <h2 className="text-lg font-bold tracking-tight text-zinc-900">
        Choose how you want to be part of it
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Each way to join helps make the project real.
      </p>

      <div className="mt-4 space-y-3">
        {offers.map((offer) => (
          <ParticipationCard
            key={offer.product.id}
            offer={offer}
            selected={selectedId === offer.product.id}
            canJoin={canJoin}
            waitlist={waitlist}
            onSelect={() => onSelect(offer.product.id)}
            onJoin={() => onJoin(offer.product.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ParticipationCard({
  offer,
  selected,
  canJoin,
  waitlist,
  onSelect,
  onJoin,
}: {
  offer: PublicOffer;
  selected: boolean;
  canJoin: boolean;
  waitlist: boolean;
  onSelect: () => void;
  onJoin: () => void;
}) {
  const { product, capacity } = offer;
  const benefits = getOfferBenefits(product);
  const soldOut = capacity.soldOut;
  const ctaLabel = soldOut
    ? "SOLD OUT"
    : waitlist
      ? `Join waitlist · $${product.price}`
      : `Join for $${product.price.toLocaleString()}`;

  return (
    <article
      className={`rounded-[1.5rem] border bg-white p-4 shadow-meuse-chip transition-colors ${
        selected ? "border-pink-300" : "border-zinc-100"
      }`}
    >
      <button type="button" onClick={onSelect} className="w-full text-left">
        <ExperienceCategoryPill category={product.category} />
        <h3 className="mt-2 text-base font-semibold text-zinc-900">
          {product.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
          {product.description}
        </p>
      </button>

      {benefits.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-zinc-500">You’ll get to:</p>
          <ul className="mt-1.5 space-y-1">
            {benefits.map((benefit) => (
              <li key={benefit} className="text-sm text-zinc-600">
                ✓ {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-lg font-bold text-zinc-900">
          ${product.price.toLocaleString()}
        </p>
        {capacity.label && (
          <p
            className={`text-sm font-medium ${
              capacity.tone === "urgent" || capacity.tone === "soldout"
                ? "text-pink-600"
                : capacity.tone === "limited"
                  ? "text-zinc-700"
                  : "text-zinc-500"
            }`}
          >
            {capacity.label}
          </p>
        )}
      </div>

      {capacity.total !== "unlimited" && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <div
            className={`h-full rounded-full ${
              capacity.soldOut ? "bg-zinc-300" : "meuse-gradient-bg"
            }`}
            style={{ width: `${capacity.percentFilled}%` }}
          />
        </div>
      )}

      <button
        type="button"
        disabled={!canJoin || soldOut}
        onClick={onJoin}
        className={`mt-4 w-full rounded-full py-3 text-sm font-semibold transition-all ${
          !canJoin || soldOut
            ? "cursor-not-allowed bg-zinc-100 text-zinc-400"
            : "text-white meuse-gradient-bg shadow-md shadow-pink-200/50"
        }`}
      >
        {canJoin ? ctaLabel : "Preview only"}
      </button>
    </article>
  );
}
