import React from "react";
import Head from "@docusaurus/Head";
import OriginalMetadata from "@theme-original/BlogPostPage/Metadata";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function BlogPostMetadata(): JSX.Element {
  const { metadata, assets } = useBlogPost();
  const { siteConfig } = useDocusaurusContext();
  const { title, description, permalink, date, authors, tags, frontMatter } =
    metadata;
  const url = new URL(permalink, siteConfig.url).href;
  const modified =
    typeof frontMatter.dateModified === "string"
      ? frontMatter.dateModified
      : undefined;
  const image =
    assets.image ?? frontMatter.image ?? siteConfig.themeConfig.image;
  const author =
    authors.length > 0
      ? authors.map((item) => ({
          "@type": "Person",
          name: item.name,
          ...(item.url && { url: new URL(item.url, siteConfig.url).href }),
        }))
      : [
          {
            "@type": "Person",
            name: "Sajeetharan Sinnathurai",
            url: siteConfig.url,
          },
        ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: title,
        description,
        datePublished: date,
        ...(modified && { dateModified: modified }),
        ...(typeof image === "string" && {
          image: [new URL(image, siteConfig.url).href],
        }),
        author,
        publisher: {
          "@type": "Person",
          name: "Sajeetharan Sinnathurai",
          url: siteConfig.url,
        },
        keywords: frontMatter.keywords ?? tags.map((tag) => tag.label),
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", item: new URL("/", siteConfig.url).href },
          { name: "Blog", item: new URL("/blogs", siteConfig.url).href },
          { name: title, item: url },
        ].map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          ...item,
        })),
      },
    ],
  };

  return (
    <>
      <OriginalMetadata />
      <Head>
        {modified && (
          <meta property="article:modified_time" content={modified} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, "\\u003c")}
        </script>
      </Head>
    </>
  );
}
