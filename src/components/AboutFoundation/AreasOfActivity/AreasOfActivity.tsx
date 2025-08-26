"use client";

import Image from "next/image";
import React from "react";
import "./AreasOfActivity.scss";

type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

type AreasOfActivityProps = {
  title?: string;
  description?: React.ReactNode;
  image?: Img;
};

export default function AreasOfActivity({
  title = "Obszary działalności",
  description = (
    <>
      <p>
        <strong>Robimy Porzundek!</strong>
        <br />
        chodzimy po Łazarzu wzdłuż i wszerz – nieporządek zgłaszamy komu trzeba
        i pilnujemy realizacji zadań porządkowych przez służby miejskie
      </p>

      <p>
        <strong>Integrujemy Łazarz i sąsiedztwo!</strong>
        <br />
        organizujemy wydarzenia sąsiedzkie, od spacerów po pikniki i warsztaty
        dla mieszkańców, dbając o walor edukacyjny
      </p>

      <p>
        <strong>Zieleń i zwierzęta, natura!</strong>
        <br />
        naszym priorytetem jest jeszcze więcej dobrze zaplanowanej zieleni na
        Łazarzu, miejsc przyjemnych dla ludzi i innych stworków – zawsze to
        uwzględniamy w naszych opiniach i projektach
      </p>

      <p>
        <strong>Inwestycje!</strong>
        <br />
        wiemy jak dobrze planować, wydawać pieniądze i pilnować trwałości
        inwestycji. Staramy się o kompromis dla potrzeb pieszych, rowerzystów,
        kierowców, młodszych, starszych, chytrych i estetów
      </p>

      <p>
        <strong>Kultura i historia!</strong>
        <br />
        co, gdzie, kiedy – uważnie śledzimy i nagłaśniamy informacje o
        wydarzeniach na Łazarzu, a także w całym Poznaniu: takich które właśnie
        się dzieją i takich które już się działy. Organizujemy spacery z
        historią Łazarza w tle
      </p>

      <p>
        <strong>… i wiele więcej!</strong>
      </p>

      <a href="/obszary" className="areas-cta">
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
      </a>
    </>
  ),
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
            <div className="areas-description">{description}</div>
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
