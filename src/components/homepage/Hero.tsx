import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

import styles from "./Hero.module.scss";

export const Hero: React.FC = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Sajeetharan Sinnathurai"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      showCursor: true,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={styles.glassCard}>
        <h1 className={clsx(styles.title)}>
          Hi, I'm <span className={styles.highlighted} ref={typedRef}></span>
          <br />
          Principal Program Manager @ Microsoft
        </h1>
        <p className={clsx(styles.subtitle)}>
          Driving Developer Experience & AI Innovation.
          <br />
          Cloud | Databases | Stack Overflow Top Contributor | GDE | MVP |
          Speaker | OSS Enthusiast.
        </p>
      </div>
    </header>
  );
};
