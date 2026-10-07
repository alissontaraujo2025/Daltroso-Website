/**
 * Dados institucionais do escritório (fonte: perfil da empresa no Google,
 * confirmado pelo cliente em 2026-10-07). Campos `null` ainda não foram
 * confirmados e ficam fora do site até serem preenchidos.
 */
export const office = {
  serviceArea:
    "Presencial em Cruz Alta e região e em Porto Alegre e região metropolitana. Também online.",
  address: "Av. Plácido de Castro, 857, Bonini I, Cruz Alta (RS), CEP 98035-190",
  hours: "Segunda a sexta, das 9h às 18h",
  // Telefone de plantão: urgências na área criminal
  oncall: {
    display: "(55) 99202-5742",
    href: "tel:+5555992025742",
  },
  // PLACEHOLDER: registro da sociedade na OAB/RS (pedir à cliente)
  oabRegistration: null as string | null,
};
