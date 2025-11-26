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
      `Nasz klub to nie tylko ,,,, i trenerów z pasją, dbających o komfort i bezpieczeństwo podczas
zajęć. Organizujemy zajęcia dostosowane programem do potrzeb grup, z uwzględnieniem
wieku uczestników , poziomu ich zaawansowania jak i zgłaszanych oczekiwań , tak w formie

, jak i w treści. U nas odnajdą się nie tylko osoby podejmujące aktywność fizyczną w
wymiarze rekreacyjnym, ale i zawodnicy wyczynowi oraz zawodowi sportowcy. Zapewniamy
miłą …..`,
      `Działamy w oparciu o nowoczesne metody treningowe, ćwicząc na profesjonalnym sprzęcie,
wspierając swoich podopiecznych wiedzą licencjonowanych trenerów i instruktorów.`,
      "W naszych szeregach świetnie realizują się nie tylko dzieci i młodzież, ale i dorośli – którzy z najwyższą satysfakcją wypowiadają się o jakości prowadzonego przez nas szkolenia sportowego.",
    ],
  },
  {
    title: "Skontaktuj się z nami!",
    text: `W celu dołączenia do zajęć, umówienia się na lekcje indywidualne, wynajmu sali lub
organizacji grupy, a także innych form współpracy - SKONTAKTUJ SIĘ Z NAMI.`,
  },
];

export default function Mission({
  title = "O nas",
  items = DEFAULT_ITEMS,
  image = {
    src: "/AboutFoundation/aerial.jpg",
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
