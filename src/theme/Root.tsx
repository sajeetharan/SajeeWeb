import React, { type ReactNode } from "react";
import ContactWidget from "../components/ContactWidget";

export default function Root({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      {children}
      <ContactWidget />
    </>
  );
}
