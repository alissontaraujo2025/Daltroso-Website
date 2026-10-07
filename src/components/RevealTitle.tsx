"use client";

import {
  Children,
  isValidElement,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

type Word = { text: string; className?: string };

type RevealTitleProps = {
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** Texto do título; aceita <span className="accent"> para a palavra-chave. */
  children: ReactNode;
};

/** Quebra o conteúdo em palavras, guardando a classe de destaque de cada uma. */
function toWords(children: ReactNode): Word[] {
  const words: Word[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split(" ")
        .filter(Boolean)
        .forEach((text) => words.push({ text }));
    } else if (isValidElement(child)) {
      const el = child as ReactElement<{ className?: string; children?: ReactNode }>;
      toWords(el.props.children).forEach((word) =>
        words.push({ text: word.text, className: el.props.className })
      );
    }
  });
  return words;
}

function plainText(words: Word[]) {
  return words.map((w) => w.text).join(" ").replace(/ /g, " ");
}

/**
 * Título revelado linha a linha: cada linha sobe de trás de uma máscara,
 * com um pequeno atraso entre elas. A palavra em destaque chega com um brilho
 * que passa uma vez. As linhas são medidas no navegador, então o efeito
 * acompanha a quebra real em qualquer largura. Animação em globals.css.
 */
export function RevealTitle({ as: Tag = "h2", id, className, children }: RevealTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = toWords(children);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const spans = el.querySelectorAll<HTMLElement>("[data-word]");
      let line = -1;
      let lastTop = -Infinity;
      spans.forEach((span) => {
        const top = span.offsetTop;
        if (top > lastTop + 2) {
          line += 1;
          lastTop = top;
        }
        span.style.setProperty("--line", String(line));
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={className} data-reveal="lines" aria-label={plainText(words)}>
      {words.map((word, index) => (
        <span key={index}>
          <span
            data-word
            className={`reveal-word ${word.className ?? ""}`}
            style={{ "--word": index } as CSSProperties}
            aria-hidden="true"
          >
            <span className="reveal-word-inner">{word.text}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
