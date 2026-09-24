"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/motion";

type MediaVideoProps = {
  webm: string;
  mp4: string;
  poster: string;
  className?: string;
  gradeClass?: string;
};

export function MediaVideo({
  webm,
  mp4,
  poster,
  className,
  gradeClass,
}: MediaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduced) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.25, 0.5, 1] },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className={cn("absolute inset-0 h-full w-full object-cover", gradeClass)}
      />
      <video
        ref={videoRef}
        className={cn(
          "panel-video absolute inset-0 h-full w-full object-cover motion-reduce:hidden",
          gradeClass,
        )}
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        disablePictureInPicture
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}
