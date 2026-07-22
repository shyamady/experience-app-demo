"use client";

import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DevicePreviewTabs } from "@/components/product-editor/DevicePreviewTabs";
import { LiveProductPreview } from "@/components/product-editor/LiveProductPreview";
import { ProductEditorForm } from "@/components/product-editor/ProductEditorForm";
import { ProductStatusChip } from "@/components/product-editor/ProductStatusChip";
import { PurchaseSummaryPreview } from "@/components/product-editor/PurchaseSummaryPreview";
import { StickySaveBar } from "@/components/product-editor/StickySaveBar";
import { getDefaultEditableProduct } from "@/lib/product-editor/defaults";
import type { EditableProduct, PreviewMode } from "@/lib/product-editor/types";
import { toPreviewProduct } from "@/lib/product-editor/types";

type EditProductScreenProps = {
  productId: string;
};

export function EditProductScreen({ productId }: EditProductScreenProps) {
  const initialRef = useRef(
    JSON.stringify(getDefaultEditableProduct(productId)),
  );
  const [product, setProduct] = useState<EditableProduct>(() =>
    getDefaultEditableProduct(productId),
  );
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const previewProduct = useMemo(() => toPreviewProduct(product), [product]);

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(product) !== initialRef.current,
    [product],
  );

  const handleChange = useCallback((updates: Partial<EditableProduct>) => {
    setProduct((current) => ({ ...current, ...updates }));
  }, []);

  const handleSaveDraft = useCallback(() => {
    initialRef.current = JSON.stringify(product);
    setProduct((current) => ({ ...current, status: "draft" }));
  }, [product]);

  const handlePublish = useCallback(() => {
    initialRef.current = JSON.stringify(product);
    setProduct((current) => ({ ...current, status: "published" }));
  }, [product]);

  const previewPanel = (
  <div className="space-y-4">
      <DevicePreviewTabs value={previewMode} onChange={setPreviewMode} />
      <LiveProductPreview
        product={previewProduct}
        experienceTitle={product.experienceTitle}
        creatorName={product.creatorName}
        creatorAvatarUrl={product.creatorAvatarUrl}
        previewMode={previewMode}
      />
      <PurchaseSummaryPreview product={previewProduct} />
    </div>
  );

  return (
    <DashboardShell
      title="Edit Product"
      subtitle="Update your product and preview how fans will see it."
    >
      <div className="border-b border-pink-50 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/dashboard/products"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
        >
          ← Back to products
        </Link>
      </div>

      <div className="px-4 py-5 pb-28 sm:px-6 sm:py-6 sm:pb-28 lg:px-8 lg:pb-24">
        <div className="mb-5 flex items-center gap-3">
          <ProductStatusChip status={product.status} />
          <span className="text-sm text-zinc-500">Live preview updates as you type</span>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="w-full shrink-0 lg:w-[40%]">
            <div className="rounded-meuse border border-pink-100 bg-white p-5 shadow-meuse-card sm:p-6">
              <ProductEditorForm product={product} onChange={handleChange} />
            </div>
          </div>

          <div className="hidden w-full lg:block lg:w-[60%]">
            <div className="sticky top-6">{previewPanel}</div>
          </div>
        </div>
      </div>

      {mobilePreviewOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-pink-50 px-4 py-3">
              <h2 className="text-base font-semibold text-zinc-900">Preview</h2>
              <button
                type="button"
                onClick={() => setMobilePreviewOpen(false)}
                className="rounded-xl border border-pink-100 px-3 py-1.5 text-sm font-medium text-zinc-600"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{previewPanel}</div>
          </div>
        </div>
      )}

      <StickySaveBar
        hasUnsavedChanges={hasUnsavedChanges}
        onPreview={() => setMobilePreviewOpen(true)}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />
    </DashboardShell>
  );
}
