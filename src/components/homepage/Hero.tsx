import clsx from "clsx";
import React from "react";

import styles from "./Hero.module.scss";

export const Hero: React.FC = () => {
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={clsx(styles.title)}>
            Hi, I'm{" "}
            <span className={styles.highlighted}>Sajeetharan Sinnathurai</span>
          </h1>
          <p className={clsx(styles.role)}>
            Principal Program Manager @ Microsoft
          </p>
          <p className={clsx(styles.subtitle)}>
            Driving Developer Experience & AI Innovation
          </p>
          <div className={styles.tags}>
            <span className={styles.tag}>Cloud</span>
            <span className={styles.tag}>Databases</span>
            <span className={styles.tag}>Stack Overflow Top Contributor</span>
            <span className={styles.tag}>GDE</span>
            <span className={styles.tag}>MVP</span>
            <span className={styles.tag}>Speaker</span>
            <span className={styles.tag}>OSS Enthusiast</span>
          </div>
        </div>
      </div>
    </header>
  );
};
