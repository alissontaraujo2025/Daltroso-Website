import Image from "next/image";
import styles from "./BiancaProfile.module.css";
import { BiancaProfileReveal } from "./BiancaProfileReveal";

export function BiancaProfile() {
  return (
    <section className={styles.scene} id="bianca-daltroso">
      <div className={styles.bridge} aria-hidden="true" />

      <div className={styles.grid}>
        <div className={styles.photoCol}>
          <Image
            src="/images/bianca-daltroso.jpg"
            alt="Bianca Daltroso, advogada criminalista"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className={styles.photo}
            priority={false}
          />
        </div>

        <div className={styles.textCol}>
          <div className={styles.identity}>
            <p className={styles.identityName}>Bianca Daltroso</p>
            <p className={styles.identityRole}>Advogada Criminalista</p>
            <span className={styles.oabBadge}>OAB/RS 135.231</span>
          </div>

          <BiancaProfileReveal>
            <h2 className={styles.headline}>
              Direito Penal com estratégia, clareza e presença.
            </h2>

            <div className={styles.body}>
              <p>
                Advogada criminalista, Bianca Daltroso construiu sua atuação
                a partir de uma leitura direta do Direito e das situações
                que chegam até ele.
              </p>
              <p>
                Sua experiência no Direito Penal se soma hoje ao estudo e à
                atuação em questões que envolvem tecnologia, crimes
                digitais, golpes virtuais, investigações e novos conflitos
                que surgem no ambiente online.
              </p>
              <p>
                Para Bianca, conhecimento jurídico precisa ser
                compreensível. Por isso, técnica e estratégia caminham
                junto de uma comunicação clara, capaz de explicar cenários
                complexos sem afastar quem precisa tomar decisões.
              </p>
            </div>

            <p className={styles.signature}>
              Criminal. Digital. Estratégico. Humano.
            </p>
          </BiancaProfileReveal>
        </div>
      </div>
    </section>
  );
}
