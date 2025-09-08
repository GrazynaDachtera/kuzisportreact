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
    title: "Misja i wizja",
    text: "Nasza sala sportowa to nie tylko doskonałe warunki do ćwiczeń, ale także zespół doświadczonych i pasjonujących trenerów, którzy dbają o komfort i bezpieczeństwo podczas zajęć. Organizujemy programy dostosowane do potrzeb grup, uwzględniając zarówno formy rekreacyjne, jak i sportowe. Zapewniamy miłą i wspierającą atmosferę, która zachęca do aktywności fizycznej i zdrowego stylu życia. Niezależnie od pory roku, sala Kuzi Sport jest idealnym miejscem na zorganizowanie zajęć wychowania fizycznego, które zmotywują uczniów do regularnej aktywności.",
  },
  {
    title: "Skontaktuj się z nami!",
    text: "Jeśli jesteś zainteresowany organizacją zajęć w naszej sali sportowej, zapraszamy do kontaktu. Razem stworzymy program, który spełni Twoje oczekiwania i przyczyni się do rozwoju fizycznego Twoich uczniów!",
  },
];

export default function Mission({
  title = "Kilka słów o naszym klubie :)",
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
              sizes="(max-width: 991px) 92vw, 50vw"
              className="mission-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
