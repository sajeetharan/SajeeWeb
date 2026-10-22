import React, { useRef, useState } from "react";
import Layout from "@theme/Layout";
import credly from "../data/credly-badges.json";
import styles from "./awards.module.scss";

type Category =
  | "award"
  | "recognition"
  | "certification"
  | "speaking"
  | "learning";
type Filter = "featured" | "all" | Category;

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  image: string;
  fullImage?: string;
  link?: string;
  category: Category;
  featured?: boolean;
  issuedAt?: string;
  expiresAt?: string | null;
}

const categoryLabels: Record<Category, string> = {
  award: "Award",
  recognition: "Recognition",
  certification: "Certification",
  speaking: "Speaking & coaching",
  learning: "Learning",
};

function badgeCategory(title: string): Category {
  if (title.includes("Challenge Winner")) return "award";
  if (/Speaker|Coach|Hackathon Leader|User Group/.test(title))
    return "speaking";
  if (/^Microsoft Certified|^AZ-/.test(title)) return "certification";
  if (
    /^OpenHack:|Essentials|Kusto Detective|Accessibility in Action/.test(title)
  )
    return "learning";
  return "recognition";
}

const awards: Award[] = [
  {
    id: "mvp",
    title: "Microsoft Most Valuable Professional",
    organization: "Microsoft",
    year: "2017 - 2019",
    description:
      "Recognized as Microsoft MVP in Developer Technologies for technical community leadership, knowledge sharing, and contributions to the Microsoft developer ecosystem.",
    image: "/img/awards/thumbnails/mvp.webp",
    fullImage: "/img/awards/mvp.jpg",
    link: "https://www.credly.com/badges/704888fd-04ff-4678-9a19-7a322f8d7ef6",
    category: "award",
    featured: true,
  },
  {
    id: "gde",
    title: "Google Developer Expert",
    organization: "Google",
    year: "2015 - Present",
    description:
      "First Google Developer Expert from Sri Lanka in Web Technologies. Recognized for technical expertise, community contributions, and advocacy for Google technologies.",
    image: "/img/awards/thumbnails/gde.webp",
    fullImage: "/img/awards/gde.jpg",
    category: "award",
    featured: true,
  },
  {
    id: "noonies",
    title: "Most Outstanding Educator in Technology",
    organization: "HackerNoon Noonies",
    year: "2020",
    description:
      "Winner of the HackerNoon Noonies 2020 award for Most Outstanding Educator in Technology with 533 votes, recognized for empowering developers through mentoring, open source contributions, and community leadership.",
    image: "/img/awards/thumbnails/noonies_2020.webp",
    fullImage: "/img/awards/noonies_2020.jpg",
    link: "https://noonies.hackernoon.com/2020/technology/2020-most-outstanding-educator-in-technology",
    category: "award",
    featured: true,
  },
  {
    id: "stackoverflow",
    title: "Stack Overflow Top Contributor",
    organization: "Stack Overflow",
    year: "2012 - Present",
    description:
      "#1 Stack Overflow contributor from Sri Lanka with global Top 10 ranking in Azure, Angular, and Azure Cosmos DB tags. Helping developers worldwide solve complex technical challenges.",
    image: "/img/awards/thumbnails/stackoverflow.webp",
    fullImage: "/img/awards/stackoverflow.jpg",
    link: "https://stackoverflow.com/users/1749403/sajeetharan",
    category: "recognition",
  },
  {
    id: "99x",
    title: "99X Technology Leadership Award",
    organization: "99X Technology",
    year: "2018",
    description:
      "Recognized for outstanding technical leadership, innovation, and contributions to building high-quality software solutions for global clients.",
    image: "/img/awards/thumbnails/tech_leadership.webp",
    fullImage: "/img/awards/tech_leadership.jpg",
    category: "award",
  },
  ...credly.badges.map((badge) => ({
    ...badge,
    year: badge.issuedAt.slice(0, 4),
    category: badgeCategory(badge.title),
    featured: badge.id === "84adc74d-c638-42d9-9114-a80c3a9d8190",
  })),
];

const filters: { value: Filter; label: string }[] = [
  { value: "featured", label: "Highlights" },
  { value: "all", label: "All" },
  { value: "award", label: "Awards" },
  { value: "recognition", label: "Recognition" },
  { value: "certification", label: "Certifications" },
  { value: "speaking", label: "Speaking & coaching" },
  { value: "learning", label: "Learning" },
];

