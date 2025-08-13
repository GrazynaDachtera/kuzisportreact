"use client";

import "./AccDeclaration.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function AccDeclarationPage() {
  return (
    <main className="accDeclaration-wrapper">
      <h1 className="accDeclaration-title">Deklaracja dostępności</h1>

      <section className="accDeclaration-content">
        <h2 className="accDeclaration-subtitle">
          Deklaracja dostępności Sąsiedzki Łazarz
        </h2>

        <ol className="accDeclaration-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
