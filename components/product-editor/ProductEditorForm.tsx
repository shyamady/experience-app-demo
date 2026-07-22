import type {
  ProductPublishStatus,
  EditableProduct,
} from "@/lib/product-editor/types";
import { ACCESS_BADGE_OPTIONS } from "@/lib/product-editor/types";
import type {
  AccessBadge,
  AvailabilityKind,
  PriceType,
} from "@/lib/experience/types";

type ProductEditorFormProps = {
  product: EditableProduct;
  onChange: (updates: Partial<EditableProduct>) => void;
};

const fieldClassName =
  "w-full rounded-xl border border-pink-100 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-meuse-chip focus:border-pink-300 focus:outline-none";

const labelClassName = "mb-1.5 block text-xs font-semibold text-zinc-700";

export function ProductEditorForm({ product, onChange }: ProductEditorFormProps) {
  const updateInclude = (index: number, value: string) => {
    const includes = [...product.includes];
    includes[index] = value;
    onChange({ includes });
  };

  const addInclude = () => {
    onChange({ includes: [...product.includes, ""] });
  };

  const removeInclude = (index: number) => {
    onChange({
      includes: product.includes.filter((_, i) => i !== index),
    });
  };

  return (
    <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
      <div>
        <label className={labelClassName}>Publishing status</label>
        <select
          value={product.status}
          onChange={(event) =>
            onChange({ status: event.target.value as ProductPublishStatus })
          }
          className={fieldClassName}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      <div>
        <label className={labelClassName}>Product title</label>
        <input
          type="text"
          value={product.title}
          onChange={(event) => onChange({ title: event.target.value })}
          className={fieldClassName}
          placeholder="Live From the Nashville Studio"
        />
      </div>

      <div>
        <label className={labelClassName}>Description</label>
        <textarea
          value={product.description}
          onChange={(event) => onChange({ description: event.target.value })}
          rows={3}
          className={`${fieldClassName} resize-none`}
          placeholder="Describe what fans get with this product."
        />
      </div>

      <div>
        <label className={labelClassName}>Cover image URL</label>
        <input
          type="url"
          value={product.imageUrl}
          onChange={(event) => onChange({ imageUrl: event.target.value })}
          className={fieldClassName}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className={labelClassName}>Product badge</label>
        <select
          value={product.accessBadge}
          onChange={(event) =>
            onChange({ accessBadge: event.target.value as AccessBadge })
          }
          className={fieldClassName}
        >
          {ACCESS_BADGE_OPTIONS.map((badge) => (
            <option key={badge} value={badge}>
              {badge}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClassName}>Price</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
              $
            </span>
            <input
              type="number"
              min={0}
              value={product.price || ""}
              onChange={(event) =>
                onChange({ price: Number(event.target.value) || 0 })
              }
              className={`${fieldClassName} pl-7`}
            />
          </div>
        </div>
        <div>
          <label className={labelClassName}>Billing</label>
          <select
            value={product.priceType}
            onChange={(event) =>
              onChange({ priceType: event.target.value as PriceType })
            }
            className={fieldClassName}
          >
            <option value="one-time">One-time</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClassName}>Availability</label>
          <select
            value={product.availabilityKind}
            onChange={(event) =>
              onChange({
                availabilityKind: event.target.value as AvailabilityKind,
              })
            }
            className={fieldClassName}
          >
            <option value="unlimited">Unlimited</option>
            <option value="limited">Limited spots</option>
            <option value="open">Open</option>
          </select>
        </div>
        {product.availabilityKind === "limited" && (
          <div>
            <label className={labelClassName}>Spots available</label>
            <input
              type="number"
              min={1}
              value={product.spotCount || ""}
              onChange={(event) =>
                onChange({ spotCount: Number(event.target.value) || 1 })
              }
              className={fieldClassName}
            />
          </div>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className={labelClassName}>What&apos;s included</label>
          <button
            type="button"
            onClick={addInclude}
            className="text-xs font-semibold text-pink-600 hover:text-pink-700"
          >
            + Add item
          </button>
        </div>
        <div className="space-y-2">
          {product.includes.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(event) => updateInclude(index, event.target.value)}
                className={fieldClassName}
                placeholder="e.g. Live session"
              />
              <button
                type="button"
                onClick={() => removeInclude(index)}
                className="shrink-0 rounded-xl border border-pink-100 px-3 text-zinc-400 hover:bg-rose-50 hover:text-pink-600"
                aria-label="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-pink-50 pt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Preview context
        </p>
        <div className="space-y-4">
          <div>
            <label className={labelClassName}>Experience title</label>
            <input
              type="text"
              value={product.experienceTitle}
              onChange={(event) =>
                onChange({ experienceTitle: event.target.value })
              }
              className={fieldClassName}
            />
          </div>
          <div>
            <label className={labelClassName}>Creator name</label>
            <input
              type="text"
              value={product.creatorName}
              onChange={(event) =>
                onChange({ creatorName: event.target.value })
              }
              className={fieldClassName}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
