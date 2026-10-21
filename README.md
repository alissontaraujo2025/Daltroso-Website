# Daltroso Advocacia e Inteligência Jurídica

Site institucional do escritório Daltroso: uma página única, editorial e cinematográfica, em que cada seção é uma cena conectada pela rolagem.

**Produção:** https://daltroso-site-experimental-reviewed.vercel.app

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, página estática) + React 19 + TypeScript
- CSS Modules, sem framework de UI
- [Lenis](https://lenis.darkroom.engineering/) para rolagem suave no desktop
- Hospedagem na Vercel

## Como rodar

Requer Node.js 20 ou mais recente.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | O que faz                                    |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                  |
| `npm run build`     | Build de produção                            |
| `npm run start`     | Serve o build de produção                    |
| `npm run typecheck` | Checagem de tipos (TypeScript)               |
| `npm run check`     | Typecheck + build: rodar antes de publicar   |

## Estrutura

```
src/
  app/          layout, página, metadados, 404, robots, sitemap, ícones e imagem de compartilhamento
  sections/     uma cena por arquivo (Hero, Quem somos, A Virada, Áreas, Método, Equipe, Contato, Rodapé)
  components/   peças reutilizáveis (vídeo de fundo, títulos revelados, cabeçalho, ícones)
  data/         conteúdo editável: site, escritório, áreas de atuação, equipe
  lib/          utilitários (WhatsApp, rolagem, tipografia, progresso de scroll)
public/
  images/       fotos da equipe e das cenas
  videos/       vídeos de fundo e seus pôsteres (.webp)

docs/           brief, direção de marca, fluxo de cenas, regras de animação, specs
scenes/         brief, notas e prompts de cada cena (imagens brutas ficam fora do git)
prompts/        prompts de imagem, vídeo e Claude usados na produção
references/     referências visuais, de tipografia e de movimento
skills/         skills de apoio ao Claude Code
```

Só `src/`, `public/` e os arquivos de configuração vão para a publicação; o material de trabalho é excluído pelo `.vercelignore`.

## Onde editar o conteúdo

| O quê                                         | Arquivo                      |
| --------------------------------------------- | ---------------------------- |
| Número do WhatsApp                            | `src/lib/contact.ts`         |
| Endereço, horário, plantão, redes sociais     | `src/data/office.ts`         |
| Nome, descrição, URL do site, links do menu   | `src/data/site.ts`           |
| Áreas de atuação                              | `src/data/practiceAreas.ts`  |
| Equipe                                        | `src/data/team.ts`           |

## Deploy

```bash
npm run check
vercel deploy --prod
```

Ao ligar um domínio próprio, defina a variável `NEXT_PUBLIC_SITE_URL` na Vercel (padrão no código: `https://www.daltrosoadvocacia.com.br`). Ela alimenta o link canônico, a prévia de compartilhamento, o sitemap e os dados estruturados do Google.
