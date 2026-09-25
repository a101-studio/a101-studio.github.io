"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrainVignette } from "@/components/landing/GrainVignette";
import { PillarPanel } from "@/components/landing/PillarPanel";
import { ViewCursor } from "@/components/landing/ViewCursor";
import { HeaderLink } from "@/components/shared/HeaderLink";
import { cn } from "@/lib/cn";
import { useFinePointer, useReducedMotion } from "@/lib/motion";
import { pillars, type Pillar } from "@/lib/pillars";

export function Triptych() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);

  useEffect(() => {
    ["/about/", "/book/", ...pillars.map((pillar) => pillar.href)].forEach(
      (href) => {
        router.prefetch(href);
      },
    );
  }, [router]);

  const openPillar = (pillar: Pillar) => {
    if (openingId) return;

    if (reduced) {
      router.push(pillar.href);
      return;
    }

    setOpeningId(pillar.id);

    const navigate = () => {
      const go = () => router.push(pillar.href);
      const doc = document as Document & {
        startViewTransition?: (update: () => void) => void;
      };
      if (doc.startViewTransition) {
        doc.startViewTransition(go);
        return;
      }
      go();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(navigate);
    });
  };

  const hovering = Boolean(hoveredId) && !openingId && !reduced && finePointer;

  return (
    <main className="relative h-svh overflow-hidden bg-background">
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 pt-5 md:px-8">
        <HeaderLink href="/about/">About</HeaderLink>
        <p className="pointer-events-none text-[10px] tracking-[0.42em] uppercase text-white/55">
          A101 Studio
        </p>
        <HeaderLink href="/book/">Book</HeaderLink>
      </header>
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
