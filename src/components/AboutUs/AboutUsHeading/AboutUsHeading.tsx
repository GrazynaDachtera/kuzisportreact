"use client";

import Link from "next/link";
import "./AboutUsHeading.scss";

export default function AboutFoundationHeading() {
  return (
    <main className="AboutFoundationHeading-wrapper">
      <h1 className="AboutFoundationHeading-title">
        <Link href="/AboutUs">O nas</Link>
      </h1>
    </main>
  );
}
