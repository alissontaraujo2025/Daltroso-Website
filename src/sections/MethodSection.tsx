"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { noWidow } from "@/lib/typography";
import { RevealTitle } from "@/components/RevealTitle";
import styles from "./MethodSection.module.css";

// Palavras do brief da Cena 04. Cada etapa tem a sua foto (public/images/metodo-0N-*.webp).
const STEPS = [
  {
    word: "Ouvir",
    tag: "Escuta / Contexto",
    text: "Primeiro, uma reunião para escutar: o que aconteceu, o que você já tentou e o que mais preocupa você.",
    image: "/images/metodo-01-ouvir.webp",
    focus: "60% 50%",
  },
  {
    word: "Analisar",
    tag: "Documentos / Prazos / Provas",
    text: "Documentos, prazos e provas. Daí saem os caminhos possíveis, com o que cada um exige.",
    image: "/images/metodo-02-analisar.webp",
    focus: "45% 55%",
  },
  {
    word: "Estruturar",
    tag: "Estratégia / Riscos",
    text: "Você recebe um plano: o que fazer, quais são os riscos e quais são os próximos passos.",
    image: "/images/metodo-03-estruturar.webp",
    focus: "50% 40%",
  },
  {
    word: "Atuar",
    tag: "Atuação / Acompanhamento",
    text: "Colocamos o plano em prática e avisamos você sempre que algo muda.",
    image: "/images/metodo-04-atuar.webp",
    focus: "60% 45%",
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

  // Pré-carrega as fotos das etapas depois do carregamento principal,
  // para a prévia do hover não aparecer vazia na primeira passada
  useEffect(() => {
    const timer = window.setTimeout(() => {
      STEPS.forEach((step) => {
        new Image().src = step.image;
      });
    }, 2500);
    return () => window.clearTimeout(timer);
  }, []);

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
    // Centro da prévia (340px de altura) preso dentro da tela, com folga
    const py = Math.min(Math.max(event.clientY, 190), window.innerHeight - 190);
    previewRef.current.style.setProperty("--py", `${py}px`);
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
          <RevealTitle id="metodo-title" className={styles.title}>
            Como <span className="accent">trabalhamos.</span>
          </RevealTitle>
          <p
            className={styles.lead}
            data-reveal="up"
            style={{ ["--reveal-delay" as string]: "200ms" }}
          >
            {noWidow(
              "Quatro passos, do primeiro contato até o fim do processo. Você sabe o que esperar em cada um."
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
