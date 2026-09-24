"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrainVignette } from "@/components/landing/GrainVignette";
import { PillarPanel } from "@/components/landing/PillarPanel";
import { ViewCursor } from "@/components/landing/ViewCursor";
import { cn } from "@/lib/cn";
import { MOTION_MS, useFinePointer, useReducedMotion } from "@/lib/motion";
import { pillars, type Pillar } from "@/lib/pillars";

export function Triptych() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);

  useEffect(() => {
    pillars.forEach((pillar) => {
      router.prefetch(pillar.href);
    });
  }, [router]);

  const openPillar = (pillar: Pillar) => {
    if (openingId) return;

    if (reduced) {
      router.push(pillar.href);
      return;
    }

    setOpeningId(pillar.id);

    const navigate = () => router.push(pillar.href);
    window.setTimeout(() => {
      const doc = document as Document & {
        startViewTransition?: (update: () => void) => void;
      };
      if (doc.startViewTransition) {
        doc.startViewTransition(navigate);
        return;
      }
      navigate();
    }, MOTION_MS);
  };

  const hovering = Boolean(hoveredId) && !openingId && !reduced && finePointer;

  return (
    <main className="relative h-svh overflow-hidden bg-background">
      <p className="pointer-events-none absolute top-5 left-1/2 z-30 -translate-x-1/2 text-[10px] tracking-[0.42em] uppercase text-white/55">
        A101 Studio
      </p>
      <div
        className={cn(
          "triptych flex h-full w-full flex-col md:flex-row",
          openingId && "is-opening",
        )}
      >
        {pillars.map((pillar, index) => (
          <PillarPanel
            key={pillar.id}
            pillar={pillar}
            opening={openingId === pillar.id}
            hiding={Boolean(openingId) && openingId !== pillar.id}
            hideCursor={finePointer}
            showDivider={index < pillars.length - 1}
            onHoverChange={setHoveredId}
            onOpen={openPillar}
          />
        ))}
      </div>
      <GrainVignette />
      {finePointer ? <ViewCursor visible={hovering} /> : null}
    </main>
  );
}
