export type TeamMember = {
  name: string;
  role: string;
  credential?: string;
  bio: string;
  photo: string;
  /** Enquadramento do rosto dentro do card (CSS object-position). */
  focus: string;
  /** Conteúdo ainda não confirmado pelo cliente. */
  placeholder?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Bianca Daltroso",
    role: "Advogada · Criminal, Cível e Militar",
    credential: "OAB/RS 135.231",
    bio: "Responsável pelo escritório, atua nas áreas criminal, cível e militar, com atenção especial aos crimes na internet. Faz questão de que você entenda cada decisão antes que ela seja tomada.",
    photo: "/images/bianca-daltroso.png",
    focus: "50% 18%",
  },
  {
    name: "Marcelo Tocchetto",
    role: "Advogado · Contratos e Direito Imobiliário",
    credential: "OAB/RS 69.744",
    bio: "Cuida da elaboração e revisão de contratos e das questões ligadas a imóveis: compra e venda, locação, regularização de documentos e conflitos entre as partes. Trabalha para evitar problemas antes que eles cheguem à Justiça e dar segurança a quem está fechando um negócio. Atende também em Porto Alegre e região metropolitana.",
    photo: "/images/marcelo-tocchetto.png",
    focus: "50% 6%",
  },
  {
    name: "Rodrigo Alisson Crispin Pereira",
    role: "Assistente Jurídico e Acadêmico de Direito",
    bio: "Estudante de Direito, acompanha o andamento dos processos, organiza documentos e apoia a equipe na pesquisa de leis e decisões dos tribunais. Está no dia a dia do escritório cuidando para que nenhum prazo ou detalhe fique para trás.",
    photo: "/images/rodrigo-pereira.png",
    focus: "50% 14%",
  },
  {
    name: "Larissa Daltroso",
    role: "Administrativo e Financeiro",
    bio: "Responsável pela organização interna do escritório. Cuida da agenda, do atendimento inicial, dos contratos de honorários, dos pagamentos e da emissão de documentos financeiros. É quem mantém a rotina em ordem para que você seja bem atendido do primeiro contato até o último documento.",
    photo: "/images/larissa-daltroso.png",
    focus: "50% 22%",
  },
];
