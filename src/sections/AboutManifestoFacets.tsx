"use client";

import { useEffect, useRef, useState } from "react";
import { IconDevice, IconPeople, IconSearch } from "@/components/icons/FacetIcons";
import styles from "./AboutManifesto.module.css";

const FACETS = [
  {
    icon: IconSearch,
    title: "Leitura estratégica",
    text: "Cada processo analisado além do óbvio, com visão de conjunto.",
  },
  {
    icon: IconPeople,
    title: "Presença real",
    text: "Acompanhamento próximo, sem distância entre você e quem cuida do seu caso.",
  },
  {
    icon: IconDevice,
    title: "Continuidade digital",
    text: "A mesma atenção jurídica onde sua vida também acontece: online.",
  },
];

export function AboutManifestoFacets() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.facets} ${revealed ? styles.facetsRevealed : ""}`}
    >
      {FACETS.map((facet, index) => {
        const Icon = facet.icon;
        return (
          <div
            className={styles.facet}
            key={facet.title}
            style={{ ["--facet-index" as string]: index }}
          >
            <span className={styles.facetIcon}>
              <Icon className={styles.facetIconSvg} />
            </span>
            <h3 className={styles.facetTitle}>{facet.title}</h3>
            <p className={styles.facetText}>{facet.text}</p>
          </div>
        );
      })}
    </div>
  );
}
