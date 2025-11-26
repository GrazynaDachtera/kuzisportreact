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
    title: "Bezpieczeństwo i komfort",
    text: "Sala w pełni przystosowana do bezpiecznego podejmowania aktywności sportowej. Na plus – strefa relaksu na antresoli, automaty z przekąskami i napojami oraz herbata i kawa serwowane w godzinach pracy recepcji.",
  },
  {
    title: "Zespół Kuzi Sport",
    text: "Nasz klub tworzą ludzie z wizją i pasją, którzy od lat rozwijają sportowo zarówno pasjonatów, jak i osoby poszukujące swojej drogi w aktywności sportowej. Obok kadry trenerskiej wspierają nas fizjoterapeuci, zespół psychologów, dietetyk oraz mecenasi sportu działający na rzecz naszej społeczności.",
  },
  {
    title: "Gwarancja rozwoju",
    text: "Tworzymy przestrzeń do rozwoju dla początkujących, średniozaawansowanych i zaawansowanych poprzez podział na grupy pod względem umiejętności i wieku, sensowne zwiększanie wolumenu treningów, wyznaczanie krótkoterminowych celów treningowych, znajdujących zwieńczenie w turniejach i zawodach.",
  },
  {
    title: "Indywidualne podejście",
    text: "Staramy się zdefiniować mocne strony adepta, namierzyć problemy i w duchu rozwoju pracować nad zwiększeniem potencjału zawodnika przy jednoczesnym eliminowaniu braków. Trening zakłada rozwój na wielu polach - od psychofizycznego, przez społeczny aż do pełnego sukcesu sportowego.",
  },
  {
    title: "Świetna lokalizacja",
    text: "Nasza sala główna znajduje się w hali przy ul. Św. Michała 56 w Poznaniu. To punkt, do którego można dojechać bez problemu komunikacją miejską i podmiejską, a kierowcy mogą bezpiecznie zaparkować swój pojazd pod obiektem, na prywatnym monitorowanym parkingu.",
  },
];

export default function AreasOfActivity({
  title = "Dlaczego warto wybrać Kuzi Sport?",
  items = DEFAULT_ITEMS,
  image = {
    src: "/AboutFoundation/peopleAboutSection.jpg",
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

              <Link href="/Reservation" className="areas-cta">
                Zarezerwuj termin
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
