"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/motion";
import type { GalleryImage } from "@/lib/pillars";

type GalleryGridProps = {
  images: GalleryImage[];
  gradeClass: string;
  onOpen: (index: number) => void;
};

export function GalleryGrid({ images, gradeClass, onOpen }: GalleryGridProps) {
  const reduced = useReducedMotion();

  return (
    <ul className="grid grid-cols-3 gap-4 md:gap-6">
      {images.map((image, index) => (
        <li
          key={image.id}
          className="gallery-card"
          style={reduced ? undefined : { animationDelay: `${index * 40}ms` }}
        >
          <GalleryCard
            image={image}
            eager={index < 3}
            gradeClass={gradeClass}
            onOpen={() => onOpen(index)}
          />
        </li>
      ))}
    </ul>
  );
}

function GalleryCard({
  image,
  eager,
  gradeClass,
  onOpen,
}: {
  image: GalleryImage;
  eager: boolean;
  gradeClass: string;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[4/5] w-full overflow-hidden bg-white/5"
      aria-label={image.alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.blurSrc}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-md"
      />
      <picture>
        <source type="image/webp" srcSet={image.srcset} sizes={image.sizes} />
        <img
          src={image.fallback}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            "relative h-full w-full object-cover transition-opacity duration-500",
            gradeClass,
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </picture>
      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
    </button>
  );
}
