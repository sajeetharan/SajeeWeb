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

        <div className={styles.experienceSection}>
          <h2 className={styles.sectionTitle}>Professional Journey</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>Dec 2023 - Present</div>
                <h3 className={styles.timelineTitle}>
                  Principal Product Manager
                </h3>
                <div className={styles.timelineCompany}>Microsoft</div>
                <p className={styles.timelineDescription}>
                  Leading product strategy and developer experience for Azure
                  Cosmos DB and AI initiatives. Driving innovation in cloud
                  databases, vector search, and AI-powered developer tools.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>Jul 2021 - Dec 2023</div>
                <h3 className={styles.timelineTitle}>Senior Product Manager</h3>
                <div className={styles.timelineCompany}>Microsoft</div>
                <p className={styles.timelineDescription}>
                  Led developer experience initiatives for Azure Cosmos DB,
                  focusing on SDKs, tooling, and developer-centric features.
                  Drove adoption through community engagement and technical
                  evangelism.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>May 2019 - Jul 2021</div>
                <h3 className={styles.timelineTitle}>Product Manager</h3>
                <div className={styles.timelineCompany}>Microsoft</div>
                <p className={styles.timelineDescription}>
                  Started product management journey at Microsoft, focusing on
                  developer tools and cloud platform initiatives. Built
                  foundation for developer experience strategy and community
                  engagement programs.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>Jan 2017 - May 2019</div>
                <h3 className={styles.timelineTitle}>
                  Senior Software Engineer
                </h3>
                <div className={styles.timelineCompany}>99X Technology</div>
                <p className={styles.timelineDescription}>
                  Developed enterprise-scale applications and led technical
                  implementations for global clients. Specialized in cloud
                  solutions, modern web frameworks, and agile development
                  practices.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineDate}>2012 - 2017</div>
                <h3 className={styles.timelineTitle}>
                  Software Engineer & Developer
                </h3>
                <div className={styles.timelineCompany}>Various Companies</div>
                <p className={styles.timelineDescription}>
                  Built expertise in full-stack development and modern web
                  technologies. Contributed to open-source projects and
                  established presence in the developer community, becoming the
                  top Stack Overflow contributor in Sri Lanka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
