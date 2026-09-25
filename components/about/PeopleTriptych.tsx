"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrainVignette } from "@/components/landing/GrainVignette";
import { ViewCursor } from "@/components/landing/ViewCursor";
import { HeaderLink } from "@/components/shared/HeaderLink";
import { cn } from "@/lib/cn";
import { useFinePointer, useReducedMotion } from "@/lib/motion";
import { people, type Person } from "@/lib/people";

export function PeopleTriptych() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);

  useEffect(() => {
    people.forEach((person) => {
      router.prefetch(`/about/${person.id}/`);
    });
  }, [router]);

  const openPerson = (person: Person) => {
    if (openingId) return;
    const href = `/about/${person.id}/`;
    if (reduced) {
      router.push(href);
      return;
    }
    setOpeningId(person.id);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => router.push(href));
    });
  };

  const hovering = Boolean(hoveredId) && !openingId && !reduced && finePointer;

  return (
    <main className="relative h-svh overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-32 bg-gradient-to-b from-black/75 to-transparent" />
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 pt-5 md:px-8">
        <HeaderLink href="/">Back</HeaderLink>
        <p className="pointer-events-none text-xs tracking-[0.28em] uppercase text-white md:text-sm drop-shadow-[0_2px_10px_rgb(0_0_0_/_0.85)]">
          About us
        </p>
        <HeaderLink href="/contact/">Contact</HeaderLink>
      </header>
      <div
        className={cn(
          "triptych flex h-full w-full flex-col md:flex-row",
          openingId && "is-opening",
        )}
      >
        {people.map((person, index) => (
          <button
            key={person.id}
            type="button"
            aria-label={`View ${person.name}`}
            onMouseEnter={() => setHoveredId(person.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(person.id)}
            onBlur={() => setHoveredId(null)}
            onClick={() => openPerson(person)}
            className={cn(
              "triptych-panel relative min-h-0 min-w-0 flex-1 overflow-hidden text-left select-none touch-manipulation",
              finePointer && "cursor-none",
              openingId === person.id && "is-opening",
              openingId && openingId !== person.id && "is-hiding",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.portrait.src}
              alt=""
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                person.grade,
              )}
            />
            <div className="absolute inset-0 bg-black/20" />
            {index < people.length - 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-px md:bg-gradient-to-b"
              />
            ) : null}
            <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-5 pb-6 pt-16 md:px-8 md:pb-8">
              <h2 className="panel-title font-display text-[1.65rem] leading-tight text-white/90 md:text-4xl">
                {person.name}
              </h2>
              <p className="panel-tagline mt-2 text-[11px] tracking-[0.22em] uppercase text-white/60">
                {person.role}
              </p>
            </div>
          </button>
        ))}
      </div>
      <GrainVignette />
      {finePointer ? <ViewCursor visible={hovering} /> : null}
    </main>
  );
}
