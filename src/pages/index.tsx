import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import Head from "@docusaurus/Head";
import { personSchema, profile } from "../data/profile";
import { DeveloperDesk } from "../components/homepage/DeveloperDesk";
import { featuredProjects } from "../data/featured-projects";
import NavbarSocialLinks from "../components/NavbarSocialLinks";
import styles from "./index.module.scss";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout description={siteConfig.tagline} noFooter>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            ...personSchema,
          }).replace(/</g, "\\u003c")}
        </script>
      </Head>
      <main className={styles.home}>
        <header id="about" tabIndex={-1} className={styles.intro}>
          <DeveloperDesk />
          <div className={styles.introCopy}>
            <h1>Hi, I&apos;m Sajee.</h1>
            <p>
              {profile.jobTitle} at {profile.employer.name}.
            </p>
            <p>I build developer tools and AI agents.</p>
            <Link to="/awards" className={styles.credentials}>
              Microsoft MVP (2017-2019) &middot; Google Developer Expert
            </Link>
            <Link className={styles.projectCta} to="#featured-projects">
              Explore my projects <span aria-hidden="true">&rarr;</span>
            </Link>
            <div className={styles.socials}>
              <NavbarSocialLinks inline />
            </div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="featured-projects">
          <div className={styles.sectionHeading}>
            <Heading as="h2" id="featured-projects" tabIndex={-1}>
              Featured projects
            </Heading>
            <Link className={styles.textLink} to="/projects">
              All projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className={styles.projectCard}
                data-portfolio-project={project.id}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  href={project.url}
                  className={styles.textLink}
                  data-portfolio-project={project.id}
                  data-portfolio-action="source"
                  aria-label={`View source for ${project.title}`}
                >
                  View source <span aria-hidden="true">&rarr;</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="writing-title">
          <h2 id="writing-title">Writing &amp; talks</h2>
          <div className={styles.links}>
            <Link to="/blogs">
              Writing <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link id="talks" to="/talks">
              Talks <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        <section
          id="mentoring"
          tabIndex={-1}
          className={styles.section}
          aria-labelledby="mentoring-title"
        >
          <h2 id="mentoring-title">Mentoring</h2>
          <p>Engineer to product manager.</p>
          <Link
            className={styles.textLink}
            to="/mentored"
            data-mentoring-source="homepage"
            data-mentoring-action="explore"
          >
            Start with a free discovery call{" "}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </section>

        <section
          id="connect"
          tabIndex={-1}
          className={styles.section}
          aria-labelledby="connect-title"
        >
          <h2 id="connect-title">Say hello.</h2>
          <div className={styles.links}>
            <Link to="/contact">Get in touch</Link>
            <a href={profile.profiles.GitHub}>GitHub</a>
            <a href={profile.profiles.LinkedIn}>LinkedIn</a>
            <a href={profile.profiles["X / Twitter"]}>X / Twitter</a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>{profile.name}</span>
        <div className={styles.links}>
          <Link to="/career">About</Link>
          <Link id="work" to="/projects">
            Work
          </Link>
          <Link to="/contact">Contact</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </Layout>
  );
}
