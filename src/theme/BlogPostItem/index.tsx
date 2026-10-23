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
        </aside>
      )}
    </>
  );
}
