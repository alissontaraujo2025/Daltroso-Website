# CLAUDE.md — Daltroso Website Experimental

## Papel do Claude neste projeto
Atuar como parceiro de UX/UI, direção de arte e desenvolvimento front-end.

Trabalhar de forma objetiva, econômica em tokens e sempre por etapas curtas.

## Objetivo do projeto
Criar um site institucional autoral para Daltroso Advocacia e Consultoria Jurídica, com linguagem editorial, cinematográfica e interativa.

O site não deve parecer um template tradicional de advocacia.

## Conceito central
**Mais que consultoria. Inteligência jurídica.**

## Direção de arte
- fotografia realista e sofisticada
- luz natural ou cinematográfica suave
- tipografia grande e editorial
- composição limpa
- azul profundo como cor institucional
- tons quentes de luz como contraste
- movimento sutil
- atmosfera premium
- presença humana sem clichês jurídicos

## Linguagem visual a evitar
- martelo de juiz
- balança da justiça como elemento principal
- colunas gregas
- estátuas genéricas
- excesso de dourado
- estética de banco de imagens
- visual corporativo genérico
- neon
- futurismo exagerado
- glassmorphism excessivo
- efeitos 3D gratuitos
- animações chamativas sem função

## Princípio de interação
Cada seção deve ser pensada como uma cena.

Uma cena deve conduzir visualmente à próxima.

Usar como elementos de continuidade:
- luz
- sombra
- fumaça
- movimento de câmera
- tipografia
- linhas editoriais
- recortes
- máscaras
- parallax discreto

## Movimento
Priorizar:
- reveal por máscara
- fade suave
- deslocamento vertical controlado
- parallax leve
- sticky sections
- pinning quando necessário
- mudanças graduais de fundo
- transições por scroll
- microinterações em hover

Evitar:
- zoom agressivo
- bounce
- animações rápidas
- excesso de elementos simultâneos
- movimento sem propósito

## Processo obrigatório
Antes de desenvolver uma nova seção:
1. Ler `/docs/04-scene-flow.md`
2. Ler o `brief.md` da cena correspondente
3. Verificar assets disponíveis
4. Descrever rapidamente a solução proposta
5. Implementar somente a etapa solicitada

## Regra de escopo
Não criar o site inteiro de uma vez sem solicitação explícita.

Trabalhar uma cena ou componente por vez.

## Regra de código
- código limpo
- componentes reutilizáveis
- evitar dependências desnecessárias
- priorizar performance
- respeitar acessibilidade
- animações e transições de cena rodam sempre, mesmo com `prefers-reduced-motion` ativo no sistema (decisão do cliente em 2026-10-07: o movimento é essencial para a sensação de modernidade). Não reintroduzir checagens de movimento reduzido.
- vídeo nunca deve bloquear carregamento principal
- prever fallback estático para vídeo
- mobile não pode depender de hover

## Motion e vídeo
Os vídeos gerados por IA serão tratados como assets de ambientação e transição.

Não usar texto dentro dos vídeos.
Não embutir logos geradas pela IA quando puderem ser aplicadas no front-end.
Não depender de vídeo para transmitir informação essencial.

## Conteúdo
Não inventar informações jurídicas, títulos profissionais, números, endereços, depoimentos ou credenciais.

Quando conteúdo real estiver faltando, marcar claramente como placeholder.

## Forma de resposta
Ser direto.
Usar passos curtos.
Não repetir contexto já documentado.
Quando alterar arquivos, informar somente:
- o que foi alterado
- onde foi alterado
- qual é o próximo passo

## Estado atual (atualizado em 2026-10-07)

Publicado em produção: https://daltroso-site-experimental-reviewed.vercel.app (deploy via `vercel deploy --prod`).
Spec das mudanças: `docs/superpowers/specs/2026-10-07-modernizacao-virada-design.md`.

### Decisões de design já aprovadas
- Paleta da cliente mantida (azul profundo + dourado). Modernidade vem de cenas, animação, integração e tipografia; nada futurista.
- Só 2 fontes: **Bebas Neue** = pôster (título do hero, cena A Virada, verbos do Método, logo); **Host Grotesk** = todo o resto (títulos 500, texto 400). Não usar Inter nem serifa.
- Escala tipográfica única em `src/app/globals.css`: `--title-bebas`, `--title-poster`, `--title-section`, `--title-card`, `--text-lead`, `--text-body`. Novos textos devem usar esses tokens.
- Destaque dourado (`.accent`) em uma palavra-chave por título.
- Palavras gigantes vazadas (`src/components/OutlineWord.tsx`): DEFESA (Áreas), JUSTIÇA (Equipe), DIREITOS (Contato), DALTROSO (rodapé); número "01" no Método.
- Cena "A Virada" (`src/sections/ViradaScene.tsx`) entre Quem somos e Áreas: linha de luz revela a mesma sala ao anoitecer (imagens em `public/images/virada-*.webp`).
- Cabeçalho fixo após o hero (`src/components/SiteHeader.tsx`); link do WhatsApp centralizado em `src/lib/contact.ts`.

### Próximos passos
1. ~~Copy~~ revisada e validada em 2026-10-07 (sem "caso" visível; voz "nós" + "você"). Atendimento: Cruz Alta e região; Marcelo também em POA e região metropolitana. Contato não é só com a Bianca (também secretária e Rodrigo).
2. ~~F3: Áreas como Hub~~ feito (`PracticeAreasSection.tsx`), com foco contínuo por rolagem. Publicado em 2026-10-07 (commit 3ed4549, junto da rolagem suave Lenis no desktop; enviado ao GitHub). Tags só existem em Crimes digitais: pedir as das outras áreas à cliente.
3. ~~F4~~ feito: duotone e linha de luz na Equipe; verbos do Método em Bebas, tags em Host Grotesk, prévia flutuante só em telas ≥ 1025px com mouse. O "01" vazado do Método fica (decisão posterior à spec).
4. ~~Ajustes menores~~ feitos: brilho do CTA do cabeçalho só dispara quando ele aparece; Virada mobile troca a frase quando a linha atravessa o texto; imagens brutas de `scenes/*/assets/` fora do git (ficam só no disco) e `.vercelignore` deixa material de trabalho fora da publicação.
5. F5 (copy) feita. Dados em `src/data/office.ts` (fonte: perfil no Google, confirmado em 2026-10-07): endereço, horário, plantão (55) 99202-5742 (urgências criminais; destacado no Contato e no rodapé). Falta só o registro da sociedade na OAB (PLACEHOLDER `null`). No Google o nome ainda é "Advocacia e Consultoria Jurídica": sugerir à cliente atualizar.
