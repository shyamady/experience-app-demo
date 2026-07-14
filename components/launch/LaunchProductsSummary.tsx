import type { ExperienceProduct } from "@/lib/onboarding/experiences";
import { ExperienceCategoryPill } from "@/components/experiences/ExperienceCategoryPill";

type LaunchProductsSummaryProps = {
  products: ExperienceProduct[];
};

export function LaunchProductsSummary({ products }: LaunchProductsSummaryProps) {
  const participation = products.filter(
    (product) => product.category !== "SPONSOR",
  );
  const sponsors = products.filter((product) => product.category === "SPONSOR");

  return (
    <div className="space-y-4">
      {participation.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-zinc-900">
            Generated products
          </h3>
          <div className="space-y-2">
            {participation.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {sponsors.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-zinc-900">
            Sponsor tiers
          </h3>
          <div className="space-y-2">
            {sponsors.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductRow({ product }: { product: ExperienceProduct }) {
  return (
    <div
      className={`flex items-center justify-between rounded-meuse-sm border border-pink-50 px-3 py-2.5 ${
        product.active ? "bg-white" : "bg-zinc-50 opacity-60"
      }`}
    >
      <div className="min-w-0 flex-1">
        <ExperienceCategoryPill category={product.category} />
        <p className="mt-1 truncate text-sm font-medium text-zinc-900">
          {product.title}
        </p>
      </div>
      <div className="ml-3 shrink-0 text-right text-xs text-zinc-500">
        <p className="font-semibold text-zinc-800">
          ${product.price.toLocaleString()}
        </p>
        <p>
          {product.spots === "unlimited" ? "Unlimited" : `${product.spots} spots`}
        </p>
      </div>
    </div>
  );
}
