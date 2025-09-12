"use client";

import "./Parkour.scss";

export default function ParkourPage() {
  return (
    <main className="Parkour">
      <section className="Parkour-wrapper">
        <div className="Parkour-container">
          <div className="Parkour-content">
            <h1 className="Parkour-hero">Parkour</h1>

            <h2 className="Parkour-title">Parkour</h2>
            <p className="Parkour-paragraph">
              Forma gimnastyki ulicznej polegająca na akrobatycznym pokonywaniu
              przeszkód. Charakteryzuje się dużą swobodą ruchu, zarówno w
              wykonywaniu ćwiczeń, jak i nauczaniu elementów.
            </p>
            <p className="Parkour-paragraph">
              Treningi prowadzą licencjonowani instruktorzy parkour i
              freeruningu.
            </p>
            <p className="Parkour-paragraph">
              Zajęcia okresowo prowadzone w terenie.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
