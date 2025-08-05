"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
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
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    cta: { label: "Zapisz się", href: "/Service" },
    img: {
      src: "/Header/x.png",
      alt: "z",
      width: 1600,
      height: 1067,
    },
  },
  {
    titleLines: ["XYZ", "XYZ"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
          <div className="slide" key={`slide-${i}`}>
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

            <div className="slide__image">
              <Image
                src={s.img.src}
                alt={s.img.alt}
                width={s.img.width}
                height={s.img.height}
                priority={i === 0}
                sizes="(min-width: 1280px) 900px, (min-width: 768px) 60vw, 100vw"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
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
