"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setSmoothScroll } from "@/lib/smoothScroll";

/**
 * Rolagem com inércia no desktop (mouse e trackpad). O scroll continua
 * nativo por baixo, então sticky, IntersectionObserver e os listeners de
 * scroll do site seguem funcionando. Fica desligada no toque (o celular já
 * tem inércia) e com movimento reduzido.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      // Mesmo respiro do scroll-margin-top das seções (altura do cabeçalho)
      anchors: { offset: -64 },
    });
    setSmoothScroll(lenis);

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      setSmoothScroll(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
