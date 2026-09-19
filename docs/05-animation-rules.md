# 05 — Regras de Animação

## Princípio
Movimento deve reforçar narrativa, profundidade e continuidade.

## Intensidade
Baixa a moderada.

## Permitido
- fade
- reveal por máscara
- clip-path suave
- translate vertical ou horizontal curto
- parallax discreto
- sticky sections
- scroll progress
- opacity vinculada ao scroll
- scale muito leve
- mudança gradual de luz
- hover elegante

## Evitar
- bounce
- elastic exagerado
- zoom forte
- giro
- glitch
- partículas digitais chamativas
- texto voando
- animação de letras excessiva
- scroll hijacking agressivo

## Duração visual
Transições devem parecer suaves e deliberadas.

Referência geral:
- microinteração: 200–500 ms
- entrada de elementos: 500–1000 ms
- transição de cena: controlada pelo scroll ou 800–1600 ms quando temporal

## Vídeos
- loops discretos
- sem cortes perceptíveis
- sem texto renderizado no vídeo
- sem áudio automático
- preferir WebM/MP4 otimizados
- gerar poster estático

## Performance
- lazy loading fora da primeira dobra
- preload apenas do asset essencial da hero
- evitar múltiplos vídeos pesados simultâneos
- pausar vídeos fora da viewport quando possível

## Acessibilidade
Respeitar `prefers-reduced-motion`.
Nesse modo, reduzir ou remover:
- parallax
- pinning complexo
- transições longas
- movimento de fundo
