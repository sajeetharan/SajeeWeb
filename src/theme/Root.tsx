import React, { useEffect, type ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import ContactWidget from "../components/ContactWidget";
import {
  trackPortfolioClick,
  trackPortfolioEvent,
} from "../utils/portfolio-analytics";

export default function Root({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, "");

  useEffect(() => {
    if (path === "/career") trackPortfolioEvent({ name: "career_view" });
    if (path === "/mentored") trackPortfolioEvent({ name: "mentoring_view" });
  }, [path]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a")
          : null;
      if (link) trackPortfolioClick(link.dataset);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {children}
      {path !== "/hire-me" && <ContactWidget />}
    </>
  );
}
