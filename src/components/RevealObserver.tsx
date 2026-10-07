"use client";

import { useEffect } from "react";

/**
 * Observa todos os elementos com [data-reveal] e marca [data-revealed]
 * quando entram na tela. As animações ficam no globals.css.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Também libera o que já ficou acima da tela (ex.: salto por link do menu)
          const passed = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !passed) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      // threshold 0: elementos com máscara têm área visível quase nula antes do reveal
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    root.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, []);

  return null;
}
