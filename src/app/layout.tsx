import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Serif_Display, Host_Grotesk } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-headline",
  display: "swap",
});

// Texto corrido, interface e botões
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
  "Mais que consultoria. Inteligência jurídica. Atuação nas áreas criminal, civil, imobiliária e militar, com atenção especial aos crimes digitais. Atendimento presencial e online.";

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
      className={`${dmSerifDisplay.variable} ${hostGrotesk.variable} ${bebasNeue.variable}`}
    >
      <body>
        <a href="#quem-somos" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
