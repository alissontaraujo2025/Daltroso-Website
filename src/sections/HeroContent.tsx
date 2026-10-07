import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";
import styles from "./HeroContent.module.css";

const NAV_LINKS = [
  { label: "quem somos", href: "#quem-somos" },
  { label: "atuação", href: "#atuacao" },
  { label: "equipe", href: "#equipe" },
  { label: "atendimento", href: "#atendimento" },
];

export function HeroContent() {
  return (
    <div className={styles.overlay}>
      <div className={styles.topBar}>
        <p className={styles.logo}>
          Daltroso
          <span className={styles.logoSub}>Advocacia e Inteligência Jurídica</span>
        </p>

        <a
          className={`${styles.cta} cta-animated`}
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Atendimento online pelo WhatsApp (abre em nova aba)"
        >
          <span className={styles.ctaLabel}>atendimento online</span>
          <span className={styles.ctaIconBadge} data-cta-badge>
            <WhatsAppIcon className={styles.ctaIcon} />
          </span>
        </a>
      </div>

      <div className={styles.main}>
        <h1 className={styles.headline}>
          <span className={styles.eyebrow}>Mais que consultoria.</span>
          <span className={styles.big}>Inteligência</span>
          <span className={`${styles.big} ${styles.bigWarm}`}>jurídica.</span>
        </h1>

        {/* PLACEHOLDER: linha de apoio do hero, a validar na etapa de copy (F5). */}
        <p className={styles.support}>
          Defesa criminal, cível e digital, com cada etapa explicada.
        </p>
      </div>

      <nav className={styles.nav} aria-label="Navegação principal">
        {NAV_LINKS.map((link, index) => (
          <span className={styles.navItem} key={link.href}>
            {index > 0 && <span className={styles.navSeparator} aria-hidden="true">|</span>}
            <a href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          </span>
        ))}
      </nav>
    </div>
  );
}
