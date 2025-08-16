"use client";

import React from "react";
import "./Objects.scss";

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
    className="objects-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function ObjectsPage() {
  const items = [
    { title: "Hala widowiskowo-sportowa Arena", contact: "", address: "" },
    {
      title: "Palmiarnia Poznańska",
      contact: "sekretariat@palmiarnia.poznan.pl",
      address: "ul. Matejki 18, 60-767 Poznań",
    },
    {
      title: "Centrum wystawiennicze Międzynarodowe Targi Poznańskie",
      contact: "",
      address: "",
    },
    { title: "Biuro strefy płatnego parkowania", contact: "", address: "" },
    {
      title: "Biuro obsługi programu Poznań Kontakt",
      contact: "",
      address: "",
    },
    { title: "Rynek Łazarski", contact: "", address: "" },
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
    <section className="Objects">
      <div className="objects-top-wrapper">
        <div className="objects-container">
          <div className="objects-top">
            <div className="objects-content">
              <h2 className="objects-title">Ważne obiekty</h2>
              <p className="objects-description">
                Tu znajdziesz pełną ważnych obiektów na obszarze Łazarza.
                Kliknij w wybraną placówkę, by rozwinąć kontakt i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="objects-grid-wrapper">
        <div className="objects-container">
          <div className="objects-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `objects-details-${index}`;
              return (
                <div className="objects-grid-block" key={index}>
                  <button
                    type="button"
                    className="objects-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="objects-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="objects-grid-item-text">
                      <h3 className="objects-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`objects-details ${expanded ? "open" : ""}`}
                  >
                    <li>{renderContact(s.contact)}</li>
                    <li>{s.address || <span>brak adresu</span>}</li>
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
