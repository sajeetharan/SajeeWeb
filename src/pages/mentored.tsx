import React from "react";
import Layout from "@theme/Layout";
import styles from "./mentored.module.scss";

interface Platform {
  name: string;
  description: string;
  image: string;
  link: string;
}

const platforms: Platform[] = [
  {
    name: "ADPList",
    description:
      "Book a free mentoring session on ADPList. Get career advice, resume reviews, and guidance on product management, engineering, and tech leadership.",
    image: "https://adplist.org/imgs/social-share.png",
    link: "https://adplist.org/invite/175466",
  },
  {
    name: "Topmate",
    description:
      "Connect with me on Topmate for 1:1 sessions, mock interviews, career guidance, and personalized mentoring on tech, product, and open source.",
    image:
      "https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/12fb611b-e184-4a68-9a3d-f3b3e8c78f4f.jpg",
    link: "https://topmate.io/sajeetharan",
  },
];

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
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.platformCard}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={platform.image}
                    alt={platform.name}
                    className={styles.platformImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.platformName}>{platform.name}</h2>
                  <p className={styles.platformDescription}>
                    {platform.description}
                  </p>
                  <span className={styles.cta}>Book a Session &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
