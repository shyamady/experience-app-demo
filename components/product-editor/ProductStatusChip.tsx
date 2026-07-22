import type { ProductPublishStatus } from "@/lib/product-editor/types";

const STATUS_STYLES: Record<ProductPublishStatus, string> = {
  draft: "bg-amber-50 text-amber-700 ring-amber-600/20",
  published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  hidden: "bg-zinc-100 text-zinc-600 ring-zinc-500/10",
};

export function ProductStatusChip({ status }: { status: ProductPublishStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
