"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { OutlineWord } from "@/components/OutlineWord";
import {
  IconArrow,
  IconChat,
  IconDigital,
  IconDocument,
  IconHouse,
  IconInsignia,
  IconShield,
} from "@/components/icons/PracticeIcons";
import { practiceAreas, type PracticeArea, type PracticeAreaIcon } from "@/data/practiceAreas";
import { whatsappHref } from "@/lib/contact";
import { scrollToY } from "@/lib/smoothScroll";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { noWidow } from "@/lib/typography";
import { RevealTitle } from "@/components/RevealTitle";
import styles from "./PracticeAreasSection.module.css";

const COUNT = practiceAreas.length;

const ICONS: Record<PracticeAreaIcon, typeof IconShield> = {
  digital: IconDigital,
  shield: IconShield,
  document: IconDocument,
  house: IconHouse,
  insignia: IconInsignia,
  chat: IconChat,
};

function AreaIcon({ area, className }: { area: PracticeArea; className: string }) {
  const Icon = ICONS[area.icon];
  return <Icon className={className} />;
}

function stagger(index: number): CSSProperties {
  return { ["--reveal-delay" as string]: `${120 + index * 80}ms` };
}

function areaMessage(subject?: string) {
  return subject
    ? `Olá! Gostaria de falar sobre ${subject}.`
    : "Olá! Gostaria de falar sobre o meu caso.";
}

function ctaLabel(area: PracticeArea) {
  return area.subject ? `Falar sobre ${area.subject}` : "Explicar minha situação";
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

    // Foco contínuo: cada área acende conforme a rolagem se aproxima dela
    // (1 no centro do seu trecho, 0 a uma área de distância)
    const position = Math.min(Math.max(progress * COUNT - 0.5, 0), COUNT - 1);
    el.querySelectorAll<HTMLElement>("[data-hub-item]").forEach((item, i) => {
      const focus = Math.max(0, 1 - Math.abs(position - i));
      item.style.setProperty("--focus", focus.toFixed(3));
    });
  });

  // No modo sticky, o clique rola até o trecho da área; fora dele, só troca o painel
  const selectArea = (index: number) => {
    setActive(index);
    const pin = pinRef.current;
    if (!pin) return;
    const scrollRange = pin.offsetHeight - window.innerHeight;
    if (scrollRange < window.innerHeight * 0.5) return;
    const pinTop = pin.getBoundingClientRect().top + window.scrollY;
    scrollToY(pinTop + ((index + 0.5) / COUNT) * scrollRange);
  };

  // Área que acabou de sair: fica numa camada por cima, saindo com fade e blur
  const lastRef = useRef(active);
  const [leaving, setLeaving] = useState<number | null>(null);
  useEffect(() => {
    if (lastRef.current === active) return;
    setLeaving(lastRef.current);
    lastRef.current = active;
  }, [active]);

  const area = practiceAreas[active];
  const leavingArea = leaving === null ? null : practiceAreas[leaving];

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
            <RevealTitle id="atuacao-title" className={styles.title}>
              Onde podemos <span className="accent">ajudar.</span>
            </RevealTitle>
            <p
              className={styles.support}
              data-reveal="up"
              style={{ ["--reveal-delay" as string]: "200ms" }}
            >
              {noWidow(
                "Escolha uma área para ver como funciona. Em crimes na internet, atendemos do golpe do Pix ao deepfake."
              )}
            </p>
          </header>

          {/* Desktop: hub */}
          <div className={styles.hub}>
            <ol className={styles.list}>
              {practiceAreas.map((item, index) => (
                <li key={item.id} data-reveal="blur" style={stagger(index)}>
                  <button
                    type="button"
                    className={styles.item}
                    data-hub-item
                    aria-current={index === active ? "true" : undefined}
                    aria-controls="atuacao-painel"
                    onClick={() => selectArea(index)}
                  >
                    <AreaIcon area={item} className={styles.itemIcon} />
                    <span className={styles.itemLabel}>{item.title}</span>
                    <span className={styles.link} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>

            <div id="atuacao-painel" className={styles.panel}>
              {leavingArea && (
                <div
                  key={`saida-${leavingArea.id}`}
                  className={`${styles.panelContent} ${styles.panelLeaving}`}
                  aria-hidden="true"
                  inert
                  onAnimationEnd={() => setLeaving(null)}
                >
                  <div className={styles.panelHead}>
                    <span className={styles.panelIcon}>
                      <AreaIcon area={leavingArea} className={styles.panelIconSvg} />
                    </span>
                  </div>
                  <p className={styles.panelTitle}>{leavingArea.title}</p>
                  <AreaDetails area={leavingArea} />
                </div>
              )}
              <div key={area.id} className={styles.panelContent}>
                <div className={styles.panelHead} aria-hidden="true">
                  <span className={styles.panelIcon}>
                    <AreaIcon area={area} className={styles.panelIconSvg} />
                  </span>
                  <p className={styles.index}>
                    {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                  </p>
                </div>
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
                data-reveal="blur"
                style={stagger(index)}
              >
                <summary className={styles.accSummary}>
                  <span className={styles.accIconBox} aria-hidden="true">
                    <AreaIcon area={item} className={styles.accIconSvg} />
                  </span>
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
