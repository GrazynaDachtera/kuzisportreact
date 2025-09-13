"use client";

import Link from "next/link";
import "./ScheduleHeading.scss";

export default function AbcHeadingPage() {
  return (
    <main className="AbcHeading-wrapper">
      <h1 className="AbcHeading-title">
        <Link href="/Schedule">Grafik</Link>
      </h1>
    </main>
  );
}
