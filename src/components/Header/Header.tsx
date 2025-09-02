"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import "./Header.scss";

interface Slide {
  titleLines: string[];
  cta: { label: string; href: string };
  img: { src: string; alt: string; width: number; height: number };
}

const slides: Slide[] = [
  {
    titleLines: ["Kuzi", "Sport"],
    cta: { label: "Sprawdź", href: "/AboutFoundation" },
    img: { src: "/Header/", alt: "z", width: 1600, height: 1067 },
  },
  {
    titleLines: ["KULTURA", "HISTORIA I SPORT"],
    cta: { label: "Wesprzyj", href: "/Help" },
    img: { src: "/Header/", alt: "z", width: 1600, height: 1067 },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState<number>(0);

  return (
    <section className="slider">
      <div
        className="slides"
        style={{
          width: `${slides.length * 100}vw`,
          transform: `translateX(-${index * 100}vw)`,
        }}
      >
        {slides.map((s, i) => (
          <div
            className="slide"
            key={`slide-${i}`}
            style={{ backgroundImage: `url(${s.img.src})` }}
            aria-label={s.img.alt}
            role="img"
          >
            <div className="slide__text">
              <h1>
                {s.titleLines.map((line, li) => (
                  <Fragment key={`line-${i}-${li}`}>
                    <span>{line}</span>
                    {li < s.titleLines.length - 1 && <br />}
                  </Fragment>
                ))}
              </h1>
              <Link href={s.cta.href} className="slide__cta">
                {s.cta.label}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={`dot-${i}`}
            className={`dot ${i === index ? "active" : ""}`}
            aria-label={`Przejdź do slajdu ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
