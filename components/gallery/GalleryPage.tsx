"use client";

import { useState } from "react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Lightbox } from "@/components/gallery/Lightbox";
import { Logo } from "@/components/shared/Logo";
import { getPillar, type PillarId } from "@/lib/pillars";

type GalleryPageProps = {
  pillarId: PillarId;
};

export function GalleryPage({ pillarId }: GalleryPageProps) {
  const pillar = getPillar(pillarId);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="gallery-page relative bg-background">
      <GalleryGrid
        images={pillar.images}
        gradeClass={pillar.grade}
        pillarId={pillar.id}
        onOpen={setOpenIndex}
      />
      <Logo
        withBack
        className="absolute top-4 left-4 z-40 text-white/85 drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.55)]"
      />
      <p className="pointer-events-none absolute top-4 right-4 z-40 text-right">
        <span className="block font-display text-lg leading-none text-white/90 drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.55)] md:text-xl">
          {pillar.title}
        </span>
        <span className="mt-1 block text-[10px] tracking-[0.22em] uppercase text-white/60">
          {pillar.tagline}
        </span>
      </p>
      {openIndex != null ? (
        <Lightbox
          images={pillar.images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      ) : null}
    </main>
  );
}
