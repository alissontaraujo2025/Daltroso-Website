"use client";

import { useRef, useState, type CSSProperties } from "react";
import { OutlineWord } from "@/components/OutlineWord";
import { IconArrow } from "@/components/icons/PracticeIcons";
import { practiceAreas, type PracticeArea } from "@/data/practiceAreas";
import { whatsappHref } from "@/lib/contact";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { noWidow } from "@/lib/typography";
import styles from "./PracticeAreasSection.module.css";

const COUNT = practiceAreas.length;

function areaMessage(subject?: string) {
  return subject
    ? `Olá! Gostaria de falar sobre ${subject}.`
    : "Olá! Gostaria de falar sobre o meu caso.";
}

function ctaLabel(area: PracticeArea) {
  return area.subject ? `Falar sobre ${area.subject}` : "Contar o meu caso";
}

function AreaDetails({ area }: { area: PracticeArea }) {
  return (
    <>
      <p className={styles.text}>{noWidow(area.text)}</p>
      {area.tags && (
        <ul className={styles.tags}>
          {area.tags.map((tag) => (
            <li className={styles.tag} key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      )}
      <a
        className={styles.cta}
        href={whatsappHref(areaMessage(area.subject))}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaLabel(area)}
        <IconArrow className={styles.ctaArrow} />
        <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
      </a>
    </>
  );
}

/**
 * Cena 04 — Áreas de atuação como "Hub".
 * Desktop: cena sticky; o scroll avança uma área por vez (lista à esquerda,
 * painel à direita). Mobile: sanfona, uma área aberta por vez.
 * Com movimento reduzido: sem pinning, a área muda pelo clique.
 */
export function PracticeAreasSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useScrollProgress(pinRef, (progress, el) => {
    // Liga o pinning (sem isso, o CSS mostra a cena estática)
    el.dataset.animated = "";
    const index = Math.min(Math.floor(progress * COUNT), COUNT - 1);
    setActive((current) => (current === index ? current : index));
  });

  // No modo sticky, o clique rola até o trecho da área; fora dele, só troca o painel
  const selectArea = (index: number) => {
    setActive(index);
    const pin = pinRef.current;
    if (!pin) return;
    const scrollRange = pin.offsetHeight - window.innerHeight;
    if (scrollRange < window.innerHeight * 0.5) return;
    const pinTop = pin.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: pinTop + ((index + 0.5) / COUNT) * scrollRange, behavior: "smooth" });
  };

  const area = practiceAreas[active];

  return (
    <div
      ref={pinRef}
      className={styles.pin}
      style={{ ["--count" as string]: COUNT } as CSSProperties}
    >
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

          {/* Desktop: hub */}
          <div className={styles.hub}>
            <ol className={styles.list}>
              {practiceAreas.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={styles.item}
                    aria-current={index === active ? "true" : undefined}
                    aria-controls="atuacao-painel"
                    onClick={() => selectArea(index)}
                  >
                    <span className={styles.itemLabel}>{item.title}</span>
                    <span className={styles.link} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>

            <div id="atuacao-painel" className={styles.panel}>
              <div key={area.id} className={styles.panelContent}>
                <p className={styles.index} aria-hidden="true">
                  {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                </p>
                <h3 className={styles.panelTitle}>{area.title}</h3>
                <AreaDetails area={area} />
              </div>
            </div>
          </div>

          {/* Mobile: sanfona (name = só uma aberta por vez) */}
          <div className={styles.accordion}>
            {practiceAreas.map((item, index) => (
              <details
                key={item.id}
                className={styles.accItem}
                name="atuacao-areas"
                open={index === 0}
              >
                <summary className={styles.accSummary}>
                  <h3 className={styles.accTitle}>{item.title}</h3>
                  <span className={styles.accIcon} aria-hidden="true" />
                </summary>
                <div className={styles.accBody}>
                  <AreaDetails area={item} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
