# F1 + F2: Tipografia, limpezas globais e cena "A Virada": plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar o sistema tipográfico do site (Bebas Neue + DM Serif Display + Host Grotesk), aplicar as limpezas globais e criar a cena sticky "A Virada", em que a imagem quente de "Quem somos" é varrida por uma linha e revela a mesma cena em versão digital.

**Architecture:** Next.js 15 (App Router) com CSS Modules e sem biblioteca de animação. O progresso de scroll é calculado por um hook (`useScrollProgress`) que escreve variáveis CSS num elemento sticky, e todo o visual reage a essas variáveis (`transform`, `opacity`, `clip-path`). As imagens da Virada são geradas no Kling (image-to-image) a partir dos posters existentes e exportadas em webp com `sharp`.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS Modules, `next/font/google`, sharp (já em `node_modules`), Kling MCP, Playwright MCP (verificação).

**Spec:** `docs/superpowers/specs/2026-10-07-modernizacao-virada-design.md`

## Global Constraints

- Paleta intocada: `#0C1826` (azul profundo), `#F0D6A8` (dourado claro), `#E8B36D` (âmbar), `#F2DDBA` (creme do CTA), `#16233B` (texto do CTA). Nenhuma cor nova.
- Nada futurista: sem HUD, neon, holograma, código flutuante, ciano.
- Nome oficial: "Daltroso Advocacia e Inteligência Jurídica".
- Fontes: `--font-poster` = Bebas Neue (≥ 64px, caixa alta); `--font-headline` = DM Serif Display (caixa normal); `--font-sans` = Host Grotesk 400/500. Inter, Inter Tight e DM Mono saem.
- `prefers-reduced-motion: reduce` desliga o pinning e as animações de scroll. Os loops de vídeo ambiente continuam.
- Vídeos e imagens da Virada nunca bloqueiam o carregamento do hero (lazy, sem preload).
- Mobile não depende de hover. Breakpoint mobile: `max-width: 767px`.
- Não inventar conteúdo. Texto novo sem validação leva o comentário `// PLACEHOLDER:` no código.
- Comentários no código em português, no mesmo estilo dos existentes.
- Não há testes automatizados. Cada tarefa é verificada com `npm run build` e checagens no Playwright MCP (servidor em `http://localhost:3000` via `npm run dev`).

## Review Focus

1. **Movimento reduzido:** com `prefers-reduced-motion: reduce`, a Virada não fica fixa, as duas metades da frase aparecem e nada fica com `opacity: 0`. (Tarefa 7, Step 6.)
2. **Saltar pela âncora:** clicar em "atuação" no cabeçalho fixo leva ao título de Áreas sem que ele fique escondido sob o cabeçalho (`scroll-margin-top`). (Tarefa 4, Step 6.)
3. **Celular estreito (320px):** o título "INTELIGÊNCIA" em Bebas e o cabeçalho fixo cabem sem rolagem horizontal. (Tarefa 2, Step 5; Tarefa 4, Step 6.)
4. **Imagem da Virada lenta ou ausente:** o fundo cai para `#0C1826` e a frase continua legível. (Tarefa 7, Step 6.)
5. **Cabeçalho escondido e teclado:** enquanto está oculto (sobre o hero), o cabeçalho não recebe foco por Tab (`inert`). (Tarefa 4, Step 6.)

---

## Estrutura de arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `src/app/layout.tsx` | Modificar | Carregar as 3 fontes; montar o `SiteHeader`; remover a barra de progresso |
| `src/app/globals.css` | Modificar | `--title-bebas`; CTA com brilho único; remover a barra de progresso; `scroll-margin-top` |
| `src/lib/contact.ts` | Criar | Telefone e geração do link do WhatsApp (fonte única) |
| `src/lib/useScrollProgress.ts` | Criar | Hook de progresso de um elemento sticky e `remap()` |
| `src/components/SiteHeader.tsx` + `.module.css` | Criar | Cabeçalho fino fixo que aparece depois do hero |
| `src/sections/Hero.tsx` | Modificar | Usar `useScrollProgress`; `data-hero-pin` |
| `src/sections/HeroContent.tsx` + `.module.css` | Modificar | Logo em Bebas, título em Bebas, apoio sem `<br />`, CTA em Host Grotesk |
| `src/sections/SiteFooter.module.css` | Modificar | Logo em Bebas |
| `src/sections/ContactSection.tsx` + `.module.css` | Modificar | CTA em Host Grotesk; link do `lib/contact` |
| `src/sections/AboutManifesto.tsx` + `.module.css` | Modificar | Sem `.accent`, reveal `up`, sem `exitFade` |
| `src/sections/PracticeAreasSection.tsx` + `.module.css` | Modificar | Sem eyebrow, sem `.accent`, reveal `up`; link do `lib/contact` |
| `src/sections/MethodSection.tsx` + `.module.css` | Modificar | Fontes Bebas/Host; sem eyebrow, sem `.accent`, reveal `up` |
| `src/sections/TeamSection.tsx` + `.module.css` | Modificar | Sem eyebrow, sem `.accent`, reveal `up` |
| `src/sections/ViradaScene.tsx` + `.module.css` | Criar | Cena A Virada |
| `src/app/page.tsx` | Modificar | Inserir `ViradaScene` |
| `public/images/virada-desktop.webp`, `virada-mobile.webp` | Criar | Imagens digitais da Virada |
| `scenes/scene-02-transition/assets/` | Usar | Originais brutos do Kling |

## Antes de começar

- [ ] Criar uma branch: `git checkout -b feat/modernizacao-f1-f2`
- [ ] Subir o servidor em segundo plano: `npm run dev` (porta 3000)
- [ ] Tirar as capturas "antes" em 1440×900 e 390×844 (hero, `#quem-somos`, `#atuacao`, `#metodo`, `#atendimento`) em `.playwright-mcp/before-*.jpeg`

---

### Task 1: Trocar as fontes

**Files:**
- Modify: `src/app/layout.tsx:1-35, 61-66`
- Modify: `src/app/globals.css:1-7`
- Modify: `src/sections/MethodSection.module.css` (`.bigNumber`, `.rowNumber`, `.rowWord`, `.rowTag`, comentário do topo)

**Interfaces:**
- Produces: variáveis CSS `--font-poster` (Bebas Neue), `--font-headline` (DM Serif Display), `--font-sans` (Host Grotesk) e `--title-bebas`. As tarefas 2, 3 e 7 usam essas variáveis.

- [ ] **Step 1: Checagem que falha (antes da mudança)**

No Playwright MCP, em `http://localhost:3000`:

```js
() => getComputedStyle(document.body).fontFamily
```

Esperado agora: contém `Inter` (é o estado atual que vamos trocar).

- [ ] **Step 2: Substituir as fontes em `layout.tsx`**

