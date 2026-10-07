"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Converte o progresso geral em um trecho [start, end], limitado entre 0 e 1. */
export function remap(progress: number, start: number, end: number): number {
  return Math.min(Math.max((progress - start) / (end - start), 0), 1);
}

/**
 * Mede quanto de um bloco sticky já foi rolado (0 no início, 1 no fim)
 * e entrega o valor a cada frame de scroll.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number, el: HTMLElement) => void
): void {
  const callbackRef = useRef(onProgress);

  useEffect(() => {
    callbackRef.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollRange = Math.max(el.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      callbackRef.current(progress, el);
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
  }, [ref]);
}