function matchesFilter(award: Award, filter: Filter): boolean {
  return (
    filter === "all" ||
    (filter === "featured"
      ? Boolean(award.featured)
      : award.category === filter)
  );
}

export default function Awards(): JSX.Element {
  const [filter, setFilter] = useState<Filter>("featured");
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visibleAwards = awards.filter((award) => matchesFilter(award, filter));

  return (
    <Layout
      title="Awards & Recognition"
      description="Selected career highlights, community recognition, and verified Credly badges."
    >
      <main className={styles.awardsPage}>
        <div className="container">
          <header className={styles.header}>
            <p className={styles.eyebrow}>EXPERTISE / COMMUNITY / IMPACT</p>
            <h1>Awards &amp; Recognition</h1>
            <p className={styles.subtitle}>
              A few career highlights first. Explore the full collection of
              awards, community recognition, and verified learning credentials.
            </p>
            <a className={styles.profileLink} href={credly.profile}>
              View my badge wallet on Credly &rarr;
            </a>
          </header>

          <div
            className={styles.filters}
            role="group"
            aria-label="Filter awards and recognition"
          >
            {filters.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                aria-controls="awards-results"
                onClick={() => setFilter(value)}
              >
                {label}
                <span className={styles.count}>
                  {awards.filter((award) => matchesFilter(award, value)).length}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.resultsHeader}>
            <h2>{filters.find(({ value }) => value === filter)?.label}</h2>
            <p role="status" aria-live="polite" aria-atomic="true">
              Showing {visibleAwards.length} of {awards.length} recognitions
            </p>
          </div>
          <div
            id="awards-results"
            className={`${styles.awardsGrid} ${filter === "featured" ? styles.highlightGrid : ""}`}
          >
            {visibleAwards.map((award) => (
              <article key={award.id} className={styles.awardCard}>
                <button
                  type="button"
                  className={styles.imageButton}
                  aria-label={`View image: ${award.title}`}
                  aria-haspopup="dialog"
                  onClick={() => {
                    setSelectedAward(award);
                    dialog.current?.showModal();
                  }}
                >
                  <img
                    src={award.image}
                    alt=""
                    className={styles.awardImage}
                    width="360"
                    height="240"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.viewHint}>View image</span>
                </button>
                <div className={styles.cardContent}>
                  <span className={styles.categoryBadge}>
                    {categoryLabels[award.category]}
                  </span>
                  <h3 className={styles.awardTitle}>{award.title}</h3>
                  <div className={styles.awardMeta}>
                    <span>{award.organization}</span>
                    {award.issuedAt ? (
                      <span>
                        Issued{" "}
                        <time dateTime={award.issuedAt}>{award.issuedAt}</time>
                      </span>
                    ) : (
                      <span>{award.year}</span>
                    )}
                  </div>
                  {award.expiresAt && (
                    <p className={styles.expiry}>
                      {award.expiresAt <= credly.verifiedAt
                        ? "Expired "
                        : "Expires "}
                      <time dateTime={award.expiresAt}>{award.expiresAt}</time>{" "}
                      (historical credential)
                    </p>
                  )}
                  <p className={styles.description}>{award.description}</p>
                  {award.link && (
                    <a href={award.link} className={styles.awardLink}>
                      {award.issuedAt ? "Verify on Credly" : "View details"}{" "}
                      &rarr;
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className={styles.notice}>
            {credly.badges.length} public Credly badges verified on{" "}
            <time dateTime={credly.verifiedAt}>{credly.verifiedAt}</time>.
            Credentials are a historical record, not a claim of current
            certification. Follow the source link for current status.
          </p>
        </div>

        <dialog
          ref={dialog}
          className={styles.modal}
          aria-labelledby="award-image-title"
          onClose={() => setSelectedAward(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <div className={styles.modalContent}>
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => dialog.current?.close()}
              autoFocus
            >
              Close image
            </button>
            <h2 id="award-image-title">{selectedAward?.title}</h2>
            {selectedAward && (
              <img
                src={selectedAward.fullImage ?? selectedAward.image}
                alt={selectedAward.title}
                className={styles.modalImage}
              />
            )}
          </div>
        </dialog>
      </main>
    </Layout>
  );
}