Trocar o import e as quatro declarações de fonte (linhas 2 a 35) por:

```tsx
import { Bebas_Neue, DM_Serif_Display, Host_Grotesk } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-headline",
  display: "swap",
});

// Texto corrido, interface e botões
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

// Fonte da logo da cliente: só em tamanho de pôster (hero, Virada, verbos do método)
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poster",
  display: "swap",
});
```

E a `className` do `<html>`:

```tsx
      className={`${dmSerifDisplay.variable} ${hostGrotesk.variable} ${bebasNeue.variable}`}
```

- [ ] **Step 3: Escala de pôster em `globals.css`**

Substituir o bloco `:root` do topo (linhas 1 a 7) por:

```css
/* Três escalas de título para o site todo:
   pôster em Bebas (hero e Virada), cartaz em serifa (fechamento) e seção (cenas do meio).
   A Bebas é condensada: precisa de corpo maior para ter o mesmo peso visual da serifa. */
:root {
  --title-bebas: clamp(4rem, 10.5vw, 11.5rem);
  --title-poster: clamp(3rem, 7.4vw, 8rem);
  --title-section: clamp(2.2rem, 4.2vw, 3.6rem);
}
```

- [ ] **Step 4: Atualizar as referências de fonte em `MethodSection.module.css`**

Trocar o comentário do topo (linhas 1 a 4) por:

```css
/* Cena 04 — Como trabalhamos.
   Cabeçalho e cores no sistema do site. Do VOID/03 entra só o comportamento do índice:
   verbos em Bebas (fonte da logo), linha que se preenche de dourado
   e prévia de foto seguindo o cursor. */
```

Em `.bigNumber`, trocar `font-family: var(--font-display), sans-serif;` e `font-weight: 800;` por:

```css
  font-family: var(--font-poster), sans-serif;
  font-weight: 400;
```

E `letter-spacing: -0.07em;` por `letter-spacing: 0;`.

Substituir `.rowNumber`, `.rowWord` e `.rowTag` por:

```css
.rowNumber {
  font-family: var(--font-sans), sans-serif;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  color: rgba(243, 239, 229, 0.6);
  transition: color 0.3s ease;
}

.rowWord {
  margin: 0;
  font-family: var(--font-poster), sans-serif;
  font-weight: 400;
  font-size: clamp(3.4rem, 7.2vw, 7rem);
  line-height: 0.9;
  letter-spacing: 0.005em;
  color: var(--paper);
  transition: color 0.3s ease;
}
```

```css
.rowTag {
  font-family: var(--font-sans), sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--accent);
  transition: color 0.3s ease;
}
```

No bloco mobile (`@media (max-width: 767px)`), trocar o `font-size` de `.rowWord` por `clamp(2.8rem, 13vw, 3.6rem)`.

- [ ] **Step 5: Verificar**

Rodar `npm run build`. Esperado: build sem erros.

No Playwright MCP, recarregar e rodar:

```js
() => ({
  body: getComputedStyle(document.body).fontFamily,
  verb: getComputedStyle(document.querySelector('[class*="rowWord"]')).fontFamily,
  fontsLoaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family)
})
```

Esperado:
- `body` contém `Host Grotesk` e não contém `Inter`.
- `verb` contém `Bebas Neue`.
- `fontsLoaded` não inclui `Inter`, `Inter Tight` nem `DM Mono`.

Tirar uma captura de `#metodo` em 1440×900 e conferir os verbos em Bebas sem cortar.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/sections/MethodSection.module.css
git commit -m "Troca tipografia: Host Grotesk no texto e Bebas Neue no pôster"
```

---

### Task 2: Hero, logos e CTAs na nova tipografia

**Files:**
- Modify: `src/sections/HeroContent.tsx:38-51`
- Modify: `src/sections/HeroContent.module.css` (`.logo`, `.logoSub`, `.ctaLabel`, `.eyebrow`, `.big`, `.support` e os blocos mobile)
- Modify: `src/sections/SiteFooter.module.css:29-45`
- Modify: `src/sections/ContactSection.module.css:239-246, 276-278`

**Interfaces:**
- Consumes: `--font-poster`, `--font-sans`, `--title-bebas` (Task 1).
- Produces: nada que outras tarefas consumam.

- [ ] **Step 1: Checagem que falha**

```js
() => getComputedStyle(document.querySelector('h1 [class*="big"]')).fontFamily
```

Esperado agora: `DM Serif Display`.

- [ ] **Step 2: Título e apoio do hero em `HeroContent.tsx`**

Substituir o bloco `<h1>…</h1>` e o `<p className={styles.support}>` por:

```tsx
        <h1 className={styles.headline}>
          <span className={styles.eyebrow}>Mais que consultoria.</span>
          <span className={styles.big}>Inteligência</span>
          <span className={`${styles.big} ${styles.bigWarm}`}>jurídica.</span>
        </h1>

        <p className={styles.support}>
          Garantir que seus direitos sejam respeitados, na vida real e no mundo digital.
        </p>
```

O texto em caixa normal é proposital: a Bebas só tem maiúsculas, então "Inteligência" já aparece em caixa alta, e o leitor de tela lê a palavra normal em vez de soletrar. A frase de apoio continua aqui até a Task 7.

- [ ] **Step 3: CSS do hero**

Em `HeroContent.module.css`, substituir `.logo`, `.logoSub` e `.ctaLabel` (linhas 68 a 104) por:

```css
/* Wordmark como na logo da cliente: Bebas espaçada + linha de apoio pequena */
.logo {
  font-family: var(--font-poster), sans-serif;
  font-size: clamp(18px, 1.5vw, 26px);
  font-weight: 400;
  letter-spacing: 0.32em;
  line-height: 1;
  color: #ffffff;
}

.logoSub {
  display: block;
  font-family: var(--font-sans), sans-serif;
  font-size: clamp(8px, 0.62vw, 11px);
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.75;
  margin-top: 0.7em;
}

.cta {
  display: inline-flex;
  align-items: center;
  background: #f2ddba;
  border-radius: 999px;
  padding: 0.6vw 0.3vw 0.6vw 1.3vw;
  text-decoration: none;
}

.ctaLabel {
  font-family: var(--font-sans), sans-serif;
  font-size: 1.05vw;
  font-weight: 500;
  color: #16233b;
  white-space: nowrap;
  margin-right: 0.9vw;
}
```

Substituir `.eyebrow`, `.big` e `.support` (linhas 143 a 173) por:

```css
.eyebrow {
  font-size: 2.5vw;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 0.1em;
}

.big {
  font-family: var(--font-poster), sans-serif;
  font-size: var(--title-bebas);
  font-weight: 400;
  letter-spacing: 0.005em;
  line-height: 0.86;
  text-transform: uppercase;
  color: #ffffff;
}

