"use client";

import { useState } from "react";
import { DemoImage } from "@/components/community/DemoImage";
import { ImageViewer } from "@/components/community/ImageViewer";

type PostMediaProps = {
  images: string[];
  compact?: boolean;
};

export function PostMedia({ images, compact = false }: PostMediaProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const rounded = compact ? "rounded-xl" : "rounded-2xl";

  return (
    <>
      {images.length === 1 && (
        <button
          type="button"
          onClick={() => setViewerIndex(0)}
          className={`mt-3 block w-full overflow-hidden ${rounded}`}
        >
          <DemoImage
            src={images[0]}
            className={`w-full object-cover ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}
          />
        </button>
      )}

      {images.length === 2 && (
        <div className={`mt-3 grid grid-cols-2 gap-1.5 ${rounded} overflow-hidden`}>
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setViewerIndex(index)}
              className="overflow-hidden"
            >
              <DemoImage src={src} className="aspect-[4/3] w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {images.length >= 3 && (
        <div className={`mt-3 grid grid-cols-3 gap-1 ${rounded} overflow-hidden`}>
          {images.slice(0, 6).map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setViewerIndex(index)}
              className="overflow-hidden"
            >
              <DemoImage src={src} className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {viewerIndex !== null && (
        <ImageViewer
          images={images}
          index={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onIndexChange={setViewerIndex}
        />
      )}
    </>
  );
}
