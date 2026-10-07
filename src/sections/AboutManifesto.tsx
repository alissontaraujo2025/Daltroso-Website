import { VideoBackground } from "@/components/VideoBackground";
import { AboutManifestoFacets } from "./AboutManifestoFacets";
import { SceneDigitalLines } from "./SceneDigitalLines";
import styles from "./AboutManifesto.module.css";

export function AboutManifesto() {
  return (
    <section className={styles.scene} id="quem-somos">
      <VideoBackground
        className={styles.video}
        desktopSrc="/videos/scene-02-daltroso-desktop.mp4"
        mobileSrc="/videos/scene-02-daltroso-mobile.mp4"
        desktopPoster="/videos/scene-02-daltroso-desktop-poster.webp"
        mobilePoster="/videos/scene-02-daltroso-mobile-poster.webp"
      />
      <SceneDigitalLines />
      <div className={styles.bridge} aria-hidden="true" />

      <div className={styles.inner}>
        <h2 className={styles.headline} data-reveal="up">
          Uma advocacia preparada para os problemas de hoje, <span className="accent">dentro e fora da&nbsp;internet.</span>
        </h2>

        <p
          className={styles.support}
          data-reveal="up"
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          Cada caso é analisado por inteiro: o que acontece no processo e o que
          ele muda na vida de quem nos&nbsp;procura.
        </p>

        <AboutManifestoFacets />
      </div>
    </section>
  );
}
