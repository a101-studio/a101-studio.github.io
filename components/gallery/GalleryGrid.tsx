"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { GalleryImage, PillarId } from "@/lib/pillars";

const CENTER_INDEX = 4;

type GalleryGridProps = {
  images: GalleryImage[];
  gradeClass: string;
  pillarId: PillarId;
  onOpen: (index: number) => void;
};

export function GalleryGrid({
  images,
  gradeClass,
  pillarId,
  onOpen,
}: GalleryGridProps) {
  return (
    <ul className="gallery-glass">
      {images.map((image, index) => {
        const isCenter = index === CENTER_INDEX;

        return (
          <li
            key={image.id}
            className="min-h-0 min-w-0 overflow-hidden"
            style={
              isCenter
                ? { viewTransitionName: `pillar-${pillarId}` }
                : undefined
            }
          >
            <GalleryCard
              image={image}
              gradeClass={gradeClass}
              onOpen={() => onOpen(index)}
            />
          </li>
        );
      })}
    </ul>
  );
}

function GalleryCard({
  image,
  gradeClass,
  onOpen,
}: {
  image: GalleryImage;
  gradeClass: string;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block h-full w-full overflow-hidden bg-background"
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
          loading="eager"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            "relative h-full w-full object-cover transition-[opacity,transform] duration-500",
            "group-hover:scale-[1.035]",
            gradeClass,
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </picture>
      <span className="glass-sheen pointer-events-none absolute inset-0" />
      <span className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/5" />
    </button>
  );
}
