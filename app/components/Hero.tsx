import { site } from "@/app/lib/constants";
import CopyEmail from "./CopyEmail";
import TopBar from "./TopBar";
import styles from "./portfolio.module.scss";

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={`container ${styles.heroContainer}`}>
        <TopBar />

        <div className={styles.heroMain}>
          <h1 id="hero-name" className={styles.heroName}>
            <span className={styles.nameLine}>
              <span className={styles.nameWord}>Mahantesh</span>
              <span className={styles.nameWord}>Patil</span>
            </span>
            <span className={styles.nameAside} aria-hidden="true">
              Software / AI / Systems
            </span>
          </h1>

          <div className={styles.heroBody}>
            <figure className={styles.portrait} data-reveal>
              <img
                src="/portrait.jpg"
                alt="Mahantesh Patil"
                width={600}
                height={750}
                loading="lazy"
              />
            </figure>

            <div className={styles.heroType}>
              <p className={styles.heroRole}>
                Software Engineer &amp; AI Systems Builder.
              </p>
              <p className={styles.heroSub}>
                Architecting resilient distributed backends, LLM agents, and
                end-to-end products from data layer to interface.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.heroFoot}>
          <div className={styles.heroActions}>
            <a className={styles.actionPrimary} href="#work">
              <span>View Systems &amp; Work</span>
              <span aria-hidden="true">↗</span>
            </a>
            <CopyEmail
              className={styles.actionSecondary}
              email={site.email}
              label={`Copy Email: ${site.email}`}
            />
          </div>

          <div className={styles.heroFootMeta}>
            <span>Kalaburagi · Karnataka · IN</span>
            <a href="#work" className={styles.scrollCue}>
              <span>View work</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
