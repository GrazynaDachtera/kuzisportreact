"use client";

import { useState, useEffect, Fragment } from "react";
import type { KeyboardEvent } from "react";
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
    cta: { label: "Sprawdź", href: "/AboutUs" },
    img: {
      src: "/Header/1.jpeg",
      alt: "Kuzi Sport - slide 1",
      width: 1600,
      height: 1067,
    },
  },
  {
    titleLines: ["Kuzi", "Sport"],
    cta: { label: "Sprawdź", href: "/AboutUs" },
    img: {
      src: "/Header/2.jpg",
      alt: "Kuzi Sport - slide 2",
      width: 1600,
      height: 1067,
    },
  },
  {
    titleLines: ["Kuzi", "Sport"],
    cta: { label: "Sprawdź", href: "/AboutUs" },
    img: {
      src: "/Header/3.jpg",
      alt: "Kuzi Sport - slide 3",
      width: 1600,
      height: 1067,
    },
  },
  {
    titleLines: ["Kuzi", "Sport"],
    cta: { label: "Sprawdź", href: "/AboutUs" },
    img: {
      src: "/Header/4.jpg",
      alt: "Kuzi Sport - slide 4",
      width: 1600,
      height: 1067,
    },
  },
];

const SLIDE_COUNT = slides.length;
const AUTOPLAY_DELAY = 3000;

export default function HeroSlider() {
  const [index, setIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const isMulti = SLIDE_COUNT > 1;

  // autoplay
  useEffect(() => {
    if (!isMulti || isPaused) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDE_COUNT);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(id);
  }, [isMulti, isPaused]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isMulti) return;
    if (event.key === "ArrowRight") {
      setIndex((prev) => (prev + 1) % SLIDE_COUNT);
    } else if (event.key === "ArrowLeft") {
      setIndex((prev) => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
    }
  };

  return (
    <section
      className={`slider ${!isMulti ? "slider--single" : ""}`}
      aria-roledescription="carousel"
      aria-label="Slajdy Kuzi Sport"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="slides"
        style={{
          width: `${SLIDE_COUNT * 100}vw`,
          transform: `translateX(-${(isMulti ? index : 0) * 100}vw)`,
        }}
      >
        {slides.map((s, i) => (
          <div
            className="slide"
            key={`slide-${i}`}
            style={{ backgroundImage: `url(${s.img.src})` }}
            aria-roledescription="slide"
            aria-label={`${s.img.alt} (${i + 1} z ${SLIDE_COUNT})`}
            aria-hidden={i !== index}
            role="group"
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

      {isMulti && (
        <div className="dots">
          {slides.map((_, i) => (
            <button
              key={`dot-${i}`}
              className={`dot ${i === index ? "active" : ""}`}
              aria-label={`Przejdź do slajdu ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
