import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

export default function NotFound(): JSX.Element {
  return (
    <Layout
      title="Page Not Found"
      description="The requested page was not found."
    >
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Page not found</h1>
            <p>
              The requested URL does not exist. Use one of these indexes to
              continue:
            </p>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/developers">Developer portal</Link>
              </li>
              <li>
                <a href="https://www.sajeetharan.dev/sitemap.xml">
                  XML sitemap
                </a>
              </li>
              <li>
                <a href="https://www.sajeetharan.dev/llms.txt">
                  Agent-readable site index
                </a>
              </li>
              <li>
                <Link to="/blogs">Blog archive</Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}
