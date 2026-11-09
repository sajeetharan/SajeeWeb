import React from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import {
  discoveryCall,
  mentoringServices,
  mentoringTestimonials,
  topmateServiceUrl,
} from "../data/mentoring";
import { profile } from "../data/profile";
import styles from "./mentored.module.scss";

const title = "Get Mentored";
const description =
  "Helping engineers transition into Product Management and prepare confidently for PM interviews.";

export default function Mentored(): JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main className={styles.mentoredPage}>
        <div className="container">
          <div className={styles.header}>
            <p className={styles.eyebrow}>1:1 GUIDANCE ON TOPMATE</p>
            <h1>From engineering to Product Management.</h1>
            <p className={styles.subtitle}>{description}</p>
            <p className={styles.credibility}>
              {profile.jobTitle} at {profile.employer.name}. Practical guidance
              grounded in engineering, Azure, developer experience, and AI.
            </p>
            <a
              href={topmateServiceUrl(discoveryCall.id)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
              data-mentoring-source="mentoring"
              data-mentoring-action="discovery"
              aria-label={`${discoveryCall.cta} on Topmate (opens in a new tab)`}
            >
              {discoveryCall.cta} &rarr;
            </a>
            <p className={styles.bookingNote}>
              Discuss your goals and identify the right next step. Booking opens
              on Topmate in a new tab.
            </p>
          </div>
          <section
            className={styles.testimonials}
            aria-labelledby="mentoring-testimonials-title"
          >
            <div className={styles.sectionHeader}>
              <h2 id="mentoring-testimonials-title">
                Clearer paths. Practical next steps.
              </h2>
              <p>Selected excerpts from mentees on Topmate.</p>
            </div>
            <div className={styles.testimonialGrid}>
              {mentoringTestimonials.map(({ topic, quote }) => (
                <figure key={topic} className={styles.testimonial}>
                  <blockquote>
                    <p>{quote}</p>
                  </blockquote>
                  <figcaption>{topic} &middot; Topmate testimonial</figcaption>
                </figure>
              ))}
            </div>
            <p className={styles.reviewSource}>
              <a
                href="https://topmate.io/sajeetharan"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the original reviews on Topmate (opens in a new tab) &rarr;
              </a>
            </p>
          </section>
          <section aria-labelledby="mentoring-services-title">
            <div className={styles.sectionHeader}>
              <h2 id="mentoring-services-title">Choose your next step</h2>
              <p>
                Start with the free discovery call, or book the service that
                matches your goal directly. View current pricing and
                availability, then complete your booking on Topmate. Links open
                in a new tab.
              </p>
            </div>
            <div className={styles.serviceGrid}>
              {mentoringServices.map((service) => (
                <article
                  key={service.id}
                  className={`${styles.serviceCard} ${service.id === discoveryCall.id ? styles.discoveryCard : ""}`}
                >
                  <p className={styles.serviceMeta}>
                    {service.format} &middot; {service.duration}
                  </p>
                  <Heading as="h3" id={`service-${service.id}`}>
                    {service.name}
                  </Heading>
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>
                  <p className={styles.audience}>{service.audience}</p>
                  <p className={styles.takeaway}>
                    <strong>Your next step: </strong>
                    {service.takeaway}
                  </p>
                  <a
                    href={topmateServiceUrl(service.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                    data-mentoring-source="mentoring"
                    data-mentoring-action={service.analyticsAction}
                    aria-label={`${service.cta} on Topmate (opens in a new tab)`}
                  >
                    {service.cta} &rarr;
                  </a>
                </article>
              ))}
            </div>
          </section>
          <section
            className={styles.expectations}
            aria-labelledby="session-expectations-title"
          >
            <h2 id="session-expectations-title">
              Make the most of your session
            </h2>
            <p>
              Bring one goal, your current situation, and the questions you want
              to work through. For interview preparation, bring the role
              description and an answer you would like to practice.
            </p>
            <p>
              Sessions offer guidance and feedback, not guaranteed jobs,
              referrals, or interview outcomes. Current prices, availability,
              and booking terms are listed on Topmate.
            </p>
          </section>
          <div className={styles.footer}>
            <p>Prefer to browse everything in one place?</p>
            <a
              href="https://topmate.io/sajeetharan"
              target="_blank"
              rel="noopener noreferrer"
            >
              View all services on Topmate &rarr;
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
