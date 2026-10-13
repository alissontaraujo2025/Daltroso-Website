import { office } from "@/data/office";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";
import { WHATSAPP_PHONE } from "@/lib/contact";

/**
 * Dados estruturados (schema.org) para o Google entender o escritório:
 * endereço, telefone, horário e redes. Só usa dados reais de data/office.ts.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.jpg`,
    telephone: `+${WHATSAPP_PHONE}`,
    address: { "@type": "PostalAddress", ...office.postalAddress },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: ["Cruz Alta", "Porto Alegre", "Rio Grande do Sul"],
    sameAs: Object.values(office.social),
  };

  return (
    <script
      type="application/ld+json"
      // "<" escapado para o JSON nunca fechar a tag <script> antes da hora
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
