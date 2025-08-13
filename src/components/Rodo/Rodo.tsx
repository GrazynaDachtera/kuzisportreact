"use client";

import "./Rodo.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function RodoPage() {
  return (
    <main className="rodo-wrapper">
      <h1 className="rodo-title">RODO</h1>

      <section className="rodo-content">
        <h2 className="rodo-subtitle">RODO Sąsiedzki Łazarz</h2>

        <ol className="rodo-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
