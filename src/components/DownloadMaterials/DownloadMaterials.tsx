"use client";

import "./DownloadMaterials.scss";

const MATERIALS = [
  {
    text: "Regulamin Stowarzyszenia Sąsiedzki Łazarz (w wersji pdf)",
    link: "https://docs.google.com/document/d/1OIt_AYtKd3LnODBRBZQG5xnQHdxFMHti/edit",
  },
  {
    text: "Logotyp Stowarzyszenia Sąsiedzki Łazarz w wersji pdf",
    link: "/path/to/logotyp.pdf",
  },
  {
    text: "Logotyp Stowarzyszenia Sąsiedzki Łazarz w wersji jpg",
    link: "/Downloads/logo.png",
  },
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
          {MATERIALS.map((item) => (
            <li key={item.text}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
