import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { IconFacebook, IconInstagram, IconYouTube } from "@/components/icons/SocialIcons";
import { whatsappHref } from "@/lib/contact";
import styles from "./ContactSection.module.css";

const CHANNELS = [
  {
    name: "WhatsApp",
    href: whatsappHref(),
    Icon: WhatsAppIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/daltrosoadvocacia/",
    Icon: IconInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/daltrosoadvocacia",
    Icon: IconFacebook,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@bdaltrosoadvocacia",
    Icon: IconYouTube,
  },
];

export function ContactSection() {
  return (
    <section className={styles.scene} id="atendimento">
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />
      <div className={styles.bridge} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 className={styles.headline} data-reveal="mask">
          Cada situação pede uma <span className="accent">leitura própria.</span>
        </h2>

        <p
          className={styles.support}
          data-reveal="up"
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          O atendimento parte da compreensão do contexto, das particularidades
          e dos caminhos jurídicos possíveis para cada&nbsp;caso.
        </p>

        <p
          className={styles.smallLine}
          data-reveal="up"
          style={{ ["--reveal-delay" as string]: "320ms" }}
        >
          Atendimento presencial e&nbsp;online.
        </p>

        <div
          className={styles.ctaWrap}
          data-reveal="up"
          style={{ ["--reveal-delay" as string]: "420ms" }}
        >
          <a
            className={`${styles.cta} cta-animated`}
            href={whatsappHref("Olá! Gostaria de falar sobre o meu caso.")}
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

        <div
          className={styles.channels}
          data-reveal="up"
          style={{ ["--reveal-delay" as string]: "560ms" }}
        >
          <span className={styles.channelsLabel}>Canais de atendimento</span>

          <div className={styles.channelsRow}>
            {CHANNELS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                className={styles.channel}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} (abre em nova aba)`}
              >
                <span className={styles.channelIcon}>
                  <Icon className={styles.channelIconSvg} />
                </span>
                <span className={styles.channelName}>{name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
