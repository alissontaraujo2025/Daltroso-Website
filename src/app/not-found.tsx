import type { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Página não encontrada | Daltroso",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>
        Esta página <span className="accent">não existe.</span>
      </h1>
      <p className={styles.text}>O endereço pode ter mudado ou foi digitado com algum erro.</p>
      <a href="/" className={styles.link}>
        Voltar para o início
      </a>
    </main>
  );
}
