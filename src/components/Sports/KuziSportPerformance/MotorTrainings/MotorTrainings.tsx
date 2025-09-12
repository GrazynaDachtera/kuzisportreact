"use client";

import "./MotorTrainings.scss";

export default function MotorTrainingsPage() {
  return (
    <main className="MotorTrainings">
      <section className="MotorTrainings-wrapper">
        <div className="MotorTrainings-container">
          <div className="MotorTrainings-content">
            <h1 className="MotorTrainings-hero">Treningi motoryczne</h1>

            <h2 className="MotorTrainings-title">Ogólnorozwojowe</h2>
            <p className="MotorTrainings-paragraph">
              Nastawione na eliminowanie dysproporcji funkcjonalnych różnych
              części ciała, zwiększające koordynacje, adaptacyjność i
              polepszające cechy wolicjonalne trenującego.
            </p>

            <h2 className="MotorTrainings-title">Terapeutyczne</h2>
            <p className="MotorTrainings-paragraph">
              Wspierające powrót do zdrowia po urazach lub działające
              profilaktycznie
            </p>

            <h2 className="MotorTrainings-title">Progresywne</h2>
            <p className="MotorTrainings-paragraph">
              Zakładają mierzalny postęp w obrębie rozwijanych cech. Treningi
              motoryczne o charakterze progresywnym prowadzone są w ramach grup
              wyczynowych jako element cyklu w periodyzacji roku treningowego
              sportowców wyczynowych oraz w ramach niezależnych jednostek
              treningowych dla osób chcących wydatnie zwiększyć swoje wyniki w
              obrębie cech i metacech motorycznych
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
