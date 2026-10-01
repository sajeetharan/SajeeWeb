import React from "react";
import Link from "@docusaurus/Link";
import styles from "./FeaturedTalks.module.scss";

interface FeaturedTalk {
  title: string;
  event: string;
  date: string;
  videoId?: string;
  topic?: string;
  url: string;
}

const featuredTalks: FeaturedTalk[] = [
  {
    title:
      "Turning Coding Agents into an Azure Cosmos DB Expert with the Agent Kit",
    event: "Azure Developers Show",
    date: "July 2026",
    videoId: "GWid8x3i9Cc",
    url: "https://www.youtube.com/watch?v=GWid8x3i9Cc",
  },
  {
    title: "Beyond CRUD: Designing MCP Tools Around Trust and Consent",
    event: "Sessionize",
    date: "Latest session",
    topic: "MCP · Trust · Consent",
    url: "https://sessionize.com/s/sajeetharan/beyond-crud-designing-mcp-tools-around-trust-and-c/188203",
  },
  {
    title: "Building an Agent-First Experience for Azure Cosmos DB",
    event: "Sessionize",
    date: "Latest session",
    topic: "Agents · MCP · Cosmos DB",
    url: "https://sessionize.com/s/sajeetharan/building-an-agent-first-experience-for-azure-cosmo/188204",
  },
  {
    title: "How MCP Unlocks Smarter Developer Workflows",
    event: "FOSSASIA Summit 2026",
    date: "March 2026",
    videoId: "bXvHFUDAIVY",
    url: "https://www.youtube.com/watch?v=bXvHFUDAIVY",
  },
  {
    title: "Agentic Coding with Azure Cosmos DB: From Idea to Working App",
    event: "Microsoft Reactor",
    date: "June 2026",
    videoId: "ST8lvhD9d_M",
    url: "https://www.youtube.com/watch?v=ST8lvhD9d_M",
  },
];

export const FeaturedTalks: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Recent Talks</h2>
        <div className={styles.grid}>
          {featuredTalks.map((talk) => (
            <a
              key={talk.url}
              href={talk.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.thumbnail}>
                {talk.videoId ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${talk.videoId}/mqdefault.jpg`}
                      alt=""
                      loading="lazy"
                    />
                    <div className={styles.playOverlay}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="48"
                        height="48"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className={styles.sessionVisual}>
                    <span className={styles.sessionSource}>Sessionize</span>
                    <strong>{talk.topic}</strong>
                    <span className={styles.sessionArrow} aria-hidden="true">
                      ↗
                    </span>
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <h3 className={styles.talkTitle}>{talk.title}</h3>
                <div className={styles.meta}>
                  <span>{talk.event}</span>
                  <span>{talk.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link
            className="button button--secondary button--outline"
            to="/talks"
          >
            View All Talks →
          </Link>
        </div>
      </div>
    </section>
  );
};
