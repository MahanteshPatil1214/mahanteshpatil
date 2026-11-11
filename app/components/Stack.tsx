import { stackLayers } from "@/app/data/stack";
import styles from "./portfolio.module.scss";

export default function Stack() {
  return (
    <section id="stack" className={styles.stack} aria-labelledby="stack-title">
      <div className={`container ${styles.sectionInner}`}>
        <div className={`${styles.sectionBar} ${styles.sectionBarDark}`} data-reveal>
          <span className={styles.sectionTagDark}>03 / Technical Depth</span>
          <span className={styles.sectionMetaDark}>Architecture matrix</span>
        </div>

        <div className={styles.stackHeader}>
          <h2 id="stack-title" className={styles.stackTitle} data-reveal>
            Depth, <span className="serif">by layer.</span>
          </h2>
          <p className={styles.stackIntro} data-reveal>
            I choose tools for the boundary they enforce, not for the logo on
            the slide. These are the layers I reach for when a system has to
            stay legible under load.
          </p>
        </div>

        <div className={styles.matrix}>
          {stackLayers.map((layer) => (
            <div className={styles.matrixRow} key={layer.index} data-reveal>
              <div className={styles.matrixLayer}>
                <span className={styles.matrixIndex}>{layer.index}</span>
                <h3>{layer.title}</h3>
              </div>
              <p className={styles.matrixNote}>{layer.note}</p>
              <ul className={styles.matrixItems}>
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
