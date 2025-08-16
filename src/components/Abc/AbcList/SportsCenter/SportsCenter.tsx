"use client";

import React from "react";
import "./SportsCenter.scss";

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
    className="sportscenter-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function SportsCenterPage() {
  const items = [
    {
      title: "Młodzieżowy Dom Kultury nr 3",
      contact: "mdk3@tmpsc.pl",
      address: "Jarochowskiego 1, 60-235 Poznań",
    },
    {
      title: "Klub Osiedlowy KRĄG",
      contact: "klubkrag@osiedlelazarz.pl",
      address: "Dmowskiego 37, 60-222 Poznań",
    },
    {
      title: "Przystanek Pireus",
      contact: "przystanekpireus@gmail.com",
      address: "Głogowska 35, 60-736 Poznań",
    },
    {
      title: "Biblioteka Raczyńskich - Filia nr 4",
      contact: "filia4@bracz.edu.pl",
      address: "Lodowa 4, 60-226 Poznań",
    },
    {
      title: "Biblioteka Raczyńskich Filia 12 i 46",
      contact: "filia12@bracz.edu.pl, filia46@bracz.edu.pl",
      address: "Arciszewskiego 27, 60-271 Poznań",
    },
    {
      title: "Biblioteka Raczyńskich Filia 22",
      contact: "filia22@bracz.edu.pl",
      address: "Dmowskiego 37, 60-222 Poznań",
    },
    {
      title: "Biblioteka Raczyńskich Filia 23",
      contact: "filia23@bracz.edu.pl",
      address: "Hetmańska 41, 60-251 Poznań",
    },
    {
      title: "Radio Poznań",
      contact: "radiopoznan24@radiopoznan.fm",
      address: "ul. Berwińskiego 5, 60-765 Poznań",
    },
    {
      title: "Poznański Klub Brydżowy",
      contact: "kontakt@brydz.pl",
      address: "Grunwaldzka 41b/1, 61-001 Poznań",
    },
    {
      title: "Fabryka Formy Korty Poznań",
      contact: "arena@fabryka-formy.pl",
      address: "Reymonta 35, 60-791 Poznań",
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
    <section className="SportsCenter">
      <div className="sportscenter-top-wrapper">
        <div className="sportscenter-container">
          <div className="sportscenter-top">
            <div className="sportscenter-content">
              <h2 className="sportscenter-title">Ośrodki kultury i sportu</h2>
              <p className="sportscenter-description">
                Tu znajdziesz pełną listę ośrodków kultury i sportu działających
                na obszarze Łazarza. Kliknij w wybraną placówkę, by rozwinąć
                kontakt i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sportscenter-grid-wrapper">
        <div className="sportscenter-container">
          <div className="sportscenter-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `sportscenter-details-${index}`;
              return (
                <div className="sportscenter-grid-block" key={index}>
                  <button
                    type="button"
                    className="sportscenter-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="sportscenter-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="sportscenter-grid-item-text">
                      <h3 className="sportscenter-grid-item-title">
                        {s.title}
                      </h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`sportscenter-details ${expanded ? "open" : ""}`}
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
