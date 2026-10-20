import React from "react";
import Layout from "@theme/Layout";
import styles from "./mentored.module.scss";

const title = "Get Mentored";
const description =
  "Choose a Topmate service for personalized mentoring, PM interview preparation, or your next career move.";

const services = [
  {
    id: "2235625",
    name: "1:1 Mentorship",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Get personalized guidance on your career, technical growth, and next steps.",
    cta: "Book mentorship",
  },
  {
    id: "2333442",
    name: "PM Interview Prep — Tips & Mock Questions",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Prepare for your product management interview with practical tips and mock questions.",
    cta: "Prepare for my interview",
  },
  {
    id: "2255580",
    name: "Pathway to Product Management",
    format: "Video meeting",
    duration: "30 minutes",
    description:
      "Explore your transition into product management and discuss a path that fits your experience.",
    cta: "Explore my PM pathway",
  },
  {
    id: "2333453/pay",
    name: "Ask me anything",
    format: "Priority DM",
    duration: "Reply within 2 days",
    description:
      "Have a focused question? Send a message on Topmate without scheduling a call.",
    cta: "Send my question",
  },
  {
    id: "2235628",
    name: "Discovery Call",
    format: "Video meeting",
    duration: "15 minutes",
    description:
      "Not sure where to start? Have a short introductory conversation about your goals.",
    cta: "Book a discovery call",
  },
];

export default function Mentored(): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main className={styles.mentoredPage}>
        <div className="container">
          <div className={styles.header}>
            <p className={styles.eyebrow}>1:1 GUIDANCE ON TOPMATE</p>
            <h1>{title}</h1>
            <p className={styles.subtitle}>{description}</p>
          </div>
          <section aria-labelledby="mentoring-services-title">
            <div className={styles.sectionHeader}>
              <h2 id="mentoring-services-title">Choose your next step</h2>
              <p>
                Pick the service that matches your goal. View current pricing
                and availability, then complete your booking on Topmate. Links
                open in a new tab.
              </p>
            </div>
            <div className={styles.serviceGrid}>
              {services.map((service) => (
                <article key={service.id} className={styles.serviceCard}>
                  <p className={styles.serviceMeta}>
                    {service.format} &middot; {service.duration}
                  </p>
                  <h3>{service.name}</h3>
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>
                  <a
                    href={`https://topmate.io/sajeetharan/${service.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                    aria-label={`${service.cta} on Topmate (opens in a new tab)`}
                  >
                    {service.cta} &rarr;
                  </a>
                </article>
              ))}
            </div>
          </section>
          <div className={styles.footer}>
            <p>Prefer to browse everything in one place?</p>
            <a
              href="https://topmate.io/sajeetharan"
              target="_blank"
              rel="noopener noreferrer"
            >
              View all services on Topmate &rarr;
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
