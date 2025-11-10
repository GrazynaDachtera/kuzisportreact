"use client";

import Link from "next/link";
import "./PricelistHeading.scss";

export default function PricelistHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/Pricelist" className="headingKuziSport-link">
          Cennik
        </Link>
      </h1>
    </header>
  );
}
