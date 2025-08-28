"use client";

import Link from "next/link";
import "./ProjectsHeading.scss";

export default function AboutFoundationHeading() {
  return (
    <main className="AboutFoundationHeading-wrapper">
      <h1 className="AboutFoundationHeading-title">
        <Link href="/AboutFoundation">Projekty</Link>
      </h1>
    </main>
  );
}
