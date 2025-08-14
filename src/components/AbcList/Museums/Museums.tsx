"use client";

import React from "react";
import "./Museums.scss";

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
    className="museums-arrow-icon"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function MuseumsPage() {
  const items: { title: string; contact: string; address: string }[] = [];

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
    <section className="Museums">
      <div className="museums-top-wrapper">
        <div className="museums-container">
          <div className="museums-top">
            <div className="museums-content">
              <h2 className="museums-title">Muzea, galerie</h2>
              <p className="museums-description">
                Tu znajdziesz pełną listę muzeów i galerii działających na
                obszarze Łazarza. Kliknij w wybraną placówkę, by rozwinąć
                kontakt i adres.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="museums-grid-wrapper">
        <div className="museums-container">
          <div className="museums-grid">
            {items.map((s, index) => {
              const expanded = open.has(index);
              const detailsId = `museums-details-${index}`;
              return (
                <div className="museums-grid-block" key={index}>
                  <button
                    type="button"
                    className="museums-grid-item"
                    aria-expanded={expanded}
                    aria-controls={detailsId}
                    onClick={() => toggle(index)}
                  >
                    <span className="museums-grid-item-icon-wrapper">
                      <ArrowIcon />
                    </span>
                    <span className="museums-grid-item-text">
                      <h3 className="museums-grid-item-title">{s.title}</h3>
                    </span>
                  </button>

                  <ul
                    id={detailsId}
                    className={`museums-details ${expanded ? "open" : ""}`}
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
