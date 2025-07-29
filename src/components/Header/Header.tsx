"use client";

import Image from "next/image";
import "./Header.scss";

export default function Header() {
  return (
    <header className="hero">
      <Image
        src="/Header/pixelcut-export.png"
        alt="Kuzi Sport main background"
        fill
        priority
        sizes="100vw"
        className="hero__bg"
      />
      <div className="hero__overlay" />
      <div className="hero__inner" />
    </header>
  );
}
