import type { ProductInventory } from "@/lib/experience/types";
import { getInventoryStatusDisplay } from "@/lib/experience/formatting";

type ProductInventoryStatusProps = {
  inventory: ProductInventory;
  className?: string;
};

export function ProductInventoryStatus({
  inventory,
  className = "",
}: ProductInventoryStatusProps) {
  const status = getInventoryStatusDisplay(inventory);

  const valueClass =
    status.tone === "sold-out"
      ? "text-zinc-400"
      : status.tone === "urgent"
        ? "text-pink-600"
        : "text-pink-600";

  return (
    <div className={className}>
      <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-zinc-400">
        AVAILABILITY
      </p>
      <p className={`mt-1 text-lg font-bold ${valueClass}`}>{status.label}</p>
      {status.urgency && (
        <p className="mt-0.5 text-[0.625rem] font-bold tracking-[0.1em] text-pink-500">
          {status.urgency}
        </p>
      )}
    </div>
  );
}
