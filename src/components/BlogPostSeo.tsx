import React from "react";
import Head from "@docusaurus/Head";
import { useBlogPost } from "@docusaurus/theme-common/internal";

type FaqItem = {
  question: string;
  answer: string;
};

type BlogPostSeoProps = {
  title: string;
  path: string;
  image: string;
  imageAlt: string;
  faq: FaqItem[];
};

const siteUrl = "https://www.sajeetharan.dev";

export default function BlogPostSeo({
  title,
  path,
  image,
  imageAlt,
  faq,
}: BlogPostSeoProps): JSX.Element | null {
  const { isBlogPostPage } = useBlogPost();
  if (!isBlogPostPage) {
    return null;
  }

  const url = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faq.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData).replace(/</g, "\\u003c")}
      </script>
    </Head>
  );
}
