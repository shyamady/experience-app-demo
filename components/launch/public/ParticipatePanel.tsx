import { PublicTicketCard } from "@/components/launch/public/PublicTicketCard";
import type { PublicOffer } from "@/lib/launch/public-view";

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
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
        Choose your way in
      </h2>
      <p className="mt-1 text-sm text-zinc-500">
        Real ways to be part of this Launch — not generic tickets.
      </p>

      <div className="mt-5 space-y-5">
        {offers.map((offer) => (
          <PublicTicketCard
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
