import type { PublicExperienceProduct } from "@/lib/experience/types";
import { formatExperiencePrice } from "@/lib/experience/formatting";

type PurchaseSummaryPreviewProps = {
  product: PublicExperienceProduct;
};

export function PurchaseSummaryPreview({ product }: PurchaseSummaryPreviewProps) {
  return (
    <aside className="mt-5 rounded-meuse border border-pink-100 bg-white p-4 shadow-meuse-card sm:p-5">
      <h3 className="text-sm font-semibold text-zinc-900">Purchase summary</h3>
      <div className="mt-3 space-y-2 text-sm">
        <Row label="Selected product" value={product.title} />
        <Row
          label="Price"
          value={formatExperiencePrice(product.price, product.priceType)}
        />
        <Row label="Quantity" value="1" />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-pink-50 pt-3">
        <span className="text-sm text-zinc-500">Total</span>
        <span className="meuse-product-price text-base font-bold text-zinc-900 transition-all duration-300">
          {formatExperiencePrice(product.price, product.priceType)}
        </span>
      </div>
      <button
        type="button"
        disabled
        className="mt-4 w-full cursor-default rounded-full py-3 text-sm font-semibold text-white meuse-gradient-bg shadow-md shadow-pink-200/50 transition-transform hover:scale-[1.01]"
      >
        Continue to Checkout
      </button>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right font-medium text-zinc-800">{value}</span>
    </div>
  );
}
