import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  mentoringServices,
  priorityDmService as priorityDm,
  topmateServiceUrl,
} from "../data/mentoring";
import styles from "./ContactWidget.module.scss";

type Step = "start" | "question" | "mentoring" | "speaking" | "article";

const intents: {
  step: Exclude<Step, "start">;
  title: string;
  detail: string;
}[] = [
  {
    step: "question",
    title: "Ask a focused question",
    detail: "Personalized technical or career guidance via a paid Topmate DM.",
  },
  {
    step: "mentoring",
    title: "Mentoring or interview preparation",
    detail: "Find a Topmate session that fits your next step.",
  },
  {
    step: "speaking",
    title: "Speaking or collaboration",
    detail: "Open an email draft to discuss an opportunity.",
  },
  {
    step: "article",
    title: "Article question or correction",
    detail: "Open an email draft about something on this site.",
  },
];

const meetings = mentoringServices.filter(
  (service) => service.format === "Video meeting",
);
const email = "sajeefx@gmail.com";

export default function ContactWidget(): JSX.Element {
  const { pathname } = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const dialog = useRef<HTMLDialogElement>(null);
  const stepTitle = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState<Step>("start");
  const [isOpen, setIsOpen] = useState(false);
  const currentIntent = intents.find((intent) => intent.step === step);
  const emailSubject =
    step === "speaking"
      ? "Speaking or collaboration enquiry"
      : "Article question or correction";
  const pageUrl = new URL(pathname, siteConfig.url).href;
  const emailBody = `Hi Sajeetharan,\n\n${step === "speaking" ? "I'd like to discuss a speaking opportunity or collaboration." : "I have a question or correction about this page."}\n\nPage: ${pageUrl}\n\n`;
  const emailDraft = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  useEffect(() => {
    if (dialog.current?.open) stepTitle.current?.focus();
  }, [step]);

  return (
    <>
      <a
        href="/contact"
        className={styles.launcher}
        aria-haspopup="dialog"
        aria-controls="ask-sajee-dialog"
        aria-expanded={isOpen}
        onClick={(event) => {
          event.preventDefault();
          dialog.current?.showModal();
          setIsOpen(true);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 11.5a8 8 0 0 1-8 8H5l-3 3v-11a9 9 0 1 1 18 0Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M7 10h8M7 14h5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
        Ask Sajee
      </a>

      <dialog
        ref={dialog}
        id="ask-sajee-dialog"
        className={styles.panel}
        aria-labelledby="ask-sajee-title"
        aria-describedby="ask-sajee-description"
        onClose={() => {
          setIsOpen(false);
          setStep("start");
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className={styles.header}>
          <div>
            <h2 id="ask-sajee-title">Ask Sajee</h2>
            <p id="ask-sajee-description">A contact guide, not live chat.</p>
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Close Ask Sajee"
            onClick={() => dialog.current?.close()}
            autoFocus
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.body}>
            {step !== "start" && (
              <button
                type="button"
                className={styles.back}
                onClick={() => setStep("start")}
              >
                &larr; All contact options
              </button>
            )}
            <h3 ref={stepTitle} tabIndex={-1} className={styles.stepTitle}>
              {currentIntent?.title ?? "What would you like help with?"}
            </h3>

            {step === "start" && (
              <div className={styles.options}>
                {intents.map((intent) => (
                  <button
                    key={intent.step}
                    type="button"
                    className={styles.option}
                    onClick={() => setStep(intent.step)}
                  >
                    <strong>{intent.title}</strong>
                    <span>{intent.detail}</span>
                  </button>
                ))}
              </div>
            )}

            {step === "question" && (
              <>
                <p>
                  Use <strong>{priorityDm.name}</strong> for a focused technical
                  or career question without scheduling a call.
                </p>
                <p className={styles.note}>
                  This is a paid priority DM service. Review current pricing and
                  response terms on Topmate before paying. Write your question
                  there; this guide does not forward messages.
                </p>
                <a
                  className={styles.primary}
                  href={topmateServiceUrl(priorityDm.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Continue to paid priority DM on Topmate (opens in a new tab)"
                >
                  Continue to Topmate &rarr;
                </a>
                <p className={styles.note}>Opens Topmate in a new tab.</p>
              </>
            )}

            {step === "mentoring" && (
              <>
                <p className={styles.note}>
                  Review current pricing and availability on Topmate before
                  booking. Bookings and payments happen there, not on this site.
                  Links open in a new tab.
                </p>
                <div className={styles.options}>
                  {meetings.map((service) => (
                    <a
                      key={service.id}
                      className={styles.option}
                      href={topmateServiceUrl(service.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${service.name} on Topmate (opens in a new tab)`}
                    >
                      <strong>{service.name}</strong>
                      <span>
                        {service.format} &middot; {service.duration}
                      </span>
                    </a>
                  ))}
                </div>
              </>
            )}

            {(step === "speaking" || step === "article") && (
              <>
                <p>
                  Open a draft in your email app, add your details, and review
                  it before sending. Nothing is sent automatically.
                </p>
                <a className={styles.primary} href={emailDraft}>
                  Open email draft &rarr;
                </a>
                <p className={styles.note}>
                  No email app opening? Copy{" "}
                  <strong className={styles.email}>{email}</strong> into your
                  email service. Include the page link for article questions.
                </p>
                <p className={styles.note}>
                  There is no guaranteed email response time. Please do not send
                  passwords, payment information, or other sensitive details.
                </p>
              </>
            )}
          </div>
          <div className={styles.footer}>
            No AI chat, message storage, or automatic forwarding.{" "}
            <a href="/privacy" onClick={() => dialog.current?.close()}>
              Privacy
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
