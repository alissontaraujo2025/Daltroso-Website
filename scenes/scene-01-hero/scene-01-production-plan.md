# Cena 01 — Plano de Produção da Hero

## Objetivo
Construir a Hero como uma composição híbrida: vídeo de fundo + HTML/CSS por cima.

## O que será vídeo
Somente o ambiente cinematográfico:
- mesa de madeira
- janela ao fundo
- luz natural quente em movimento muito sutil
- xícara azul escura à direita
- vapor natural da xícara
- micro movimento de câmera/parallax quase imperceptível

O vídeo NÃO deve conter:
- logo
- headline
- subtítulo
- botão
- menu
- textos
- elementos de interface

Motivo: todos esses elementos precisam permanecer nítidos, responsivos e editáveis no site.

## O que será HTML/CSS

### Logo
Posição: canto superior esquerdo.
Usar arquivo vetorial ou imagem transparente da identidade oficial.

### CTA
Texto: atendimento online
Posição: canto superior direito.
Botão discreto, arredondado, com ícone de WhatsApp.

### Headline
Mais que consultoria.
INTELIGÊNCIA
JURÍDICA.

Grande, editorial e responsiva.

### Subtexto
Garantir que seus direitos sejam respeitados, na vida real e no mundo digital.

### Navegação inferior
- quem somos
- criminal
- cível
- família

Tudo deve ser HTML real, nunca incorporado no vídeo.

## Estrutura visual

Desktop:
- Hero ocupa 100vh
- vídeo cobre toda a viewport
- conteúdo textual concentrado à esquerda
- xícara e janela predominam à direita
- gradiente/sombra suave à esquerda apenas se necessário para legibilidade

## Motion no site
O vídeo terá seu próprio micro movimento natural.

Os elementos HTML terão motion independente:
- headline: reveal por máscara
- subtítulo: fade + leve deslocamento vertical
- logo: fade discreto
- CTA: fade discreto
- navegação inferior: entrada suave

Sem efeitos chamativos.

## Scroll — saída da Cena 01
Ao iniciar o scroll:
1. Hero permanece momentaneamente fixa.
2. Headline sobe levemente e perde opacidade.
3. Subtexto desaparece um pouco antes da headline.
4. A luz da janela ganha presença.
5. O vídeo permanece contínuo.
6. A luz funciona como ponte visual para a Cena 02.
7. Não usar corte seco.

## Regra de produção
Primeiro aprovar:
1. still da Hero
2. vídeo/loop da Hero
3. transição conceitual para Cena 02

Somente depois implementar a Hero no código.

## Performance
Preparar posteriormente:
- vídeo desktop otimizado
- fallback poster
- versão mobile específica se necessário
- autoplay muted playsinline loop
- sem áudio
- evitar arquivo pesado

## Estado atual
Não implementar ainda.
A próxima etapa é gerar/refinar o asset visual da Hero.
