import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import HireAssistant from "../components/HireAssistant";
import profile from "../data/hire-me.json";
import styles from "./hire-me.module.scss";

export default function HireMe(): JSX.Element {
  return (
    <Layout
      title="Hire Me | Developer Tools, Product & AI"
      description={`Get to know ${profile.name}'s work in developer experience, product management, databases, and AI agents. Ask the AI assistant or explore the public portfolio.`}
    >
      <main className={styles.page}>
        <div className="container">
          <header className={styles.hero}>
            <div className={styles.intro}>
              <span className={styles.eyebrow}>HIRE ME / LET&apos;S TALK</span>
              <h1>
                Good products start with
                <br />
                <span>understanding developers.</span>
              </h1>
              <p className={styles.name}>I&apos;m {profile.name}.</p>
              <p>{profile.summary}</p>
              <p className={styles.role}>{profile.role}</p>
              <div className={styles.ctas}>
                <a className="button button--primary button--lg" href="#ask">
                  Ask about my work
                </a>
                <Link
                  className="button button--outline button--primary button--lg"
                  to="/contact"
                >
                  Let&apos;s talk
                </Link>
              </div>
              <p className={styles.disclaimer}>
                Exploring a role or collaboration? Let&apos;s discuss fit
                directly. This page isn&apos;t a statement of availability or a
                start date.
              </p>
            </div>
            <aside className={styles.profile} aria-label="Professional focus">
              <img
                src="/img/logo-sketch-96.webp"
                alt="Sajeetharan Sinnathurai"
                width="96"
                height="96"
              />
              <span className={styles.eyebrow}>
                BUILDER &middot; PRODUCT LEADER &middot; MENTOR
              </span>
              <h2>
                From the code
                <br />
                to the developer experience.
              </h2>
              <ul>
                <li>Developer tools &amp; product strategy</li>
                <li>Cloud platforms &amp; databases</li>
                <li>AI agents, MCP &amp; open source</li>
                <li>Speaking, teaching &amp; mentoring</li>
              </ul>
              <Link to="/career">
                Explore my career <span aria-hidden="true">&rarr;</span>
              </Link>
            </aside>
          </header>

          <div className={styles.content}>
            <div>
              <section className={styles.work} aria-labelledby="work-title">
                <span className={styles.eyebrow}>
                  THE WORK BEHIND THE WORDS
                </span>
                <h2 id="work-title">Built, shipped, shared.</h2>
                <p>
                  A few starting points. See the portfolio for contribution
                  roles and source code.
                </p>
                <article>
                  <span className={styles.tag}>
                    PRODUCT &amp; DEVELOPER EXPERIENCE
                  </span>
                  <h3>Azure Cosmos DB developer tooling</h3>
                  <p>
                    Developer experience, SDK design, and tooling at Microsoft,
                    grounded in an engineering background.
                  </p>
                  <Link to="/career">
                    Career and responsibilities{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </article>
                <article>
                  <span className={styles.tag}>AGENTS &amp; OPEN SOURCE</span>
                  <h3>Practical starting points for AI builders</h3>
                  <p>
                    Cosmos Agent Starter, Cosmos DB MCP tooling, and agent
                    skills for Cosmos DB and Angular.
                  </p>
                  <Link to="/projects">
                    Explore the projects <span aria-hidden="true">&rarr;</span>
                  </Link>
                </article>
                <article>
                  <span className={styles.tag}>COMMUNITY &amp; EDUCATION</span>
                  <h3>Helping developers get unstuck</h3>
                  <p>
                    Technical articles, conference sessions, open-source
                    contributions, and mentoring for developers and product
                    managers.
                  </p>
                  <Link to="/talks">Watch a talk</Link>
                  <span aria-hidden="true"> / </span>
                  <Link to="/mentored">Explore mentoring</Link>
                </article>
              </section>
            </div>
            <HireAssistant />
          </div>

          <section
            id="questions"
            className={styles.faq}
            aria-labelledby="questions-title"
          >
            <span className={styles.eyebrow}>NO CHAT REQUIRED</span>
            <h2 id="questions-title">Questions worth asking.</h2>
            <p>
              The assistant&apos;s knowledge comes from these public facts, not
              private employer information. These answers work even when AI is
              offline.
            </p>
            {profile.sections.map((section) => (
              <details key={section.title}>
                <summary>{section.question}</summary>
                <p>{section.answer}</p>
                <Link to={section.source}>
                  {section.sourceLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </details>
            ))}
          </section>

          <section className={styles.guardrails} aria-labelledby="rules-title">
            <h2 id="rules-title">An introduction, not an impersonation.</h2>
            <p>
              The assistant is instructed to use public facts, preserve exact
              numbers and contribution roles, and say when it doesn&apos;t know.
              It has no tools and cannot act on my behalf.
            </p>
            <ul>
              <li>
                No private life, health, family, confidential work, or other
                hiring processes.
              </li>
              <li>No company opinions or candidate comparisons.</li>
              <li>
                No promises about compensation, contracts, relocation, or start
                dates.
              </li>
              <li>
                AI answers aren&apos;t verified statements from me. Please check
                the sources and ask me directly about decisions.
              </li>
            </ul>
          </section>
          <section className={styles.contact} aria-labelledby="contact-title">
            <h2 id="contact-title">
              Let&apos;s make the human conversation count.
            </h2>
            <p>
              Bring your questions, the role, and the problems your team wants
              to solve.
            </p>
            <a
              className="button button--primary button--lg"
              href="mailto:sajeefx@gmail.com"
            >
              Email Sajeetharan
            </a>
            <a href="https://www.linkedin.com/in/sajeetharan/">
              Connect on LinkedIn <span aria-hidden="true">&rarr;</span>
            </a>
          </section>
        </div>
      </main>
    </Layout>
  );
}
