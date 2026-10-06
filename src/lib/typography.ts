/**
 * Evita viúvas: une as duas últimas palavras com espaço inseparável,
 * para que a última linha de um parágrafo nunca fique com uma palavra só.
 */
export function noWidow(text: string): string {
  return text.replace(/\s+(\S+)\s*$/, "\u00A0$1");
}
