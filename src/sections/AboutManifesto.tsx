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
        desktopPoster="/videos/scene-02-daltroso-desktop-poster.png"
        mobilePoster="/videos/scene-02-daltroso-mobile-poster.png"
      />
      <SceneDigitalLines />
      <div className={styles.bridge} aria-hidden="true" />

      <div className={styles.inner}>
        <h2 className={styles.headline}>
          Somos uma advocacia pensada para o mundo como ele é hoje.
        </h2>

        <p className={styles.support}>
          Cada caso recebe leitura própria. A mesma atenção para o que
          acontece dentro do processo e para o que continua acontecendo
          depois dele, na vida das pessoas.
        </p>

        <AboutManifestoFacets />
      </div>
    </section>
  );
}
