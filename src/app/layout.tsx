import type { Metadata, Viewport } from "next";
import { DM_Mono, DM_Serif_Display, Inter, Inter_Tight } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Cena "Como trabalhamos" (referência: design system VOID/03)
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-display",
  display: "swap",
  // Só aparece mais abaixo na página: não disputa o carregamento do hero
  preload: false,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
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
      className={`${dmSerifDisplay.variable} ${inter.variable} ${interTight.variable} ${dmMono.variable}`}
    >
      <body>
        <a href="#quem-somos" className="skip-link">
          Pular para o conteúdo
        </a>
        <div className="scroll-progress" aria-hidden="true" />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
