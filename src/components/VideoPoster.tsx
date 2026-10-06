const DESKTOP_MEDIA = "(min-width: 768px)";

type VideoPosterProps = {
  desktopSrc: string;
  mobileSrc: string;
  className?: string;
  priority?: boolean;
};

// Static poster rendered on the server, so the scene has an image before the
// video component hydrates. The browser only downloads the matching source.
export function VideoPoster({ desktopSrc, mobileSrc, className, priority = false }: VideoPosterProps) {
  return (
    <picture>
      <source media={DESKTOP_MEDIA} srcSet={desktopSrc} />
      <img
        className={className}
        src={mobileSrc}
        alt=""
        aria-hidden="true"
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
