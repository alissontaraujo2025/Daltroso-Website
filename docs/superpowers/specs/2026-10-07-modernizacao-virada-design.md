# Modernização do site Daltroso: cena "A Virada" e novo sistema tipográfico

**Data:** 2026-10-07
**Status:** aprovado em conversa, aguardando revisão da spec escrita

## 1. Objetivo

Modernizar o site em **design e estética**, sem mudar a identidade da cliente, para que o público final (vítima de golpe, família de preso, empresário local) perceba logo de cara que este escritório é diferente, e chame no WhatsApp.

A modernidade vem de quatro frentes: **cenas, animação, integração entre seções e tipografia**.

### Restrições

- **Paleta da cliente intocada:** azul profundo `#0C1826`, dourado claro `#F0D6A8`, âmbar `#E8B36D` e creme do CTA `#F2DDBA`. A estratégia de marca sugeria ciano, prata e coral, e **foi rejeitada**.
- **Nada futurista:** sem HUD, neon, holograma, código flutuante ou cyberpunk.
- **Nome oficial:** Daltroso Advocacia e Inteligência Jurídica.
- Continuam valendo todas as regras do `CLAUDE.md`. **Atualização 2026-10-07:** por decisão da cliente, as animações rodam sempre, mesmo com `prefers-reduced-motion` (os itens de movimento reduzido abaixo ficam sem efeito). Demais regras: vídeo nunca bloqueia o carregamento; fallback estático; mobile sem depender de hover; não inventar conteúdo.

## 2. Narrativa: a ordem das cenas

| # | Cena | Atmosfera | Escopo |
|---|---|---|---|
| 1 | Hero | Quente (vida real) | Tipografia e linha de apoio |
| 2 | Quem somos | Quente | Tipografia; a saída passa a emendar com a Virada |
| 3 | **A Virada** (nova) | Quente → digital, no azul profundo | Cena nova |
| 4 | Áreas, tratada como "Hub" | Digital | Refeita como cena sticky |
| 5 | Como trabalhamos | Digital | Tipografia e limpezas |
| 6 | Equipe | Digital | Tratamento de cor das fotos |
| 7 | Contato | Volta ao quente | Tipografia e CTA |

"Digital" **não** quer dizer cor nova. É o mesmo azul profundo, com luz mais fria e linhas finas de conexão em dourado claro.

## 3. Sistema tipográfico

| Papel | Fonte | Uso | Regras |
|---|---|---|---|
| Pôster | **Bebas Neue** (a fonte da logo) | Wordmark "DALTROSO", título do hero, frase da Virada, verbos do Método | Só em tamanho grande (≥ 64px), em caixa alta, que é a natureza da fonte |
| Editorial | **DM Serif Display** | Títulos de seção, "Mais que consultoria." | **Caixa normal**, nunca caixa alta |
| Texto | **Host Grotesk** (400 e 500) | Parágrafos, cards, menu, botões, legendas | Substitui a Inter |

- **Saem:** Inter, Inter Tight e DM Mono.
- **Carregamento:** a Host Grotesk faz preload, porque é o texto do hero. A Bebas faz preload, porque é o título do hero. A DM Serif Display mantém o preload atual.
- **Escalas:** as variáveis `--title-poster` e `--title-section` continuam. Entra `--title-bebas` para o pôster em Bebas, que precisa de um tamanho maior que a serifa para ter o mesmo peso visual (referência: cerca de 1,5× `--title-poster`).
- **Logo do site** (hero e rodapé): "DALTROSO" em Bebas com espaçamento largo (cerca de 0,32em) e a linha "ADVOCACIA E INTELIGÊNCIA JURÍDICA" em Host Grotesk pequena.

## 4. Limpezas globais (valem para o site inteiro)

1. **Destaque de meia frase em dourado** (`.accent`): fica só no hero e no contato. Nas cenas do meio, títulos todos em branco.
2. **Rótulos em caixa alta com fio** (`.eyebrow-line`) antes dos títulos: saem de Áreas, Método e Equipe.
3. **Barra de progresso de leitura** (`.scroll-progress`): sai.
4. **CTA animado:** sai o pulso infinito. O brilho passa **uma vez** quando o botão entra na tela. O hover continua.
5. **Reveal por máscara:** fica só nos títulos de pôster (hero, Virada, contato). Nas outras seções, só um fade curto.
6. **Cabeçalho fino fixo:** logo à esquerda e CTA à direita. Aparece quando o hero termina, reaproveitando a lógica de `--p-nav`, e garante navegação e atendimento acessíveis na página toda.
7. **Hero:** a linha de apoio perde os `<br />` manuais e passa a usar largura máxima com `text-wrap: balance`.

