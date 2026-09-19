"use client";

import { useEffect, useRef } from "react";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { HeroContent } from "./HeroContent";
import styles from "./Hero.module.css";

export function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinEl = pinRef.current;
    if (!pinEl) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let frame = 0;

    const remap = (progress: number, start: number, end: number) =>
      Math.min(Math.max((progress - start) / (end - start), 0), 1);

    const update = () => {
      frame = 0;
      const rect = pinEl.getBoundingClientRect();
      const scrollRange = Math.max(pinEl.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);

      pinEl.style.setProperty("--p-subtext", String(remap(progress, 0.2, 0.55)));
      pinEl.style.setProperty("--p-headline", String(remap(progress, 0.5, 0.85)));
      pinEl.style.setProperty("--p-nav", String(remap(progress, 0.2, 0.6)));
      pinEl.style.setProperty("--p-light", String(remap(progress, 0.45, 0.95)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={pinRef} className={styles.heroPin}>
      <section className={styles.hero}>
        <HeroVideoBackground />
        <HeroContent />
      </section>
    </div>
  );
}
