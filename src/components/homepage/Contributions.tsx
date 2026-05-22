import React from "react";
import styles from "./Contributions.module.scss";

export const Contributions: React.FC = () => {
  return (
    <section className={styles.contributions}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Contributions</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <h3>GitHub</h3>
            </div>
            <p className={styles.username}>
              <a
                href="https://github.com/sajeetharan"
                target="_blank"
                rel="noopener noreferrer"
              >
                @sajeetharan ↗
              </a>
            </p>
            <div className={styles.graphContainer}>
              <img
                src="https://ghchart.rshah.org/sajeetharan"
                alt="GitHub Contributions Graph"
                className={styles.contributionGraph}
              />
            </div>
            <div className={styles.stats}>
              <a
                href="https://github.com/sajeetharan"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewProfile}
              >
                View GitHub Profile →
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
              >
                <title>Stack Overflow</title>
                <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154z" />
              </svg>
              <h3>Stack Overflow</h3>
            </div>
            <p className={styles.username}>
              <a
                href="https://stackoverflow.com/users/1749403/sajeetharan"
                target="_blank"
                rel="noopener noreferrer"
              >
                @sajeetharan ↗
              </a>
            </p>
            <div className={styles.graphContainer}>
              <a
                href="https://stackoverflow.com/users/1749403/sajeetharan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://stackoverflow.com/users/flair/1749403.png?theme=dark"
                  alt="Stack Overflow Profile"
                  className={styles.soFlair}
                />
              </a>
            </div>
            <div className={styles.soHighlights}>
              <div className={styles.highlight}>
                <span className={styles.highlightLabel}>#1</span>
                <span className={styles.highlightDesc}>from Sri Lanka</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightLabel}>Top 10</span>
                <span className={styles.highlightDesc}>
                  Azure, Angular, Cosmos DB
                </span>
              </div>
            </div>
            <div className={styles.stats}>
              <a
                href="https://stackoverflow.com/users/1749403/sajeetharan"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewProfile}
              >
                View Stack Overflow Profile →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
