import React from "react";
import Layout from "@theme/Layout";
import styles from "./career.module.scss";

interface CareerEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  type: "work" | "education";
}

const careerTimeline: CareerEntry[] = [
  {
    role: "Principal Product Manager",
    company: "Microsoft",
    period: "2020 - Present",
    location: "Redmond, WA",
    description: [
      "Leading Azure Cosmos DB developer experience, SDK design, and tooling",
      "Driving product strategy for developer tools and extensions",
      "Building world-class developer experiences for distributed databases",
    ],
    type: "work",
  },
  {
    role: "Cloud Solution Architect",
    company: "Microsoft",
    period: "2019 - 2020",
    location: "Sri Lanka",
    description: [
      "Helped enterprise customers adopt Azure cloud solutions",
      "Designed and implemented cloud-native architectures",
      "Mentored developers and led community initiatives",
    ],
    type: "work",
  },
  {
    role: "Technical Lead",
    company: "99X Technology",
    period: "2016 - 2019",
    location: "Sri Lanka",
    description: [
      "Led development teams building enterprise software solutions",
      "Architected scalable applications for global clients",
      "Received Technology Leadership Award in 2018",
    ],
    type: "work",
  },
  {
    role: "Software Engineer",
    company: "DuoSoftware",
    period: "2011 - 2016",
    location: "Sri Lanka",
    description: [
      "Full-stack development with modern web technologies",
      "Built cloud-based SaaS products",
      "Contributed to open source projects",
    ],
    type: "work",
  },
];

const title = "Career Journey";
const description =
  "My professional journey from software engineering to leading product at Microsoft.";

export default function Career(): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main className={styles.careerPage}>
        <div className="container">
          <header className={styles.header}>
            <h1>{title}</h1>
            <p className={styles.subtitle}>{description}</p>
          </header>

          <div className={styles.timeline}>
            {careerTimeline.map((entry, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineMeta}>
                    <span className={styles.period}>{entry.period}</span>
                    <span className={styles.location}>{entry.location}</span>
                  </div>
                  <h3 className={styles.role}>{entry.role}</h3>
                  <p className={styles.company}>{entry.company}</p>
                  <ul className={styles.descriptionList}>
                    {entry.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
