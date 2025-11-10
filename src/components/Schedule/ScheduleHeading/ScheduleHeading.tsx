"use client";

import Link from "next/link";
import "./ScheduleHeading.scss";

export default function ScheduleHeading() {
  return (
    <header
      className="headingKuziSport-wrapper"
      aria-labelledby="about-heading"
    >
      <h1 id="about-heading" className="headingKuziSport-title">
        <Link href="/Schedule" className="headingKuziSport-link">
          Grafik zajęć
        </Link>
      </h1>
    </header>
  );
}
