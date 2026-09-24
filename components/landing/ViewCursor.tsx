"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type ViewCursorProps = {
  visible: boolean;
};

export function ViewCursor({ visible }: ViewCursorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-50 hidden md:block",
        "transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <span className="ml-4 -mt-3 inline-flex rounded-full border border-white/40 bg-black/40 px-3 py-1 text-[10px] tracking-[0.28em] uppercase text-white/90 backdrop-blur-sm">
        View
      </span>
    </div>
  );
}
