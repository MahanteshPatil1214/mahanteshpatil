"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio.module.scss";

const USER = "MahanteshPatil1214";

type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  created_at: string;
};

type GitHubRepo = {
  stargazers_count: number;
  language: string | null;
  name: string;
};

// Lifetime metrics that require a GitHub token for exact totals. These fall
// back to the numbers you provided.
const CONFIG = {
  totalCommits: 678,
  totalPRs: 15,
  totalIssues: 6,
  contributedLastYear: 2,
  overallGrade: "B-",
  totalContributions: 661,
  contributionRange: "Apr 13, 2025 – Present",
  currentStreak: 10,
  currentStreakRange: "Nov 2 – Nov 11",
  longestStreak: 46,
  longestStreakRange: "Jul 18 – Sep 1",
} as const;

const gh = (path: string) =>
  fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

export default function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        const [userRes, repoRes] = await Promise.all([
          gh(`/users/${USER}`),
          gh(`/users/${USER}/repos?per_page=100&sort=updated`),
        ]);

        if (!cancelled) {
          const userData = await userRes.json();
          setUser(userData);

          const repoData = await repoRes.json();
          const repoList = Array.isArray(repoData) ? repoData : [];
          setRepos(repoList);

          const langCounts: Record<string, number> = {};
          await Promise.all(
            repoList.slice(0, 40).map(async (repo) => {
              try {
                const langRes = await gh(
                  `/repos/${USER}/${repo.name}/languages`
                );
                if (langRes.ok) {
                  const langData = await langRes.json();
                  Object.entries(langData as Record<string, number>).forEach(
                    ([lang, bytes]) => {
                      langCounts[lang] = (langCounts[lang] || 0) + bytes;
                    }
                  );
                }
              } catch {
                // ignore per-repo failures
              }
            })
          );
          setLanguages(langCounts);
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

  const liveStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
  const langList = Object.entries(languages)
    .map(([lang, bytes]) => ({
      lang,
      bytes,
      pct: totalBytes ? (bytes / totalBytes) * 100 : 0,
    }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 6);

  const statRows = [
    {
      label: "Total Stars Earned",
      value: liveStars,
      note: liveStars > 0 ? "live" : "",
    },
    {
      label: "Total Commits",
      value: CONFIG.totalCommits,
    },
    {
      label: "Total PRs",
      value: CONFIG.totalPRs,
    },
    {
      label: "Total Issues",
      value: CONFIG.totalIssues,
    },
    {
      label: "Contributed to (last year)",
      value: CONFIG.contributedLastYear,
    },
    {
      label: "Overall Grade",
      value: CONFIG.overallGrade,
    },
  ];

  if (loading) {
    return (
      <section className={styles.githubStats} aria-label="GitHub activity">
        <div className={styles.githubStatsCard}>
          <div className={styles.githubStatsPlaceholder}>
            <span className={styles.githubStatsLoading}>loading</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.githubStats} aria-label="GitHub activity">
      <div className={styles.githubStatsCard}>
        {/* 1. GitHub Stats */}
        <div className={styles.githubStatsBlock}>
          <h3 className={styles.githubStatsTitle}>GitHub Stats</h3>
          <p className={styles.githubStatsMeta}>
            Mahantesh Patil's GitHub Stats
          </p>
          <div className={styles.githubStatsGrid}>
            {statRows.map((row) => (
              <div
                key={row.label}
                className={styles.githubStat}
              >
                <span className={styles.githubStatLabel}>
                  {row.label}
                </span>
                <span className={styles.githubStatValue}>
                  {row.value}
                </span>
                {row.note && (
                  <span className={styles.githubStatsNote}>{row.note}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Contribution Streak Stats */}
        <div className={styles.githubStatsBlock}>
          <h3 className={styles.githubStatsTitle}>
            Contribution Streak Stats
          </h3>
          <div className={styles.githubStatsGrid}>
            <div className={`${styles.githubStat} ${styles.githubStatWide}`}>
              <span className={styles.githubStatLabel}>
                Total Contributions
              </span>
              <span className={styles.githubStatValue}>
                {CONFIG.totalContributions}
              </span>
              <span className={styles.githubStatsNote}>
                {CONFIG.contributionRange}
              </span>
            </div>
            <div className={`${styles.githubStat} ${styles.githubStatWide}`}>
              <span className={styles.githubStatLabel}>
                Current Streak
              </span>
              <span className={styles.githubStatValue}>
                {CONFIG.currentStreak} days
              </span>
              <span className={styles.githubStatsNote}>
                {CONFIG.currentStreakRange}
              </span>
            </div>
            <div className={`${styles.githubStat} ${styles.githubStatWide}`}>
              <span className={styles.githubStatLabel}>
                Longest Streak
              </span>
              <span className={styles.githubStatValue}>
                {CONFIG.longestStreak} days
              </span>
              <span className={styles.githubStatsNote}>
                {CONFIG.longestStreakRange}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Most Used Languages */}
        <div className={styles.githubStatsBlock}>
          <h3 className={styles.githubStatsTitle}>Most Used Languages</h3>
          <div className={styles.githubStatsLanguageList}>
            {langList.length > 0 ? (
              langList.map(({ lang, pct }) => (
                <div
                  key={lang}
                  className={styles.githubStatsLanguage}
                  style={{
                    "--lang-width": `${pct}%`,
                  } as React.CSSProperties}
                >
                  <span className={styles.githubStatsLanguageName}>
                    {lang}
                  </span>
                  <span className={styles.githubStatsLanguageCount}>
                    {pct.toFixed(2)}%
                  </span>
                </div>
              ))
            ) : (
              // Fallback to your provided percentages
              [
                { lang: "Python", pct: 29.97 },
                { lang: "TypeScript", pct: 28.49 },
                { lang: "Java", pct: 20.45 },
                { lang: "JavaScript", pct: 17.79 },
                { lang: "HTML", pct: 1.92 },
                { lang: "CSS", pct: 1.38 },
              ].map(({ lang, pct }) => (
                <div
                  key={lang}
                  className={styles.githubStatsLanguage}
                  style={{
                    "--lang-width": `${pct}%`,
                  } as React.CSSProperties}
                >
                  <span className={styles.githubStatsLanguageName}>
                    {lang}
                  </span>
                  <span className={styles.githubStatsLanguageCount}>
                    {pct.toFixed(2)}%
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
