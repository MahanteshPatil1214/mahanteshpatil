import { site } from "@/app/lib/constants";
import Clock from "./Clock";
import CopyEmail from "./CopyEmail";
import styles from "./portfolio.module.scss";

export default function Footer() {
  return (
    <footer
      id="contact"
      className={styles.footer}
      aria-labelledby="contact-title"
    >
      <div className={`container ${styles.sectionInner}`}>
        <div className={`${styles.sectionBar} ${styles.sectionBarDark}`} data-reveal>
          <span className={styles.sectionTagDark}>04 / Contact</span>
          <span className={styles.sectionMetaDark}>
            Open to software &amp; AI roles
          </span>
        </div>

        <div className={styles.footerTop}>
          <h2 id="contact-title" className={styles.footerTitle} data-reveal>
            Have a hard problem?{" "}
            <span className="serif">Send the brief.</span>
          </h2>
          <p className={styles.footerCopy} data-reveal>
            I&apos;m open to software engineering, AI engineering, and
            founding-engineer roles. If you&apos;re building something with real
            constraints, I&apos;d like to hear about it.
          </p>
        </div>

        <div className={styles.emailBlock} data-reveal>
          <a className={styles.emailLink} href={`mailto:${site.email}`}>
            <span>{site.email}</span>
            <span className={styles.emailArrow} aria-hidden="true">
              ↗
            </span>
          </a>

          <div className={styles.emailActions}>
            <CopyEmail
              className={styles.copyButton}
              email={site.email}
              label="Copy email"
              copiedLabel="Copied to clipboard"
            />
            <div className={styles.socials}>
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom} data-reveal>
          <span>© 2026 Mahantesh Patil</span>
          <span className={styles.footerLocation}>
            Kalaburagi, Karnataka / IST
            <Clock className={styles.clock} />
          </span>
          <a href="#top" className={styles.backToTop}>
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
