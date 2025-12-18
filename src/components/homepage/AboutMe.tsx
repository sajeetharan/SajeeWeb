import React, { FunctionComponent } from "react";
import clsx from "clsx";
import Image from "@theme/IdealImage";
import styles from "./AboutMe.module.scss";

export interface AboutMeProps {
  avatar: string;
  descriptionComponent: React.ReactNode;
}

export const AboutMe: FunctionComponent<AboutMeProps> = ({
  avatar,
  descriptionComponent,
}) => {
  return (
    <section className={styles.aboutSection}>
      <div className={"container"}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.aboutCard}>
          <div className="row">
            <div className={clsx("col col--7", styles.descriptionCol)}>
              <div className={styles.description}>{descriptionComponent}</div>
              <div className={styles.highlights}>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>🏆</div>
                  <div>
                    <div className={styles.highlightTitle}>Top Contributor</div>
                    <div className={styles.highlightText}>
                      #1 Stack Overflow contributor from Sri Lanka
                    </div>
                  </div>
                </div>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>🎯</div>
                  <div>
                    <div className={styles.highlightTitle}>Expertise</div>
                    <div className={styles.highlightText}>
                      Cloud Platforms, Databases, Developer Tools
                    </div>
                  </div>
                </div>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>🌍</div>
                  <div>
                    <div className={styles.highlightTitle}>Global Impact</div>
                    <div className={styles.highlightText}>
                      International speaker & OSS contributor
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx("col col--5", styles.avatarContainer)}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  <Image img={avatar} />
                </div>
                <div className={styles.avatarBadge}>
                  <span>🌟 GDE & MVP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
