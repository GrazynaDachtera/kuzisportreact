"use client";

import "./Abc.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function AbcPage() {
  return (
    <main className="abc-wrapper">
      <h1 className="abc-title">Osiedlowe ABC</h1>

      <section className="abc-content">
        <h2 className="abc-subtitle">Osiedlowe ABC</h2>

        <ol className="abc-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
