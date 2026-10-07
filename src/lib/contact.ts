// Único lugar com o número de atendimento: todos os botões de WhatsApp usam daqui.
export const WHATSAPP_PHONE = "555592025742";

export function whatsappHref(message?: string): string {
  const base = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
}
