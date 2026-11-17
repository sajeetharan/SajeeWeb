import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { discoveryCall, topmateServiceUrl } from "../data/mentoring";
import styles from "./engineer-to-pm-checklist.module.scss";

const sections = [
  {
    id: "motivation",
    title: "1. Know why you want the role",
    prompt:
      "Write down a product decision you enjoyed more than the implementation. What made it rewarding?",
    items: [
      "I can explain why I want to move into PM beyond a title change or less coding.",
      "I have spoken with a PM about discovery, prioritization, and stakeholder work in their day-to-day role.",
    ],
  },
  {
    id: "customer",
    title: "2. Start with a customer problem",
    prompt:
      "Describe one user, their problem, and how they handle it today. Separate what you heard from what you assumed.",
    items: [
      "I can describe a customer problem without jumping straight to a technical solution.",
      "I have gathered feedback from users or customer-facing teammates and identified an assumption to test.",
    ],
  },
  {
    id: "decisions",
    title: "3. Practice product trade-offs",
    prompt:
      "Choose two possible improvements to a product you know. Explain which you would do first, what you would defer, and why.",
    items: [
      "I can compare options using customer value, effort, risk, and business goals.",
      "I can define a success metric and a guardrail, rather than treating shipping a feature as success.",
    ],
  },
  {
    id: "evidence",
    title: "4. Translate engineering experience into evidence",
    prompt:
      "Draft a short story: customer problem, your contribution, the trade-off, the outcome, and what you learned. Use only results you can support.",
    items: [
      "I have an example of influencing a decision across engineering, design, or business stakeholders.",
      "I can explain the user or business impact of my work, not just its architecture or implementation.",
    ],
  },
  {
    id: "next-step",
    title: "5. Choose a practical next step",
    prompt:
      "Pick one gap and one action for the next two weeks: a customer conversation, a small product brief, or a practice interview.",
    items: [
      "I have reviewed target PM role descriptions and identified skills I can demonstrate and gaps to work on.",
      "I have chosen one low-risk way to practice product work in my current team or a side project.",
    ],
  },
];

export default function EngineerToPmChecklist(): JSX.Element {
  return (
    <Layout
      title="Engineer to PM Readiness Checklist"
      description="A free, practical checklist for engineers exploring Product Management. Identify transferable skills, find gaps, and choose your next step. No email signup."
    >
      <main className={styles.page}>
        <header>
          <p className={styles.eyebrow}>FREE CAREER RESOURCE</p>
          <h1>Engineer &rarr; PM readiness checklist</h1>
          <p className={styles.intro}>
            Thinking about moving from engineering into Product Management? Use
            these ten prompts to identify the experience you already have and
            the skills you want to practice.
          </p>
          <p>
            No email signup. Tick an item when you can give a concrete example,
            then use the writing prompts to work through any gaps. This is a
            reflection tool, not a hiring assessment or a readiness score.
          </p>
          <div className={styles.printTools}>
            <button type="button" onClick={() => window.print()}>
              Print or save as PDF
            </button>
            <p>
              Your ticks stay on this page only and reset on reload. They are
              not saved or sent to analytics. You can also use your
              browser&apos;s Print menu.
            </p>
          </div>
        </header>
        {sections.map((section) => (
          <section
            key={section.id}
            className={styles.section}
            aria-labelledby={`${section.id}-title`}
          >
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            <ul className={styles.items}>
              {section.items.map((item, index) => (
                <li key={item}>
                  <label htmlFor={`${section.id}-${index}`}>
                    <input type="checkbox" id={`${section.id}-${index}`} />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
            <p className={styles.prompt}>
              <strong>Try this: </strong>
              {section.prompt}
            </p>
          </section>
        ))}
        <section className={styles.nextStep} aria-labelledby="guidance-title">
          <h2 id="guidance-title">Turn one gap into a plan</h2>
          <p>
            You do not need every box ticked to start exploring PM. Choose one
            area to practice, collect evidence, and revisit this checklist. Want
            help deciding where to focus? Bring your main question to a free
            15-minute discovery call.
          </p>
          <a
            className={styles.cta}
            href={topmateServiceUrl(discoveryCall.id)}
            target="_blank"
            rel="noopener noreferrer"
            data-mentoring-source="checklist"
            data-mentoring-action="discovery"
            aria-label={`${discoveryCall.cta} on Topmate (opens in a new tab)`}
          >
            {discoveryCall.cta} &rarr;
          </a>
          <p className={styles.note}>
            Booking opens on Topmate in a new tab. Guidance does not guarantee
            jobs, referrals, or interview outcomes.
          </p>
          <Link
            className={styles.services}
            to="/mentored"
            data-mentoring-source="checklist"
            data-mentoring-action="explore"
          >
            Explore all mentoring services &rarr;
          </Link>
        </section>
      </main>
    </Layout>
  );
}
