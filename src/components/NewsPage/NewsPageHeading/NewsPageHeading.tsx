"use client";

import Link from "next/link";
import "./NewsPageHeading.scss";

export default function AboutFoundationHeading() {
  return (
    <main className="NewsPageHeading-wrapper">
      <h1 className="NewsPageHeading-title">
        <Link href="/NewsPage">Aktualności</Link>
      </h1>
    </main>
  );
}
