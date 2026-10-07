import { OutlineWord } from "@/components/OutlineWord";
import styles from "./SiteFooter.module.css";

const LINKS = [
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Áreas de atuação", href: "#atuacao" },
  { label: "Como trabalhamos", href: "#metodo" },
  { label: "Equipe", href: "#equipe" },
  { label: "Atendimento", href: "#atendimento" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <OutlineWord word="Daltroso" placement="bottom-center" />
      <div className={styles.inner}>
        <p className={styles.logo}>
          Daltroso
          <span className={styles.logoSub}>Advocacia e Inteligência Jurídica</span>
        </p>

        <nav aria-label="Rodapé">
          <ul className={styles.links}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#top" className={styles.top} aria-label="Voltar ao topo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </a>
      </div>

      <p className={styles.copy}>
        © {year} Daltroso Advocacia e Inteligência Jurídica
      </p>
    </footer>
  );
}
