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
    <main className="gallery-page min-h-svh bg-background px-5 py-6 md:px-10 md:py-8">
      <header className="mb-10 flex items-end justify-between gap-6">
        <Logo withBack />
        <div className="text-right">
          <h1 className="font-display text-2xl md:text-3xl">{pillar.title}</h1>
          <p className="mt-1 text-[11px] tracking-[0.22em] uppercase text-white/45">
            {pillar.tagline}
          </p>
        </div>
      </header>
      <GalleryGrid
        images={pillar.images}
        gradeClass={pillar.grade}
        onOpen={setOpenIndex}
      />
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
