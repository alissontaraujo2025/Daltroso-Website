"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP_BREAKPOINT = "(min-width: 768px)";

type VideoBackgroundProps = {
  desktopSrc: string;
  mobileSrc: string;
  desktopPoster: string;
  mobilePoster: string;
  className?: string;
};

export function VideoBackground({
  desktopSrc,
  mobileSrc,
  desktopPoster,
  mobilePoster,
  className,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const viewportQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateVariant = () => setIsDesktop(viewportQuery.matches);
    const updateMotion = () => setReducedMotion(motionQuery.matches);

    updateVariant();
    updateMotion();

    viewportQuery.addEventListener("change", updateVariant);
    motionQuery.addEventListener("change", updateMotion);
    return () => {
      viewportQuery.removeEventListener("change", updateVariant);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "20% 0px" }
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [isDesktop]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = true;

    if (reducedMotion || !inView) {
      videoEl.pause();
      return;
    }

    const attemptPlay = () => {
      videoEl.play().catch(() => {});
    };

    attemptPlay();
    videoEl.addEventListener("canplay", attemptPlay);
    videoEl.addEventListener("loadeddata", attemptPlay);
    return () => {
      videoEl.removeEventListener("canplay", attemptPlay);
      videoEl.removeEventListener("loadeddata", attemptPlay);
    };
  }, [reducedMotion, inView, isDesktop]);

  if (isDesktop === null) return null;

  const src = isDesktop ? desktopSrc : mobileSrc;
  const poster = isDesktop ? desktopPoster : mobilePoster;

  return (
    <video
      key={src}
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      preload="none"
      autoPlay={!reducedMotion}
      loop={!reducedMotion}
      muted
      playsInline
      controls={false}
    />
  );
}
