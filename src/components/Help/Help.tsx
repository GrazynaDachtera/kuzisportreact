"use client";

import "./Help.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function HelpPage() {
  return (
    <main className="help-wrapper">
      <h1 className="help-title">Ty też możesz pomóc</h1>

      <section className="help-content">
        <h2 className="help-subtitle">Ty też możesz pomóc</h2>

        <ol className="help-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
