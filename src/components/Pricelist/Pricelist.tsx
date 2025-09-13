"use client";

import "./Pricelist.scss";
import React from "react";

type PriceRow = { name: string; price: string; note?: string };
type PriceSection = { id: string; title: string; items: PriceRow[] };

const SECTIONS: PriceSection[] = [
  {
    id: "gym-acro-parkour",
    title: "Gimnastyka / Akrobatyka sportowa / Parkour",
    items: [
      { name: "1 raz w tygodniu", price: "240 zł" },
      { name: "2 razy w tygodniu", price: "400 zł" },
      { name: "3 i więcej razy w tygodniu", price: "500 zł" },
    ],
  },
  {
    id: "kickboxing-box",
    title: "Kickboxing / Boks",
    items: [
      { name: "1 raz w tygodniu", price: "200 zł" },
      { name: "2 razy i więcej w tygodniu", price: "280 zł" },
    ],
  },
  {
    id: "aerial-hoop",
    title: "Aerial Hoop (Koła)",
    items: [
      { name: "Zajęcia indywidualne", price: "170 zł / 1 osoba" },
      { name: "Zajęcia 2-osobowe", price: "280 zł", note: "(140 zł od osoby)" },
      { name: "Zajęcia 3-osobowe", price: "360 zł", note: "(120 zł od osoby)" },
      { name: "Zajęcia 4-osobowe", price: "400 zł", note: "(100 zł od osoby)" },
    ],
  },
  {
    id: "aerial-silks",
    title: "Aerial Silks (Szarfy)",
    items: [
      { name: "1 raz w tygodniu", price: "280 zł" },
      { name: "2 razy w tygodniu", price: "500 zł" },
    ],
  },
  {
    id: "karate",
    title: "Karate",
    items: [
      { name: "1 raz w tygodniu", price: "200 zł" },
      { name: "2 razy w tygodniu", price: "275 zł" },
    ],
  },
];

export default function HelpPage() {
  return (
    <section className="PriceList">
      {/* HERO like on "Grafik" */}
      <div className="page-hero">
        <h1 className="page-hero-title">Cennik</h1>
      </div>

      <div className="price-container">
        <p className="price-sub">
          Ceny zgodne z aktualnym cennikiem klubu na sezon 2025/2026.
        </p>

        <div className="price-list" role="list">
          {SECTIONS.map((section) => (
            <article key={section.id} className="price-card" role="listitem">
              <h3 className="card-title">{section.title}</h3>
              <ul className="card-lines">
                {section.items.map((row, i) => (
                  <li key={i} className="price-row">
                    <span className="row-name">{row.name}</span>
                    <span className="row-price">{row.price}</span>
                    {row.note && <span className="row-note">{row.note}</span>}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <article className="price-card highlight" role="listitem">
            <h3 className="card-title">Trening indywidualny</h3>
            <div className="price-row solo">
              <span className="row-name">Jednorazowo</span>
              <span className="row-price">170 zł / zajęcia</span>
            </div>
            <div className="banner">
              <strong>Zniżka dla rodzeństwa</strong> – 10%
            </div>
          </article>
        </div>

        <footer className="price-note">
          <p className="note-strong">
            Siłownia gratis dla rodzica/opiekuna w trakcie trwania zajęć dziecka
            oraz dla klubowiczów powyżej 16 r.ż trenujących minimum 2 razy w
            tygodniu.
          </p>
        </footer>
      </div>
    </section>
  );
}
