import React from "react";
import styles from "./AboutMe.module.scss";

export interface AboutMeProps {
  descriptionComponent: React.ReactNode;
}

export function AboutMe({ descriptionComponent }: AboutMeProps): JSX.Element {
  return (
    <section
      id="about"
      tabIndex={-1}
      className={styles.aboutSection}
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className={styles.aboutCard}>
          <div>
            <h2 id="about-title">About Me</h2>
            <p className={styles.intro}>
              Developer turned product leader. Community builder at heart.
            </p>
          </div>
          <div>
            <p>
              I&apos;m a Principal Product Manager at Microsoft, building
              developer experiences around Azure Cosmos DB and AI. I share what
              I learn through open source, speaking, and mentoring.
            </p>
            <details className={styles.biography}>
              <summary>Read my full story</summary>
              <div className={styles.fullStory}>{descriptionComponent}</div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
