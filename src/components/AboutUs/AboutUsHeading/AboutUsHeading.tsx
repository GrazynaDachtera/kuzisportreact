"use client";

import Link from "next/link";
import "./AboutUsHeading.scss";

export default function AboutFoundationHeading() {
  return (
    <header
      className="AboutFoundationHeading-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="AboutFoundationHeading-title">
        <Link href="/AboutUs" className="AboutFoundationHeading-link">
          O nas
        </Link>
      </h1>
    </header>
  );
}