.bigWarm {
  color: #f0d6a8;
}

.support {
  font-family: var(--font-sans), sans-serif;
  font-size: clamp(1rem, 1.45vw, 1.4rem);
  line-height: 1.5;
  color: #ffffff;
  max-width: 30ch;
  text-wrap: balance;
  margin-top: 1.6vw;
  opacity: calc(1 - var(--p-subtext, 0));
  transform: translateY(calc(var(--p-subtext, 0) * -14px));
}
```

No bloco `@media (max-width: 767px)`, substituir as regras de `.logo`, `.logoSub`, `.ctaLabel`, `.eyebrow`, `.big` e `.support` por:

```css
  .logo {
    font-size: 16px;
    letter-spacing: 0.26em;
    white-space: nowrap;
  }

  .logoSub {
    font-size: 7px;
    letter-spacing: 0.12em;
    white-space: nowrap;
  }
```

```css
  .ctaLabel {
    font-size: 12px;
    margin-right: 8px;
  }
```

```css
  .eyebrow {
    font-size: clamp(17px, 5.2vw, 20px);
    margin-bottom: 0.15em;
  }

  .big {
    font-size: clamp(52px, 17vw, 76px);
  }

  .support {
    font-size: 15px;
    line-height: 1.45;
    max-width: 28ch;
    margin-top: 14px;
  }
```

No bloco `@media (max-width: 374px)`, substituir `.logo`, `.logoSub` e `.ctaLabel` por:

```css
  .logo {
    font-size: 14px;
    letter-spacing: 0.2em;
  }

  .logoSub {
    font-size: 6px;
    letter-spacing: 0.08em;
  }
```

```css
  .ctaLabel {
    font-size: 11px;
    margin-right: 6px;
  }
```

- [ ] **Step 4: Logo do rodapé e CTA do contato**

Em `SiteFooter.module.css`, substituir `.logo` e `.logoSub` por:

```css
.logo {
  font-family: var(--font-poster), sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.32em;
  color: #fff;
  line-height: 1;
}

.logoSub {
  display: block;
  margin-top: 0.7em;
  font-family: var(--font-sans), sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}
```

Em `ContactSection.module.css`, no `.ctaLabel` (linha 242), trocar a `font-family` por `font-family: var(--font-sans), sans-serif;` e acrescentar `font-weight: 500;`. Trocar `font-size: clamp(1.4rem, 2vw, 2rem);` por `font-size: clamp(1.15rem, 1.6vw, 1.6rem);`. No bloco mobile (linha 277), trocar `font-size: 1.25rem;` por `font-size: 1.1rem;`.

- [ ] **Step 5: Verificar**

Rodar `npm run build`. Esperado: sem erros.

Playwright MCP, em 1440×900:

```js
() => ({
  big: getComputedStyle(document.querySelector('h1 [class*="big"]')).fontFamily,
  logo: getComputedStyle(document.querySelector('[class*="topBar"] [class*="logo"]')).fontFamily,
  overflow: document.documentElement.scrollWidth > window.innerWidth
})
```

Esperado: `big` e `logo` contêm `Bebas Neue`, e `overflow` é `false`.

Repetir `overflow` em 390×844 e em 320×640. Esperado: `false` nos dois.

Tirar capturas do hero nas três larguras e conferir que "INTELIGÊNCIA" não encosta na borda.

- [ ] **Step 6: Commit**

```bash
git add src/sections/HeroContent.tsx src/sections/HeroContent.module.css src/sections/SiteFooter.module.css src/sections/ContactSection.module.css
git commit -m "Aplica Bebas no hero e na logo; CTAs em Host Grotesk"
```

---

### Task 3: Limpezas globais

**Files:**
- Modify: `src/app/layout.tsx` (remover a `div.scroll-progress`)
- Modify: `src/app/globals.css` (remover o bloco `.scroll-progress` e o keyframe; CTA com brilho único)
- Modify: `src/sections/AboutManifesto.tsx:22-25`
- Modify: `src/sections/PracticeAreasSection.tsx:73-85`, `PracticeAreasSection.module.css` (`.eyebrow`)
- Modify: `src/sections/MethodSection.tsx:99-111`, `MethodSection.module.css` (`.eyebrow`)
- Modify: `src/sections/TeamSection.tsx:15-21`, `TeamSection.module.css` (`.eyebrow`)

**Interfaces:**
- Consumes: nada novo.
- Produces: `.cta-animated` passa a ter brilho único, sem pulso. A Task 4 usa essa classe no cabeçalho.

- [ ] **Step 1: Checagem que falha**

```js
() => ({
  progress: !!document.querySelector('.scroll-progress'),
  eyebrows: document.querySelectorAll('.eyebrow-line').length,
  accentsMiddle: document.querySelectorAll('#quem-somos .accent, #atuacao .accent, #metodo .accent, #equipe .accent').length,
  ctaAnim: getComputedStyle(document.querySelector('.cta-animated')).animationName
})
```

Esperado agora: `progress: true`, `eyebrows: 3`, `accentsMiddle: 4`, `ctaAnim: "cta-pulse"`.

- [ ] **Step 2: Remover a barra de progresso**

Em `layout.tsx`, apagar a linha `<div className="scroll-progress" aria-hidden="true" />`.

Em `globals.css`, apagar inteiro o bloco que começa em `/* Barra fina de progresso de leitura (scroll-driven, sem JS) */` e termina no fim do `@keyframes scroll-progress { … }`.

- [ ] **Step 3: CTA com brilho único**

Em `globals.css`, substituir o comentário do bloco do CTA e o trecho de `@media (prefers-reduced-motion: no-preference) { .cta-animated { animation: cta-pulse … } .cta-animated::after { animation: cta-shine … } }` por:

```css
/* ---------- Botão de atendimento (hero, cabeçalho e contato) ----------
   Um brilho atravessa o botão uma única vez quando ele aparece. Sem loop. */
```

```css
@media (prefers-reduced-motion: no-preference) {
  .cta-animated::after {
    animation: cta-shine 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.9s 1 both;
  }

  /* Dentro de um bloco com reveal: espera o bloco aparecer para brilhar */
  .reveal-ready [data-reveal]:not([data-revealed]) .cta-animated::after {
    animation: none;
  }
}
```

(O comentário antigo `/* ---------- Botão de atendimento (hero e contato) ---------- Brilho que atravessa o botão + pulso de luz em volta, para chamar o clique. */` sai.)

No hover, apagar a linha `animation-play-state: paused;`.

Substituir o keyframe `cta-shine` por:

```css
@keyframes cta-shine {
  from {
    transform: translateX(-130%);
  }
  to {
    transform: translateX(130%);
  }
}
```

Apagar o `@keyframes cta-pulse { … }` inteiro.

- [ ] **Step 4: Sem destaque dourado e com reveal simples nas cenas do meio**

`AboutManifesto.tsx`, trocar o `<h2>` por:

```tsx
        <h2 className={styles.headline} data-reveal="up">
          Somos uma advocacia pensada para&nbsp;o mundo como ele é&nbsp;hoje.
        </h2>
