import { TicketProductCard } from "@/components/experience/TicketProductCard";
import type {
  ExperienceSessionDate,
  PublicExperienceProduct,
} from "@/lib/experience/types";

type ProductSelectorProps = {
  products: PublicExperienceProduct[];
  session: ExperienceSessionDate | null;
  selectedProductId: string | null;
  onSelect: (productId: string) => void;
  isRefreshing?: boolean;
  confirmationMessage?: string | null;
  availabilityWarning?: string | null;
};

export function ProductSelector({
  products,
  session,
  selectedProductId,
  onSelect,
  isRefreshing = false,
  confirmationMessage = null,
  availabilityWarning = null,
}: ProductSelectorProps) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
          Choose Your Ticket
        </h2>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          {session
            ? "Inventory below is for your selected session only."
            : "Select a session first to see ticket availability."}
        </p>
      </div>

      {isRefreshing ? (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-meuse-hint px-4 py-3 text-sm font-medium text-pink-700">
          <span
            className="h-2 w-2 rounded-full bg-pink-500 meuse-session-status-pulse"
            aria-hidden="true"
          />
          Updating ticket availability…
        </div>
      ) : confirmationMessage ? (
        <div
          key={confirmationMessage}
          className="meuse-session-inventory-ready mb-4 rounded-xl border border-pink-100 bg-rose-50/80 px-4 py-3 text-sm font-medium text-pink-800"
        >
          {confirmationMessage}
        </div>
      ) : null}

      {availabilityWarning && !isRefreshing && (
        <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {availabilityWarning}
        </div>
      )}

      <div
        key={session?.id ?? "no-session"}
        className={`space-y-4 ${
          isRefreshing
            ? "meuse-session-inventory-refreshing"
            : "meuse-session-inventory-ready"
        }`}
      >
        {products.map((product) => {
          const inventory = session?.products[product.id] ?? {
            remaining: 0,
            soldOut: true,
          };

          return (
            <TicketProductCard
              key={`${session?.id ?? "none"}-${product.id}`}
              product={product}
              inventory={inventory}
              selected={selectedProductId === product.id}
              onSelect={() => onSelect(product.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
