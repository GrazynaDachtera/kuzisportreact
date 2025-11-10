"use client";

import Link from "next/link";
import "./ReservationHeading.scss";

export default function ReservationHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/Reservation" className="headingKuziSport-link">
          Rezerwacja
        </Link>
      </h1>
    </header>
  );
}
