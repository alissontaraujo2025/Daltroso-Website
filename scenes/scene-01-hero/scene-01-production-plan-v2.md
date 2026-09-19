# Cena 01 — Plano de Produção da Hero v2

## Objetivo
Construir a Hero como uma composição híbrida:
- vídeo de fundo
- HTML/CSS por cima
- transição controlada por scroll
- versão desktop e mobile com assets próprios

Não implementar ainda. Primeiro aprovar os assets e a lógica.

---

# 1. Estrutura da Hero

## Fundo em vídeo
O vídeo contém apenas:
- ambiente
- mesa de madeira
- janela
- luz natural quente
- xícara azul escura
- vapor natural
- micro movimento de câmera/parallax

O vídeo NÃO contém:
- logo
- headline
- subtítulo
- CTA
- menu
- textos
- elementos de interface

Todos esses elementos serão HTML/CSS.

---

# 2. Asset desktop

## Formato
- proporção: 16:9
- resolução de produção: 1920x1080
- duração ideal: 6 a 8 segundos
- fps: 24
- loop suave
- sem áudio

## Composição
- xícara no terço direito
- janela ao fundo
- área esquerda visualmente mais limpa
- preservar espaço negativo para headline
- nenhum elemento importante nas bordas

## Movimento
- vapor sutil
- luz se movimentando discretamente
- câmera praticamente estática
- sem zoom evidente
- sem travelling
- sem efeitos chamativos

---

# 3. Asset mobile — obrigatório

Não usar apenas object-fit: cover do vídeo desktop.

Criar um asset próprio para mobile.

## Formato
- proporção: 9:16
- resolução de produção: 1080x1920
- duração ideal: 6 a 8 segundos
- fps: 24
- loop suave
- sem áudio

## Composição
- xícara preferencialmente no terço inferior direito
- parte superior e esquerda mais limpas
- espaço suficiente para headline e subtítulo
- janela/luz ainda presentes como elemento de continuidade
- evitar enquadramento apertado

O mobile deve manter a mesma cena e direção de arte, mas com composição própria.

---

# 4. Legibilidade independente do vídeo

Usar overlay fixo em CSS.

## Desktop
Criar gradiente escuro discreto da esquerda para a direita.

Objetivo:
- garantir leitura da headline
- não depender da luminosidade variável do vídeo
- não escurecer demais a xícara e a janela

Base inicial:
- lado esquerdo mais escuro
- redução progressiva até ficar quase transparente no centro/direita

## Mobile
Usar overlay próprio:
- leve escurecimento superior
- possível reforço atrás da área de texto
- manter a imagem viva

O gradiente deve ser CSS, nunca embutido no vídeo.

---

# 5. Elementos HTML/CSS

## Logo
- canto superior esquerdo
- discreto
- identidade oficial

## CTA
Texto:
atendimento online

- canto superior direito no desktop
- adaptação própria no mobile
- botão arredondado
- WhatsApp

## Headline
Mais que consultoria.
INTELIGÊNCIA
JURÍDICA.

- tipografia grande
- editorial
- responsiva
- reveal por máscara

## Subtexto
Garantir que seus direitos sejam respeitados, na vida real e no mundo digital.

- sans-serif
- legível
- largura controlada

## Navegação inferior
- quem somos
- criminal
- cível
- família

Tudo em HTML real.

---

# 6. Scroll da Hero

A Hero deve trabalhar com pin/sticky e progressão controlada.

## Estrutura inicial
- viewport visual: 100vh
- percurso total sugerido da Hero: aproximadamente 180vh
- a cena permanece visualmente fixa enquanto o usuário avança no scroll

## Progressão

### 0% a 25%
Hero praticamente intacta.
Usuário absorve a primeira cena.

### 25% a 60%
- subtítulo começa a perder opacidade
- headline começa leve deslocamento vertical
- navegação inferior reduz presença

### 60% a 85%
- headline sobe suavemente e perde opacidade
- luz da janela ganha presença
- ambiente começa a preparar a Cena 02

### 85% a 100%
- Cena 01 quase desaparece
- luz funciona como ponte
- Cena 02 começa a ser revelada
- sem corte seco

Os valores são direção de motion, não código final.
Podem ser ajustados durante teste em localhost.

---

# 7. Performance do vídeo

## Desktop
Meta inicial:
- 1920x1080
- 24 fps
- 6 a 8 s
- MP4 H.264
- alvo ideal: até 5 MB
- limite de teste: até 8 MB

## Mobile
Meta inicial:
- 1080x1920
- 24 fps
- 6 a 8 s
- MP4 H.264
- alvo ideal: até 4 MB
- limite de teste: até 6 MB

## Implementação futura
Usar:
- autoplay
- muted
- playsinline
- loop
- preload controlado
- poster/fallback

Não carregar desktop e mobile simultaneamente se não for necessário.

---

# 8. Fallback

Criar poster estático para:
- carregamento inicial
- conexão lenta
- falha de vídeo
- preferência de movimento reduzido

O poster deve ser visualmente compatível com o primeiro frame do vídeo.

---

# 9. Reduced Motion

Se o usuário tiver prefers-reduced-motion:
- usar poster estático ou motion mínimo
- evitar pin agressivo
- manter navegação funcional
- preservar legibilidade

---

# 10. Ordem correta de produção

1. Aprovar composição desktop
2. Gerar still desktop
3. Gerar still mobile
4. Aprovar ambos
5. Animar desktop
6. Animar mobile
7. Testar loops
8. Só depois implementar a Hero em localhost
9. Refinar scroll e transição
10. Só depois começar Cena 02

---

# Regra do projeto

Nesta fase:
- somente localhost
- sem Vercel
- sem deploy
- sem CI/CD
- uma cena por vez
- evitar reanálises desnecessárias
- economizar tokens
- não implementar sem aprovação explícita
