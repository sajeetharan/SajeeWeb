import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { socialProfiles } from "../NavbarSocialLinks";
import { officeTestimonials } from "../../data/mentoring";
import {
  OfficeBackground,
  OfficeCharacter,
  OfficeLaptop,
  OfficeObject,
} from "./OfficeArtwork";
import styles from "./DeveloperDesk.module.scss";

const github = socialProfiles.find((item) => item.name === "GitHub");
if (!github) throw new Error("The developer desk requires a GitHub profile.");

const objects = [
  { route: "/blogs", label: "Blogs", kind: "notebook" },
  { route: "/talks", label: "Talks", kind: "microphone" },
  { route: "/mentored", label: "Get Mentored", kind: "coffee" },
  { route: "/awards", label: "Awards", kind: "trophy" },
  { route: "/projects", label: "Projects", kind: "noticeboard" },
  { route: "/developers", label: "Developers", kind: "robot" },
  { route: github.href, label: "GitHub", kind: "github" },
  {
    route: "https://www.instagram.com/sajeetharan/",
    label: "Instagram",
    kind: "instagram",
  },
] as const;

const phases = {
  tab: { duration: 1000, next: "think", caption: "Tab: accept the suggestion" },
  think: {
    duration: 2600,
    next: "frustration",
    caption: "Wait... why did the agent change that?",
  },
  frustration: {
    duration: 1800,
    next: "angry",
    caption: "That was working a minute ago.",
  },
  angry: {
    duration: 1000,
    next: "pray",
    caption: "It's definitely the laptop's fault.",
  },
  pray: {
    duration: 2400,
    next: "happy",
    caption: "Please let the tests pass.",
  },
  happy: {
    duration: 1800,
    next: "celebrate",
    caption: "Green tests. Finally!",
  },
  celebrate: {
    duration: 2200,
    next: "tab",
    caption: "Ship it! Then do it all again.",
  },
} as const;

