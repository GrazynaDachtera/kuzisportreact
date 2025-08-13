"use client";

import "./AboutFoundation.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function AboutFoundationPage() {
  return (
    <main className="aboutfoundation-wrapper">
      <h1 className="aboutfoundation-title">O nas</h1>

      <section className="aboutfoundation-content">
        <h2 className="aboutfoundation-subtitle">O nas</h2>

        <ol className="aboutfoundation-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
