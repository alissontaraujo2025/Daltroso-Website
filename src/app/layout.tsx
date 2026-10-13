import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Host_Grotesk } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";
import "lenis/dist/lenis.css";
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

// A imagem de compartilhamento vem de app/opengraph-image.jpg (1200×630, leve para o WhatsApp)
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  // Prévia ao compartilhar o link (WhatsApp, redes sociais)
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
        <StructuredData />
        <a href="#quem-somos" className="skip-link">
          Pular para o conteúdo
        </a>
        <SiteHeader />
        {children}
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
