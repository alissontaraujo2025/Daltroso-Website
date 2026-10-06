"use client";

import { useEffect, useRef, useState } from "react";
import { VideoPoster } from "./VideoPoster";

const DESKTOP_BREAKPOINT = "(min-width: 768px)";
const GESTURE_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

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
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const viewportQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    const updateVariant = () => setVariant(viewportQuery.matches ? "desktop" : "mobile");

    updateVariant();
    viewportQuery.addEventListener("change", updateVariant);
    return () => viewportQuery.removeEventListener("change", updateVariant);
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

    // The ambient loop is slow and cut-free, so it plays even with
    // prefers-reduced-motion; scroll-driven motion is disabled elsewhere.
    if (!inView) {
      videoEl.pause();
      return;
    }

    // If the browser blocks autoplay (e.g. power-saving modes), retry on the
    // first user gesture instead of leaving the video frozen on frame one.
    const resumeOnGesture = () => attemptPlay();
    const attemptPlay = () => {
      videoEl.play().catch(() => {
        GESTURE_EVENTS.forEach((type) =>
          window.addEventListener(type, resumeOnGesture, { once: true, passive: true })
        );
      });
    };

    attemptPlay();
    videoEl.addEventListener("canplay", attemptPlay);
    videoEl.addEventListener("loadeddata", attemptPlay);
    return () => {
      videoEl.removeEventListener("canplay", attemptPlay);
      videoEl.removeEventListener("loadeddata", attemptPlay);
      GESTURE_EVENTS.forEach((type) => window.removeEventListener(type, resumeOnGesture));
    };
  }, [inView, variant]);

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
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      />
    </>
  );
}
