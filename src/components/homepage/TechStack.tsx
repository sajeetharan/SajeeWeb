import React from "react";
import styles from "./TechStack.module.scss";

interface TechItem {
  name: string;
}

const techStack: TechItem[] = [
  { name: "Azure" },
  { name: "Azure Cosmos DB" },
  { name: "GitHub Copilot" },
  { name: "Coding Agents" },
  { name: "Developer Experience" },
  { name: "Open Source" },
];

export const TechStack: React.FC = () => {
  return (
    <section className={styles.techSection}>
      <div className="container">
        <div className={styles.content}>
          <p className={styles.label}>Working across</p>
          <div className={styles.techList}>
            {techStack.map((tech) => (
              <span key={tech.name} className={styles.techItem}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
