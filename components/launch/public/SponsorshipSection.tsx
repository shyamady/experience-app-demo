import { PublicTicketCard } from "@/components/launch/public/PublicTicketCard";
import type { PublicOffer } from "@/lib/launch/public-view";

type SponsorshipSectionProps = {
  offers: PublicOffer[];
  canJoin: boolean;
  onJoin: (id: string) => void;
};

export function SponsorshipSection({
  offers,
  canJoin,
  onJoin,
}: SponsorshipSectionProps) {
  if (offers.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
        Sponsor opportunities
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Brands and partners who want to help bring this to life.
      </p>

      <div className="mt-5 space-y-5">
        {offers.map((offer) => (
          <PublicTicketCard
            key={offer.product.id}
            offer={offer}
            canJoin={canJoin}
            sponsor
            onJoin={() => onJoin(offer.product.id)}
          />
        ))}
      </div>
    </section>
  );
}
