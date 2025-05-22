import clsx from "clsx";
import React, { FunctionComponent } from "react";
import Image from "@theme/IdealImage";

import DiscoverIcon from "./assets/icon-discover.svg";
import styles from "./Project.module.scss";

export interface ProjectData {
  title: string;
  description: string;
  role?: string;
  url: string;
  image: string;
}

export const Project: FunctionComponent<ProjectData> = ({
  title,
  description,
  url,
  role,
  image,
}) => {
  return (
    <div className={clsx("col col--6", styles.cardContainer)}>
      <div className={clsx("card", styles.card)}>
        <div className={clsx("card__image", styles.image)}>
          <Image img={image} alt={description} title={title} />
          {role && <span className={clsx("badge", styles.role)}>{role}</span>}
        </div>
        <div className={clsx("card__body", styles.cardBody)}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={clsx("card__footer", styles.cardFooter)}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx("button", styles.discoverButton)}
          >
            <DiscoverIcon className={styles.icon} />
            <span>Discover</span>
          </a>
        </div>
      </div>
    </div>
  );
};
