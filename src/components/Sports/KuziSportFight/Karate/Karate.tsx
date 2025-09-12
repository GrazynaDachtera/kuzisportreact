"use client";

import "./Karate.scss";

export default function KaratePage() {
  return (
    <main className="Karate">
      <section className="Karate-wrapper">
        <div className="Karate-container">
          <div className="Karate-content">
            <h1 className="Karate-hero">Karate</h1>

            <h2 className="Karate-title">Karate Shotokan</h2>
            <p className="Karate-paragraph">
              To japońska sztuka walki. Adepci uczą się technik pogrupowanych w
              następujące kategorie:
            </p>
            <ul className="Karate-list">
              <li>Dachi-waza (pozycje)</li>
              <li>Tsuki-waza (ciosy)</li>
              <li>Uchi-waza (uderzenia)</li>
              <li>Keri-waza (kopnięcia)</li>
              <li>Uke-waza (bloki)</li>
              <li>Nage-waza (rzuty)</li>
              <li>Kansetsu-waza (dźwignie)</li>
            </ul>

            <h3 className="Karate-subtitle">
              Treningi realizuje się na 3 płaszczyznach:
            </h3>
            <ul className="Karate-list">
              <li>kihon (ćwiczenie podstaw, pokaz technik karate)</li>
              <li>
                kata (układ ruchów, ćwiczenie formalne, walka z wyobrażonymi
                przeciwnikami)
              </li>
              <li>
                kumite (sparing, dosłownie spotkanie rąk, walka ze „złośliwym”
                celem)
              </li>
            </ul>

            <p className="Karate-paragraph">
              Karate shotokan jest nośnikiem japońskiej tradycji, skupia się na
              samodoskonaleniu, a proces treningowy prowadzi do poprawy
              samodyscypliny, koncentracji i sprawności psychomotorycznych.
            </p>
            <p className="Karate-paragraph">
              Karate shotokan trenujemy w dojo w kimonach treningowych karate
              gi, przewiązanych pasem obi.
            </p>
            <p className="Karate-paragraph">
              Kolor pasa daje nam informacje o stopniu zaawansowania karateki,
              który weryfikują kolejne egzaminy na stopnie uczniowskie kyu oraz
              mistrzowskie dan.
            </p>
            <p className="Karate-paragraph">
              Klub Sportów Walki Kuzi Sport posiada w swoich szeregach trenerów
              i zawodników którzy osiągnęli stopień mistrzowski i kontynuują
              swój rozwój w tej dyscyplinie.
            </p>

            <h2 className="Karate-title">Karate WKF</h2>
            <p className="Karate-paragraph">
              WKF (World Karate Federation) to największa organizacja karate na
              świecie. W swoich strukturach skupia związki krajowe z ponad 200
              państw. Jej członkami są praktycy głównych nurtów karate, których
              manifestacją sportową jest formuła light contactowej walki na
              punkty, uznana przez MKOL i włączona w poczet dyscyplin
              olimpijskich.
            </p>
            <p className="Karate-paragraph">
              Treningi odbywają się z podziałem na 4 grupy wiekowe: 4–6 lat, 7–9
              lat, 10–13 (dzieci starsze i młodzicy), 14–15 lat i 16–17 (kadeci
              i juniorzy) oraz U21 i seniorzy.
            </p>
            <p className="Karate-paragraph">
              Grupy treningowe kadetów juniorów i seniorów trenują z
              nastawieniem wyczynowym w systemie półprofesjonalnym. Treningi są
              prowadzone codziennie z wyłączeniem niedzieli w grupach oraz
              indywidualnie. Dodatkowo są objęte fachową opieką.
            </p>

            <h3 className="Karate-subtitle">Nasza kadra</h3>
            <ul className="Karate-list">
              <li>
                Maciej Drążewski – Trener kumite, organizator wyjazdów klubowych
              </li>
              <li>Mikołaj Osuszkiewicz – Trener kata, dietetyk</li>
              <li>Fatih Kagan Emre – Trener wspomagający kata i kumite</li>
              <li>
                Hubert Kaczmarek – Trener wprowadzający do grup zawodniczych,
                trener sekcji dziecięcych
              </li>
              <li>Łukasz Kuzemko – Założyciel i koordynator sekcji</li>
              <li>
                Bartosz Kuzemko – Współtwórca klubu, trener przygotowania
                motorycznego
              </li>
              <li>
                Jakub Pietrucha – Trener sekcji dziecięcych, trener asystujący
              </li>
            </ul>

            <h3 className="Karate-subtitle">Kadra wspierająca</h3>
            <ul className="Karate-list">
              <li>Wiktor „Idź do fizjo” Sobociński – terapia manualna</li>
              <li>Bartosz Kuzemko – motoryka dla klubowiczów</li>
              <li>
                Michał Jędrzejczyk (All Star Athletics) – przygotowanie
                motoryczne kadry klubu
              </li>
              <li>
                Jakub Ostrowski (Olimbic) – psycholog, wspomaganie rozwoju
                trenera metodą i7w
              </li>
              <li>Jagoda Gręźlikowska – psycholog sportowy klubu</li>
              <li>Robert Łaziński – psycholog wspierający</li>
            </ul>

            <h2 className="Karate-title">FAQ</h2>
            <ol className="Karate-faq">
              <li>
                <h3 className="Karate-question">
                  1. Dlaczego oni tak krzyczą?
                </h3>
                <p className="Karate-paragraph">
                  Ponieważ okrzyk jest tradycyjnym elementem w tym sporcie,
                  jednocześnie jest jednym z 6 kryteriów niezbędnych do
                  przyznania punktu.
                </p>
              </li>
              <li>
                <h3 className="Karate-question">
                  2. Czy oni się tam naprawdę biją?
                </h3>
                <p className="Karate-paragraph">
                  I tak, i nie. Tak, ponieważ walka jest toczona na najwyższych
                  obrotach, akcenty położone są na jak największą prędkość i
                  przyspieszenie ciosów przy jednoczesnym zachowaniu kontroli.
                  Nie, ponieważ nie jest to walka full-contactowa. Tu
                  dopuszczając się KO na przeciwniku, można pojedynek przegrać z
                  uwagi na nadmierny kontakt podlegający karze.
                </p>
              </li>
              <li>
                <h3 className="Karate-question">
                  3. W jaki sprzęt trzeba się wyposażyć?
                </h3>
                <p className="Karate-paragraph">
                  Kimono i komplet ochraniaczy. Aktywni zawodnicy potrzebują dwa
                  kimona i dwa komplety ochraniaczy.
                </p>
              </li>
              <li>
                <h3 className="Karate-question">
                  4. Ile treningów w tygodniu wystarcza do sukcesu?
                </h3>
                <p className="Karate-paragraph">
                  2–3 razy w tygodniu wystarczy na zawody lokalne. Mistrzostwa
                  Polski wymagają treningu wyczynowego 1× dziennie, a ambicje
                  międzynarodowe – dwóch jednostek dziennie (semi-pro). Światowa
                  czołówka trenuje 2× dziennie plus treningi
                  ogólne/uzupełniające oraz opiekę specjalistów.
                </p>
              </li>
              <li>
                <h3 className="Karate-question">
                  5. Po jakim czasie zdobędę czarny pas?
                </h3>
                <p className="Karate-paragraph">
                  Zwykle około 9 lat regularnych treningów i egzaminów, przy
                  założeniu, że do egzaminu na 1 dan podchodzimy w wieku 18 lat.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
