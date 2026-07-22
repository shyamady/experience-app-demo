import type { PublicExperienceProduct } from "@/lib/experience/types";
import {
  allowsQuantitySelector,
  formatExperiencePrice,
  getMaxQuantity,
} from "@/lib/experience/formatting";

type PurchaseSummaryProps = {
  product: PublicExperienceProduct | null;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onCheckout: () => void;
  variant?: "sidebar" | "mobile";
};

export function PurchaseSummary({
  product,
  quantity,
  onQuantityChange,
  onCheckout,
  variant = "sidebar",
}: PurchaseSummaryProps) {
  const subtotal = product ? product.price * quantity : 0;
  const showQuantity = product ? allowsQuantitySelector(product) : false;
  const isDisabled = !product;
  const maxQuantity = product
    ? getMaxQuantity(product.remainingSpots, product.availabilityKind)
    : 1;

  const content = (
    <>
      <h2 className="text-lg font-semibold text-zinc-900">Your selection</h2>

      {product ? (
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-zinc-900">{product.title}</p>
            <p className="mt-1 text-sm text-pink-600">
              {formatExperiencePrice(product.price, product.priceType)}
            </p>
            {product.remainingSpots !== undefined &&
              product.availabilityKind === "limited" && (
                <p className="mt-1 text-xs text-zinc-500">
                  {product.remainingSpots} spots remaining
                </p>
              )}
          </div>

          {showQuantity && (
            <div>
              <label
                htmlFor={`quantity-${variant}`}
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
                  id={`quantity-${variant}`}
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

          <div className="border-t border-pink-50 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Subtotal</span>
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
        </div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">
          Select an experience to see your summary.
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
    </>
  );

  if (variant === "mobile") {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm lg:hidden">
        {product && (
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900">
                {product.title}
              </p>
              <p className="text-sm font-semibold text-pink-600">
                {formatExperiencePrice(subtotal, product.priceType)}
              </p>
            </div>
            {showQuantity && (
              <div className="flex items-center gap-2">
                <QuantityButton
                  label="Decrease quantity"
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </QuantityButton>
                <span className="min-w-6 text-center text-sm font-semibold">
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

  return (
    <aside className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card">
      {content}
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
