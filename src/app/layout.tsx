import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Host_Grotesk } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

// Duas famílias no site todo: Bebas = pôster, Host Grotesk = todo o resto
// (títulos em 500, texto em 400)
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

// Fonte da logo da cliente: só em tamanho de pôster (hero, Virada, verbos do método)
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poster",
  display: "swap",
});

const TITLE = "Daltroso Advocacia e Inteligência Jurídica";
const DESCRIPTION =
  "Escritório de advocacia com atuação criminal, civil, imobiliária e militar e atenção especial a golpes e crimes na internet. Atendimento presencial em Cruz Alta (RS) e região, em Porto Alegre e região metropolitana, e online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Prévia ao compartilhar o link (WhatsApp, redes sociais)
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/videos/hero-daltroso-desktop-poster.jpg", alt: TITLE }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1826",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${hostGrotesk.variable} ${bebasNeue.variable}`}
    >
      <body>
        <a href="#quem-somos" className="skip-link">
          Pular para o conteúdo
        </a>
        <SiteHeader />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
