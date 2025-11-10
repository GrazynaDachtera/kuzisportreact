"use client";

import Link from "next/link";
import "./SportsHeading.scss";

export default function SportsHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/Sports" className="headingKuziSport-link">
          Dyscypliny
        </Link>
      </h1>
    </header>
  );
}
