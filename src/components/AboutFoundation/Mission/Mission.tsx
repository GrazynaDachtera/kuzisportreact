"use client";

import Image from "next/image";
import React from "react";
import "./Mission.scss";

type Img = {
  src: string;
  alt: string;
  priority?: boolean;
};

type MissionItem = {
  title: string;
  text?: string;
};

type MissionProps = {
  title?: string;
  items?: MissionItem[];
  image?: Img;
};

const DEFAULT_ITEMS: MissionItem[] = [
  {
    title: "Misja",
    text: "Jako Stowarzyszenie Sąsiedzki Łazarz działamy na rzecz mieszkańców Osiedla Święty Łazarz, organizując wydarzenia, spotkania oraz działania edukacyjne i kanały komunikacyjne, aby zachęcić do aktywnej partycypacji w życiu społecznym.",
  },
  {
    title: "Wizja",
    text: "Wierzymy, że każdy ma prawo żyć w bezpiecznym, nowoczesnym, zielonym i przyjaznym miejscu, dlatego łączymy nasze siły i doświadczenia jako społecznicy mieszkający tutaj, by skutecznie reprezentować potrzeby naszych sąsiadów.",
  },
  {
    title: "Święty Łazarz naszym okiem",
    text: "W naszych oczach Święty Łazarz to dzielnica przyjazna do życia, w której każdy mieszkaniec ma łatwy dostęp do terenów zielonych i kultury oraz możliwość integracji z sąsiadami i pełnej partycypacji w życiu społecznym osiedla.",
  },
];

export default function Mission({
  title = "Misja i wizja",
  items = DEFAULT_ITEMS,
  image = {
    src: "/AboutFoundation/person.png",
    alt: "portret osoby",
    priority: true,
  },
}: MissionProps) {
  return (
    <section className="mission-top-wrapper">
      <div className="mission-container">
        <div className="mission-top">
          <div className="mission-content">
            <h2 className="mission-title">{title}</h2>
            <div className="mission-description">
              <ul className="mission-list" role="list">
                {items.map((item, idx) => (
                  <li key={idx} className="mission-item">
                    <h3 className="mission-item-title">{item.title}</h3>
                    {item.text ? (
                      <div className="mission-item-text">{item.text}</div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mission-image-wrapper">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={image.priority}
              quality={90}
              sizes="(max-width: 991px) 90vw, 520px"
              className="mission-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
