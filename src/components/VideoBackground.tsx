"use client";

import { useEffect, useRef, useState } from "react";
import { VideoPoster } from "./VideoPoster";

const DESKTOP_BREAKPOINT = "(min-width: 768px)";
const GESTURE_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

type VideoBackgroundProps = {
  desktopSrc: string;
  mobileSrc: string;
  desktopPoster: string;
  mobilePoster: string;
  className?: string;
  /**
   * Vídeo da primeira dobra (hero): pôster com prioridade e download imediato.
   * Sem isso, o vídeo só começa a baixar uma tela antes de aparecer.
   */
  priority?: boolean;
};

export function VideoBackground({
  desktopSrc,
  mobileSrc,
  desktopPoster,
  mobilePoster,
  className,
  priority = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [inView, setInView] = useState(priority);

  useEffect(() => {
    const viewportQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    const updateVariant = () => setIsDesktop(viewportQuery.matches);

    updateVariant();
    viewportQuery.addEventListener("change", updateVariant);
    return () => viewportQuery.removeEventListener("change", updateVariant);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // Start buffering about one screen ahead so playback is ready on arrival.
      { threshold: 0, rootMargin: priority ? "0px" : "100% 0px" }
    );
    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [isDesktop, priority]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = true;

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
  }, [inView, isDesktop]);

  const posterImage = (
    <VideoPoster
      className={className}
      desktopSrc={desktopPoster}
      mobileSrc={mobilePoster}
      priority={priority}
    />
  );

  if (isDesktop === null) return posterImage;

  const src = isDesktop ? desktopSrc : mobileSrc;
  const poster = isDesktop ? desktopPoster : mobilePoster;

  return (
    <>
      {posterImage}
      <video
        key={src}
        ref={videoRef}
        className={className}
        src={src}
        poster={poster}
        preload={priority ? "auto" : "none"}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      />
    </>
  );
}
