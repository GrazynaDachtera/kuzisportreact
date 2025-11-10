"use client";

import Link from "next/link";
import "./NewsPageHeading.scss";

export default function NewsPageHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/NewsPage" className="headingKuziSport-link">
          Aktualności
        </Link>
      </h1>
    </header>
  );
}
