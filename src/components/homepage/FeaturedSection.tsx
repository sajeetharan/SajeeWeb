import React from "react";
import Link from "@docusaurus/Link";
import styles from "./FeaturedSection.module.scss";

interface SkillCategory {
  eyebrow: string;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
}

const skillCategories: SkillCategory[] = [
  {
    eyebrow: "Build",
    title: "Developer-first products",
    description:
      "I translate real developer needs into tools, APIs, and experiences that make complex cloud and data workflows feel simple.",
    link: "/projects",
    linkLabel: "View selected projects",
  },
  {
    eyebrow: "Teach",
    title: "Practical technical guidance",
    description:
      "I share field-tested lessons about Azure, databases, developer tooling, and coding agents through articles and talks.",
    link: "/blogs",
    linkLabel: "Read the latest insights",
  },
  {
    eyebrow: "Grow",
    title: "People and communities",
    description:
      "I mentor engineers and product leaders, contribute to open source, and create spaces where developers can learn together.",
    link: "/mentored",
    linkLabel: "Explore mentoring",
  },
];

export const FeaturedSection: React.FC = () => {
  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>What I do</p>
          <h2 className={styles.sectionTitle}>
            Turning deep technology into developer impact.
          </h2>
          <p className={styles.sectionIntro}>
            From product strategy to working code and community education, I
            focus on the parts of technology that help developers move faster.
          </p>
        </div>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, idx) => (
            <article key={category.title} className={styles.skillCard}>
              <div className={styles.cardNumber}>0{idx + 1}</div>
              <p className={styles.cardEyebrow}>{category.eyebrow}</p>
              <h3 className={styles.skillTitle}>{category.title}</h3>
              <p className={styles.skillDescription}>{category.description}</p>
              <Link className={styles.cardLink} to={category.link}>
                {category.linkLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
