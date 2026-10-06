"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { noWidow } from "@/lib/typography";
import styles from "./MethodSection.module.css";

const HERO = "/videos/hero-daltroso-desktop-poster.webp";
const DESK = "/videos/scene-02-daltroso-desktop-poster.webp";

// Palavras do brief da Cena 04. Cada etapa usa um recorte das fotos do próprio site.
// PLACEHOLDER: textos de cada etapa ainda precisam ser validados pelo escritório.
const STEPS = [
  {
    word: "Ouvir",
    tag: "Escuta / Contexto",
    text: "Antes de qualquer orientação, entendemos o que aconteceu e o que é importante para você.",
    image: HERO,
    focus: "77% 72%",
  },
  {
    word: "Analisar",
    tag: "Documentos / Prazos / Provas",
    text: "Lemos com cuidado tudo o que envolve o caso para mapear os caminhos jurídicos possíveis.",
    image: DESK,
    focus: "70% 92%",
  },
  {
    word: "Estruturar",
    tag: "Estratégia / Riscos",
    text: "Você recebe uma orientação clara: o que pode ser feito, os riscos e os próximos passos.",
    image: DESK,
    focus: "6% 76%",
  },
  {
    word: "Defender",
    tag: "Atuação / Acompanhamento",
    text: "Com a estratégia definida, o escritório atua no caso e mantém você informado em cada etapa.",
    image: HERO,
    focus: "88% 18%",
  },
];

function stepStyle(step: (typeof STEPS)[number]): CSSProperties {
  return {
    ["--step-image" as string]: `url(${step.image})`,
    ["--step-focus" as string]: step.focus,
  };
}

export function MethodSection() {
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  // Etapa em destaque: hover no desktop, posição de rolagem no celular
  const [active, setActive] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);

  // Sem mouse (toque), a linha que cruza o centro da tela fica em destaque
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = rowRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );

    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Prévia da foto acompanha o cursor (só com mouse)
  const handlePointerMove = (event: PointerEvent<HTMLOListElement>) => {
    if (event.pointerType !== "mouse" || !previewRef.current) return;
    previewRef.current.style.setProperty("--px", `${event.clientX}px`);
    previewRef.current.style.setProperty("--py", `${event.clientY}px`);
    const nearRightEdge = event.clientX > window.innerWidth - 340;
    previewRef.current.style.setProperty("--ox", nearRightEdge ? "calc(-100% - 36px)" : "36px");
  };

  const current = active ?? 0;

  return (
    <section className={styles.scene} id="metodo" aria-labelledby="metodo-title">
      <div className={styles.photo} aria-hidden="true" />
      <div className={styles.veil} aria-hidden="true" />

      {/* Número gigante vazado ao fundo: acompanha a etapa em destaque */}
      <span className={styles.bigNumber} aria-hidden="true" key={current}>
        {String(current + 1).padStart(2, "0")}
      </span>

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={`${styles.eyebrow} eyebrow-line`} data-reveal="up">
            Como trabalhamos
          </p>
          <h2 id="metodo-title" className={styles.title} data-reveal="mask">
            Do primeiro contato <span className="accent">à defesa do seu caso.</span>
          </h2>
          <p
            className={styles.lead}
            data-reveal="up"
            style={{ ["--reveal-delay" as string]: "200ms" }}
          >
            {noWidow(
              "Quatro etapas para você entender o que está acontecendo e saber o que esperar de cada fase do seu caso."
            )}
          </p>
        </header>

        <ol
          className={styles.index}
          onPointerMove={handlePointerMove}
          onPointerEnter={(event) => event.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={() => {
            setHovering(false);
            setActive(null);
          }}
          data-reveal="up"
        >
          {STEPS.map((step, index) => (
            <li
              key={step.word}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className={`${styles.row} ${active === index ? styles.rowActive : ""}`}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
              style={stepStyle(step)}
            >
              <span className={styles.rowNumber}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.rowWord}>{step.word}</h3>
              <div className={styles.rowBody}>
                <span className={styles.rowTag}>{step.tag}</span>
                <p className={styles.rowText}>{noWidow(step.text)}</p>
              </div>
              <span className={styles.rowThumb} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>

      {/* Prévia flutuante (desktop): foto da etapa inclinada, seguindo o cursor */}
      <div
        ref={previewRef}
        className={`${styles.preview} ${hovering && active !== null ? styles.previewOn : ""}`}
        style={stepStyle(STEPS[current])}
        aria-hidden="true"
      />
    </section>
  );
}
