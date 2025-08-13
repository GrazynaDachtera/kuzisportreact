"use client";

import "./NewsPage.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function NewsPage() {
  return (
    <main className="newsPage-wrapper">
      <h1 className="newsPage-title">Aktualności</h1>

      <section className="newsPage-content">
        <h2 className="newsPage-subtitle">Aktualności</h2>

        <ol className="newsPage-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
