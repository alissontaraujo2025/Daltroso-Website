// Copy revisada e validada com o escritório em 2026-10-07.

export type PracticeAreaIcon = "digital" | "shield" | "document" | "house" | "insignia" | "chat";

export type PracticeArea = {
  id: string;
  icon: PracticeAreaIcon;
  title: string;
  text: string;
  /** Assunto usado na mensagem do WhatsApp e no CTA. Sem assunto = "o meu caso". */
  subject?: string;
  tags?: string[];
};

// A ordem é intencional: crimes digitais em primeiro é o destaque da cena.
export const practiceAreas: PracticeArea[] = [
  {
    id: "crimes-digitais",
    icon: "digital",
    title: "Crimes digitais",
    subject: "crimes digitais",
    text: "Caiu num golpe, teve a conta invadida ou fotos expostas? Quanto antes você agir, mais provas é possível preservar.",
    tags: [
      "Golpe do Pix",
      "Golpe do WhatsApp",
      "Falsa central de atendimento",
      "Golpe do falso advogado",
      "Fraude com cartão",
      "Deepfake e uso de IA",
      "Vazamento e venda de dados",
      "Crimes sexuais e contra crianças",
    ],
  },
  {
    id: "criminal",
    icon: "shield",
    title: "Direito Criminal",
    subject: "Direito Criminal",
    text: "Defesa em inquéritos e processos criminais. Você sabe o que vai acontecer antes de cada audiência.",
  },
  {
    id: "civil",
    icon: "document",
    title: "Direito Civil",
    subject: "Direito Civil",
    text: "Dívidas, danos, contratos descumpridos e outros conflitos que precisam de uma decisão judicial.",
  },
  {
    id: "imobiliario",
    icon: "house",
    title: "Direito Imobiliário",
    subject: "Direito Imobiliário",
    text: "Compra e venda, locação, regularização de documentos e desacordos entre comprador, vendedor, locador e inquilino.",
  },
  {
    id: "militar",
    icon: "insignia",
    title: "Direito Militar",
    subject: "Direito Militar",
    text: "Processos e questões de carreira de militares, com quem conhece as regras da caserna.",
  },
  {
    id: "outro-caso",
    icon: "chat",
    title: "Sua situação não está aqui?",
    text: "Explique em poucas linhas. Se não for a nossa área, indicamos um advogado ou profissional parceiro.",
  },
];
