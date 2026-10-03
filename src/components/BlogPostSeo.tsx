import Head from "@docusaurus/Head";

type FaqItem = {
  question: string;
  answer: string;
};

type BlogPostSeoProps = {
  title: string;
  headline: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  faq: FaqItem[];
};

const siteUrl = "https://www.sajeetharan.dev";

export default function BlogPostSeo({
  title,
  headline,
  description,
  path,
  image,
  imageAlt,
  datePublished,
  dateModified,
  keywords,
  faq,
}: BlogPostSeoProps): JSX.Element {
  const url = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        headline,
        description,
        image: [imageUrl],
        datePublished,
        dateModified,
        author: {
          "@type": "Person",
          name: "Sajeetharan Sinnathurai",
          url: `${siteUrl}/`,
        },
        publisher: {
          "@type": "Person",
          name: "Sajeetharan Sinnathurai",
          url: `${siteUrl}/`,
        },
        keywords,
        inLanguage: "en",
      },
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
      <meta property="article:published_time" content={datePublished} />
      <meta property="article:modified_time" content={dateModified} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
}
