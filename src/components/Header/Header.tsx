"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Header.scss";

interface Slide {
  titleLines: string[];
  text: string;
  cta: { label: string; href: string };
  img: { src: string; alt: string; objectPosition?: string };
}

const slides: Slide[] = [
  {
    titleLines: ["KUZI", "SPORT"],
    text: "SPORT I REKREACJA DLA\nDZIECI, MŁODZIEŻY\nORAZ DOROSŁYCH.",
    cta: { label: "Zapisz się", href: "/Service" },
    img: {
      src: "/Header/2.jpg",
      alt: "Kobieta ćwicząca na szarfach",
      objectPosition: "center",
    },
  },
  {
    titleLines: ["Xyz", "Xyz"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    cta: { label: "Umów się", href: "/Service" },
    img: {
      src: "/Header/1.jpg",
      alt: "Trening personalny",
      objectPosition: "center",
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
            <div className="slide__bg">
              <Image
                src={s.img.src}
                alt={s.img.alt}
                fill
                priority={i === 0}
                quality={100}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: s.img.objectPosition ?? "center",
                }}
              />
            </div>
            <div className="slide__overlay" aria-hidden="true" />
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
