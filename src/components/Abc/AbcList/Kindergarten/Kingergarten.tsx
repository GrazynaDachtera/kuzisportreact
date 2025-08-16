"use client";

import React from "react";
import "./Kindergarten.scss";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="butt"
    strokeLinejoin="miter"
    className="kindergarten-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function AbcPage() {
  const features = [
    {
      title: "Przedszkole nr 48",
      email: "p48@poznan.interklasa.pl",
      address: "Łukaszewicza 35, 60-729 Poznań",
    },
    {
      title: "Przedszkole nr 51",
      email: "przedszkole51@zsipopoznan.pl",
      address: "Głogowska 40, 60-736 Poznań",
    },
    {
      title: 'Przedszkole nr 39 "Leśne Ludki"',
      email: "p39@poznan.interklasa.pl",
      address: "Limanowskiego 23B, 60-744 Poznań",
    },
    {
      title: "Przedszkole nr 25",
      email: "p25@poznan.interklasa.pl",
      address: "Głogowska 97, 60-265 Poznań",
    },
    {
      title: 'Przedszkole nr 32 "Świerszczykowe Nutki"',
      email: "sekretariat@p32poznan.pl",
      address: "Chociszewskiego 44c, 60-259 Poznań",
    },
    {
      title: "Przedszkole nr 44 im. J. Korczaka",
      email: "ps44@o2.pl",
      address: "Dmowskiego 17, 60-222 Poznań",
    },
    {
      title: "Przedszkole nr 89",
      email: "p89@onet.eu",
      address: "Kasprzaka 46, 60-245 Poznań",
    },
    {
      title: "Przedszkole nr 90 im. J. Brzechwy",
      email: "",
      address: "Winklera 9, 60-246 Poznań",
    },
  ];

  const [open, setOpen] = React.useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section className="Kindergarten">
      <div className="kindergarten-top-wrapper">
        <div className="kindergarten-container">
          <div className="kindergarten-top">
            <div className="kindergarten-content">
              <h2 className="kindergarten-title">Przedszkola</h2>
              <p className="kindergarten-description">
                Tu znajdziesz pełną listę przedszkoli działających na obszarze
                Łazarza. Kliknij w wybraną placówkę, by rozwinąć kontakt i
                adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="kindergarten-grid-wrapper">
        <div className="kindergarten-container">
          <div className="kindergarten-grid">
            {features.map((feature, index) => {
              const expanded = open.has(index);
              const detailsId = `kg-details-${index}`;
              return (
                <div className="kindergarten-grid-block" key={index}>
                  <button
                    type="button"
                    className="kindergarten-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="kindergarten-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="kindergarten-grid-item-text">
                      <h3 className="kindergarten-grid-item-title">
                        {feature.title}
                      </h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`kindergarten-details ${expanded ? "open" : ""}`}
                  >
                    <li>
                      {feature.email ? (
                        <a href={`mailto:${feature.email}`}>{feature.email}</a>
                      ) : (
                        <span>brak e-maila</span>
                      )}
                    </li>
                    <li>{feature.address}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
