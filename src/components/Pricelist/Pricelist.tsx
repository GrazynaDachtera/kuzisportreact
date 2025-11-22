"use client";

import "./Pricelist.scss";
import React, { useMemo, useState, useId } from "react";

type PriceRow = { name: string; price: string; note?: string };

type Category = "Gimnastyka i parkour" | "Sporty walki" | "Aerial" | "Karate";
type CategoryFilter = "Wszystkie" | Category;

type PriceSection = {
  id: string;
  title: string;
  items: PriceRow[];
  siblingDiscount?: boolean;
  siblingDiscountScope?: string;
  category: Category;
};

const SECTIONS: PriceSection[] = [
  {
    id: "gym-acro-parkour",
    title: "Gimnastyka / Akrobatyka sportowa / Parkour",
    siblingDiscount: true,
    siblingDiscountScope: "gimnastyki",
    category: "Gimnastyka i parkour",
    items: [
      { name: "1 raz w tygodniu", price: "240 zł" },
      { name: "2 razy w tygodniu", price: "400 zł" },
      { name: "3 i więcej razy w tygodniu", price: "500 zł" },
    ],
  },
  {
    id: "kickboxing-box",
    title: "Kickboxing / Boks",
    siblingDiscount: true,
    category: "Sporty walki",
    items: [
      { name: "1 raz w tygodniu", price: "200 zł" },
      { name: "2 razy i więcej w tygodniu", price: "280 zł" },
    ],
  },
  {
    id: "aerial-hoop",
    title: "Aerial Hoop (Koła)",
    category: "Aerial",
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
    siblingDiscount: true,
    category: "Aerial",
    items: [
      { name: "1 raz w tygodniu", price: "280 zł" },
      { name: "2 razy w tygodniu", price: "500 zł" },
    ],
  },
  {
    id: "karate",
    title: "Karate",
    category: "Karate",
    items: [
      { name: "1 raz w tygodniu", price: "200 zł" },
      { name: "2 razy w tygodniu", price: "275 zł" },
    ],
  },
];

export default function HelpPage() {
  const [cat, setCat] = useState<CategoryFilter>("Wszystkie");
  const [query] = useState("");
  const [onlySiblingDiscount, setOnlySiblingDiscount] = useState(false);

  const selectId = useId();
  const toggleId = useId();

  const categories = useMemo<CategoryFilter[]>(() => {
    const set = new Set<Category>();
    SECTIONS.forEach((s) => set.add(s.category));
    return ["Wszystkie", ...Array.from(set)];
  }, []);

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();

    return SECTIONS.filter((section) => {
      if (cat !== "Wszystkie" && section.category !== cat) return false;
      if (onlySiblingDiscount && !section.siblingDiscount) return false;

      if (!q) return true;

      const text = [
        section.title,
        section.siblingDiscountScope,
        ...section.items.map((i) => i.name),
        ...section.items.map((i) => i.price),
        ...section.items.map((i) => i.note ?? ""),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(q);
    });
  }, [cat, query, onlySiblingDiscount]);

  const hasResults = filteredSections.length > 0;

  return (
    <section className="PriceList" aria-labelledby="pricelist-heading">
      <div className="price-container">
        <header className="price-header">
          <h2 id="pricelist-heading" className="price-title">
            Cennik zajęć 2025/2026
          </h2>

          <div className="price-filters" aria-label="Filtry cennika">
            <label className="price-filter" htmlFor={selectId}>
              <span className="filter-label">Rodzaj zajęć:</span>
              <select
                id={selectId}
                className="filter-input"
                value={cat}
                onChange={(e) => setCat(e.target.value as CategoryFilter)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="price-filter" htmlFor={toggleId}>
              <span className="filter-label">Zniżka:</span>
              <div className="price-toggle">
                <input
                  id={toggleId}
                  type="checkbox"
                  className="toggle-input"
                  checked={onlySiblingDiscount}
                  onChange={(e) => setOnlySiblingDiscount(e.target.checked)}
                />
                <span className="toggle-label">
                  Tylko ze zniżką dla rodzeństwa
                </span>
              </div>
            </label>
          </div>
        </header>

        <div className="price-list" role="list">
          {!hasResults && (
            <p className="price-empty">
              Brak pozycji dla wybranych filtrów. Zmień kryteria wyszukiwania.
            </p>
          )}

          {filteredSections.map((section) => (
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

              {section.siblingDiscount && (
                <div className="banner">
                  <strong>Zniżka dla rodzeństwa</strong> – 10%
                  {section.siblingDiscountScope && (
                    <span className="banner-scope">
                      {" "}
                      (dotyczy tylko {section.siblingDiscountScope})
                    </span>
                  )}
                </div>
              )}
            </article>
          ))}

          {!onlySiblingDiscount && (
            <article className="price-card highlight" role="listitem">
              <h3 className="card-title">Trening indywidualny</h3>
              <div className="price-row solo">
                <span className="row-name">Jednorazowo</span>
                <span className="row-price">170 zł / zajęcia</span>
              </div>
            </article>
          )}
        </div>

        <footer className="price-note">
          <p className="price-sub">
            Ceny zgodne z aktualnym cennikiem klubu na sezon 2025/2026.
          </p>
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