## 5. Cena "A Virada"

### 5.1 Conceito

A frase de propósito da marca é **dividida pela própria transição**:

- Sobre a imagem quente: **"Garantir que seus direitos sejam respeitados, na vida real"**
- Depois que a linha passa, sobre a imagem digital: **"e no mundo digital."**

A frase vem dos slides de estratégia da cliente, portanto é conteúdo aprovado. **Ela sai do hero** para não aparecer duas vezes. A nova linha de apoio do hero é **placeholder** até a etapa de copy (Fase 5).

### 5.2 Camadas (de baixo para cima)

1. **Imagem digital:** `public/images/virada-desktop.webp` / `virada-mobile.webp`.
2. **Imagem quente:** os posters atuais de "Quem somos" (`scene-02-daltroso-*-poster.webp`), recortados por `clip-path` conforme o progresso do scroll.
3. **Linha de varredura:** 1px em creme `#F2DDBA`, com brilho suave, posicionada exatamente na borda do recorte.
4. **Linhas de conexão:** SVG inline com `stroke-dashoffset` controlado pelo progresso, em dourado claro com baixa opacidade.
5. **Texto:** as duas metades da frase, em Bebas.

### 5.3 Roteiro do scroll (desktop)

A cena fica fixa (sticky) por cerca de **300vh**. O progresso `p` vai de 0 a 1.

| `p` | O que acontece |
|---|---|
| 0 a 0,15 | Imagem quente inteira. Aproximação leve (`scale` de 1 para 1,04). A primeira metade da frase sobe. |
| 0,15 a 0,70 | A linha varre da **esquerda para a direita** e o recorte da imagem quente acompanha. A primeira metade da frase esmaece a partir de 0,45, e a segunda nasce a partir de 0,55. |
| 0,70 a 1 | O digital se assenta. As linhas de conexão se desenham e "escorrem" para baixo, para dentro de Áreas. O fundo escurece até `#0C1826`. |

**Mobile (≤ 767px):** imagens verticais, a linha varre **de cima para baixo** e a cena fica fixa por cerca de **200vh**.

**`prefers-reduced-motion`:** sem pinning. A cena vira uma imagem estática dividida ao meio (metade quente, metade digital), com a linha no centro e a frase inteira.

### 5.4 Emenda com "Quem somos"

O `.exitFade` de Quem somos sai. Quem somos termina sobre o mesmo enquadramento (o vídeo dela é o mesmo quadro do poster quente), então a Virada continua a imagem sem corte.

### 5.5 Acessibilidade

- Um único `<h2>` com a frase completa em `.sr-only`. As duas metades visuais ficam com `aria-hidden="true"`.
- As imagens são decorativas (`alt=""` ou CSS background).
- Sem foco interativo dentro da cena.

### 5.6 Performance

- As imagens da Virada **não** competem com o hero: carregam com lazy loading (`loading="lazy"` ou carregamento por IntersectionObserver) e sem preload.
- Meta de peso: até ~250 KB por imagem webp.
- Animação só com `transform`, `opacity` e `clip-path`, atualizada em `requestAnimationFrame`.

### 5.7 Código

- **Novo:** `src/sections/ViradaScene.tsx` e `ViradaScene.module.css`.
- **Novo:** `src/lib/useScrollProgress.ts`, um hook que mede o progresso de um elemento sticky e escreve variáveis CSS. O `Hero.tsx` já tem essa lógica embutida, então o hook é extraído dela e passa a ser usado pelos dois (melhoria pontual, sem refatorar o resto).
- **Alterado:** `src/app/page.tsx` (a cena entra entre `AboutManifesto` e `PracticeAreasSection`).

## 6. Produção da imagem digital (Kling)

### 6.1 Requisito crítico: alinhamento

A imagem digital precisa ter **o mesmo enquadramento** que a quente. Mesa, xícara, janela, livros e porta-canetas no mesmo lugar, senão a varredura não funciona.

### 6.2 Processo

1. **Origem:** os PNGs originais `public/videos/scene-02-daltroso-desktop-poster.png` (16:9) e `-mobile-poster.png` (9:16).
2. **Geração:** `image_to_image` do Kling, com influência alta da referência, **2 variações por formato** (4 gerações no total).
3. **Antes de enviar:** confirmar com o usuário o prompt final, o modelo e o custo em créditos. Nada é enviado sem esse ok.
4. **Checagem de alinhamento:** sobrepor cada variação à original no navegador (opacidade 50% e `mix-blend-mode: difference`). Aprovada se os contornos principais (xícara, borda da mesa, caixilhos da janela) coincidirem visualmente.
5. **Exportação:** webp, desktop com cerca de 1920px de largura e mobile com cerca de 1080px, em `public/images/`.
6. **Plano B**, se nenhuma variação alinhar: gerar a versão digital por tratamento da própria original (gradação para o azul profundo, luz fria, sombras mais densas). O alinhamento fica garantido, com menos riqueza.