```

`PracticeAreasSection.tsx`, apagar o `<p className={`${styles.eyebrow} eyebrow-line`} …>Áreas de atuação</p>` e trocar o `<h2>` por:

```tsx
          <h2 id="atuacao-title" className={styles.title} data-reveal="up">
            Onde o escritório pode&nbsp;ajudar.
          </h2>
```

`MethodSection.tsx`, apagar o `<p className={`${styles.eyebrow} eyebrow-line`} …>Como trabalhamos</p>` e trocar o `<h2>` por:

```tsx
          <h2 id="metodo-title" className={styles.title} data-reveal="up">
            Do primeiro contato à defesa do seu&nbsp;caso.
          </h2>
```

`TeamSection.tsx`, apagar o `<p className={`${styles.eyebrow} eyebrow-line eyebrow-line--center`} …>Equipe</p>` e trocar o `<h2>` por:

```tsx
        <h2 id="equipe-title" className={styles.title} data-reveal="up">
          As pessoas que vão cuidar do seu&nbsp;caso.
        </h2>
```

Nos três CSS (`PracticeAreasSection.module.css`, `MethodSection.module.css`, `TeamSection.module.css`), apagar o bloco `.eyebrow { … }`.

Em `globals.css`, apagar os blocos `.eyebrow-line`, `.eyebrow-line::before`, `.eyebrow-line--center::after` e os dois `@media` que animam esses fios, porque não sobra nenhum uso. Antes de apagar, confirmar com:

```bash
grep -rn "eyebrow-line" src
```

Esperado depois da mudança: nenhuma ocorrência.

- [ ] **Step 5: Verificar**

Rodar `npm run build`. Esperado: sem erros.

Rodar de novo a checagem do Step 1. Esperado: `progress: false`, `eyebrows: 0`, `accentsMiddle: 0`, `ctaAnim: "none"` (o pulso sumiu do botão; o brilho fica no `::after`).

```js
() => getComputedStyle(document.querySelector('.cta-animated'), '::after').animationIterationCount
```

Esperado: `"1"`.

Rolar até `#atendimento` e tirar uma captura 1,5 s depois: o botão aparece sem anel pulsando.

- [ ] **Step 6: Commit**

```bash
git add src/app src/sections
git commit -m "Limpa tiques visuais: sem barra de progresso, rótulos, destaque dourado no meio e pulso infinito"
```

---

### Task 4: Link único do WhatsApp e cabeçalho fixo

**Files:**
- Create: `src/lib/contact.ts`
- Create: `src/components/SiteHeader.tsx`, `src/components/SiteHeader.module.css`
- Modify: `src/app/layout.tsx` (montar `<SiteHeader />`)
- Modify: `src/app/globals.css` (`scroll-margin-top`)
- Modify: `src/sections/Hero.tsx` (`data-hero-pin`)
- Modify: `src/sections/HeroContent.tsx`, `ContactSection.tsx`, `PracticeAreasSection.tsx` (usar `lib/contact`)

**Interfaces:**
- Produces:
  - `WHATSAPP_PHONE: string`
  - `whatsappHref(message?: string): string`, que sem mensagem devolve o link sem `text`
  - `<SiteHeader />`, sem props
  - atributo `data-hero-pin` no elemento sticky do hero, que o `SiteHeader` observa

- [ ] **Step 1: Checagem que falha**

```js
() => !!document.querySelector('[data-site-header]')
```

Esperado agora: `false`.

- [ ] **Step 2: Criar `src/lib/contact.ts`**

```ts
// Único lugar com o número de atendimento: todos os botões de WhatsApp usam daqui.
export const WHATSAPP_PHONE = "555592025742";

export function whatsappHref(message?: string): string {
  const base = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
}
```

- [ ] **Step 3: Usar `lib/contact` onde o número aparece**

- `HeroContent.tsx`: apagar `const WHATSAPP_HREF = …`, importar `import { whatsappHref } from "@/lib/contact";` e usar `href={whatsappHref()}`.
- `ContactSection.tsx`: apagar `WHATSAPP_CTA_HREF`, importar `whatsappHref` e usar `whatsappHref("Olá! Gostaria de falar sobre o meu caso.")` no CTA e `whatsappHref()` no canal WhatsApp de `CHANNELS`.
- `PracticeAreasSection.tsx`: apagar `WHATSAPP_PHONE` e a função local `whatsappHref`, importar do `lib/contact` e trocar as chamadas `whatsappHref(area.title)` por:

```tsx
function areaMessage(subject?: string) {
  return subject
    ? `Olá! Gostaria de falar sobre ${subject}.`
    : "Olá! Gostaria de falar sobre o meu caso.";
}
```

usado como `whatsappHref(areaMessage(area.title))`, `whatsappHref(areaMessage("crimes digitais"))` e `whatsappHref(areaMessage())`.

Conferir: `grep -rn "555592025742" src`. Esperado: só `src/lib/contact.ts`.

- [ ] **Step 4: Marcar o hero e criar o `SiteHeader`**

Em `Hero.tsx`, no `<div ref={pinRef} className={styles.heroPin}>`, acrescentar `data-hero-pin`.

`src/components/SiteHeader.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";
import styles from "./SiteHeader.module.css";

const LINKS = [
  { label: "quem somos", href: "#quem-somos" },
  { label: "atuação", href: "#atuacao" },
  { label: "equipe", href: "#equipe" },
  { label: "atendimento", href: "#atendimento" },
];

/**
 * Cabeçalho fino que aparece quando o hero termina.
 * Enquanto o hero está na tela ele fica fora do fluxo e fora do foco (inert).
 */
export function SiteHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-pin]");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      data-site-header
      className={`${styles.header} ${visible ? styles.visible : ""}`}
      inert={!visible}
    >
      <a href="#top" className={styles.logo} aria-label="Daltroso, voltar ao topo">
        Daltroso
      </a>

      <nav className={styles.nav} aria-label="Navegação fixa">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
      </nav>

      <a
        className={`${styles.cta} cta-animated`}
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Atendimento online pelo WhatsApp (abre em nova aba)"
      >
        <span className={styles.ctaLabel}>atendimento online</span>
        <span className={styles.ctaIconBadge} data-cta-badge>
          <WhatsAppIcon className={styles.ctaIcon} />
        </span>
      </a>
    </header>
  );
}
```

`src/components/SiteHeader.module.css`:

