"use client";

import { MediaVideo } from "@/components/shared/MediaVideo";
import { cn } from "@/lib/cn";
import type { Pillar } from "@/lib/pillars";

type PillarPanelProps = {
  pillar: Pillar;
  opening: boolean;
  hiding: boolean;
  hideCursor: boolean;
  showDivider: boolean;
  onHoverChange: (id: string | null) => void;
  onOpen: (pillar: Pillar) => void;
};

export function PillarPanel({
  pillar,
  opening,
  hiding,
  hideCursor,
  showDivider,
  onHoverChange,
  onOpen,
}: PillarPanelProps) {
  return (
    <button
      type="button"
      aria-label={`View ${pillar.title}`}
      onMouseEnter={() => onHoverChange(pillar.id)}
      onMouseLeave={() => onHoverChange(null)}
      onFocus={() => onHoverChange(pillar.id)}
      onBlur={() => onHoverChange(null)}
      onClick={() => onOpen(pillar)}
      className={cn(
        "triptych-panel relative min-h-0 min-w-0 flex-1 overflow-hidden text-left select-none touch-manipulation",
        hideCursor && "cursor-none",
        opening && "is-opening",
        hiding && "is-hiding",
      )}
    >
      <MediaVideo
        webm={pillar.hero.webm}
        mp4={pillar.hero.mp4}
        poster={pillar.hero.poster}
        gradeClass={pillar.grade}
      />
      <div className="absolute inset-0 bg-black/15" />
      {showDivider ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-px md:bg-gradient-to-b"
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-5 pb-6 pt-16 md:px-8 md:pb-8">
        <h2 className="panel-title font-display text-[1.65rem] leading-tight text-white/80 md:text-4xl">
          {pillar.title}
        </h2>
        <p className="panel-tagline mt-2 text-[11px] tracking-[0.22em] uppercase text-white/55">
          {pillar.tagline}
        </p>
      </div>
    </button>
  );
}
