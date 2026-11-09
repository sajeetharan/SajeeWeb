import React from "react";
import Link from "@docusaurus/Link";
import OriginalBlogPostItem from "@theme-original/BlogPostItem";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import type { Props } from "@theme/BlogPostItem";
import TopicLinks from "../../components/topics/TopicLinks";

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
            <div
              className="margin-top--lg padding--md"
              data-mentoring-promotion="true"
            >
              <h2>Find your next career step</h2>
              <p>
                Considering a move from engineering into Product Management?
                Explore your transferable skills and practical next steps in a
                1:1 session.
              </p>
              <Link
                to="/mentored#service-2255580"
                className="button button--secondary"
                data-mentoring-source="article"
                data-mentoring-action="explore"
              >
                Explore my PM pathway &rarr;
              </Link>
            </div>
          )}
        </aside>
      )}
    </>
  );
}
