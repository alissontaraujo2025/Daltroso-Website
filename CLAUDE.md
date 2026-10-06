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
- respeitar `prefers-reduced-motion` (desliga pinning e animações de scroll; os loops de vídeo ambiente continuam tocando, por decisão do cliente)
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
