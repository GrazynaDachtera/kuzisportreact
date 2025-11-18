"use client";

import Link from "next/link";
import "./BusinessPartnersHeading.scss";

export default function BusinessPartnersHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/Schedule" className="headingKuziSport-link">
          Partnerzy biznesowi
        </Link>
      </h1>
    </header>
  );
}