```css
/* Cabeçalho fixo: faixa fina em azul profundo translúcido, com fio dourado na base */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 65;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: var(--header-h, 64px);
  padding: 0 32px;
  background: rgba(12, 24, 38, 0.86);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(240, 214, 168, 0.14);
  transform: translateY(-100%);
  opacity: 0;
}

.visible {
  transform: translateY(0);
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .header {
    transition:
      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.4s ease;
  }
}

.logo {
  font-family: var(--font-poster), sans-serif;
  font-size: 22px;
  letter-spacing: 0.32em;
  line-height: 1;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
}

.nav {
  display: flex;
  gap: 28px;
}

.link {
  font-family: var(--font-sans), sans-serif;
  font-size: 0.95rem;
  color: rgba(245, 239, 228, 0.82);
  text-decoration: none;
  transition: color 0.25s ease;
}

@media (hover: hover) {
  .link:hover {
    color: #f0d6a8;
  }
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 6px 6px 16px;
  border-radius: 999px;
  background: #f2ddba;
  text-decoration: none;
}

.ctaLabel {
  position: relative;
  z-index: 2;
  font-family: var(--font-sans), sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #16233b;
  white-space: nowrap;
}

.ctaIconBadge {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #16233b;
}

.ctaIcon {
  width: 55%;
  height: 55%;
  color: #ffffff;
}

/* Celular: só logo e botão; o menu completo continua no rodapé */
@media (max-width: 767px) {
  .header {
    --header-h: 56px;
    padding: 0 16px;
  }

  .logo {
    font-size: 18px;
    letter-spacing: 0.26em;
  }

  .nav {
    display: none;
  }

  .ctaLabel {
    font-size: 0.8rem;
  }

  .ctaIconBadge {
    width: 26px;
    height: 26px;
  }
}
```

Em `layout.tsx`, importar `import { SiteHeader } from "@/components/SiteHeader";` e renderizar `<SiteHeader />` logo após o skip link.

- [ ] **Step 5: Âncoras não ficam escondidas sob o cabeçalho**

Em `globals.css`, depois do bloco `html { scroll-behavior: smooth; }`, acrescentar:

```css
/* Saltos por âncora param abaixo do cabeçalho fixo */
:root {
  --header-h: 64px;
}

section[id] {
  scroll-margin-top: var(--header-h);
}

@media (max-width: 767px) {
  :root {
    --header-h: 56px;
  }
}
```

- [ ] **Step 6: Verificar**

Rodar `npm run build`. Esperado: sem erros.

Playwright MCP, em 1440×900, no topo da página:

```js
() => {
  const h = document.querySelector('[data-site-header]');
  return { inert: h.inert, opacity: getComputedStyle(h).opacity };
}
```

Esperado: `{ inert: true, opacity: "0" }`.

Pressionar Tab 3 vezes a partir do topo e conferir que nenhum link do cabeçalho recebe foco (`document.activeElement.closest('[data-site-header]')` deve ser `null`).

Rolar até `#metodo` e rodar a mesma checagem. Esperado: `{ inert: false, opacity: "1" }`.

Clicar no link "atuação" do cabeçalho e, ao final do scroll:

```js
() => document.getElementById('atuacao-title').getBoundingClientRect().top
```

Esperado: valor ≥ 64 (o título não fica sob o cabeçalho).

Em 320×640: `document.documentElement.scrollWidth > window.innerWidth` deve dar `false`, com o cabeçalho visível.

- [ ] **Step 7: Commit**

```bash
git add src/lib/contact.ts src/components/SiteHeader.tsx src/components/SiteHeader.module.css src/app src/sections
git commit -m "Adiciona cabeçalho fixo após o hero e centraliza o link do WhatsApp"
```

---

### Task 5: Extrair `useScrollProgress` do Hero

**Files:**
- Create: `src/lib/useScrollProgress.ts`
- Modify: `src/sections/Hero.tsx:1-48`

**Interfaces:**
- Produces:
  - `remap(progress: number, start: number, end: number): number`, que devolve um valor limitado entre 0 e 1.
  - `useScrollProgress(ref: RefObject<HTMLElement | null>, onProgress: (progress: number, el: HTMLElement) => void): void`. O `progress` vai de 0 a 1 ao longo de `el.offsetHeight - innerHeight`. Não faz nada com `prefers-reduced-motion: reduce`. A Task 7 usa o hook.

- [ ] **Step 1: Checagem de referência (comportamento atual)**

Em 1440×900, rolar até `scrollY = 700` e rodar:

```js
() => getComputedStyle(document.querySelector('[data-hero-pin]')).getPropertyValue('--p-headline')
```

Anotar o valor (algo próximo de `0.3`). Ele precisa ser igual depois da refatoração.

- [ ] **Step 2: Criar o hook**

`src/lib/useScrollProgress.ts`:

```ts
"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Converte o progresso geral em um trecho [start, end], limitado entre 0 e 1. */
export function remap(progress: number, start: number, end: number): number {
  return Math.min(Math.max((progress - start) / (end - start), 0), 1);
}

/**
 * Mede quanto de um bloco sticky já foi rolado (0 no início, 1 no fim)
 * e entrega o valor a cada frame de scroll. Com movimento reduzido, não roda.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number, el: HTMLElement) => void
): void {
  const callbackRef = useRef(onProgress);

  useEffect(() => {
    callbackRef.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollRange = Math.max(el.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
      callbackRef.current(progress, el);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
```

- [ ] **Step 3: O Hero passa a usar o hook**

Substituir o topo do `Hero.tsx` até o fim do `useEffect` por:

```tsx
"use client";

import { useRef } from "react";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { remap, useScrollProgress } from "@/lib/useScrollProgress";
import { HeroContent } from "./HeroContent";
import styles from "./Hero.module.css";

export function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);

  useScrollProgress(pinRef, (progress, el) => {
    el.style.setProperty("--p-subtext", String(remap(progress, 0.2, 0.55)));
    el.style.setProperty("--p-headline", String(remap(progress, 0.5, 0.85)));
    el.style.setProperty("--p-nav", String(remap(progress, 0.2, 0.6)));
    el.style.setProperty("--p-light", String(remap(progress, 0.45, 0.95)));
  });
```

O `return` continua igual, com o `data-hero-pin` da Task 4.

- [ ] **Step 4: Verificar**

Rodar `npm run build`. Esperado: sem erros.

Repetir a checagem do Step 1 em `scrollY = 700`. Esperado: o mesmo valor anotado.

Rolar devagar pelo hero e conferir na captura que o título sobe e esmaece como antes.

- [ ] **Step 5: Commit**

```bash
git add src/lib/useScrollProgress.ts src/sections/Hero.tsx
git commit -m "Extrai useScrollProgress do hero para reuso"
```

---

### Task 6: Gerar as imagens digitais da Virada (Kling)

