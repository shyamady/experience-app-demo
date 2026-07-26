import type {
  ExperienceSessionDate,
  ProductInventory,
  PublicExperienceProduct,
} from "@/lib/experience/types";
import {
  allowsQuantitySelector,
  formatExperiencePrice,
  getInventoryStatusDisplay,
  getMaxQuantity,
} from "@/lib/experience/formatting";

type PurchaseSummaryProps = {
  product: PublicExperienceProduct | null;
  session: ExperienceSessionDate | null;
  inventory: ProductInventory | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onCheckout: () => void;
  availabilityWarning?: string | null;
};

export function PurchaseSummary({
  product,
  session,
  inventory,
  quantity,
  onQuantityChange,
  onCheckout,
  availabilityWarning = null,
}: PurchaseSummaryProps) {
  const subtotal = product ? product.price * quantity : 0;
  const showQuantity = inventory ? allowsQuantitySelector(inventory) : false;
  const isDisabled = !product || !session || !inventory || inventory.soldOut;
  const maxQuantity =
    product && inventory
      ? getMaxQuantity(inventory.remaining, product.availabilityKind)
      : 1;
  const availabilityLabel = inventory
    ? getInventoryStatusDisplay(inventory).label
    : null;

  return (
    <aside className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card">
      <h2 className="text-lg font-semibold text-zinc-900">Your selection</h2>

      {session || product ? (
        <div className="mt-4 space-y-4">
          {session && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Date
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-900">
                {session.displayDate}
              </p>
              <p className="text-xs text-zinc-500">
                {session.time} {session.timezone}
              </p>
            </div>
          )}

          {product ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Ticket
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-900">
                {product.title}
              </p>
              <p className="mt-1 text-sm text-pink-600">
                {formatExperiencePrice(product.price, product.priceType)}
              </p>
              {availabilityLabel && (
                <p className="mt-1 text-xs text-zinc-500">{availabilityLabel}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              Select a ticket for this date.
            </p>
          )}

          {availabilityWarning && (
            <p className="rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
              {availabilityWarning}
            </p>
          )}

          {showQuantity && product && (
            <div>
              <label
                htmlFor="quantity-sidebar"
                className="text-xs font-medium uppercase tracking-wide text-zinc-500"
              >
                Quantity
              </label>
              <div className="mt-2 flex items-center gap-2">
                <QuantityButton
                  label="Decrease quantity"
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </QuantityButton>
                <span
                  id="quantity-sidebar"
                  className="min-w-8 text-center text-sm font-semibold text-zinc-900"
                >
                  {quantity}
                </span>
                <QuantityButton
                  label="Increase quantity"
                  onClick={() =>
                    onQuantityChange(Math.min(maxQuantity, quantity + 1))
                  }
                  disabled={quantity >= maxQuantity}
                >
                  +
                </QuantityButton>
              </div>
            </div>
          )}

          {product && (
            <div className="border-t border-pink-50 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Total</span>
                <span className="font-semibold text-zinc-900">
                  {formatExperiencePrice(subtotal, product.priceType)}
                </span>
              </div>
              {product.priceType === "monthly" && (
                <p className="mt-1 text-right text-xs text-zinc-500">
                  Billed monthly. Cancel anytime.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">
          Choose a date and ticket to continue.
        </p>
      )}

      <button
        type="button"
        onClick={onCheckout}
        disabled={isDisabled}
        className={`mt-6 w-full rounded-full py-3.5 text-sm font-semibold transition-all ${
          isDisabled
            ? "cursor-not-allowed bg-zinc-200 text-zinc-400"
            : "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50 hover:scale-[1.01]"
        }`}
      >
        Continue to Checkout
      </button>
    </aside>
  );
}

function QuantityButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-pink-100 text-zinc-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