export function DeveloperDesk(): JSX.Element {
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [animationPaused, setAnimationPaused] = useState(false);
  const [portraitHovered, setPortraitHovered] = useState(false);
  const [portraitPlaying, setPortraitPlaying] = useState(false);
  const [phase, setPhase] = useState<keyof typeof phases>("tab");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [reviewsHovered, setReviewsHovered] = useState(false);
  const [reviewsFocused, setReviewsFocused] = useState(false);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const news = useRef<HTMLElement>(null);
  const running =
    !reducedMotion &&
    visible &&
    tabVisible &&
    !animationPaused &&
    (portraitHovered || portraitPlaying);
  const playPortrait = () => {
    setAnimationPaused(false);
    setPortraitPlaying(true);
    setPhase("think");
  };
  const review = officeTestimonials[reviewIndex];
  const reviewsRunning =
    !reducedMotion &&
    reviewsVisible &&
    tabVisible &&
    !reviewsHovered &&
    !reviewsFocused &&
    !reviewsPaused;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setReducedMotion(motion.matches);
      if (motion.matches) {
        setPhase("tab");
        setPortraitHovered(false);
        setPortraitPlaying(false);
      }
    };
    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => motion.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === scene.current) setVisible(entry.isIntersecting);
          if (entry.target === news.current)
            setReviewsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 },
    );
    if (scene.current) observer.observe(scene.current);
    if (news.current) observer.observe(news.current);
    const syncVisibility = () => setTabVisible(!document.hidden);
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      setPhase(phases[phase].next);
      if (phase === "celebrate") setPortraitPlaying(false);
    }, phases[phase].duration);
    return () => window.clearTimeout(timer);
  }, [running, phase]);

  useEffect(() => {
    if (!portraitHovered && !portraitPlaying) setPhase("tab");
  }, [portraitHovered, portraitPlaying]);

  useEffect(() => {
    if (!reviewsRunning) return;
    const timer = window.setTimeout(
      () =>
        setReviewIndex((current) => (current + 1) % officeTestimonials.length),
      6000,
    );
    return () => window.clearTimeout(timer);
  }, [reviewsRunning, reviewIndex]);

  return (
    <div className={styles.desk} data-developer-desk>
      <div
        id="developer-desk-scene"
        ref={scene}
        className={styles.scene}
        data-character-motion={running ? "running" : "paused"}
        data-character-phase={reducedMotion ? "tab" : phase}
      >
        <OfficeBackground />
        <OfficeCharacter pose={reducedMotion ? "tab" : phase} />
        <OfficeLaptop />
        <button
          type="button"
          className={styles.portraitTrigger}
          data-character-trigger
          aria-label="Animate my portrait"
          aria-controls="developer-desk-scene"
          disabled={reducedMotion}
          onPointerEnter={(event) => {
            if (event.pointerType !== "touch") {
              setAnimationPaused(false);
              setPortraitHovered(true);
            }
          }}
          onPointerLeave={() => setPortraitHovered(false)}
          onClick={playPortrait}
        />
        <a
          className={styles.employerLink}
          href="https://in.linkedin.com/in/sajeetharan"
          aria-label="Microsoft: view my LinkedIn profile"
          title="View my LinkedIn profile"
          data-office-employer-link
        />
        <nav className={styles.objects} aria-label="Explore my developer desk">
          {objects.map((object) => (
            <Link
              key={object.kind}
              to={object.route}
              target={object.kind === "github" ? "_self" : undefined}
              className={styles.object}
              data-desk-object={object.kind}
              aria-label={object.label}
            >
              <OfficeObject kind={object.kind} />
              <span
                className={styles.clickCue}
                data-desk-click-cue
                aria-hidden="true"
              >
                <svg viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                  <path d="M4 10L10 4M4 4H10V10" />
                </svg>
              </span>
              <span
                className={styles.objectLabel}
                data-desk-label={object.kind}
              >
                {object.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className={styles.controls}>
        <p className={styles.phaseCaption} data-character-caption>
          {reducedMotion || !running
            ? "Agentic coding: review, accept, verify."
            : phases[phase].caption}
        </p>
        <button
          type="button"
          className={styles.motionToggle}
          data-character-toggle
          aria-controls="developer-desk-scene"
          disabled={reducedMotion}
          title={
            reducedMotion
              ? "Animation disabled by your reduced-motion preference"
              : undefined
          }
          onClick={() => {
            if (running) {
              setAnimationPaused(true);
              setPortraitPlaying(false);
            } else {
              playPortrait();
            }
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {!running && !reducedMotion ? (
              <path d="M8 5L19 12L8 19Z" />
            ) : (
              <path d="M8 5V19M16 5V19" />
            )}
          </svg>
          {reducedMotion
            ? "Motion reduced"
            : running
              ? "Pause animation"
              : "Play animation"}
        </button>
      </div>
      <section
        ref={news}
        className={styles.newsBanner}
        data-desk-reviews
        data-review-motion={reviewsRunning ? "running" : "paused"}
        aria-label="Mentoring review excerpts"
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch") setReviewsHovered(true);
        }}
        onPointerLeave={() => setReviewsHovered(false)}
        onFocusCapture={() => setReviewsFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setReviewsFocused(false);
          }
        }}
      >
        <p className={styles.newsHeading}>
          Mentoring news <span>{review.source}</span>
        </p>
        <div
          className={styles.reviewStack}
          aria-live={reviewsRunning ? "off" : "polite"}
          aria-atomic="true"
        >
          {officeTestimonials.map((item, index) => (
            <figure
              key={item.id}
              className={styles.reviewEntry}
              data-review-id={item.id}
              data-review-source={item.source}
              data-review-active={index === reviewIndex}
              aria-hidden={index !== reviewIndex}
            >
              <blockquote className={styles.reviewQuote}>
                <p>{item.quote}</p>
              </blockquote>
              <figcaption>{item.author || "Review excerpt"}</figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.newsFooter}>
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read original ${review.source} reviews (opens in a new tab)`}
          >
            Read reviews
          </a>
          <div className={styles.reviewControls}>
            <span>
              {reviewIndex + 1}/{officeTestimonials.length}
            </span>
            <button
              type="button"
              disabled={reducedMotion}
              aria-label={
                reducedMotion
                  ? "Review rotation disabled by reduced motion"
                  : reviewsPaused
                    ? "Resume reviews"
                    : "Pause reviews"
              }
              onClick={() => setReviewsPaused((current) => !current)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                {reviewsPaused ? (
                  <path d="M8 5L19 12L8 19Z" />
                ) : (
                  <path d="M8 5V19M16 5V19" />
                )}
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() =>
                setReviewIndex(
                  (current) => (current + 1) % officeTestimonials.length,
                )
              }
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
