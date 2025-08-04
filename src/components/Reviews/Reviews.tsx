"use client";

import Image from "next/image";
import "./Reviews.scss";

/* ── Image badges (first two cards) ──────────────────────────────── */
const IMAGE_BADGES = [
  { src: "/Reviews/benefitsystems.png", alt: "Benefit Systems logo" },
  { src: "/Reviews/profit.webp", alt: "Profit logo" },
];

export default function Reviews() {
  return (
    <section className="reviews">
      <div className="reviews__container">
        {/* ── 1-2: image badges ───────────────────────────────────── */}
        {IMAGE_BADGES.map(({ src, alt }) => (
          <div key={alt} className="reviews__card">
            <Image
              src={src}
              alt={alt}
              width={220}
              height={220}
              className="reviews__badge"
              sizes="(max-width: 768px) 60vw,
                     (max-width: 1200px) 30vw,
                     220px"
              priority
            />
          </div>
        ))}

        {/* ── 3: Google-reviews rating card ───────────────────────── */}
        <div className="reviews__card reviews__rating">
          <div className="reviews__stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                className="reviews__star"
                aria-hidden="true"
              >
                <path d="M10 1.7l2.4 5 5.5.8-4 3.9.9 5.5L10 14.8l-4.9 2.6.9-5.5-4-3.9 5.5-.8L10 1.7z" />
              </svg>
            ))}
          </div>

          <p className="reviews__score">
            <span>4.9</span> / 5
          </p>

          <p className="reviews__desc">
            na&nbsp;podstawie&nbsp;100+
            <br />
            opinii w&nbsp;Google i&nbsp;na&nbsp;Facebooku
          </p>
        </div>
      </div>
    </section>
  );
}
