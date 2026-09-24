"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import type { GalleryImage } from "@/lib/pillars";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const image = images[index];
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const preload = (src: string) => {
      const pre = new window.Image();
      pre.src = src;
    };
    const last = images.length;
    preload(images[(index + 1) % last].src);
    preload(images[(index - 1 + last) % last].src);
  }, [images, index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (event.key === "ArrowLeft") {
        onIndexChange((index - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, index, onClose, onIndexChange]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute top-5 right-5 text-[11px] tracking-[0.24em] uppercase text-white/70 hover:text-white"
        onClick={onClose}
      >
        Close
      </button>
      <button
        type="button"
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 px-3 py-6 text-white/70 hover:text-white md:left-6"
        onClick={(event) => {
          event.stopPropagation();
          onIndexChange((index - 1 + images.length) % images.length);
        }}
      >
        ←
      </button>
      <figure
        className="lightbox-frame relative mx-8 max-h-[88svh] w-full max-w-3xl"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          startX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (startX.current == null) return;
          const dx = (event.changedTouches[0]?.clientX ?? startX.current) - startX.current;
          if (dx > 50) onIndexChange((index - 1 + images.length) % images.length);
          if (dx < -50) onIndexChange((index + 1) % images.length);
          startX.current = null;
        }}
      >
        <picture>
          <source type="image/webp" srcSet={image.srcset} sizes="90vw" />
          <img
            src={image.fallback}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={cn(
              "mx-auto max-h-[88svh] w-auto object-contain",
              "aspect-[4/5]",
            )}
          />
        </picture>
      </figure>
      <button
        type="button"
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 px-3 py-6 text-white/70 hover:text-white md:right-6"
        onClick={(event) => {
          event.stopPropagation();
          onIndexChange((index + 1) % images.length);
        }}
      >
        →
      </button>
    </div>
  );
}
