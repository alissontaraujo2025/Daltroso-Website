type IconProps = { className?: string };

export function IconSearch({ className }: IconProps) {
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
      <circle cx="10.5" cy="10.5" r="6" />
      <line x1="15.2" y1="15.2" x2="20" y2="20" />
    </svg>
  );
}

export function IconPeople({ className }: IconProps) {
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
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19c0-3.2 2.5-5.2 5.5-5.2s5.5 2 5.5 5.2" />
      <path d="M15.5 6.3c1.4.3 2.5 1.6 2.5 3.1 0 1.5-1.1 2.8-2.5 3.1" />
      <path d="M17 13.9c2.2.5 3.5 2.2 3.5 4.3" />
    </svg>
  );
}

export function IconDevice({ className }: IconProps) {
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
      <rect x="6" y="3" width="12" height="18" rx="2.2" />
      <line x1="10.3" y1="18.2" x2="13.7" y2="18.2" />
      <path d="M9 7.6c1.9-1.6 4.1-1.6 6 0" opacity="0.85" />
    </svg>
  );
}
