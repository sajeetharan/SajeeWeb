import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { Topic, TopicData } from "./types";
import styles from "./styles.module.scss";

export default function TopicPage({
  data: { topic, topics },
}: {
  data: TopicData & { topic: Topic | null };
}): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const title = topic
    ? `${topic.title} Guides & Articles`
    : "Azure, Cosmos DB, AI, MCP & Agent Skills";
  const description =
    topic?.description ??
    "Explore practical Azure, Azure Cosmos DB, AI agent, MCP, and agent skill guides by Sajeetharan Sinnathurai, Principal Product Manager at Microsoft.";
  const path = topic ? `/topics/${topic.slug}` : "/topics";
  const url = new URL(path, siteConfig.url).href;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: title,
        description,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: (topic
            ? topic.posts.map((post) => ({
                name: post.title,
                path: post.permalink,
              }))
            : topics.map((item) => ({
                name: item.title,
                path: `/topics/${item.slug}`,
              }))
          ).map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: new URL(item.path, siteConfig.url).href,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", path: "/" },
          { name: "Topics", path: "/topics" },
          ...(topic ? [{ name: topic.title, path }] : []),
        ].map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: new URL(item.path, siteConfig.url).href,
        })),
      },
    ],
  };
  const starters = topic?.startHere.map(
    (slug) => topic.posts.find((post) => post.permalink.endsWith(`/${slug}`))!,
  );

  return (
    <Layout
      title={
        topic?.slug === "mcp"
          ? "MCP Guides & Articles"
          : topic
            ? title
            : "Azure, AI, MCP & Agent Skills"
      }
      description={description}
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, "\\u003c")}
        </script>
      </Head>
      <main className={`container padding-vert--lg ${styles.page}`}>
        <nav className={styles.topicLinks} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {topic ? <Link to="/topics">Topics</Link> : <span>Topics</span>}
          {topic && <span aria-current="page">{topic.title}</span>}
        </nav>
        <header>
          <h1>{title}</h1>
          <p className={styles.lead}>{topic?.intro ?? description}</p>
          <p>
            {topic?.focus ??
              "Choose a topic for a curated starting point and a complete, dated article collection. These guides combine hands-on projects, developer tooling, and lessons from building for humans and AI agents."}
          </p>
          <p>
            By <Link to="/">Sajeetharan Sinnathurai</Link>, Principal Product
            Manager at Microsoft.
          </p>
        </header>
        {topic ? (
          <>
            <section aria-labelledby="start-here">
              <h2 id="start-here">Start here</h2>
              <ol className={styles.posts}>
                {starters.map((post) => (
                  <li key={post.permalink}>
                    <h3>
                      <Link to={post.permalink}>{post.title}</Link>
                    </h3>
                    <p>{post.description}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section aria-labelledby="all-articles">
              <h2 id="all-articles">All {topic.title} articles</h2>
              <p>
                Newest first. Publication dates distinguish recent guides from
                historical walkthroughs.
              </p>
              <ul className={styles.posts}>
                {topic.posts.map((post) => (
                  <li key={post.permalink}>
                    <h3>
                      <Link to={post.permalink}>{post.title}</Link>
                    </h3>
                    <time dateTime={post.date}>{post.date.slice(0, 10)}</time>
                    <p>{post.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <section aria-labelledby="choose-topic">
            <h2 id="choose-topic">Browse by topic</h2>
            <div className={styles.grid}>
              {topics.map((item) => (
                <article key={item.slug} className={styles.card}>
                  <h3>
                    <Link to={`/topics/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p>{item.description}</p>
                  <p>{item.posts.length} articles</p>
                </article>
              ))}
            </div>
          </section>
        )}
        {topic && (
          <nav className={styles.topicLinks} aria-label="Related topics">
            {topics
              .filter((item) => item.slug !== topic.slug)
              .map((item) => (
                <Link key={item.slug} to={`/topics/${item.slug}`}>
                  {item.title}
                </Link>
              ))}
          </nav>
        )}
        <p>
          <Link to="/blogs">Search all blog posts</Link>
          {" | "}
          <Link to="/blogs/archive">Complete archive</Link>
          {" | "}
          <a href="/blogs/rss.xml">Subscribe via RSS</a>
        </p>
      </main>
    </Layout>
  );
}
