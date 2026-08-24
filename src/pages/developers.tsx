import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

import styles from "./developers.module.scss";

const endpoints = [
  { label: "Agent index", value: "/llms.txt" },
  { label: "API catalog", value: "/.well-known/api-catalog" },
  { label: "XML sitemap", value: "/sitemap.xml" },
  { label: "RSS feed", value: "/blogs/rss.xml" },
];

export default function Developers(): JSX.Element {
  const [endpoint, setEndpoint] = useState(endpoints[0].value);
  const [result, setResult] = useState(
    "Select an endpoint and run the request.",
  );
  const [isLoading, setIsLoading] = useState(false);

  async function runRequest(): Promise<void> {
    setIsLoading(true);
    try {
      const response = await fetch(endpoint, {
        headers: { Accept: "text/plain, application/json, application/xml" },
      });
      setResult(await response.text());
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Request failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout
      title="Developer Portal"
      description="Machine-readable resources, quickstarts, CLI documentation, and a read-only sandbox for sajeetharan.dev."
    >
      <main className={styles.page}>
        <header className={styles.header}>
          <div className="container">
            <p className={styles.eyebrow}>Developer portal</p>
            <h1>Build with the public content on sajeetharan.dev</h1>
            <p className={styles.intro}>
              Discover articles, talks, projects, and site metadata through
              stable, read-only resources designed for scripts and agents.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary" to="/developers">
                Browse resources
              </Link>
              <a
                className="button button--secondary button--outline"
                href="https://github.com/sajeetharan/SajeeWeb/tree/main/cli"
              >
                CLI source
              </a>
            </div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="access-heading">
          <div className="container">
            <h2 id="access-heading">Access and API keys</h2>
            <p>
              These resources are public and read-only. No API key,
              authentication, or account is required. Please cache responses and
              use conditional requests when polling feeds.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="resources-heading">
          <div className="container">
            <h2 id="resources-heading">Machine-readable resources</h2>
            <div className={styles.resourceGrid}>
              {endpoints.map((item) => (
                <a
                  className={styles.resource}
                  href={item.value}
                  key={item.value}
                >
                  <span>{item.label}</span>
                  <code>{item.value}</code>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="quickstart">
          <div className="container">
            <h2 id="quickstart">Quickstart</h2>
            <p>Request a clean Markdown representation of the homepage:</p>
            <pre>
              <code>{`curl -H "Accept: text/markdown" https://www.sajeetharan.dev/`}</code>
            </pre>
            <p>Run the CLI directly from its package directory:</p>
            <pre>
              <code>{`node cli/sajee.mjs resources --json`}</code>
            </pre>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="sandbox-heading">
          <div className="container">
            <h2 id="sandbox-heading">Read-only sandbox</h2>
            <p>
              Inspect a public endpoint without credentials or write access.
            </p>
            <div className={styles.sandboxControls}>
              <label htmlFor="sandbox-endpoint">Endpoint</label>
              <select
                id="sandbox-endpoint"
                value={endpoint}
                onChange={(event) => setEndpoint(event.target.value)}
              >
                {endpoints.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label} — {item.value}
                  </option>
                ))}
              </select>
              <button
                className="button button--primary"
                type="button"
                onClick={runRequest}
                disabled={isLoading}
              >
                {isLoading ? "Running..." : "Run request"}
              </button>
            </div>
            <pre className={styles.output} aria-live="polite">
              <code>{result}</code>
            </pre>
          </div>
        </section>
      </main>
    </Layout>
  );
}
