import type { PublicExperienceProduct } from "@/lib/experience/types";
import {
  formatExperiencePrice,
  getAccessBadgeStyles,
} from "@/lib/experience/formatting";

type ExperienceProductCardProps = {
  product: PublicExperienceProduct;
  selected: boolean;
  onSelect: () => void;
};

export function ExperienceProductCard({
  product,
  selected,
  onSelect,
}: ExperienceProductCardProps) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-meuse border bg-white transition-all ${
        selected
          ? "border-pink-400 shadow-[0_0_0_1px_rgba(244,114,182,0.35),0_12px_40px_rgba(219,39,119,0.12)]"
          : "border-pink-100 shadow-meuse-card hover:border-pink-200"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-meuse-hint">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide shadow-sm ${getAccessBadgeStyles(product.accessBadge)}`}
        >
          {product.accessBadge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-semibold text-zinc-900">{product.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          {product.description}
        </p>

        <ul className="mt-3 space-y-1.5">
          {product.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-zinc-600"
            >
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-pink-50 pt-4">
          <div>
            <p className="text-lg font-bold text-zinc-900">
              {formatExperiencePrice(product.price, product.priceType)}
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">
              {product.availabilityLabel}
              {product.remainingSpots !== undefined &&
                product.availabilityKind === "limited" && (
                  <span className="text-pink-600">
                    {" "}
                    · {product.remainingSpots} remaining
                  </span>
                )}
            </p>
          </div>

          <button
            type="button"
            onClick={onSelect}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              selected
                ? "bg-pink-600 text-white shadow-md shadow-pink-200/60"
                : "border border-pink-200 bg-white text-pink-700 hover:bg-rose-50"
            }`}
          >
            {selected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </article>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
