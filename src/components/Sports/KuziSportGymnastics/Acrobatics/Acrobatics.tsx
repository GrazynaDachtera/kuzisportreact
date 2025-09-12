"use client";

import "./Acrobatics.scss";

export default function AcrobaticsPage() {
  return (
    <main className="Acrobatics">
      <section className="Acrobatics-wrapper">
        <div className="Acrobatics-container">
          <div className="Acrobatics-content">
            <h1 className="Acrobatics-hero">Akrobatyka sportowa</h1>

            <h2 className="Acrobatics-title">Akrobatyka cyrkowa</h2>
            <p className="Acrobatics-paragraph">
              Jako wartość dodaną, w ramach urozmaicenia zajęć, lub dla
              zainteresowanych jednostek wprowadzamy ćwiczenia na sprzęcie
              cyrkowym, między innymi
            </p>
            <ul className="Acrobatics-list">
              <li>Cyr wheel</li>
              <li>Żonglerka</li>
              <li>Akro Staff</li>
              <li>Slackline</li>
              <li>Teeterboard</li>
              <li>Monocykl</li>
              <li>Power boots</li>
            </ul>

            <h2 className="Acrobatics-title">
              Akrobatyka sportowa – skoki na ścieżce
            </h2>
            <p className="Acrobatics-paragraph">
              Akrobatyka jest dyscypliną gimnastyki, w której ćwiczący wykonuje
              układy na różnych powierzchniach. W naszej sekcji trenujemy skoki
              na ścieżce i Double Mini Tramp (DMT).
            </p>
            <p className="Acrobatics-paragraph">
              Posiadamy 12m Fast track, 24m Airtrack oraz rolowane podłogi
              gimnastyczne.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
