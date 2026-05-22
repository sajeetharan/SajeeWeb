import React from "react";
import styles from "./TechStack.module.scss";

interface TechItem {
  name: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: "Azure", icon: "☁️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Cosmos DB", icon: "🗄️" },
  { name: "Kubernetes", icon: "☸️" },
  { name: "Python", icon: "🐍" },
  { name: "Docker", icon: "🐳" },
  { name: "GraphQL", icon: "◈" },
  { name: "AI/ML", icon: "🤖" },
  { name: "Angular", icon: "🅰️" },
  { name: "VS Code", icon: "💻" },
];

export const TechStack: React.FC = () => {
  return (
    <section className={styles.techSection}>
      <div className={styles.scrollContainer}>
        <div className={styles.scrollTrack}>
          {[...techStack, ...techStack].map((tech, idx) => (
            <div key={idx} className={styles.techItem}>
              <span className={styles.techIcon}>{tech.icon}</span>
              <span className={styles.techName}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
