import type Lenis from "lenis";

/** Instância da rolagem suave (só existe no desktop, com movimento liberado). */
let instance: Lenis | null = null;

export function setSmoothScroll(lenis: Lenis | null) {
  instance = lenis;
}

/** Rola até uma posição: com a Lenis quando ativa, senão com o scroll nativo. */
export function scrollToY(top: number) {
  if (instance) {
    instance.scrollTo(top, { duration: 1.2 });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