**Files:**
- Create: `scenes/scene-02-transition/assets/virada-{desktop,mobile}-v{1,2}.(png|jpg)` (brutos)
- Create: `.playwright-mcp/align-check.html` (ferramenta de checagem, descartável)
- Create: `public/images/virada-desktop.webp`, `public/images/virada-mobile.webp`

**Interfaces:**
- Produces: as duas webp acima, **alinhadas** com `public/videos/scene-02-daltroso-desktop-poster.webp` e `-mobile-poster.webp`. A Task 7 usa esses caminhos.

- [ ] **Step 1: Conectar e conferir créditos**

Chamar `who_am_i` do Kling. Usar o retorno para preencher `model`, `arguments` e `inputs` das ferramentas de geração. Chamar `query_membership_and_credits` e informar ao usuário o saldo e o custo estimado de 4 gerações de imagem. O usuário já autorizou a geração; informar o custo antes de enviar é obrigatório.

- [ ] **Step 2: Enviar as referências**

Usar `file_upload` do Kling com:
- `public/videos/scene-02-daltroso-desktop-poster.png` (16:9)
- `public/videos/scene-02-daltroso-mobile-poster.png` (9:16)

- [ ] **Step 3: Gerar 2 variações por formato**

`image_to_image`, com a referência enviada, a maior fidelidade e influência de referência que o modelo permitir, proporção igual à da origem, 2 imagens por chamada (ou 2 chamadas), e o prompt:

```
Same exact scene, same camera angle, same composition and framing. Dusk / blue hour: the warm golden sunlight is replaced by soft, cool deep-navy evening light coming through the window. Wood surfaces keep their texture but read darker and cooler. Very subtle cool reflections on the desk. The paper document on the desk becomes a thin dark glass slate, blank, no text. Keep the navy cup with its logo, the saucer, the steam, the books and the pen holder unchanged and in the same positions. Photorealistic, cinematic, quiet. No neon, no holograms, no HUD, no floating code, no screens with text, no cyan glow.
```

Se o modelo aceitar prompt negativo, usar `neon, cyan, hologram, HUD, futuristic, text, watermark, changed composition, different camera angle`.

Acompanhar com `query_tasks` até concluir. Se falhar ou travar, informar o usuário e **não** reenviar sozinho.

Baixar os resultados para `scenes/scene-02-transition/assets/`:

```bash
curl -L -o "scenes/scene-02-transition/assets/virada-desktop-v1.png" "<URL retornada>"
```

(Repetir para `virada-desktop-v2`, `virada-mobile-v1` e `virada-mobile-v2`.)

- [ ] **Step 4: Checar o alinhamento**

Criar `.playwright-mcp/align-check.html`:

```html
<!doctype html>
<meta charset="utf-8">
<style>
  body { margin: 0; background: #000; color: #fff; font: 14px sans-serif; }
  .pair { position: relative; width: 100%; }
  .pair img { display: block; width: 100%; }
  .pair img + img { position: absolute; inset: 0; height: 100%; object-fit: fill; mix-blend-mode: difference; }
  h2 { margin: 16px; }
</style>
<body>
  <h2 id="t"></h2>
  <div class="pair"><img id="a"><img id="b"></div>
  <script>
    const q = new URLSearchParams(location.search);
    a.src = q.get("a"); b.src = q.get("b"); t.textContent = q.get("b");
  </script>
</body>
```

Para cada variação, abrir no Playwright MCP:

```
file:///<caminho do projeto>/.playwright-mcp/align-check.html?a=../public/videos/scene-02-daltroso-desktop-poster.png&b=../scenes/scene-02-transition/assets/virada-desktop-v1.png
```

Tirar a captura e analisar. **Aprovada** quando os contornos da xícara, da borda da mesa e dos caixilhos da janela aparecem como linhas finas, sem "fantasmas" deslocados. **Reprovada** quando os objetos aparecem duplicados ou com sombra deslocada.

Escolher a melhor variação aprovada de cada formato e mostrar a captura ao usuário.

- [ ] **Step 5: Plano B (só se nenhuma variação de um formato for aprovada)**

Gerar a versão digital por tratamento da própria original com `sharp`. Criar `C:/Users/ALISSO~1.ARA/AppData/Local/Temp/claude/C--Users-Alisson-T--Ara-jo-Desktop-daltroso-site-experimental-daltroso-site-experimental-reviewed/8f95a8b6-a849-4dd8-bf4b-a1c7493ffc4c/scratchpad/virada-fallback.cjs`:

```js
// Plano B: versão "digital" derivada da original, com alinhamento garantido.
// Uso: node virada-fallback.cjs <entrada.png> <saida.png>
const sharp = require(require.resolve("sharp", { paths: [process.cwd()] }));
const [input, output] = process.argv.slice(2);

sharp(input)
  .modulate({ brightness: 0.62, saturation: 0.35 })
  .linear(0.95, -6)
  .tint({ r: 70, g: 96, b: 140 })
  .toFile(output)
  .then(() => console.log("ok", output));
```

Rodar a partir da raiz do projeto:

```bash
node "<scratchpad>/virada-fallback.cjs" public/videos/scene-02-daltroso-desktop-poster.png scenes/scene-02-transition/assets/virada-desktop-fallback.png
```

Mostrar o resultado ao usuário antes de seguir.

- [ ] **Step 6: Exportar em webp**

Criar `<scratchpad>/to-webp.cjs`:

```js
// Uso: node to-webp.cjs <entrada> <saida.webp> <largura>
const sharp = require(require.resolve("sharp", { paths: [process.cwd()] }));
const [input, output, width] = process.argv.slice(2);

sharp(input)
  .resize({ width: Number(width), withoutEnlargement: true })
  .webp({ quality: 78, effort: 6 })
  .toFile(output)
  .then((info) => console.log(output, Math.round(info.size / 1024) + " KB"));
```

```bash
node "<scratchpad>/to-webp.cjs" scenes/scene-02-transition/assets/<desktop escolhida> public/images/virada-desktop.webp 1920
node "<scratchpad>/to-webp.cjs" scenes/scene-02-transition/assets/<mobile escolhida> public/images/virada-mobile.webp 1080
```

Esperado: cada arquivo com até ~250 KB. Se passar, rodar de novo com `quality: 70`.

As dimensões precisam ter a mesma proporção dos posters quentes:

```bash
node -e "const s=require('sharp');for(const f of ['public/images/virada-desktop.webp','public/videos/scene-02-daltroso-desktop-poster.webp','public/images/virada-mobile.webp','public/videos/scene-02-daltroso-mobile-poster.webp'])s(f).metadata().then(m=>console.log(f,m.width,m.height,(m.width/m.height).toFixed(3)))"
```

Esperado: a proporção (3ª coluna) igual entre `virada-desktop` e o poster desktop, e entre `virada-mobile` e o poster mobile. Se divergir, recortar a imagem gerada (`sharp().resize({ width, height, fit: "cover" })`) para as dimensões do poster antes de exportar.

