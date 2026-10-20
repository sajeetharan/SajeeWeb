import React, { useState } from "react";
import Link from "@docusaurus/Link";
import styles from "./Reviews.module.scss";

type Platform = "ADPList" | "Topmate";
type Filter = "All" | Platform;

const platforms: Record<Platform, string> = {
  ADPList: "https://adplist.org/mentors/sajeetharan-sinnathurai",
  Topmate: "https://topmate.io/sajeetharan",
};

// Public profile testimonials, verified on 2026-10-20. Keep excerpts verbatim.
const reviews = [
  {
    id: "hirish",
    platform: "ADPList",
    name: "Hirish",
    topic: "AI & leadership",
    excerpt:
      "While navigating this rapidly changing field is challenging, his ability to turn complex concepts into clear, practical advice helped me to a great extent.",
    full: "Learning from Mr. Sajeetharan was key to my growth in the AI sector. While navigating this rapidly changing field is challenging, his ability to turn complex concepts into clear, practical advice helped me to a great extent. Drawing from his senior leadership in top blue chip companies, he shared valuable real world knowledge on how large organizations adopt AI and manage risks.",
  },
  {
    id: "shruti",
    platform: "Topmate",
    name: "Shruti Solanki",
    topic: "Product management",
    excerpt:
      "He shared valuable insights about transitioning into Product Management and also recommended some useful resources to help me learn and grow.",
    full: "I had a great conversation with Sajetharan about Product Management. He was very approachable, kind, and generous with his time. He shared valuable insights about transitioning into Product Management and also recommended some useful resources to help me learn and grow. I really appreciate his guidance and the way he patiently answered my questions. It was a very helpful and insightful conversation, and I’m grateful for his support.",
  },
  {
    id: "tharu",
    platform: "ADPList",
    name: "Tharu Tharujan",
    topic: "Career clarity",
    excerpt:
      "Their exceptional knowledge and motivating words provided invaluable insights that have greatly impacted my progress.",
    full: "I had an outstanding experience with my mentor, whose amazing communication and subject knowledge truly helped clarify my goals and motivate me to reach new heights. Their exceptional knowledge and motivating words provided invaluable insights that have greatly impacted my progress. I highly recommend booking a session with this mentor if you're looking for guidance that exceeds expectations",
  },
  {
    id: "harsh",
    platform: "Topmate",
    name: "Harsh Kalokhe",
    topic: "Job search & CV",
    excerpt: "Very insightful and helpful in job search and CV analysis.",
  },
  {
    id: "soumya",
    platform: "ADPList",
    name: "Soumya Soni",
    topic: "Problem solving",
    excerpt:
      "They provided practical insights that helped me navigate my challenges effectively.",
    full: "I had an exceptional session with my mentor, who demonstrated amazing communication and problem-solving skills. Their deep subject knowledge and motivational approach truly exceeded my expectations. They provided practical insights that helped me navigate my challenges effectively. I highly recommend this mentor to anyone seeking guidance—booking a session with them is a decision",
  },
  {
    id: "pidikiti",
    platform: "Topmate",
    name: "Pidikiti Madhu Chandana",
    topic: "Career guidance",
    excerpt:
      "It's a very helpful to me. He will clear all my doubts regarding the positions and jobs",
  },
] satisfies {
  id: string;
  platform: Platform;
  name: string;
  topic: string;
  excerpt: string;
  full?: string;
}[];

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={styles.card} aria-label={`Review by ${review.name}`}>
      <div className={styles.cardHeader}>
        <span className={styles.topic}>{review.topic}</span>
        <a
          href={platforms[review.platform]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {review.platform}
          <span className={styles.visuallyHidden}> (opens in a new tab)</span>
        </a>
      </div>
      <blockquote id={`review-${review.id}`}>
        <p>{expanded && review.full ? review.full : review.excerpt}</p>
      </blockquote>
      <div className={styles.cardFooter}>
        <strong>{review.name}</strong>
        {review.full && (
          <button
            type="button"
            className={styles.readMore}
            aria-expanded={expanded}
            aria-controls={`review-${review.id}`}
            aria-label={`${expanded ? "Show excerpt" : "Read full review"} by ${review.name}`}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Read full review"}
          </button>
        )}
      </div>
    </article>
  );
}

export function Reviews(): JSX.Element {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const filtered = reviews.filter(
    (review) => filter === "All" || review.platform === filter,
  );
  const visible = showAll ? filtered : filtered.slice(0, 3);

  return (
    <section
      className={styles.section}
      aria-labelledby="mentoring-reviews-title"
    >
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>MENTORING / REAL EXPERIENCES</p>
            <h2 id="mentoring-reviews-title">Mentoring Reviews</h2>
            <p className={styles.subtitle}>
              Clearer next steps. More confidence. Hear from mentees on ADPList
              and Topmate.
            </p>
          </div>
          <Link
            className={`button button--primary ${styles.booking}`}
            to="/mentored"
          >
            Find your next step &rarr;
          </Link>
        </div>

        <div
          className={styles.filters}
          role="group"
          aria-label="Filter reviews by platform"
        >
          {(["All", "ADPList", "Topmate"] as const).map((platform) => (
            <button
              key={platform}
              type="button"
              aria-pressed={filter === platform}
              aria-controls="mentoring-review-grid"
              onClick={() => {
                setFilter(platform);
                setShowAll(false);
              }}
            >
              {platform === "All" ? "All reviews" : platform}
            </button>
          ))}
        </div>

        <p className={styles.visuallyHidden} role="status">
          Showing {visible.length} of {filtered.length} featured reviews
          {filter !== "All" ? ` from ${filter}` : ""}.
        </p>
        <div className={styles.grid} id="mentoring-review-grid">
          {visible.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        <div className={styles.footer}>
          {filtered.length > 3 && (
            <button
              type="button"
              className={styles.more}
              aria-expanded={showAll}
              aria-controls="mentoring-review-grid"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show fewer reviews" : "Show 3 more reviews"}
            </button>
          )}
          <div className={styles.sources}>
            <span>More reviews &amp; mentoring impact:</span>
            {(["ADPList", "Topmate"] as const).map((platform) => (
              <a
                key={platform}
                href={platforms[platform]}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on {platform} &rarr;
                <span className={styles.visuallyHidden}>
                  {" "}
                  (opens in a new tab)
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
