"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import "./Header.scss";

interface Slide {
  titleLines: string[];
  text: string;
  cta: { label: string; href: string };
  img: { src: string; alt: string; width: number; height: number };
}

const slides: Slide[] = [
  {
    titleLines: ["Sąsiedzki", "Łazarz"],
    text: "Jesteśmy grupą społeczników zaangażowanych w sprawy mieszkańców na Łazarzu.",
    cta: { label: "Sprawdź", href: "/Service" },
    img: {
      src: "/Header/x.png",
      alt: "z",
      width: 1600,
      height: 1067,
    },
  },
  {
    titleLines: ["KULTURA", "HISTORIA I SPORT"],
    text: "Bądź na bieżąco!",
    cta: { label: "Sprawdź", href: "/Service" },
    img: {
      src: "/Header/x.png",
      alt: "z",
      width: 1600,
      height: 1067,
    },
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
            style={{
              backgroundImage: `url(${s.img.src})`,
            }}
            aria-label={s.img.alt}
            role="img"
          >
            <div className="slide__text">
              <h1>
                {s.titleLines.map((line, li) => (
                  <Fragment key={`line-${i}-${li}`}>
                    <span>{line}</span>
                    <br />
                  </Fragment>
                ))}
              </h1>
              <p>{s.text}</p>
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
