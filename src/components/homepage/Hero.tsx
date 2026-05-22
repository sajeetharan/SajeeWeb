import clsx from "clsx";
import React from "react";
import Link from "@docusaurus/Link";

import styles from "./Hero.module.scss";

export const Hero: React.FC = () => {
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className={styles.animatedBg}></div>
      <div className={styles.codeBackground}>
        <pre>{`const developer = {
  name: "Sajeetharan",
  role: "Principal PM @ Microsoft",
  focus: ["Cloud", "Databases", "AI"],
  passion: "Empowering developers"
};`}</pre>
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>👋</span>
            <span>Principal Program Manager @ Microsoft</span>
          </div>

          <h1 className={clsx(styles.title)}>Sajeetharan Sinnathurai</h1>

          <p className={clsx(styles.subtitle)}>
            Empowering developers through{" "}
            <span className={styles.highlight}>Cloud Platforms</span>,{" "}
            <span className={styles.highlight}>Databases</span>, and{" "}
            <span className={styles.highlight}>AI Innovation</span>
          </p>

          <div className={styles.achievements}>
            <div className={styles.achievementItem}>
              <div className={styles.achievementValue}>Top 10</div>
              <div className={styles.achievementLabel}>
                Stack Overflow Global
              </div>
            </div>
            <div className={styles.achievementItem}>
              <div className={styles.achievementValue}>13+ Years</div>
              <div className={styles.achievementLabel}>Software Industry</div>
            </div>
            <div className={styles.achievementItem}>
              <div className={styles.achievementValue}>GDE & MVP</div>
              <div className={styles.achievementLabel}>First in Sri Lanka</div>
            </div>
          </div>

          <div className={styles.ctaButtons}>
            <Link
              className={clsx(
                "button button--primary button--lg",
                styles.ctaButton,
              )}
              to="/projects"
            >
              View My Work
            </Link>
            <Link
              className={clsx(
                "button button--secondary button--outline button--lg",
                styles.ctaButton,
              )}
              to="/blogs"
            >
              Read My Blogs
            </Link>
          </div>

          <div className={styles.tags}>
            <span className={styles.tag}>☁️ Cloud Architecture</span>
            <span className={styles.tag}>🗄️ Azure Cosmos DB</span>
            <span className={styles.tag}>🤖 AI/ML</span>
            <span className={styles.tag}>🎤 International Speaker</span>
            <span className={styles.tag}>💻 Open Source</span>
            <span className={styles.tag}>📚 Community Leader</span>
          </div>
        </div>
      </div>
    </header>
  );
};
