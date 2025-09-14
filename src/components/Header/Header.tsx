"use client";

import { useState, Fragment, useCallback, KeyboardEvent } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import MosaicHeader from "../../../public/Header/MosaicHeader.png";
import "./Header.scss";

interface Slide {
  titleLines: string[];
  cta: { label: string; href: string };
  img: { src: StaticImageData; alt: string };
}

const slides: Slide[] = [
  {
    titleLines: ["Kuzi", "Sport"],
    cta: { label: "Sprawdź", href: "/AboutFoundation" },
    img: { src: MosaicHeader, alt: "Kuzi Sport – mozaika zdjęć" },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const isMulti = slides.length > 1;

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (!isMulti) return;
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % slides.length);
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + slides.length) % slides.length);
      }
    },
    [isMulti]
  );

  return (
    <section
      className={`slider ${!isMulti ? "slider--single" : ""}`}
      role="region"
      aria-roledescription={isMulti ? "Karuzela" : "Baner"}
      aria-label="Hero: Kuzi Sport"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className="slides"
        // translate in percentages so container width, not viewport width, is used
        style={{
          transform: `translate3d(-${(isMulti ? index : 0) * 100}%,0,0)`,
        }}
      >
        {slides.map((s, i) => (
          <div
            className="slide"
            key={`slide-${i}`}
            aria-label={s.img.alt}
            role="img"
          >
            <Image
              src={s.img.src}
              alt={s.img.alt}
              fill
              priority={i === 0}
              quality={90}
              placeholder="blur"
              sizes="100vw"
              className="slide__img"
            />

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
        <div className="dots" role="tablist" aria-label="Nawigacja slajdów">
          {slides.map((_, i) => (
            <button
              key={`dot-${i}`}
              role="tab"
              aria-selected={i === index}
              aria-label={`Przejdź do slajdu ${i + 1}`}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
