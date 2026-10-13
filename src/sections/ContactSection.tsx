import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { OutlineWord } from "@/components/OutlineWord";
import { IconFacebook, IconInstagram, IconYouTube } from "@/components/icons/SocialIcons";
import { office } from "@/data/office";
import { whatsappHref } from "@/lib/contact";
import { noWidow } from "@/lib/typography";
import { RevealTitle } from "@/components/RevealTitle";
import styles from "./ContactSection.module.css";

const CHANNELS = [
  {
    name: "WhatsApp",
    href: whatsappHref(),
    Icon: WhatsAppIcon,
  },
  {
    name: "Instagram",
    href: office.social.instagram,
    Icon: IconInstagram,
  },
  {
    name: "Facebook",
    href: office.social.facebook,
    Icon: IconFacebook,
  },
  {
    name: "YouTube",
    href: office.social.youtube,
    Icon: IconYouTube,
  },
];

export function ContactSection() {
  return (
    <section className={styles.scene} id="atendimento">
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />
      <div className={styles.bridge} aria-hidden="true" />
      <OutlineWord word="Direitos" placement="top-left" />
      <div className={styles.inner}>
        <RevealTitle className={styles.headline}>
          Explique a situação. <span className="accent">Dizemos o que pode ser&nbsp;feito.</span>
        </RevealTitle>

        <p
          className={styles.support}
          data-reveal="up"
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          Mande pelo WhatsApp um resumo: o que aconteceu, quando e se já existe
          processo. Respondemos rápido e marcamos uma reunião para analisar a&nbsp;situação.
        </p>

        <p
          className={styles.smallLine}
          data-reveal="up"
          style={{ ["--reveal-delay" as string]: "320ms" }}
        >
          {noWidow(office.serviceArea)}
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

          <p className={styles.oncall}>
            Situação urgente na área criminal? Ligue para o plantão:{" "}
            <a href={office.oncall.href} className={styles.oncallLink}>
              {office.oncall.display}
            </a>
          </p>
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
