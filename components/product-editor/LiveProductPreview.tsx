import type { PublicExperienceProduct } from "@/lib/experience/types";
import {
  formatExperiencePrice,
  getAccessBadgeStyles,
} from "@/lib/experience/formatting";
import type { PreviewMode } from "@/lib/product-editor/types";

type LiveProductPreviewProps = {
  product: PublicExperienceProduct;
  experienceTitle: string;
  creatorName: string;
  creatorAvatarUrl: string;
  previewMode: PreviewMode;
};

export function LiveProductPreview({
  product,
  experienceTitle,
  creatorName,
  creatorAvatarUrl,
  previewMode,
}: LiveProductPreviewProps) {
  const includes =
    product.includes.length > 0 ? product.includes : ["Add included items"];

  return (
    <div className="meuse-preview-fade">
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-pink-100 bg-rose-50/60 px-3 py-2">
        <span className="text-sm">👁</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-pink-600">
            Preview
          </p>
          <p className="text-xs text-zinc-600">
            This is how attendees will see your product.
          </p>
        </div>
      </div>

      <div
        className={`meuse-preview-fade rounded-meuse p-3 transition-colors duration-500 sm:p-4 ${
          previewMode === "dark"
            ? "bg-zinc-900"
            : "bg-gradient-to-br from-meuse-hint/40 to-white"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            previewMode === "mobile" ? "max-w-[340px]" : "max-w-full"
          }`}
        >
          <p
            className={`mb-3 text-center text-xs font-medium ${
              previewMode === "dark" ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            {experienceTitle}
          </p>

          <article className="meuse-preview-card overflow-hidden rounded-meuse border border-pink-100 bg-white shadow-meuse-card transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(219,39,119,0.12)]">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-meuse-hint">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={product.imageUrl}
                src={product.imageUrl}
                alt=""
                className="meuse-preview-image h-full w-full object-cover"
              />
              <span
                className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide shadow-sm transition-colors duration-300 ${getAccessBadgeStyles(product.accessBadge)}`}
              >
                {product.accessBadge}
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={creatorAvatarUrl}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <p className="text-xs font-medium text-pink-500">
                    {creatorName}
                  </p>
                  <p className="text-[0.625rem] text-zinc-400">Creator</p>
                </div>
              </div>

              <h3 className="text-base font-semibold text-zinc-900 transition-all duration-300">
                {product.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 transition-all duration-300">
                {product.description}
              </p>

              <div className="mt-4 border-t border-pink-50 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Includes
                </p>
                <ul className="mt-2 space-y-1.5">
                  {includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-zinc-600"
                    >
                      <span className="text-pink-500">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3 border-t border-pink-50 pt-4">
                <div>
                  <p className="meuse-product-price text-lg font-bold text-zinc-900 transition-all duration-300">
                    {formatExperiencePrice(product.price, product.priceType)}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500 transition-all duration-300">
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
              </div>

              <button
                type="button"
                disabled
                className="mt-4 w-full cursor-default rounded-full py-3 text-sm font-semibold text-white meuse-gradient-bg shadow-md shadow-pink-200/50 transition-transform hover:scale-[1.02]"
              >
                Purchase Access
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