- [ ] **Step 7: Commit**

```bash
git add public/images/virada-desktop.webp public/images/virada-mobile.webp scenes/scene-02-transition/assets
git commit -m "Adiciona imagens digitais da cena A Virada"
```

---

### Task 7: Cena "A Virada"

**Files:**
- Create: `src/sections/ViradaScene.tsx`, `src/sections/ViradaScene.module.css`
- Modify: `src/app/page.tsx`
- Modify: `src/sections/AboutManifesto.tsx` (remover `exitFade`), `AboutManifesto.module.css` (remover `.exitFade` e o respiro `.inner { padding-bottom: 24vh }` com a versão mobile)
- Modify: `src/sections/HeroContent.tsx` (nova linha de apoio, PLACEHOLDER)

**Interfaces:**
- Consumes: `useScrollProgress` e `remap` (Task 5); `--font-poster` (Task 1); `/images/virada-{desktop,mobile}.webp` (Task 6).
- Produces: `<ViradaScene />`, sem props, com `id="virada"`.

- [ ] **Step 1: Checagem que falha**

```js
() => !!document.getElementById('virada')
```

Esperado agora: `false`.

- [ ] **Step 2: Componente**

`src/sections/ViradaScene.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { remap, useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./ViradaScene.module.css";

const PHRASE_A = "Garantir que seus direitos sejam respeitados, na vida real";
const PHRASE_B = "e no mundo digital.";

/**
 * Cena 03 — A Virada.
 * A mesa de "Quem somos" é varrida por uma linha de luz: atrás dela,
 * a mesma cena no anoitecer (mundo digital). A frase de propósito
 * da marca se divide na passagem.
 */
export function ViradaScene() {
  const pinRef = useRef<HTMLDivElement>(null);

  useScrollProgress(pinRef, (progress, el) => {
    el.style.setProperty("--v-intro", String(remap(progress, 0, 0.15)));
    el.style.setProperty("--v-sweep", String(remap(progress, 0.15, 0.7)));
    el.style.setProperty("--v-a-out", String(remap(progress, 0.45, 0.6)));
    el.style.setProperty("--v-b-in", String(remap(progress, 0.55, 0.72)));
    el.style.setProperty("--v-settle", String(remap(progress, 0.7, 1)));
  });

  return (
    <div ref={pinRef} className={styles.pin}>
      <section className={styles.scene} id="virada" aria-labelledby="virada-title">
        <div className={styles.stage} aria-hidden="true">
          <picture className={styles.digital}>
            <source media="(max-width: 767px)" srcSet="/images/virada-mobile.webp" />
            <img src="/images/virada-desktop.webp" alt="" loading="lazy" decoding="async" />
          </picture>

          <picture className={styles.warm}>
            <source
              media="(max-width: 767px)"
              srcSet="/videos/scene-02-daltroso-mobile-poster.webp"
            />
            <img
              src="/videos/scene-02-daltroso-desktop-poster.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>

          <span className={styles.sweep} />

          <svg className={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 22 64 L 22 100" pathLength={1} />
            <path d="M 46 72 C 46 86, 58 88, 58 100" pathLength={1} />
            <path d="M 74 60 C 74 80, 66 86, 66 100" pathLength={1} />
          </svg>

          <div className={styles.scrim} />
          <div className={styles.settle} />
        </div>

        <h2 id="virada-title" className="sr-only">
          {PHRASE_A} {PHRASE_B}
        </h2>

        <div className={styles.text} aria-hidden="true">
          <p className={styles.phraseA}>{PHRASE_A}</p>
          <p className={styles.phraseB}>{PHRASE_B}</p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Estilos**

`src/sections/ViradaScene.module.css`:

```css
/* Cena 03 — A Virada.
   Progresso do scroll (ver useScrollProgress) chega como variáveis:
   --v-intro (0–15%), --v-sweep (15–70%), --v-a-out, --v-b-in, --v-settle (70–100%). */

.pin {
  position: relative;
  height: 300vh;
  background: #0c1826;
}

.scene {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background: #0c1826;
}

/* ---------- Imagens ---------- */

.stage {
  position: absolute;
  inset: 0;
  transform: scale(calc(1 + var(--v-intro, 0) * 0.04));
  transform-origin: 70% 60%;
  will-change: transform;
}

.digital,
.warm {
  position: absolute;
  inset: 0;
}

.digital img,
.warm img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
}

/* A imagem quente é recortada da esquerda para a direita conforme a linha passa */
.warm {
  clip-path: inset(0 0 0 calc(var(--v-sweep, 0) * 100%));
}

/* Linha de luz na borda do recorte */
.sweep {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--v-sweep, 0) * 100%);
  width: 1px;
  background: #f2ddba;
  box-shadow:
    0 0 12px 2px rgba(242, 221, 186, 0.55),
    0 0 48px 8px rgba(240, 214, 168, 0.18);
  /* Só aparece enquanto está varrendo */
  opacity: calc(min(var(--v-sweep, 0) * 12, 1) * min((1 - var(--v-sweep, 0)) * 12, 1));
}

/* Linhas de conexão que escorrem para a próxima cena */
.lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: rgba(240, 214, 168, 0.45);
  stroke-width: 1;
}

.lines path {
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 1;
  stroke-dashoffset: calc(1 - var(--v-settle, 0));
}

/* Escurece à esquerda para a frase ficar legível sobre qualquer imagem */
.scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(12, 24, 38, 0.82) 0%,
    rgba(12, 24, 38, 0.55) 38%,
    rgba(12, 24, 38, 0) 70%
  );
}

/* Assentamento: a base escurece até o azul da próxima cena */
.settle {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(12, 24, 38, 0) 40%, #0c1826 100%);
  opacity: var(--v-settle, 0);
}

/* ---------- Frase ---------- */

.text {
  position: absolute;
  left: 56px;
  bottom: 14vh;
  z-index: 2;
  display: grid;
  max-width: min(62vw, 980px);
}

/* As duas metades ocupam o mesmo lugar e trocam de uma para a outra */
.phraseA,
.phraseB {
  grid-area: 1 / 1;
  align-self: end;
  font-family: var(--font-poster), sans-serif;
  font-size: clamp(3rem, 6vw, 6.6rem);
  line-height: 0.9;
  letter-spacing: 0.005em;
  text-transform: uppercase;
  text-wrap: balance;
  color: #ffffff;
}

.phraseA {
  opacity: calc(var(--v-intro, 0) * (1 - var(--v-a-out, 0)));
  transform: translateY(calc((1 - var(--v-intro, 0)) * 32px - var(--v-a-out, 0) * 24px));
}

.phraseB {
  opacity: var(--v-b-in, 0);
  transform: translateY(calc((1 - var(--v-b-in, 0)) * 32px));
}

