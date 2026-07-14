import {
  estimateEarnings,
  formatCurrency,
  type ExperienceProduct,
} from "@/lib/onboarding/experiences";

type EstimatedEarningsCardProps = {
  products: ExperienceProduct[];
  estimatedRevenue?: string;
};

export function EstimatedEarningsCard({
  products,
  estimatedRevenue,
}: EstimatedEarningsCardProps) {
  const { min, max } = estimateEarnings(products);

  return (
    <div className="rounded-meuse bg-meuse-bubble px-5 py-4 shadow-meuse-card sm:px-6">
      <p className="text-sm font-medium text-zinc-500">Estimated earnings</p>
      <p className="mt-1 text-2xl font-bold text-zinc-900">
        {estimatedRevenue ?? `${formatCurrency(min)} – ${formatCurrency(max)}`}
      </p>
      <p className="mt-1 text-xs text-zinc-400">
        Potential per launch based on your current products.
      </p>
    </div>
  );
}
