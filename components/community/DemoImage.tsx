"use client";

import { useState, type MouseEventHandler } from "react";

type DemoImageProps = {
  src: string;
  alt?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
};

export function DemoImage({ src, alt = "", className, onClick }: DemoImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className={`bg-zinc-100 ${className ?? ""}`} aria-hidden />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onClick={onClick}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
