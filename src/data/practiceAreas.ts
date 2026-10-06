// Descrições montadas a partir das bios da equipe (src/data/team.ts).
// PLACEHOLDER: copy das áreas ainda precisa ser validada pelo escritório.

export type PracticeAreaIcon = "digital" | "shield" | "document" | "house" | "insignia";

export type PracticeArea = {
  title: string;
  text: string;
  icon: PracticeAreaIcon;
  /** Cor de destaque do card (ícone, borda e hover). Dourado da marca; ciano só no destaque digital. */
  accent: string;
};

export const featuredArea = {
  title: "Crimes digitais",
  text: "Golpes virtuais, fraudes bancárias, invasão de contas e exposição indevida na internet. Se aconteceu com você, o primeiro passo é entender o que pode ser feito.",
  tags: ["Golpes virtuais", "Fraudes bancárias", "Invasão de contas", "Exposição indevida"],
  icon: "digital" as const,
  accent: "#6cc9d6",
};

export const practiceAreas: PracticeArea[] = [
  {
    title: "Direito Criminal",
    text: "Defesa em inquéritos e processos criminais, com cada etapa explicada.",
    icon: "shield",
    accent: "#e8b36d",
  },
  {
    title: "Direito Civil",
    text: "Conflitos do dia a dia, contratos e situações que precisam de solução na Justiça.",
    icon: "document",
    accent: "#e8b36d",
  },
  {
    title: "Direito Imobiliário",
    text: "Compra e venda, locação, regularização de documentos e conflitos entre as partes.",
    icon: "house",
    accent: "#e8b36d",
  },
  {
    title: "Direito Militar",
    text: "Atendimento a militares em processos e questões ligadas à carreira.",
    icon: "insignia",
    accent: "#e8b36d",
  },
];
