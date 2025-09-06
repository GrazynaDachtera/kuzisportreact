"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./AreasOfActivity.scss";

type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

type ActivityItem = {
  title: string;
  text?: string;
};

type AreasOfActivityProps = {
  title?: string;
  items?: ActivityItem[];
  image?: Img;
};

const DEFAULT_ITEMS: ActivityItem[] = [
  {
    title: "Bezpieczeństwo i Komfort",
    text: "Nasza sala jest w pełni przystosowana do organizacji dziecięcych wydarzeń. Dbamy o bezpieczeństwo najmłodszych, oferując przestronne i bezpieczne otoczenie do zabawy.",
  },
  {
    title: "Aktywność w Centrum Urodzin",
    text: "Zajęcia sportowe to doskonały sposób na aktywne spędzenie czasu. Oferujemy różnorodne formy ruchu, takie jak piłka nożna, koszykówka, czy zabawy z chustą animacyjną. Niezależnie od zainteresowań, każda pociecha znajdzie coś dla siebie!",
  },
  {
    title: "Indywidualne Podejście",
    text: "Organizacja urodzin w Kuzi Sport opiera się na Twoich potrzebach i preferencjach. Współpracujemy z rodzicami, aby stworzyć niezapomniane przyjęcie dostosowane do gustu i wieku dziecka.",
  },
  {
    title: "Profesjonalna Obsługa",
    text: "Nasz wykwalifikowany zespół zadba o każdy detal. Możesz liczyć na wsparcie w organizacji poczęstunku oraz dekoracji, aby przyjęcie było jeszcze bardziej wyjątkowe.",
  },
  {
    title: "Elastyczne Pakiety Urodzinowe",
    text: "Oferujemy różne pakiety urodzinowe, które obejmują różnorodne atrakcje oraz opcje dodatkowe, takie jak malowanie twarzy, tatuaże z wybranymi bohaterami. Z łatwością dopasujesz ofertę do swoich potrzeb i budżetu.",
  },
  {
    title: "Zarezerwuj Termin Już Dzisiaj!",
  },
];

export default function AreasOfActivity({
  title = "Dlaczego warto wybrać Kuzi Sport?",
  items = DEFAULT_ITEMS,
  image = {
    src: "/News/matejki-poznan.png",
    alt: "obszary działalności",
    width: 652,
    height: 336,
    priority: true,
  },
}: AreasOfActivityProps) {
  return (
    <section className="areas-top-wrapper">
      <div className="areas-container">
        <div className="areas-top">
          <div className="areas-content">
            <h2 className="areas-title">{title}</h2>

            <div className="areas-description">
              <ul className="areas-list" role="list">
                {items.map((item, idx) => (
                  <li key={idx} className="areas-item">
                    <h3 className="areas-item-title">{item.title}</h3>
                    {item.text ? (
                      <div className="areas-item-text">{item.text}</div>
                    ) : null}
                  </li>
                ))}
              </ul>

              <Link href="/AreasOfActivity" className="areas-cta">
                Poznaj wszystkie obszary naszej działalności
                <svg
                  className="areas-cta-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M6 6 L18 18" />
                  <path d="M12 18 H18 V12" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="areas-image-wrapper">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="areas-image"
              priority={image.priority}
              sizes="(max-width:700px) 90vw, (max-width:1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