/* ---------- Celular: imagem vertical, linha desce de cima para baixo ---------- */

@media (max-width: 767px) {
  .pin {
    height: 200vh;
  }

  .scene {
    height: 100svh;
  }

  .warm {
    clip-path: inset(calc(var(--v-sweep, 0) * 100%) 0 0 0);
  }

  .sweep {
    top: calc(var(--v-sweep, 0) * 100%);
    bottom: auto;
    left: 0;
    right: 0;
    width: auto;
    height: 1px;
  }

  .scrim {
    background: linear-gradient(
      to top,
      rgba(12, 24, 38, 0.88) 0%,
      rgba(12, 24, 38, 0.5) 40%,
      rgba(12, 24, 38, 0) 70%
    );
  }

  .text {
    left: 20px;
    right: 20px;
    bottom: calc(env(safe-area-inset-bottom, 0px) + 10vh);
    max-width: none;
  }

  .phraseA,
  .phraseB {
    font-size: clamp(2.4rem, 11vw, 3.4rem);
  }
}

/* ---------- Movimento reduzido: imagem dividida ao meio, frase inteira ---------- */

@media (prefers-reduced-motion: reduce) {
  .pin {
    height: auto;
  }

  .scene {
    position: relative;
  }

  .stage {
    transform: none;
    --v-sweep: 0.5;
    --v-settle: 1;
  }

  .sweep {
    opacity: 1;
  }

  .text {
    display: flex;
    flex-direction: column;
  }

  .phraseA,
  .phraseB {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 4: Integrar na página e emendar com "Quem somos"**

`src/app/page.tsx`: importar `import { ViradaScene } from "@/sections/ViradaScene";` e renderizar `<ViradaScene />` entre `<AboutManifesto />` e `<PracticeAreasSection />`.

`AboutManifesto.tsx`: apagar `<div className={styles.exitFade} aria-hidden="true" />`.

`AboutManifesto.module.css`: apagar o bloco `.exitFade { … }`, o comentário `/* Respiro antes da saída, para o degradê não cobrir os cards */` e os dois blocos seguintes (`.inner { padding-bottom: 24vh; }` e o `@media (max-width: 767px) { .inner { padding-bottom: 16vh; } }`).

`HeroContent.tsx`: a frase de propósito agora mora na Virada. Trocar o `<p className={styles.support}>` por:

```tsx
        {/* PLACEHOLDER: linha de apoio do hero, a validar na etapa de copy (F5). */}
        <p className={styles.support}>
          Defesa criminal, cível e digital, com cada etapa explicada.
        </p>
```

- [ ] **Step 5: Ajustar o rodapé e o skip link**

`SiteFooter.tsx` e `SiteHeader.tsx` não ganham link para `#virada`: a cena é narrativa, não um destino. Nada a fazer. Conferir que o skip link continua apontando para `#quem-somos`.

- [ ] **Step 6: Verificar**

Rodar `npm run build`. Esperado: sem erros.

**Roteiro do scroll (1440×900).** Chamar `window.scrollTo` até o topo de `#virada` mais 0%, 30%, 60% e 100% de `(pin.offsetHeight - innerHeight)` e tirar uma captura em cada ponto:

```js
async () => {
  const pin = document.getElementById('virada').parentElement;
  const range = pin.offsetHeight - innerHeight;
  const out = [];
  for (const f of [0.05, 0.3, 0.6, 0.95]) {
    scrollTo({ top: pin.offsetTop + range * f, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 300));
    const cs = getComputedStyle(pin);
    out.push({ f, sweep: cs.getPropertyValue('--v-sweep'), b: cs.getPropertyValue('--v-b-in') });
  }
  return out;
}
```

Esperado:
- em 0,05: `sweep` = 0
- em 0,3: `sweep` ≈ 0,27
- em 0,6: `sweep` ≈ 0,82 e `b` ≈ 0,29
- em 0,95: `sweep` = 1 e `b` = 1

Nas capturas: a linha de luz alinhada à borda do recorte, sem "pulo" de objetos entre as metades (confirma o alinhamento da Task 6) e a frase legível.

**Mobile (390×844).** Repetir. Esperado: a linha horizontal descendo e a frase sem cortar.

**Lazy loading.** Recarregar no topo e rodar:

```js
() => performance.getEntriesByType('resource').some(r => r.name.includes('virada-'))
```

Esperado: `false` antes do scroll.

**Imagem ausente (Review Focus 4).** Bloquear `**/virada-*.webp` com `page.route` (`browser_run_code_unsafe`), rolar até 0,6 e tirar a captura. Esperado: fundo `#0C1826` à esquerda e a frase legível.

**Movimento reduzido (Review Focus 1).** Com `browser_emulate_media` em `reducedMotion: 'reduce'`, recarregar e rodar:

```js
() => {
  const pin = document.getElementById('virada').parentElement;
  const [a, b] = document.querySelectorAll('#virada [class*="phrase"]');
  return {
    pinH: pin.offsetHeight,
    vh: innerHeight,
    a: getComputedStyle(a).opacity,
    b: getComputedStyle(b).opacity
  };
}
```

Esperado: `pinH` ≈ `vh` (sem os 300vh), `a: "1"`, `b: "1"`. Na captura, a imagem dividida ao meio com a linha no centro.

**Console.** `browser_console_messages` sem erros.

- [ ] **Step 7: Commit**

```bash
git add src/sections/ViradaScene.tsx src/sections/ViradaScene.module.css src/app/page.tsx src/sections/AboutManifesto.tsx src/sections/AboutManifesto.module.css src/sections/HeroContent.tsx
git commit -m "Adiciona a cena A Virada entre Quem somos e Áreas"
```

---

### Task 8: Verificação final das fases F1 e F2

**Files:** nenhum (só verificação; correções voltam para a tarefa responsável).

- [ ] **Step 1:** `npm run build`. Esperado: sem erros nem warnings novos.
- [ ] **Step 2:** Capturas "depois" em 1440×900 e 390×844 dos mesmos pontos da seção "Antes de começar", mais 4 pontos da Virada. Comparar lado a lado com as capturas "antes".
- [ ] **Step 3:** Percorrer a página inteira com Tab: foco visível em todos os links e botões, e o cabeçalho só entra no foco depois do hero.
- [ ] **Step 4:** `prefers-reduced-motion: reduce`: hero e Virada sem pinning, todo o texto visível, e os vídeos ambiente continuam tocando.
- [ ] **Step 5:** Larguras de 320, 375, 768, 1024 e 1920px: `document.documentElement.scrollWidth > innerWidth` deve dar `false` em todas.
- [ ] **Step 6:** Mostrar ao usuário as capturas "antes e depois" e a lista de commits (`git log --oneline main..HEAD`).
