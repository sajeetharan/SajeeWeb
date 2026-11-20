import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { personSchema, profile } from "../data/profile";
import { LinePortrait } from "../components/homepage/LinePortrait";
import { GreetingEyes } from "../components/homepage/GreetingEyes";
import NavbarSocialLinks from "../components/NavbarSocialLinks";
import avatar from "./assets/index/avatar.jpg";
import styles from "./index.module.scss";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const home = useRef<HTMLElement>(null);
  const [photoRevealed, setPhotoRevealed] = useState(false);

  useEffect(() => {
    const element = home.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    let progress = 0.08;
    let previousTime: number | null = null;

    const draw = (time: number) => {
      frame = null;
      const elapsed =
        previousTime === null ? 0 : Math.min(time - previousTime, 100);
      previousTime = time;
      progress = Math.min(1, progress + (0.92 * elapsed) / 8000);
      element.style.setProperty("--scroll-progress", String(progress));
      if (progress < 1) frame = requestAnimationFrame(draw);
    };

    const update = () => {
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress =
        motion.matches || distance <= 0
          ? 1
          : 0.08 + 0.92 * Math.min(1, Math.max(0, window.scrollY / distance));
      progress = Math.max(progress, scrollProgress);
      element.style.setProperty("--scroll-progress", String(progress));
      element.setAttribute("data-scroll-drawing", "");
      if (progress === 1) {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
      } else if (frame === null) {
        previousTime = null;
        frame = requestAnimationFrame(draw);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    motion.addEventListener("change", update);
    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      motion.removeEventListener("change", update);
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      element.removeAttribute("data-scroll-drawing");
      element.style.removeProperty("--scroll-progress");
    };
  }, []);

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
      <main ref={home} className={styles.home}>
        <header id="about" tabIndex={-1} className={styles.intro}>
          <svg
            className={styles.ribbon}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className={styles.desktopLine}
              data-drawing-path
              data-ribbon
              pathLength="1"
              d="M95 0C99 15 99 25 83 24C71 23 59 18 54 25C48 29 25 23 10 25C3 26 3 38 4 45C5 58 23 58 39 54C55 50 67 52 72 56"
            />
            <path
              className={styles.mobileLine}
              data-drawing-path
              data-ribbon
              pathLength="1"
              d="M95 0C99 14 98 20 82 19C66 18 58 15 53 20C46 24 25 18 10 20C2 21 3 34 4 41C5 49 23 50 38 47C52 44 62 46 60 54"
            />
          </svg>
          <div className={styles.introCopy}>
            <GreetingEyes className={styles.greetingEyes} />
            <h1>Hi, I&apos;m Sajee.</h1>
            <p>
              {profile.jobTitle} at {profile.employer.name}.
            </p>
            <p>I build developer tools and AI agents.</p>
            <div className={styles.socials}>
              <NavbarSocialLinks inline />
            </div>
          </div>
          <button
            type="button"
            className={styles.portrait}
            aria-label="Reveal original photo"
            aria-pressed={photoRevealed}
            data-photo-revealed={photoRevealed}
            onClick={() => setPhotoRevealed((revealed) => !revealed)}
          >
            <span
              className={styles.portraitDrawing}
              aria-hidden={photoRevealed}
            >
              <LinePortrait />
            </span>
            <img
              className={styles.portraitPhoto}
              src={typeof avatar === "string" ? avatar : avatar.src}
              alt="Sajeetharan smiling in a gray T-shirt"
              width="310"
              height="310"
              aria-hidden={!photoRevealed}
              decoding="async"
            />
            <span className={styles.portraitHint} aria-hidden="true">
              {photoRevealed ? "Back to drawing" : "Click to reveal"}
            </span>
          </button>
        </header>

        <svg
          className={styles.trail}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            data-drawing-path
            data-trail
            pathLength="1"
            d="M0 0C22 0 98 0 96 10C94 23 89 22 94 35C99 47 89 58 95 69C100 82 88 86 92 100"
          />
        </svg>

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
