import React from "react";
import Link from "@docusaurus/Link";
import OriginalBlogPostItem from "@theme-original/BlogPostItem";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import type { Props } from "@theme/BlogPostItem";
import TopicLinks from "../../components/topics/TopicLinks";
import styles from "./styles.module.scss";

export default function BlogPostItem(props: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost();
  return (
    <>
      <OriginalBlogPostItem {...props} />
      {isBlogPostPage && (
        <aside
          aria-label="Article author and topics"
          className="margin-bottom--lg"
        >
          {metadata.authors.length === 0 && (
            <p>
              Written by <Link to="/">Sajeetharan Sinnathurai</Link>.
            </p>
          )}
          <TopicLinks permalink={metadata.permalink} />
          {metadata.frontMatter.mentoring === true && (
            <div className={styles.promotion} data-mentoring-promotion="true">
              <h2>Turn your engineering experience into a PM pathway</h2>
              <p>
                Considering a move from engineering into Product Management?
                Start with the free readiness checklist, or book a free
                15-minute discovery call to discuss your next step.
              </p>
              <div className={styles.actions}>
                <Link
                  to="/mentored"
                  className={styles.primary}
                  data-mentoring-source="article"
                  data-mentoring-action="explore"
                >
                  Book a free discovery call &rarr;
                </Link>
                <Link
                  to="/engineer-to-pm-checklist"
                  data-mentoring-source="article"
                  data-mentoring-action="checklist"
                >
                  Get the free Engineer &rarr; PM checklist
                </Link>
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
