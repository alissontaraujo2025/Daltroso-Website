"use client";

import { useEffect, useRef, useState } from "react";
import { VideoPoster } from "./VideoPoster";

const DESKTOP_BREAKPOINT = "(min-width: 768px)";

const SOURCES = {
  desktop: {
    video: "/videos/hero-daltroso-desktop.mp4",
    poster: "/videos/hero-daltroso-desktop-poster.webp",
  },
  mobile: {
    video: "/videos/hero-daltroso-mobile.mp4",
    poster: "/videos/hero-daltroso-mobile-poster.webp",
  },
} as const;

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<keyof typeof SOURCES | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const viewportQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateVariant = () => setVariant(viewportQuery.matches ? "desktop" : "mobile");
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
      { threshold: 0 }
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [variant]);

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
  }, [reducedMotion, inView, variant]);

  const posterImage = (
    <VideoPoster
      className="hero-video-background"
      desktopSrc={SOURCES.desktop.poster}
      mobileSrc={SOURCES.mobile.poster}
      priority
    />
  );

  if (!variant) return posterImage;

  const { video, poster } = SOURCES[variant];

  return (
    <>
      {posterImage}
      <video
        key={video}
        ref={videoRef}
        className="hero-video-background"
        src={video}
        poster={poster}
        preload="auto"
        autoPlay={!reducedMotion}
        loop={!reducedMotion}
        muted
        playsInline
        controls={false}
      />
    </>
  );
}
