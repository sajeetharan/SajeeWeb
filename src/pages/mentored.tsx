import React from "react";
import Layout from "@theme/Layout";
import styles from "./mentored.module.scss";

const title = "Get Mentored";
const description =
  "Book a mentoring session with me on your preferred platform.";

export default function Mentored(): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main className={styles.mentoredPage}>
        <div className="container">
          <div className={styles.header}>
            <h1>{title}</h1>
            <p className={styles.subtitle}>{description}</p>
          </div>
          <div className={styles.platformGrid}>
            {/* ADPList Booking Widget */}
            <div className={styles.platformCard}>
              <div className={styles.cardContent}>
                <h2 className={styles.platformName}>ADPList</h2>
              </div>
              <section
                style={{
                  height: 496,
                  boxShadow: "rgba(142, 151, 158, 0.15) 0px 4px 19px 0px",
                  borderRadius: 16,
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: 650,
                }}
              >
                <iframe
                  src="https://adplist.org/widgets/booking?src=sajeetharan-sinnathurai"
                  title="Book on ADPList"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </section>
            </div>

            {/* Topmate Card */}
            <a
              href="https://topmate.io/sajeetharan"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.platformCard}
            >
              <div className={styles.imageContainer}>
                <img
                  src="https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/12fb611b-e184-4a68-9a3d-f3b3e8c78f4f.jpg"
                  alt="Topmate"
                  className={styles.platformImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.platformName}>Topmate</h2>
                <p className={styles.platformDescription}>
                  Connect with me on Topmate for 1:1 sessions, mock interviews,
                  career guidance, and personalized mentoring on tech, product,
                  and open source.
                </p>
                <span className={styles.cta}>Book a Session &rarr;</span>
              </div>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
