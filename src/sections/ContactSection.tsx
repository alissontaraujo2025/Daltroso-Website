import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { IconFacebook, IconInstagram, IconYouTube } from "@/components/icons/SocialIcons";
import styles from "./ContactSection.module.css";

const CHANNELS = [
  {
    name: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=555592025742",
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
        <h2 className={styles.headline}>Cada situação pede uma leitura própria.</h2>

        <p className={styles.support}>
          O atendimento parte da compreensão do contexto, das particularidades
          e dos caminhos jurídicos possíveis para cada caso.
        </p>

        <p className={styles.smallLine}>Atendimento presencial e online.</p>

        <div className={styles.channels}>
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