### 6.3 Prompt base

> Same exact scene, same camera angle, same composition and framing. Dusk / blue hour: the warm golden sunlight is replaced by soft, cool deep-navy evening light coming through the window. Wood surfaces keep their texture but read darker and cooler. Very subtle cool reflections on the desk. The paper document on the desk becomes a thin dark glass slate, blank, no text. Keep the navy cup with its logo, the saucer, the steam, the books and the pen holder unchanged and in the same positions. Photorealistic, cinematic, quiet. No neon, no holograms, no HUD, no floating code, no screens with text, no cyan glow.

Ajustar a proporção para cada formato (16:9 e 9:16).

## 7. Áreas como "Hub"

Cena sticky que substitui a grade de cards e cumpre o brief da cena 03: uma área por vez, título grande e sem cards tradicionais.

- **Desktop:** à esquerda, a lista de áreas em DM Serif grande, com a área ativa em branco e as outras em cerca de 30% de opacidade, avançando pelo scroll. À direita, um painel fixo com o texto, as tags e o CTA "falar sobre [área]" (WhatsApp com mensagem pré-preenchida, como hoje). Linhas de conexão em dourado claro ligam a área ativa ao painel.
- **Ordem:** Crimes digitais, Direito Criminal, Direito Civil, Direito Imobiliário, Direito Militar, e por fim "Não encontrou o seu caso?". O destaque de Crimes digitais vem da posição; o selo "Destaque" sai.
- **Mobile:** sanfona (`<details>`/`<summary>` ou equivalente acessível), uma área aberta por vez, sem pinning.
- ~~**Reduced motion:** a lista com todos os painéis visíveis, sem pinning.~~ (sem efeito desde 2026-10-07)
- **Dados:** continuam em `src/data/practiceAreas.ts`, com a copy ainda marcada como PLACEHOLDER.

## 8. Método e Equipe

**Como trabalhamos**
- Os verbos passam a usar Bebas.
- As tags passam a usar Host Grotesk (sai a DM Mono).
- O número gigante vazado sai.
- A prévia flutuante fica limitada a telas ≥ 1025px **e** com ponteiro fino.

**Equipe**
- Tratamento de cor único nas fotos, dentro da paleta: leve dessaturação, uma camada azul profundo em `multiply` e um degradê quente vindo de baixo. A troca da foto do Rodrigo (fundo com logos de evento) fica como recomendação para a cliente.

## 9. Copy (Fase 5)

- Nova linha de apoio do hero (hoje placeholder).
- Novo título do contato, para resolver as 3 repetições de "leitura".
- Revisão aplicando a skill `tom-de-voz-alisson` e o tom da estratégia (direto, inteligente, humano).
- Endereço, horário, telefone visível e registro da sociedade na OAB: **pedir à cliente**. Até lá, entram como placeholder marcado.

## 10. Fases de implementação

Cada fase tem o próprio plano e a própria revisão. Uma cena por vez, como manda o `CLAUDE.md`.

| Fase | Entrega | Depende de |
|---|---|---|
| **F1** | Sistema tipográfico e limpezas globais (seções 3 e 4) | — |
| **F2** | Cena A Virada, imagens e componente (seções 5 e 6) | F1 |
| **F3** | Áreas como Hub (seção 7) | F1 |
| **F4** | Ajustes de Método e Equipe (seção 8) | F1 |
| **F5** | Copy (seção 9) | F1 a F4 |

O próximo plano de implementação cobre **F1 e F2**.

## 11. Verificação

O projeto não tem testes automatizados. Cada fase é verificada assim:

- `npm run build` sem erros.
- Capturas no Playwright em 1440×900 e 390×844, em cada cena afetada, comparando antes e depois.
- Emulação de `prefers-reduced-motion: reduce`: animações e pinning continuam rodando (decisão de 2026-10-07).
- Navegação por teclado: foco visível, skip link e cabeçalho fixo acessível.
- Hero: a imagem da Virada não aparece nas requisições iniciais (aba Network, só depois do scroll).
- Console sem erros.

## 12. Fora do escopo

- Mudanças de paleta.
- Novos vídeos (a Virada usa imagens estáticas e máscara; vídeo pode substituí-la no futuro sem refazer a cena).
- Área de conteúdo, blog ou FAQ (Cena 05 do scene-flow).
- Troca da foto do Rodrigo (depende da cliente).
