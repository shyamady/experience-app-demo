import { SparkleIcon } from "@/components/icons/SparkleIcon";
import { ProductInventoryStatus } from "@/components/experience/ProductInventoryStatus";
import type {
  ProductInventory,
  PublicExperienceProduct,
} from "@/lib/experience/types";
import {
  formatExperiencePrice,
  getAccessBadgeStyles,
} from "@/lib/experience/formatting";
import { formatPassId } from "@/lib/onboarding/pass-card";

type TicketProductCardProps = {
  product: PublicExperienceProduct;
  inventory: ProductInventory;
  selected: boolean;
  onSelect: () => void;
};

export function TicketProductCard({
  product,
  inventory,
  selected,
  onSelect,
}: TicketProductCardProps) {
  const soldOut = inventory.soldOut;
  const includes = product.includes.join(", ");
  const passId = formatPassId(product.id);

  return (
    <div
      className={`meuse-pass-card transition-all duration-300 ${
        soldOut
          ? "opacity-60 grayscale-[0.3]"
          : selected
            ? "hover:-translate-y-0.5"
            : "hover:-translate-y-0.5"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[28px] ${
          selected && !soldOut
            ? "ring-2 ring-pink-400 ring-offset-2 ring-offset-white"
            : ""
        }`}
      >
        <TicketNotches />

        <div className="flex flex-col lg:flex-row">
          <div className="flex min-h-0 flex-1 flex-col justify-center p-3.5 pb-4 sm:p-4 lg:min-h-[15.5rem]">
            <div className="flex h-full items-center gap-3 sm:gap-4">
              <div className="meuse-pass-shimmer relative aspect-square h-[8.5rem] w-[8.5rem] shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-40 sm:rounded-2xl lg:h-44 lg:w-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[0.5625rem] font-bold tracking-[0.08em] shadow-meuse-chip backdrop-blur-sm sm:gap-1.5 sm:px-2 sm:py-1 sm:text-[0.625rem] sm:tracking-[0.12em] ${getAccessBadgeStyles(product.accessBadge)}`}
                  >
                    <DiamondIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {product.accessBadge}
                  </span>
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <div className="flex items-start gap-1.5">
                  <h3 className="text-base font-bold tracking-tight text-zinc-900 sm:text-lg">
                    {product.title}
                  </h3>
                  <SparkleIcon className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                </div>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-zinc-500 sm:line-clamp-4">
                  {product.description}
                </p>

                <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-rose-50/90 px-2.5 py-2 sm:mt-3 sm:gap-2.5 sm:rounded-2xl sm:px-3.5 sm:py-2.5">
                  <ShieldStarIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pink-500 sm:h-4 sm:w-4" />
                  <p className="line-clamp-2 text-[0.6875rem] leading-relaxed text-zinc-600 sm:text-xs sm:text-[0.8125rem]">
                    <span className="font-semibold text-zinc-800">Includes:</span>{" "}
                    {includes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex shrink-0 flex-col lg:w-[11.5rem]">
            <div className="meuse-pass-perforation-x mx-5 h-px lg:hidden" />
            <div className="meuse-pass-perforation-y absolute top-5 bottom-5 left-0 hidden w-px lg:block" />

            <TicketStubNotches />

            <div className="flex flex-1 flex-col justify-between gap-4 px-5 py-4 lg:pl-6 lg:pr-5">
              <div className="space-y-4">
                <div>
                  <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-zinc-400">
                    INVESTMENT
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
                    {formatExperiencePrice(product.price, product.priceType)}
                  </p>
                </div>

                <div className="border-t border-dashed border-pink-100 pt-3">
                  <ProductInventoryStatus inventory={inventory} />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onSelect}
                  disabled={soldOut}
                  className={`inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-transform ${
                    soldOut
                      ? "cursor-not-allowed bg-zinc-200 text-zinc-400"
                      : selected
                        ? "bg-pink-600 text-white shadow-lg shadow-pink-200/50"
                        : "text-white meuse-gradient-bg shadow-lg shadow-pink-200/50 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {soldOut ? "Sold Out" : selected ? "Selected" : "Select"}
                </button>

                <div>
                  <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-zinc-400">
                    PASS ID
                  </p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-pink-500">
                    {passId}
                  </p>
                  <div
                    className="meuse-pass-barcode mt-2 w-full"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketNotches() {
  return (
    <>
      <span className="meuse-pass-notch top-1/2 -left-[9px] hidden -translate-y-1/2 lg:block" />
      <span className="meuse-pass-notch top-1/2 -right-[9px] hidden -translate-y-1/2 lg:block" />
      <span className="meuse-pass-notch left-1/2 -top-[9px] -translate-x-1/2 lg:hidden" />
      <span className="meuse-pass-notch left-1/2 -bottom-[9px] -translate-x-1/2 lg:hidden" />
    </>
  );
}

function TicketStubNotches() {
  return (
    <>
      <span className="meuse-pass-notch top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 lg:block" />
      <span className="meuse-pass-notch bottom-0 left-0 hidden -translate-x-1/2 translate-y-1/2 lg:block" />
    </>
  );
}

function DiamondIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5 3.8 9.2 12 21.5l8.2-12.3L12 2.5Zm0 2.7 5.2 4.3H6.8L12 5.2Z" />
    </svg>
  );
}

function ShieldStarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 5 6v5c0 4.5 2.9 7.8 7 9 4.1-1.2 7-4.5 7-9V6l-7-3Z" />
      <path d="m12 8.5.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 10.6l2-.3L12 8.5Z" />
    </svg>
  );
}
