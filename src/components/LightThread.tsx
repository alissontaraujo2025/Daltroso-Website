"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./LightThread.module.css";

/**
 * Fio de luz: linha dourada bem fina na margem esquerda que se desenha
 * conforme a rolagem, costurando as cenas que envolve. Continua a linha
 * de luz da cena A Virada. A ponta acompanha um ponto fixo da tela.
 * Com movimento reduzido, o fio aparece inteiro e parado.
 */
export function LightThread({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // A ponta fica a 62% da altura da tela: um pouco à frente da leitura
      const tip = Math.min(Math.max(window.innerHeight * 0.62 - rect.top, 0), rect.height);
      el.style.setProperty("--thread-tip", `${tip}px`);
      el.style.setProperty("--thread-progress", String(tip / rect.height));
      el.toggleAttribute("data-done", tip >= rect.height - 1);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    el.dataset.animated = "";
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
    <div ref={ref} className={styles.thread}>
      {children}
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.fill} />
        <span className={styles.tip} />
        <span className={styles.end} />
      </div>
    </div>
  );
}
