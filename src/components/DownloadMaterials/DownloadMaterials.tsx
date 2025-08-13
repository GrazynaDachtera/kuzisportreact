"use client";

import "./DownloadMaterials.scss";

const RULES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

export default function DownloadMaterialsPage() {
  return (
    <main className="downloadMaterials-wrapper">
      <h1 className="downloadMaterials-title">Materiały do pobrania</h1>

      <section className="downloadMaterials-content">
        <h2 className="downloadMaterials-subtitle">
          Materiały do pobrania Sąsiedzki Łazarz
        </h2>

        <ol className="downloadMaterials-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
