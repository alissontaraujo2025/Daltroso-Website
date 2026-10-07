"use client";

import { useRef } from "react";
import { remap, useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./ViradaScene.module.css";

const PHRASE_A = "Garantir que seus direitos sejam respeitados, na vida real";
const PHRASE_B = "e no mundo digital.";

/**
 * Cena 03 — A Virada.
 * A mesa de "Quem somos" é varrida por uma linha de luz: atrás dela,
 * a mesma cena no anoitecer (mundo digital). A frase de propósito
 * da marca se divide na passagem.
 */
export function ViradaScene() {
  const pinRef = useRef<HTMLDivElement>(null);

  useScrollProgress(pinRef, (progress, el) => {
    el.style.setProperty("--v-intro", String(remap(progress, 0, 0.15)));
    el.style.setProperty("--v-sweep", String(remap(progress, 0.15, 0.7)));
    el.style.setProperty("--v-a-out", String(remap(progress, 0.45, 0.6)));
    el.style.setProperty("--v-b-in", String(remap(progress, 0.55, 0.72)));
    el.style.setProperty("--v-settle", String(remap(progress, 0.7, 1)));
  });

  return (
    <div ref={pinRef} className={styles.pin}>
      <section className={styles.scene} id="virada" aria-labelledby="virada-title">
        <div className={styles.stage} aria-hidden="true">
          <picture className={styles.digital}>
            <source media="(max-width: 767px)" srcSet="/images/virada-mobile.webp" />
            <img src="/images/virada-desktop.webp" alt="" loading="lazy" decoding="async" />
          </picture>

          <picture className={styles.warm}>
            <source
              media="(max-width: 767px)"
              srcSet="/videos/scene-02-daltroso-mobile-poster.webp"
            />
            <img
              src="/videos/scene-02-daltroso-desktop-poster.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>

          <span className={styles.sweep} />

          <svg className={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 22 64 L 22 100" />
            <path d="M 46 72 C 46 86, 58 88, 58 100" />
            <path d="M 74 60 C 74 80, 66 86, 66 100" />
          </svg>

          <div className={styles.scrim} />
          <div className={styles.settle} />
        </div>

        <h2 id="virada-title" className="sr-only">
          {PHRASE_A} {PHRASE_B}
        </h2>

        <div className={styles.text} aria-hidden="true">
          <p className={styles.phraseA}>{PHRASE_A}</p>
          <p className={styles.phraseB}>{PHRASE_B}</p>
        </div>
      </section>
    </div>
  );
}
