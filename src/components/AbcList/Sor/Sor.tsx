"use client";

import React from "react";
import "./Sor.scss";

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
    className="sor-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function SorPage() {
  const items = [
    {
      title: "Szpital Wojskowy z Przychodnią SP ZOZ w Poznaniu",
      contact: "szpital@111szw.poznan.pl",
      address: "ul. Grunwaldzka 16/18, 60-780 Poznań",
    },
    {
      title: "Szpital św. Rodziny",
      contact: "",
      address: "Jarochowskiego 18, 60-214 Poznań",
    },
    {
      title: "Uniwersytecki Szpital Kliniczny w Poznaniu",
      contact: "szpital@usk.poznan.pl",
      address: "ul. Przybyszewskiego 49, 60-355 Poznań",
    },
  ];

  const [open, setOpen] = React.useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const renderContact = (value: string) => {
    if (!value) return <span>brak e-maila</span>;
    const isEmail = value.includes("@") && !value.startsWith("http");
    return isEmail ? (
      <a href={`mailto:${value}`}>{value}</a>
    ) : (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    );
  };

  return (
    <section className="Sor">
      <div className="sor-top-wrapper">
        <div className="sor-container">
          <div className="sor-top">
            <div className="sor-content">
              <h2 className="sor-title">SOR - wieczorynka</h2>
              <p className="sor-description">
                Tu znajdziesz pełną listę SORów działających na obszarze
                Łazarza. Kliknij w wybraną placówkę, by rozwinąć kontakt i
                adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sor-grid-wrapper">
        <div className="sor-container">
          <div className="sor-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `sor-details-${index}`;
              return (
                <div className="sor-grid-block" key={index}>
                  <button
                    type="button"
                    className="sor-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="sor-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="sor-grid-item-text">
                      <h3 className="sor-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`sor-details ${expanded ? "open" : ""}`}
                  >
                    <li>{renderContact(s.contact)}</li>
                    <li>{s.address}</li>
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
