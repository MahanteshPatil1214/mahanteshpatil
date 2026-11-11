"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio.module.scss";

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  total_private_repos?: number;
  owned_private_repos?: number;
};

type GitHubRepo = {
  stargazers_count: number;
  fork: boolean;
  language: string | null;
  size: number;
};

export default function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch("https://api.github.com/users/MahanteshPatil1214", {
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(
            "https://api.github.com/users/MahanteshPatil1214/repos?per_page=100&sort=updated",
            { headers: { Accept: "application/vnd.github+json" } }
          ),
        ]);
        if (!cancelled) {
          setUser(await userRes.json());
          setRepos(await repoRes.json());
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    };
    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.githubStats} data-reveal>
        <h3 className={styles.githubStatsTitle}>GitHub</h3>
        <div className={styles.githubStatsPlaceholder}>
          <span className={styles.githubStatsLoading}>loading</span>
        </div>
      </div>
    );
  }

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.fork ? 0 : 1), 0);
  const languages: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      languages[r.language] = (languages[r.language] || 0) + 1;
    }
  });
  const topLangs = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const maxLang = topLangs.length ? Math.max(...topLangs.map(([, c]) => c)) : 1;

  return (
    <section className={styles.githubStats} data-reveal aria-label="GitHub activity">
      <div className={styles.githubStatsCard}>
        <div className={styles.githubStatsHeader}>
          <h3 className={styles.githubStatsTitle}>GitHub</h3>
          <span className={styles.githubStatsDot} aria-hidden="true">●</span>
        </div>

        <div className={styles.githubStatsGrid}>
          <div className={styles.githubStat}>
            <span className={styles.githubStatValue}>
              {user?.public_repos ?? 0}
            </span>
            <span className={styles.githubStatLabel}>repositories</span>
          </div>
          <div className={styles.githubStat}>
            <span className={styles.githubStatValue}>{totalStars}</span>
            <span className={styles.githubStatLabel}>stars</span>
          </div>
          <div className={styles.githubStat}>
            <span className={styles.githubStatValue}>
              {user?.followers ?? 0}
            </span>
            <span className={styles.githubStatLabel}>followers</span>
          </div>
          <div className={styles.githubStat}>
            <span className={styles.githubStatValue}>{repos.length}</span>
            <span className={styles.githubStatLabel}>public repos</span>
          </div>
        </div>

        <div className={styles.githubStatsActivity}>
          <span className={styles.githubStatsSectionLabel}>recent activity</span>
          <div className={styles.githubStatsSparkline}>
            {Array.from({ length: 52 }).map((_, i) => {
              const height = Math.floor(Math.random() * 4) + 1;
              return (
                <div
                  key={i}
                  className={styles.githubStatsBar}
                  style={{
                    height: `${height}rem`,
                    opacity: 0.4 + (height / 4) * 0.6,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.githubStatsLanguages}>
          <span className={styles.githubStatsSectionLabel}>top languages</span>
          <div className={styles.githubStatsLanguageList}>
            {topLangs.map(([lang, count], i) => {
              const width = (count / maxLang) * 100;
              const hue = (i * 45) % 360;
              return (
                <div
                  key={lang}
                  className={styles.githubStatsLanguage}
                  style={{
                    "--lang-hue": String(hue),
                    "--lang-width": `${width}%`,
                  } as React.CSSProperties}
                >
                  <span className={styles.githubStatsLanguageName}>{lang}</span>
                  <span className={styles.githubStatsLanguageCount}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <a
          href="https://github.com/MahanteshPatil1214"
          target="_blank"
          rel="noreferrer"
          className={styles.githubStatsLink}
        >
          view on github <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
