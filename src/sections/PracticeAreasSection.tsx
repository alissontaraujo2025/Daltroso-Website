"use client";

import { OutlineWord } from "@/components/OutlineWord";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import {
  IconArrow,
  IconDigital,
  IconDocument,
  IconHouse,
  IconInsignia,
  IconPlus,
  IconShield,
} from "@/components/icons/PracticeIcons";
import { featuredArea, practiceAreas, type PracticeAreaIcon } from "@/data/practiceAreas";
import { whatsappHref } from "@/lib/contact";
import { noWidow } from "@/lib/typography";
import styles from "./PracticeAreasSection.module.css";

const ICONS: Record<PracticeAreaIcon, typeof IconShield> = {
  digital: IconDigital,
  shield: IconShield,
  document: IconDocument,
  house: IconHouse,
  insignia: IconInsignia,
};

function areaMessage(subject?: string) {
  return subject
    ? `Olá! Gostaria de falar sobre ${subject}.`
    : "Olá! Gostaria de falar sobre o meu caso.";
}

function accentStyle(accent: string, index: number): CSSProperties {
  return { ["--card-accent" as string]: accent, ["--card-index" as string]: index };
}

export function PracticeAreasSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Luz que acompanha o cursor dentro do card (só faz efeito com mouse; ver CSS)
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>("a");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const FeaturedIcon = ICONS[featuredArea.icon];

  return (
    <section className={styles.scene} id="atuacao" aria-labelledby="atuacao-title">
      <div className={styles.bridge} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.dots} aria-hidden="true" />
      <OutlineWord word="Defesa" placement="bottom-right" zIndex={-1} />

      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="atuacao-title" className={styles.title} data-reveal="up">
            Onde o escritório pode <span className="accent">ajudar.</span>
          </h2>
          <p
            className={styles.support}
            data-reveal="up"
            style={{ ["--reveal-delay" as string]: "200ms" }}
          >
            {noWidow(
              "Atuamos nas áreas criminal, civil, imobiliária e militar, com atenção especial aos crimes que acontecem na internet."
            )}
          </p>
        </header>

        <div
          ref={gridRef}
          className={`${styles.grid} ${revealed ? styles.gridRevealed : ""}`}
          onPointerMove={handlePointerMove}
        >
          <a
            className={`${styles.card} ${styles.featured}`}
            href={whatsappHref(areaMessage("crimes digitais"))}
            target="_blank"
            rel="noopener noreferrer"
            style={accentStyle(featuredArea.accent, 0)}
          >
            <span className={styles.icon}>
              <FeaturedIcon className={styles.iconSvg} />
            </span>
            <div className={styles.body}>
              <span className={styles.badge}>Destaque</span>
              <h3 className={`${styles.cardTitle} ${styles.featuredTitle}`}>
                {featuredArea.title}
              </h3>
              <span className={styles.cardText}>{noWidow(featuredArea.text)}</span>
              <span className={styles.tags}>
                {featuredArea.tags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    {tag}
                  </span>
                ))}
              </span>
            </div>
            <IconArrow className={styles.arrow} />
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>

          {practiceAreas.map((area, index) => {
            const Icon = ICONS[area.icon];
            return (
              <a
                className={styles.card}
                key={area.title}
                href={whatsappHref(areaMessage(area.title))}
                target="_blank"
                rel="noopener noreferrer"
                style={accentStyle(area.accent, index + 1)}
              >
                <span className={styles.icon}>
                  <Icon className={styles.iconSvg} />
                </span>
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{area.title}</h3>
                  <span className={styles.cardText}>{noWidow(area.text)}</span>
                </div>
                <IconArrow className={styles.arrow} />
                <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
              </a>
            );
          })}

          <a
            className={`${styles.card} ${styles.more}`}
            href={whatsappHref(areaMessage())}
            target="_blank"
            rel="noopener noreferrer"
            style={accentStyle("#ffffff", practiceAreas.length + 1)}
          >
            <span className={styles.icon}>
              <IconPlus className={styles.iconSvg} />
            </span>
            <div className={styles.body}>
              <h3 className={styles.cardTitle}>Não encontrou o seu caso?</h3>
              <span className={styles.cardText}>
                {noWidow("Conte o que aconteceu e a equipe orienta você.")}
              </span>
            </div>
            <IconArrow className={styles.arrow} />
            <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
