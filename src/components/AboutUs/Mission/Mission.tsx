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
  bullets?: string[];
};

type MissionProps = {
  title?: string;
  lead?: string;
  items?: MissionItem[];
  image?: Img;
};

const DEFAULT_ITEMS: MissionItem[] = [
  {
    title: "Misja i wizja",
    bullets: [
      "Bezpieczne treningi pod okiem doświadczonych trenerów",
      "Program dopasowany do grupy: rekreacja lub sport",
      "Wspierająca atmosfera, która buduje regularność",
      "Świetne warunki do zajęć WF przez cały rok",
    ],
  },
  {
    title: "Skontaktuj się z nami!",
    text: "Napisz do nas - przygotujemy propozycję zajęć dopasowaną do wieku, poziomu i celu grupy.",
  },
];

export default function Mission({
  title = "O nas",
  items = DEFAULT_ITEMS,
  image = {
    src: "/AboutFoundation/peopleAboutSection.jpg",
    alt: "Trenerzy na sali treningowej",
    priority: true,
  },
}: MissionProps) {
  return (
    <section className="mission" aria-labelledby="mission-title">
      <div className="mission__container">
        <div className="mission__grid">
          <figure className="mission__media">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={image.priority}
              quality={90}
              sizes="(max-width: 991px) 92vw, 50vw"
              className="mission__image"
            />
          </figure>

          <div className="mission__content">
            <h2 id="mission-title" className="mission__title">
              {title}
            </h2>

            <ul className="mission__list">
              {items.map((item) => (
                <li key={item.title} className="mission__item">
                  <h3 className="mission__itemTitle">{item.title}</h3>

                  {item.text ? (
                    <p className="mission__text">{item.text}</p>
                  ) : null}

                  {item.bullets?.length ? (
                    <ul className="mission__bullets">
                      {item.bullets.map((b) => (
                        <li key={b} className="mission__bullet">
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
