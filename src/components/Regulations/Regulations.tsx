"use client";

import "./Regulations.scss";

const RULES = [
  "W strefach treningowych mogą znajdować się tylko i wyłącznie osoby trenujące na podstawie niniejszej umowy",
  "W obrębie stref treningowych nie mogą przebywać rodzice oraz osoby postronne, niezaangażowane w trening",
  "Trenujący przybywają na strefę nie później niż 5 minut przed rozpoczęciem treningu i są wprowadzani na salę przez trenera prowadzącego zajęcia",
  "Po zakończeniu treningu udajemy się do szatni",
  "Jeśli klubowicz chce zostać na sali po odbytym treningu, powinien udać się na antresolę",
  "Właściciel obiektu nie odpowiada za rzeczy pozostawione w szatni",
  "Na strefę treningową przychodzimy:",
  "– w stroju właściwym dyscyplinie, z wodą (najlepiej w bidonie – unikamy mnożenia odpadów z tworzyw sztucznych)",
  "– na boso, w baletkach lub skarpetkach antypoślizgowych (w przypadku akrobatyki)",
  "Po wejściu na strefę treningową siadamy we wskazanym dla grupy oczekującej miejscu (ławka lub wydzielona strefa)",
  "Przy każdej strefie treningowej znajduje się trójdzielny pojemnik, w którym pozostawiamy: zdjęte skarpetki, wodę mineralną i kosztowności (telefony, portfele, klucze, biżuterię)",
  "Zarówno w ramach treningu, jak i podczas przebywania na antresoli należy zachować spokój i kulturę, niezakłócające przebiegu treningu",
  "Zabrania się przebywania na siłowni osób poniżej 16 roku życia; młodsi mogą tam przebywać wyłącznie, gdy wymaga tego przebieg zajęć prowadzonych pod okiem wykwalifikowanego trenera",
  "Zabrania się samodzielnego emitowania muzyki lub zakłócania spokoju obiektu",
  "Zabrania się spożywania jedzenia w strefach treningowych",
  "Na terenie całego obiektu obowiązuje zakaz palenia papierosów, wyrobów nikotynowych i spożywania alkoholu",
  "Zabrania się wprowadzania zwierząt na salę",
  "Uprasza się o przestrzeganie kultury języka i wypowiadanie się z szacunkiem do współćwiczących",
  "Na terenie obiektu przy ul. Św. Michała 50‑56 obowiązuje ograniczenie prędkości do 5 km/h niezależnie od środka transportu",
];

export default function Regulations() {
  return (
    <main className="regulations-wrapper">
      <h1 className="regulations-title">Regulamin</h1>

      <section className="regulations-content">
        <h2 className="regulations-subtitle">
          Regulamin dotyczący uczestnictwa w treningach na sali Kuzi Sport
        </h2>

        <ol className="regulations-list">
          {RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
