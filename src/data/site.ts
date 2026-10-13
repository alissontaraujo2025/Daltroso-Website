/**
 * Identidade do site: nome, descrição e endereço público.
 * Com domínio próprio, basta definir NEXT_PUBLIC_SITE_URL na Vercel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://daltroso-site-experimental-reviewed.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Daltroso Advocacia e Inteligência Jurídica";

export const SITE_DESCRIPTION =
  "Escritório de advocacia com atuação criminal, civil, imobiliária e militar e atenção especial a golpes e crimes na internet. Atendimento presencial em Cruz Alta (RS) e região, em Porto Alegre e região metropolitana, e online.";

/** Âncoras das seções, na ordem da página. Hero e cabeçalho usam a versão curta. */
export const NAV_LINKS = [
  { label: "quem somos", href: "#quem-somos" },
  { label: "atuação", href: "#atuacao" },
  { label: "equipe", href: "#equipe" },
  { label: "atendimento", href: "#atendimento" },
];

export const FOOTER_LINKS = [
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Áreas de atuação", href: "#atuacao" },
  { label: "Como trabalhamos", href: "#metodo" },
  { label: "Equipe", href: "#equipe" },
  { label: "Atendimento", href: "#atendimento" },
];
