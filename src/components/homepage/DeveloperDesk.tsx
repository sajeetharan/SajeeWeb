import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { socialProfiles } from "../NavbarSocialLinks";
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
  phone: { duration: 3000, next: "tab", caption: "Review the agent's plan" },
  tab: { duration: 1000, next: "pray", caption: "Tab: accept the suggestion" },
  pray: {
    duration: 3000,
    next: "phone",
    caption: "Please let the tests pass.",
  },
} as const;

export function DeveloperDesk(): JSX.Element {
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [phase, setPhase] = useState<keyof typeof phases>("phone");
  const [hintVisible, setHintVisible] = useState(false);
  const [invitationIndex, setInvitationIndex] = useState(
    objects.findIndex((object) => object.kind === "noticeboard"),
  );
  const scene = useRef<HTMLDivElement>(null);
  const running = !reducedMotion && visible && tabVisible;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setReducedMotion(motion.matches);
      if (motion.matches) setPhase("phone");
    };
    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => motion.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (scene.current) observer.observe(scene.current);
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
    const timer = window.setTimeout(
      () => setPhase(phases[phase].next),
      phases[phase].duration,
    );
    return () => window.clearTimeout(timer);
  }, [running, phase]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setInvitationIndex((current) => (current + 1) % objects.length),
      4000,
    );
    return () => window.clearTimeout(timer);
  }, [running, invitationIndex]);

  const hintHandlers = {
    onPointerEnter: () => setHintVisible(true),
    onFocus: () => setHintVisible(true),
    onBlur: (event: React.FocusEvent<HTMLButtonElement>) => {
      if (
        !(event.relatedTarget instanceof HTMLElement) ||
        !event.relatedTarget.hasAttribute("data-agentic-trigger")
      ) {
        setHintVisible(false);
      }
    },
  };

  return (
    <div
      className={styles.desk}
      data-developer-desk
      onPointerLeave={(event) => {
        if (
          !event.currentTarget.querySelector("[data-agentic-trigger]:focus")
        ) {
          setHintVisible(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setHintVisible(false);
      }}
    >
      <div
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
          className={styles.face}
          data-agentic-trigger="head"
          aria-describedby="agentic-coding-hint"
          aria-label="How I use coding agents"
          onClick={() => setHintVisible(true)}
          {...hintHandlers}
        />
        <button
          type="button"
          className={styles.body}
          data-agentic-trigger="body"
          aria-label="About my agentic coding workflow"
          aria-describedby="agentic-coding-hint"
          onClick={() => setHintVisible(true)}
          {...hintHandlers}
        />
        <a
          className={styles.employerLink}
          href="https://in.linkedin.com/in/sajeetharan"
          aria-label="Microsoft: view my LinkedIn profile"
          title="View my LinkedIn profile"
          data-office-employer-link
        />
        <nav className={styles.objects} aria-label="Explore my developer desk">
          {objects.map((object, index) => (
            <Link
              key={object.kind}
              to={object.route}
              target={object.kind === "github" ? "_self" : undefined}
              className={styles.object}
              data-desk-object={object.kind}
              data-desk-invited={
                running && invitationIndex === index ? true : undefined
              }
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
          {reducedMotion
            ? "Agentic coding: review, accept, verify."
            : phases[phase].caption}
        </p>
        <div
          id="agentic-coding-hint"
          role="tooltip"
          className={styles.agenticHint}
          hidden={!hintVisible}
        >
          <strong>Agentic coding, in three acts.</strong>
          <p>
            Read the agent&apos;s plan. Press Tab. Pray the tests pass. I still
            review the diff before shipping.
          </p>
        </div>
      </div>
    </div>
  );
}
