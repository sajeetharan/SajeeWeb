import clsx from "clsx";
import React from "react";
import Link from "@docusaurus/Link";

import styles from "./Hero.module.scss";

interface HeroProps {
  avatar: string | { src: string };
}

export const Hero: React.FC<HeroProps> = ({ avatar }) => {
  const avatarSrc = typeof avatar === "string" ? avatar : avatar.src;

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <h1 className={styles.personName}>Sajeetharan Sinnathurai</h1>
            <div className={styles.eyebrow}>
              <span className={styles.statusDot} aria-hidden="true" />
              Principal Product Manager at Microsoft
            </div>
            <h2 className={styles.title}>
              I help developers build what&apos;s next.
            </h2>
            <p className={styles.subtitle}>
              I work at the intersection of{" "}
              <strong>developer tools, databases, and AI agents</strong>—turning
              complex technology into products, guidance, and communities that
              help people ship with confidence.
            </p>
            <div className={styles.ctaButtons}>
              <Link
                className={clsx(
                  "button button--primary button--lg",
                  styles.primaryCta,
                )}
                to="/projects"
              >
                Explore my work
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className={styles.buttonIcon}
                >
                  <path
                    d="M4 10h12m-5-5 5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link className={styles.secondaryCta} to="/mentored">
                Work with me
              </Link>
            </div>
            <p className={styles.availability}>
              Speaking, mentoring, and community collaborations
            </p>
          </div>

          <div className={styles.visual}>
            <div className={styles.imageFrame}>
              <img
                src={avatarSrc}
                className={styles.portrait}
                alt="Sajeetharan Sinnathurai"
                width="430"
                height="538"
              />
            </div>
            <div className={styles.profileCard}>
              <span className={styles.profileLabel}>Recognized expertise</span>
              <strong>Google Developer Expert · Microsoft MVP</strong>
              <span>First developer from Sri Lanka to earn both honors</span>
            </div>
          </div>
        </div>

        <div className={styles.proofBar} aria-label="Career highlights">
          <div className={styles.proofItem}>
            <strong>13+ years</strong>
            <span>building for developers</span>
          </div>
          <div className={styles.proofItem}>
            <strong>Global top 10</strong>
            <span>Stack Overflow expertise</span>
          </div>
          <div className={styles.proofItem}>
            <strong>International</strong>
            <span>speaker and community leader</span>
          </div>
          <div className={styles.proofItem}>
            <strong>Open source</strong>
            <span>builder and contributor</span>
          </div>
        </div>
      </div>
    </header>
  );
};
