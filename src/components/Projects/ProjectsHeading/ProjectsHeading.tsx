"use client";

import Link from "next/link";
import "./ProjectsHeading.scss";

export default function ProjectsHeading() {
  return (
    <main className="ProjectsHeading-wrapper">
      <h1 className="ProjectsHeading-title">
        <Link href="/Projects">Projekty</Link>
      </h1>
    </main>
  );
}
