import clsx from "clsx";
import React, { FunctionComponent, useEffect, useRef } from "react";
import Typed from "typed.js";

import styles from "./Hero.module.scss";


export const Hero: FunctionComponent = () => {

  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Sajeetharan Sinnathurai"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000, // Pause before retyping
      showCursor: true,
      loop: true, // Enable infinite loop
    });

    return () => {
      typed.destroy(); // Cleanup when component unmounts
    };
  }, []);
  
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
      <h1 className={clsx("hero__title", styles.title)}>
      Hi. I'm{" "}
      <span className={styles.highlighted} ref={typedRef}></span>,
      <br />
      Principal Product Manager at Microsoft
    </h1>
        <p className={clsx("hero__subtitle", styles.subtitle)}>
          Empowering developers with cloud & database solutions
          <br /> | Principal PM | Top Stack Overflow contributor | GDE & MVP | Speaker & OSS contributor.
        </p>
      </div>
    </header>
  );
};
