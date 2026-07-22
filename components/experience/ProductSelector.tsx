import { ExperienceProductCard } from "@/components/experience/ExperienceProductCard";
import type { PublicExperienceProduct } from "@/lib/experience/types";

type ProductSelectorProps = {
  products: PublicExperienceProduct[];
  selectedProductId: string | null;
  onSelect: (productId: string) => void;
};

export function ProductSelector({
  products,
  selectedProductId,
  onSelect,
}: ProductSelectorProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
          Choose Your Experience
        </h2>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Select one access level to continue. You can change your selection
          before checkout.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <ExperienceProductCard
            key={product.id}
            product={product}
            selected={selectedProductId === product.id}
            onSelect={() => onSelect(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
