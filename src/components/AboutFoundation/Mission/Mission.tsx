"use client";

import Image from "next/image";
import "./Mission.scss";

type MissionProps = {
  title?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
  };
};

export default function Mission({
  title = "Misja i wizja",
  description = "Jako Stowarzyszenie Sąsiedzki Łazarz działamy na rzecz mieszkańców Osiedla Święty Łazarz, organizując wydarzenia, spotkania oraz działania edukacyjne i kanały komunikacyjne, aby zachęcić do aktywnej partycypacji w życiu społecznym. Wierzymy, że każdy ma prawo żyć w bezpiecznym, nowoczesnym, zielonym i przyjaznym miejscu, dlatego łączymy nasze siły i doświadczenia jako społecznicy mieszkający tutaj, by skutecznie reprezentować potrzeby naszych sąsiadów. W naszych oczach Święty Łazarz to dzielnica przyjazna do życia, w której każdy mieszkaniec ma łatwy dostęp do terenów zielonych i kultury oraz możliwość integracji z sąsiadami i pełnej partycypacji w życiu społecznym osiedla.",
  image = {
    src: "/Sports/people.png",
    alt: "grupa ludzi",
    width: 652,
    height: 336,
    priority: true,
  },
}: MissionProps) {
  return (
    <section className="mission-top-wrapper">
      <div className="mission-container">
        <div className="mission-top">
          <div className="mission-image-wrapper">
            {/* no fill — let the natural aspect render; CSS reserves height */}
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority={image.priority}
              className="mission-image"
              sizes="(max-width:700px) 90vw, (max-width:1200px) 50vw, 33vw"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <div className="mission-content">
            <h2 className="mission-title">{title}</h2>
            <p className="mission-description">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
