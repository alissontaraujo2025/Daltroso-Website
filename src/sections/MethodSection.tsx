"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { noWidow } from "@/lib/typography";
import styles from "./MethodSection.module.css";

// Palavras do brief da Cena 04.
// PLACEHOLDER: textos de cada etapa ainda precisam ser validados pelo escritório.
const STEPS = [
  {
    word: "Ouvir",
    text: "Antes de qualquer orientação, entendemos o que aconteceu, com calma e atenção ao que é importante para você.",
  },
  {
    word: "Analisar",
    text: "Documentos, prazos e provas são lidos com cuidado para mapear os caminhos jurídicos possíveis.",
  },
  {
    word: "Estruturar",
    text: "Você recebe uma orientação clara: o que pode ser feito, quais são os riscos e quais são os próximos passos.",
  },
  {
    word: "Defender",
    text: "Com a estratégia definida, o escritório atua no caso e mantém você informado em cada etapa.",
  },
];

export function MethodSection() {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // A etapa ativa é a que cruza a faixa central da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const progress = (active + 1) / STEPS.length;

  return (
    <section className={styles.scene} id="metodo" aria-labelledby="metodo-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.rules} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={`${styles.eyebrow} eyebrow-line`} data-reveal="up">
            Como trabalhamos
          </p>
          <h2 id="metodo-title" className={styles.title} data-reveal="mask">
            Do primeiro contato à <span className="accent">defesa do seu caso.</span>
          </h2>
        </header>

        <div className={styles.layout}>
          {/* Coluna fixa (desktop): uma palavra acesa por vez */}
          <div className={styles.wordsCol} aria-hidden="true">
            <div className={styles.words}>
              {STEPS.map((step, index) => (
                <span
                  key={step.word}
                  className={`${styles.word} ${index === active ? styles.wordActive : ""} ${
                    index < active ? styles.wordDone : ""
                  }`}
                >
                  {step.word}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.stepsCol}>
            <div
              className={styles.progress}
              style={{ ["--progress" as string]: progress } as CSSProperties}
              aria-hidden="true"
            />
            <ol className={styles.steps}>
              {STEPS.map((step, index) => (
                <li
                  key={step.word}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  className={`${styles.step} ${index === active ? styles.stepActive : ""}`}
                >
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <h3 className={styles.stepTitle}>{step.word}</h3>
                  <p className={styles.stepText}>{noWidow(step.text)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
