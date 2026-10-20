import React from "react";
import styles from "./UpcomingEvents.module.scss";

export function UpcomingEvents(): JSX.Element {
  return (
    <aside className={styles.upcoming} aria-label="Upcoming events">
      <div>
        <h2>Upcoming Events</h2>
        <h3>WeAreDevelopers Conference India</h3>
        <p>
          <time dateTime="2026-11-25">25</time>&ndash;
          <time dateTime="2026-11-26">26 November 2026</time>
          {" / "}Bengaluru, India
        </p>
      </div>
      <a
        href="https://www.wearedevelopers.com/conference-india/agenda"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.agenda}
      >
        View agenda &rarr;
        <span className={styles.visuallyHidden}> (opens in a new tab)</span>
      </a>
    </aside>
  );
}
