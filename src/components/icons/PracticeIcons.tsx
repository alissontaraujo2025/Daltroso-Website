import type { ReactNode } from "react";

type IconProps = { className?: string };

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Crime digital: tela com cadeado. */
export function IconDigital({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
      <rect x="9.5" y="9" width="5" height="4" rx="0.8" />
      <path d="M10.6 9V7.9a1.4 1.4 0 0 1 2.8 0V9" />
    </Icon>
  );
}

/** Criminal: escudo (defesa). */
export function IconShield({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 3.5 5 6v5.5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6l-7-2.5Z" />
      <path d="m9.2 12 2 2 3.8-4" />
    </Icon>
  );
}

/** Cível: documento assinado. */
export function IconDocument({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5l-5-5Z" />
      <path d="M14 3.5v5h5M8.5 12.5h7M8.5 16h4" />
    </Icon>
  );
}

/** Imobiliário: casa. */
export function IconHouse({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9v10.5h12V9" />
      <path d="M10 19.5v-5h4v5" />
    </Icon>
  );
}

/** Militar: estrela de insígnia. */
export function IconInsignia({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="m12 3.8 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.2l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 3.8Z" />
    </Icon>
  );
}

/** Outras situações: balão de conversa. */
export function IconChat({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-7.5L7 20.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5Z" />
      <path d="M8 10h8M8 13h5" />
    </Icon>
  );
}

/** Seta dos CTAs. */
export function IconArrow({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}
