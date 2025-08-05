"use client";

import "./Regulations.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function Regulations() {
  return (
    <main className="regulations-wrapper">
      <h1 className="regulations-title">Regulamin</h1>

      <section className="regulations-content">
        <h2 className="regulations-subtitle">Regulamin Sąsiedzki Łazarz</h2>

        <ol className="regulations-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
