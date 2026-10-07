import { team } from "@/data/team";
import { OutlineWord } from "@/components/OutlineWord";
import { TeamCarousel } from "./TeamCarousel";
import styles from "./TeamSection.module.css";

export function TeamSection() {
  return (
    <section className={styles.scene} id="equipe" aria-labelledby="equipe-title">
      <div className={styles.bgPhoto} aria-hidden="true" />
      <div className={styles.bgVeil} aria-hidden="true" />
      <div className={styles.bridge} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.beams} aria-hidden="true" />
      <OutlineWord word="Justiça" placement="top-right" zIndex={-1} />

      <header className={styles.header}>
        <h2 id="equipe-title" className={styles.title} data-reveal="up">
          As pessoas que vão <span className="accent">cuidar</span> do seu&nbsp;caso.
        </h2>
      </header>

      <TeamCarousel members={team} />
    </section>
  );
}
