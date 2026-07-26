import type {
  ExperienceSessionDate,
  ProductInventory,
  PublicExperienceProduct,
} from "@/lib/experience/types";
import {
  formatExperiencePrice,
  getMaxQuantity,
  allowsQuantitySelector,
} from "@/lib/experience/formatting";

type MobileCheckoutBarProps = {
  product: PublicExperienceProduct | null;
  session: ExperienceSessionDate | null;
  inventory: ProductInventory | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onCheckout: () => void;
};

export function MobileCheckoutBar({
  product,
  session,
  inventory,
  quantity,
  onQuantityChange,
  onCheckout,
}: MobileCheckoutBarProps) {
  const subtotal = product ? product.price * quantity : 0;
  const showQuantity = inventory ? allowsQuantitySelector(inventory) : false;
  const isDisabled = !product || !session || !inventory || inventory.soldOut;
  const maxQuantity =
    product && inventory
      ? getMaxQuantity(inventory.remaining, product.availabilityKind)
      : 1;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
      {(session || product) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            {session && (
              <p className="truncate text-xs text-zinc-500">
                {session.displayDate} · {session.time} {session.timezone}
              </p>
            )}
            <p className="truncate text-sm font-medium text-zinc-900">
              {product?.title ?? "Select a ticket"}
            </p>
            {product && (
              <p className="text-sm font-semibold text-pink-600">
                {formatExperiencePrice(subtotal, product.priceType)}
              </p>
            )}
          </div>
          {showQuantity && product && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-pink-100 text-zinc-700 disabled:opacity-40"
              >
                −
              </button>
              <span className="min-w-6 text-center text-sm font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() =>
                  onQuantityChange(Math.min(maxQuantity, quantity + 1))
                }
                disabled={quantity >= maxQuantity}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-pink-100 text-zinc-700 disabled:opacity-40"
              >
                +
              </button>
            </div>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={onCheckout}
        disabled={isDisabled}
        className={`w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
          isDisabled
            ? "cursor-not-allowed bg-zinc-200 text-zinc-400"
            : "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50"
        }`}
      >
        Continue to Checkout
      </button>
    </div>
  );
}
