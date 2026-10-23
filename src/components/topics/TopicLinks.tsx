import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { TopicData } from "./types";
import styles from "./styles.module.scss";

export default function TopicLinks({
  permalink,
}: {
  permalink?: string;
}): JSX.Element {
  const { topics } = usePluginData("topic-hubs") as TopicData;
  const relevant = permalink
    ? topics.filter((topic) =>
        topic.posts.some((post) => post.permalink === permalink),
      )
    : topics;

  return (
    <nav className={styles.topicLinks} aria-label="Explore blog topics">
      <Link to="/topics">All topics</Link>
      {relevant.map((topic) => (
        <Link key={topic.slug} to={`/topics/${topic.slug}`}>
          {topic.title}
        </Link>
      ))}
    </nav>
  );
}
