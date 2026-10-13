"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { NAV_LINKS } from "@/data/site";
import { whatsappHref } from "@/lib/contact";
import styles from "./SiteHeader.module.css";

/**
 * Cabeçalho fino que aparece quando o hero termina.
 * Enquanto o hero está na tela ele fica fora do fluxo e fora do foco (inert).
 */
export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-pin]");
    if (!hero) return;

    // A faixa do topo (altura do cabeçalho + 1px) não conta: num salto por âncora para
    // "Quem somos", a sobra do hero fica sob o cabeçalho e ele precisa continuar visível.
    const headerH =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 64;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { rootMargin: `-${headerH + 1}px 0px 0px 0px` }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      data-site-header
      className={`${styles.header} ${visible ? styles.visible : ""}`}
      inert={!visible}
    >
      <a href="#top" className={styles.logo} aria-label="Daltroso, voltar ao topo">
        Daltroso
      </a>

      <nav className={styles.nav} aria-label="Navegação fixa">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
      </nav>

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
    </header>
  );
}
