import type { CSSProperties } from "react";
import styles from "./OutlineWord.module.css";

type Placement = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center";

type OutlineWordProps = {
  word: string;
  placement?: Placement;
  /** Camada dentro da seção: abaixo do conteúdo, acima das fotos e véus. */
  zIndex?: number;
};

/**
 * Palavra gigante vazada ao fundo da seção (assinatura tipográfica do site).
 * Puramente decorativa: o leitor de tela ignora.
 */
export function OutlineWord({ word, placement = "bottom-right", zIndex = 0 }: OutlineWordProps) {
  return (
    <span
      className={`${styles.word} ${styles[placement]}`}
      style={{ ["--outline-z" as string]: zIndex } as CSSProperties}
      aria-hidden="true"
    >
      {word}
    </span>
  );
}
