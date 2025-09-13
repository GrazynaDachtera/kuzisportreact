"use client";

import Link from "next/link";
import "./AreasExtendedHeading.scss";

export default function AreasExtendedHeading() {
  return (
    <main className="areasextendedheading-wrapper">
      <h1 className="areasextendedheading-title">
        <Link href="/AboutFoundation">Obszary działalności</Link>
      </h1>
    </main>
  );
}
