import { focusPoints, principles } from "@/app/data/projects";
import { basePath } from "@/app/lib/constants";
import styles from "./portfolio.module.scss";

export default function Statement() {
  return (
    <section
      id="statement"
      className={styles.statement}
      aria-labelledby="statement-title"
    >
      <div className={`container ${styles.sectionInner}`}>
        <div className={styles.sectionBar} data-reveal>
          <span className={styles.sectionTag}>01 / Statement</span>
          <span className={styles.sectionMeta}>
            Kalaburagi, Karnataka · IST
          </span>
        </div>

        <div className={styles.statementTop}>
          <h2
            id="statement-title"
            className={styles.statementTitle}
            data-reveal
          >
            Correctness is a feature.{" "}
            <span className="serif">Not a footnote.</span>
          </h2>

          <p className={styles.statementLead} data-reveal>
            Most software fails at the seams — between services, between a
            model and its evidence, between an interface and the person using
            it. I build to tighten those seams.
          </p>
        </div>

        <div className={styles.statementLower}>
          <figure className={styles.portrait} data-reveal>
            <img
              src={`${basePath}/portrait.jpg`}
              alt="Portrait of Mahantesh Patil"
              width={1024}
              height={1024}
              loading="lazy"
            />
            <figcaption>
              <span>Fig. 01</span>
              <span>Mahantesh Patil, 2026</span>
            </figcaption>
          </figure>

          <div className={styles.focusList}>
            {focusPoints.map((focus) => (
              <article
                className={styles.focusItem}
                key={focus.index}
                data-reveal
              >
                <span className={styles.focusIndex}>{focus.index}</span>
                <h3>{focus.title}</h3>
                <p>{focus.body}</p>
              </article>
            ))}
          </div>

          <div className={styles.principles} aria-label="Working principles">
            {principles.map((principle, index) => (
              <span key={principle} data-reveal>
                <span className={styles.principleIndex}>0{index + 1}</span>
                {principle}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
