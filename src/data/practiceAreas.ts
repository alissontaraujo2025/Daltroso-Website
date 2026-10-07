// Descrições montadas a partir das bios da equipe (src/data/team.ts).
// PLACEHOLDER: copy das áreas ainda precisa ser validada pelo escritório.

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
    text: "Golpes virtuais, fraudes bancárias, invasão de contas e exposição indevida na internet. Se aconteceu com você, o primeiro passo é entender o que pode ser feito.",
    tags: ["Golpes virtuais", "Fraudes bancárias", "Invasão de contas", "Exposição indevida"],
  },
  {
    id: "criminal",
    icon: "shield",
    title: "Direito Criminal",
    subject: "Direito Criminal",
    text: "Defesa em inquéritos e processos criminais, com cada etapa explicada.",
  },
  {
    id: "civil",
    icon: "document",
    title: "Direito Civil",
    subject: "Direito Civil",
    text: "Conflitos do dia a dia, contratos e situações que precisam de solução na Justiça.",
  },
  {
    id: "imobiliario",
    icon: "house",
    title: "Direito Imobiliário",
    subject: "Direito Imobiliário",
    text: "Compra e venda, locação, regularização de documentos e conflitos entre as partes.",
  },
  {
    id: "militar",
    icon: "insignia",
    title: "Direito Militar",
    subject: "Direito Militar",
    text: "Atendimento a militares em processos e questões ligadas à carreira.",
  },
  {
    id: "outro-caso",
    icon: "chat",
    title: "Não encontrou o seu caso?",
    text: "Conte o que aconteceu e a equipe orienta você.",
  },
];
