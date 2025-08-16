"use client";

import Link from "next/link";
import "./AbcHeading.scss";

export default function AbcHeadingPage() {
  return (
    <main className="AbcHeading-wrapper">
      <h1 className="AbcHeading-title">
        <Link href="/Abc">Osiedlowe ABC</Link>
      </h1>
    </main>
  );
}
