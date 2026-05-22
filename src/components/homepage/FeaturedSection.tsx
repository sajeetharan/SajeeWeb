import React from "react";
import clsx from "clsx";
import styles from "./FeaturedSection.module.scss";

interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Cloud & Infrastructure",
    icon: "☁️",
    skills: ["Azure", "Azure Cosmos DB", "Kubernetes", "Docker", "CI/CD"],
  },
  {
    title: "Development",
    icon: "💻",
    skills: ["JavaScript/TypeScript", "Python", "React", "Angular", "Node.js"],
  },
  {
    title: "Databases & Data",
    icon: "🗄️",
    skills: [
      "NoSQL",
      "SQL",
      "Vector Search",
      "Data Modeling",
      "Performance Tuning",
    ],
  },
  {
    title: "AI & Innovation",
    icon: "🤖",
    skills: [
      "AI/ML",
      "Developer Tools",
      "SDK Design",
      "API Development",
      "DevEx",
    ],
  },
];

export const FeaturedSection: React.FC = () => {
  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, idx) => (
            <div key={idx} className={styles.skillCard}>
              <div className={styles.skillIcon}>{category.icon}</div>
              <h3 className={styles.skillTitle}>{category.title}</h3>
              <div className={styles.skillTags}>
                {category.skills.map((skill, skillIdx) => (
                  <span key={skillIdx} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
