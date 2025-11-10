"use client";

import Link from "next/link";
import "./ContactHeading.scss";

export default function ContactHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/Contact" className="headingKuziSport-link">
          Kontakt
        </Link>
      </h1>
    </header>
  );
}
