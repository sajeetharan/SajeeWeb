import React, { type ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import ContactWidget from "../components/ContactWidget";

export default function Root({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { pathname } = useLocation();

  return (
    <>
      {children}
      {pathname.replace(/\/$/, "") !== "/hire-me" && <ContactWidget />}
    </>
  );
}
