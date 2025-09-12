"use client";

import "./Kickboxing.scss";

export default function KickboxingPage() {
  return (
    <main className="Kickboxing">
      <section className="Kickboxing-wrapper">
        <div className="Kickboxing-container">
          <div className="Kickboxing-content">
            <h1 className="Kickboxing-hero">Kickboxing</h1>

            <h2 className="Kickboxing-title">Kickboxing:</h2>
            <ul className="Kickboxing-list">
              <li>K1</li>
              <li>Full contact</li>
              <li>Muay Thai</li>
            </ul>

            <p className="Kickboxing-paragraph">
              Kickboxing jako esencja sportów uderzanych i kopanych, w
              zależności od wieku ćwiczącego i potrzeb odkrywa różne oblicza- od
              form lekkich jak kick light po pełnokontaktowe formuły ringowe. W
              naszym klubie skupiamy się na formułach ringowych i pod tym kątem
              prowadzimy szkolenie. Jednocześnie jesteśmy członkami PZKB i
              bierzemy udział w rywalizacji sportowej w skali kraju, trenując
              pod okiem licencjonowanych trenerów i instruktorów.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
