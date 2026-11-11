"use client";

import { useEffect, useState } from "react";
import styles from "./portfolio.module.scss";

type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepo = {
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  updated_at: string;
  archived: boolean;
};

type GitHubEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { size?: number; commits?: Array<{ sha: string }> };
};

const USER = "MahanteshPatil1214";

const gh = (path: string) =>
  fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

export default function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        const [userRes, repoRes, eventRes] = await Promise.allSettled([
          gh(`/users/${USER}`),
          gh(`/users/${USER}/repos?per_page=100&sort=updated`),
          gh(`/users/${USER}/events/public?per_page=100`),
        ]);

        if (userRes.status === "fulfilled" && !cancelled) {
          const data = await userRes.value.json();
          setUser(data);
        }
        if (repoRes.status === "fulfilled" && !cancelled) {
          const data = await repoRes.value.json();
          setRepos(Array.isArray(data) ? data : []);
        }
        if (eventRes.status === "fulfilled" && !cancelled) {
          const data = await eventRes.value.json();
          setEvents(Array.isArray(data) ? data : []);
        }

        // Detect rate limiting from any 403/401 response.
        const limited =
          [userRes, repoRes, eventRes].some(
            (r) =>
              r.status === "fulfilled" &&
              (r.value.status === 403 || r.value.status === 401)
          ) ||
          [userRes, repoRes, eventRes].some((r) => r.status === "rejected");
        setRateLimited(limited);
      } catch {
        setRateLimited(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
  const publicRepos = repos.filter((r) => !r.archived).length;

  const recentCommits = events.reduce((sum, e) => {
    if (e.type === "PushEvent") {
      return sum + (e.payload.commits?.length ?? e.payload.size ?? 0);
    }
    return sum;
  }, 0);

  const recentPRs = events.filter((e) => e.type === "PullRequestEvent").length;

  const languages: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      languages[r.language] = (languages[r.language] || 0) + 1;
    }
  });
  const topLangs = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const maxLang = topLangs.length ? Math.max(...topLangs.map(([, c]) => c)) : 1;

  const recentRepos = repos
    .filter((r) => !r.fork && !r.archived)
    .slice(0, 6);

  if (loading) {
    return (
      <div className={styles.githubStats} aria-label="GitHub activity">
        <div className={styles.githubStatsCard}>
          <div className={styles.githubStatsHeader}>
            <h3 className={styles.githubStatsTitle}>GitHub</h3>
            <span className={styles.githubStatsDot} aria-hidden="true">●</span>
          </div>
          <div className={styles.githubStatsPlaceholder}>
            <span className={styles.githubStatsLoading}>loading</span>
          </div>
        </div>
      </div>
    );
  }

  if (rateLimited && !user && !repos.length) {
    return (
      <div className={styles.githubStats} aria-label="GitHub activity">
        <div className={styles.githubStatsCard}>
          <div className={styles.githubStatsHeader}>
            <h3 className={styles.githubStatsTitle}>GitHub</h3>
            <span className={styles.githubStatsDot} aria-hidden="true">●</span>
          </div>
          <div className={styles.githubStatsPlaceholder}>
            GitHub stats temporarily unavailable (rate limited).{" "}
            <a
              href={`https://github.com/${USER}`}
              target="_blank"
              rel="noreferrer"
              className={styles.githubStatsLink}
            >
              view profile →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.githubStats} aria-label="GitHub activity">
      <div className={styles.githubStatsCard}>
        <div className={styles.githubStatsHeader}>
          <div>
            <h3 className={styles.githubStatsTitle}>GitHub</h3>
            <p className={styles.githubStatsMeta}>
              @{user?.login ?? USER} · {publicRepos} public repos
            </p>
          </div>
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
            <span className={styles.githubStatValue}>{totalForks}</span>
            <span className={styles.githubStatLabel}>forks</span>
          </div>
          <div className={styles.githubStat}>
            <span className={styles.githubStatValue}>{recentCommits}</span>
            <span className={styles.githubStatLabel}>recent commits</span>
          </div>
          <div className={styles.githubStat}>
            <span className={styles.githubStatValue}>{recentPRs}</span>
            <span className={styles.githubStatLabel}>recent pull requests</span>
          </div>
          <div className={styles.githubStat}>
            <span className={styles.githubStatValue}>
              {user?.followers ?? 0}
            </span>
            <span className={styles.githubStatLabel}>followers</span>
          </div>
        </div>

        {topLangs.length && (
          <div className={styles.githubStatsLanguages}>
            <span className={styles.githubStatsSectionLabel}>
              top languages
            </span>
            <div className={styles.githubStatsLanguageList}>
              {topLangs.map(([lang, count], i) => {
                const width = (count / maxLang) * 100;
                const hue = (i * 40) % 360;
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
                    <span className={styles.githubStatsLanguageCount}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {(recentCommits > 0 || recentPRs > 0) && (
          <div className={styles.githubStatsActivity}>
            <span className={styles.githubStatsSectionLabel}>
              recent activity
            </span>
            <div className={styles.githubStatsActivityList}>
              {recentCommits > 0 && (
                <div className={styles.githubStatsActivityItem}>
                  <span className={styles.githubStatsActivityIcon}>●</span>
                  <div>
                    <span className={styles.githubStatsActivityValue}>
                      {recentCommits}
                    </span>
                    <span className={styles.githubStatsActivityLabel}>
                      commits (100 events)
                    </span>
                  </div>
                </div>
              )}
              {recentPRs > 0 && (
                <div className={styles.githubStatsActivityItem}>
                  <span className={styles.githubStatsActivityIcon}>●</span>
                  <div>
                    <span className={styles.githubStatsActivityValue}>
                      {recentPRs}
                    </span>
                    <span className={styles.githubStatsActivityLabel}>
                      pull requests (100 events)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {recentRepos.length > 0 && (
          <div className={styles.githubStatsRecent}>
            <span className={styles.githubStatsSectionLabel}>
              recent repositories
            </span>
            <div className={styles.githubStatsRepoList}>
              {recentRepos.map((repo) => (
                <a
                  key={repo.full_name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.githubStatsRepo}
                >
                  <span className={styles.githubStatsRepoName}>{repo.name}</span>
                  {repo.description && (
                    <span className={styles.githubStatsRepoDesc}>
                      {repo.description}
                    </span>
                  )}
                  <span className={styles.githubStatsRepoStar}>
                    ⭐ {repo.stargazers_count}
                  </span>
                  {repo.language && (
                    <span className={styles.githubStatsRepoLang}>
                      {repo.language}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        <a
          href={`https://github.com/${USER}`}
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
