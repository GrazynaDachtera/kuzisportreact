"use client";

import { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import MosaicHeader from "../../../public/Header/MosaicHeader.png";
import "./Header.scss";

interface Slide {
  cta: { label: string; href: string };
  img: { src: StaticImageData; alt: string };
}

const slides: Slide[] = [
  {
    cta: { label: "Sprawdź", href: "/AboutFoundation" },
    img: { src: MosaicHeader, alt: "Kuzi Sport – mozaika zdjęć" },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState<number>(0);
  const isMulti = slides.length > 1;

  return (
    <section className={`slider ${!isMulti ? "slider--single" : ""}`}>
      <div
        className="slides"
        style={{
          width: `${slides.length * 100}vw`,
          transform: `translateX(-${(isMulti ? index : 0) * 100}vw)`,
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
              style={{ objectFit: "contain", objectPosition: "center top" }}
            />

            {/* CTA only */}
            <div className="slide__text slide__text--cta-only">
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
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
