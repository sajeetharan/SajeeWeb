import React from "react";
import OriginalBlogPostPage from "@theme-original/BlogPostPage";
import type { Props } from "@theme/BlogPostPage";

export default function BlogPostPage(props: Props): JSX.Element {
  return (
    <OriginalBlogPostPage
      {...props}
      sidebar={{ ...props.sidebar, items: [] }}
    />
  );
}
