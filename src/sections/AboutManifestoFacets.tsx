"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { noWidow } from "@/lib/typography";
import { IconDevice, IconPeople, IconSearch } from "@/components/icons/FacetIcons";
import styles from "./AboutManifesto.module.css";

const FACETS = [
  {
    icon: IconSearch,
    title: "Análise antes de agir",
    text: "Documentos, prazos e provas avaliados antes de qualquer decisão.",
  },
  {
    icon: IconPeople,
    title: "Contato direto",
    text: "Você fala direto com a equipe que conduz o processo e sabe em que pé ele está.",
  },
  {
    icon: IconDevice,
    title: "Golpes e crimes na internet",
    text: "Golpe, conta invadida, deepfake e exposição têm resposta na Justiça. Muita gente não sabe disso.",
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

  // Luz que acompanha o cursor dentro do card (só com mouse; ver CSS)
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-facet]");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`${styles.facets} ${revealed ? styles.facetsRevealed : ""}`}
    >
      {FACETS.map((facet, index) => {
        const Icon = facet.icon;
        return (
          <div
            className={styles.facet}
            data-facet
            key={facet.title}
            style={{ ["--facet-index" as string]: index }}
          >
            <span className={styles.facetIcon}>
              <Icon className={styles.facetIconSvg} />
            </span>
            <h3 className={styles.facetTitle}>{facet.title}</h3>
            <p className={styles.facetText}>{noWidow(facet.text)}</p>
          </div>
        );
      })}
    </div>
  );
}
