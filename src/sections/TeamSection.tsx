import { team } from "@/data/team";
import { TeamCarousel } from "./TeamCarousel";
import styles from "./TeamSection.module.css";

export function TeamSection() {
  return (
    <section className={styles.scene} id="equipe" aria-labelledby="equipe-title">
      <div className={styles.bridge} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.header}>
        <p className={styles.eyebrow}>Equipe</p>
        <h2 id="equipe-title" className={styles.title}>
          As pessoas que vão <span className="accent">cuidar do seu caso.</span>
        </h2>
      </header>

      <TeamCarousel members={team} />
    </section>
  );
}
