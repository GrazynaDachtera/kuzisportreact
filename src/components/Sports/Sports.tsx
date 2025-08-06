"use client";

import React from "react";
import Image from "next/image";
import "./Sports.scss";

// Updated ArrowIcon component
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5" // Increased strokeWidth for a bolder look
    strokeLinecap="round"
    strokeLinejoin="round"
    className="arrow-icon"
  >
    {/* This single path creates the new arrow shape */}
    <path d="M7 7h10v10" />
  </svg>
);

export default function Sports() {
  const features = [
    {
      title: "Gimnastyka Sportowa Kobiet",
      description:
        "To dynamiczna i elegancka dyscyplina, która rozwija siłę, gibkość oraz koordynację. Nasze treningi są dostosowane do różnych poziomów zaawansowania, co pozwala każdemu uczestnikowi na osiąganie własnych celów.",
    },
    {
      title: "Akrobatyka Sportowa",
      description:
        "W naszym klubie zajmujemy się skokami na ścieżce, trampolinie oraz podwójnej mini trampolinie. Ta ekscytująca dyscyplina uczy nie tylko akrobatycznych umiejętności, ale również rozwija pewność siebie oraz zdolność do pracy w zespole.",
    },
    {
      title: "Karate i Kickboxing",
      description:
        "Te sztuki walki to doskonała okazja do poprawy kondycji fizycznej, nauki technik obronnych oraz budowania dyscypliny. Nasze zajęcia prowadzone są przez doświadczonych instruktorów, którzy pomagają uczestnikom w osiąganiu ich sportowych celów.",
    },
    {
      title: "Parkour",
      description:
        "Parkour to styl życia, który rozwija umiejętność pokonywania przeszkód w otoczeniu miejskim. Nasze treningi uczą nie tylko technik skakania i lądowania, ale również kreatywności w ruchu oraz orientacji w przestrzeni.",
    },
    {
      title: "Street Workout i Kalistenika",
      description:
        "Te formy treningu opierają się na wykorzystaniu masy ciała do budowy siły i wytrzymałości. Jest to świetny sposób na poprawę kondycji, a przy tym zabawa i możliwość nauki różnych stylów ćwiczeń.",
    },
    {
      title: "Aerial Silks i Aerial Hoops",
      description:
        "Nasze zajęcia z aerial silks i aerial hoops łączą akrobatykę z tańcem, co pozwala na rozwijanie umiejętności robiących wrażenie na widowni. To doskonały sposób na budowanie siły i elastyczności, a także artystycznego wyrazu.",
    },
    {
      title: "Trening Motoryczny i Personalny",
      description:
        "Nasze programy treningowe dostosowane są do indywidualnych potrzeb uczestników. Oferujemy zarówno trening motoryczny, który koncentruje się na poprawie wydolności, jak i trening personalny, który pozwala na osiągnięcie konkretnych celów. Zapraszamy do naszego klubu, gdzie pasja do sportu spotyka się z profesjonalizmem! Bez względu na to, czy jesteś początkującym, czy zaawansowanym sportowcem, z pewnością znajdziesz u nas coś dla siebie. Dołącz do nas i odkryj, jaką radość daje aktywność fizyczna!",
    },
    {
      title: "Organizacja Zajęć WF w Sali Sportowej Kuzi Sport",
      description:
        "Zapraszamy do skorzystania z naszej wyjątkowej oferty organizacji zajęć wychowania fizycznego w sali sportowej Kuzi Sport! Nasza przestronna i nowoczesna sala sportowa to idealne miejsce na prowadzenie różnorodnych zajęć, które rozwijają sprawność fizyczną, koordynację oraz umiejętności interpersonalne uczniów.",
    },
    {
      title: "Zajęcia na Matach",
      description:
        "Oferujemy szeroki wachlarz zajęć na matach, które można dostosować do różnych grup wiekowych i poziomów zaawansowania. Nasze sesje obejmują ćwiczenia z zakresu gimnastyki, akrobatyki, yoga oraz fitness. Praca na matach pozwala na doskonalenie techniki ruchu, zwiększenie elastyczności oraz poprawę kondycji fizycznej w przyjemnej i bezpiecznej atmosferze.",
    },
    {
      title: "Zajęcia ze Sprzętem",
      description:
        "Nasza sala sportowa jest w pełni wyposażona w nowoczesny sprzęt, który umożliwia różnorodne formy aktywności fizycznej. Oferujemy zajęcia z wykorzystaniem piłek, hantli, stepów i innych akcesoriów treningowych, które sprawią, że każde spotkanie będzie dynamiczne i inspirujące. Dzięki użyciu sprzętu, uczestnicy mogą rozwijać swoje umiejętności, a jednocześnie cieszyć się różnorodnością ćwiczeń.",
    },
  ];

  return (
    <section className="Sports">
      <div className="sports-top-wrapper">
        <div className="sports-container">
          <div className="sports-top">
            <div className="sports-content">
              <h2 className="sports-title">
                Nasze Dyscypliny Sportowe w Klubie
              </h2>
              <p className="sports-description">
                Witamy na stronie naszego klubu, gdzie pasja do sportu spotyka
                się z profesjonalizmem oraz wspaniałą atmosferą. Oferujemy
                szeroki wachlarz dyscyplin sportowych, które pozwalają na
                rozwijanie umiejętności, poprawę kondycji oraz zdobycie nowych
                doświadczeń. Poniżej przedstawiamy szczegóły dotyczące naszych
                głównych dyscyplin:
              </p>
              <button className="sports-button">Sprawdź</button>
            </div>
            <div className="sports-image-wrapper">
              <Image
                src="/Sports/karate.png"
                alt="karate"
                width={600}
                height={400}
                className="sports__badge"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sports-grid-wrapper">
        <div className="sports-container">
          <div className="sports-grid">
            {features.map((feature, index) => (
              <div className="grid-item" key={index}>
                <div className="grid-item-icon-wrapper">
                  <ArrowIcon />
                </div>
                <div className="grid-item-text">
                  <h3 className="grid-item-title">{feature.title}</h3>
                  <p className="grid-item-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
