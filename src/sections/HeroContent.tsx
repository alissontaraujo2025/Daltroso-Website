import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import styles from "./HeroContent.module.css";

const WHATSAPP_HREF = "https://api.whatsapp.com/send?phone=555592025742";

const NAV_LINKS = [
  { label: "quem somos", href: "#quem-somos" },
  { label: "equipe", href: "#equipe" },
  { label: "atuação", href: "#atuacao" },
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
          className={styles.cta}
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Atendimento online pelo WhatsApp (abre em nova aba)"
        >
          <span className={styles.ctaLabel}>atendimento online</span>
          <span className={styles.ctaIconBadge}>
            <WhatsAppIcon className={styles.ctaIcon} />
          </span>
        </a>
      </div>

      <div className={styles.main}>
        <h1 className={styles.headline}>
          <span className={styles.eyebrow}>MAIS QUE CONSULTORIA.</span>
          <span className={styles.big}>INTELIGÊNCIA</span>
          <span className={`${styles.big} ${styles.bigWarm}`}>JURÍDICA.</span>
        </h1>

        <p className={styles.support}>
          Garantir que seus direitos sejam
          <br />
          respeitados, na vida real e no
          <br />
          mundo digital.
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
