"use client";

import Link from "next/link";
import "./AboutUsHeading.scss";

export default function AboutFoundationHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/AboutUs" className="headingKuziSport-link">
          O nas
        </Link>
      </h1>
    </header>
  );
}
