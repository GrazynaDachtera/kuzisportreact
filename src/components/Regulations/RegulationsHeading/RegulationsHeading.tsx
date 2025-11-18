"use client";

import Link from "next/link";
import "./RegulationsHeading.scss";

export default function RegulationsHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/Regulations" className="headingKuziSport-link">
          Regulamin
        </Link>
      </h1>
    </header>
  );
}
