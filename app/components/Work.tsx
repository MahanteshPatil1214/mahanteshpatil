import { caseStudies } from "@/app/data/projects";
import { site, basePath } from "@/app/lib/constants";
import styles from "./portfolio.module.scss";

export default function Work() {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-title">
      <div className={`container ${styles.sectionInner}`}>
        <div className={styles.sectionBar} data-reveal>
          <span className={styles.sectionTag}>
            02 / Selected Engineering Work
          </span>
          <span className={styles.sectionMeta}>05 systems · 2025—2026</span>
        </div>

        <div className={styles.workHeader}>
          <h2 id="work-title" className={styles.workTitle} data-reveal>
            Systems, documented like an{" "}
            <span className="serif">engineering record.</span>
          </h2>
          <p className={styles.workIntro} data-reveal>
            Four builds, each constrained by a real failure mode. The record is
            deliberately plain: the constraint, the engineering response, and
            the parts of the stack that carried the weight.
          </p>
        </div>

        <div className={styles.caseList}>
          {caseStudies.map((project) => (
            <article
              className={styles.caseStudy}
              key={project.id}
              data-reveal
            >
              <div className={styles.caseMeta}>
                <span className={styles.caseIndex}>{project.index}</span>
                <span>{project.year}</span>
                <span>{project.discipline}</span>
                <span>{project.role}</span>
              </div>

              <div className={styles.caseBody}>
                {project.image && (
                  <figure className={styles.caseThumbnail}>
                    <img
                      src={`${basePath}${project.image}`}
                      alt={`${project.title} — project thumbnail`}
                      loading="lazy"
                      width={1280}
                      height={720}
                    />
                  </figure>
                )}
                <div className={styles.caseTitleRow}>
                  <h3 className={styles.caseTitle}>{project.title}</h3>
                  <a
                    className={styles.caseLink}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={project.linkLabel}
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <p className={styles.caseLede}>{project.summary}</p>

                <dl className={styles.caseDetail}>
                  <div>
                    <dt>Constraint</dt>
                    <dd>{project.challenge}</dd>
                  </div>
                  <div>
                    <dt>Engineering response</dt>
                    <dd>{project.response}</dd>
                  </div>
                </dl>
              </div>

              <aside
                className={styles.caseAside}
                aria-label={`${project.title} architecture and signals`}
              >
                <div className={styles.caseArchitecture}>
                  <span className={styles.caseAsideLabel}>Architecture</span>
                  <ul>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <dl className={styles.caseMetrics}>
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.label}</dt>
                      <dd>{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </article>
          ))}
        </div>

        <div className={styles.workFoot} data-reveal>
          <p>
            More repositories, experiments, and half-finished ideas on GitHub.
          </p>
          <a href={site.github} target="_blank" rel="noreferrer">
            All repositories <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
