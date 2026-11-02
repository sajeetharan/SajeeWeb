import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { featuredProjects } from "../data/featured-projects";
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
    location: "Bangalore, India",
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
            <div className={styles.actions}>
              <Link className="button button--primary" to="/contact#recruiters">
                Discuss a role
              </Link>
              <Link className="button button--secondary" to="/projects">
                Explore shipped work
              </Link>
            </div>
          </header>

          <section
            className={styles.overview}
            aria-labelledby="expertise-title"
          >
            <h2 id="expertise-title">Engineering depth. Product leadership.</h2>
            <p>
              Principal Product Manager at Microsoft, focused on developer
              experience, Azure Cosmos DB, SDK design, and tooling. My
              background spans software engineering, technical leadership, and
              cloud architecture.
            </p>
            <ul>
              <li>Product strategy grounded in developer needs</li>
              <li>Cloud platforms, databases, and developer workflows</li>
              <li>AI agents, MCP, and hands-on open-source development</li>
            </ul>
            <p>
              This page describes my public experience, not a statement of job
              availability or a start date. No AI chat is needed to explore my
              work or contact me.
            </p>
            <h2>Selected shipped work</h2>
            <ul>
              {featuredProjects.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.url}
                    data-portfolio-project={project.id}
                    data-portfolio-action="source"
                  >
                    {project.title}
                  </a>{" "}
                  &mdash; {project.role}. {project.outcome}
                </li>
              ))}
            </ul>
            <p>
              These are public deliverables, not claims about adoption or
              internal business metrics.
            </p>
          </section>
          <section aria-labelledby="experience-title">
            <h2 id="experience-title" className={styles.experienceTitle}>
              Professional experience
            </h2>
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
          </section>
          <section
            className={styles.overview}
            aria-labelledby="career-contact-title"
          >
            <h2 id="career-contact-title">Start a conversation</h2>
            <p>
              Share the role, team, and developer problems you are working on.
              We can discuss fit directly.
            </p>
            <Link className="button button--primary" to="/contact#recruiters">
              Contact me about a role
            </Link>
          </section>
        </div>
      </main>
    </Layout>
  );
}
