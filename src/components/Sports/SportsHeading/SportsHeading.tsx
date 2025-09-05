"use client";

import Link from "next/link";
import "./SportsHeading.scss";

export default function SportsHeading() {
  return (
    <main className="ProjectsHeading-wrapper">
      <h1 className="ProjectsHeading-title">
        <Link href="/Sports">Dyscypliny</Link>
      </h1>
    </main>
  );
}
