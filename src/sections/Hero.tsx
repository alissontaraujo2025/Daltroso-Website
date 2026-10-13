"use client";

import { useRef } from "react";
import { VideoBackground } from "@/components/VideoBackground";
import { remap, useScrollProgress } from "@/lib/useScrollProgress";
import { HeroContent } from "./HeroContent";
import styles from "./Hero.module.css";

export function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);

  useScrollProgress(pinRef, (progress, el) => {
    el.style.setProperty("--p-subtext", String(remap(progress, 0.2, 0.55)));
    el.style.setProperty("--p-headline", String(remap(progress, 0.5, 0.85)));
    el.style.setProperty("--p-nav", String(remap(progress, 0.2, 0.6)));
    el.style.setProperty("--p-light", String(remap(progress, 0.45, 0.95)));
  });

  return (
    <div ref={pinRef} className={styles.heroPin} data-hero-pin>
      <section className={styles.hero}>
        <VideoBackground
          className="hero-video-background"
          desktopSrc="/videos/hero-daltroso-desktop.mp4"
          mobileSrc="/videos/hero-daltroso-mobile.mp4"
          desktopPoster="/videos/hero-daltroso-desktop-poster.webp"
          mobilePoster="/videos/hero-daltroso-mobile-poster.webp"
          priority
        />
        <div className={styles.videoFade} aria-hidden="true" />
        <HeroContent />
      </section>
    </div>
  );
}
