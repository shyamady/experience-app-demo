"use client";

import { useEffect } from "react";
import { DemoImage } from "@/components/community/DemoImage";

type ImageViewerProps = {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function ImageViewer({
  images,
  index,
  onClose,
  onIndexChange,
}: ImageViewerProps) {
  const current = images[index];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && index < images.length - 1) {
        onIndexChange(index + 1);
      }
      if (event.key === "ArrowLeft" && index > 0) {
        onIndexChange(index - 1);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, index, onClose, onIndexChange]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-zinc-950/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo"
    >
      <button
        type="button"
        className="absolute top-4 right-4 text-sm font-medium text-white/80"
        onClick={onClose}
      >
        Close
      </button>
      <DemoImage
        src={current}
        className="max-h-[88dvh] max-w-full rounded-2xl object-contain"
        onClick={(event) => event.stopPropagation()}
      />
      {images.length > 1 && (
        <p className="absolute bottom-5 text-xs text-white/70">
          {index + 1} / {images.length}
        </p>
      )}
    </div>
  );
}
