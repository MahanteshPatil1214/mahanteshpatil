import Clock from "./Clock";
import styles from "./portfolio.module.scss";

export default function TopBar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <a
          href="#top"
          className={styles.monogram}
          aria-label="Mahantesh Patil — back to top"
        >
          [MP]
        </a>
        <span className={styles.topbarName}>Mahantesh Patil</span>
      </div>

      <nav className={styles.topbarNav} aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className={styles.topbarRight}>
        <span className={styles.availability}>
          <span className={styles.availabilityDot} aria-hidden="true" />
          Available for Software &amp; AI Roles
        </span>
        <span className={styles.location}>
          Kalaburagi, Karnataka / IST
          <Clock className={styles.clock} />
        </span>
      </div>
    </header>
  );
}
