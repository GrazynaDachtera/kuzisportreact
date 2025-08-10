"use client";

import React from "react";
import "./Benefits.scss";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

interface Benefit {
  title: string;
  body: string;
  side: "left" | "right";
}

const BENEFITS: Benefit[] = [
  {
    title: "Bezpieczeństwo i Komfort",
    body: "Nasza sala jest w pełni przystosowana do organizacji dziecięcych wydarzeń. Dbamy o bezpieczeństwo najmłodszych, oferując przestronne i bezpieczne otoczenie do zabawy.",
    side: "left",
  },
  {
    title: "Aktywność w Centrum Urodzin",
    body: "Zajęcia sportowe to doskonały sposób na aktywne spędzenie czasu. Oferujemy różnorodne formy ruchu, takie jak piłka nożna, koszykówka czy zabawy z chustą animacyjną. Niezależnie od zainteresowań, każda pociecha znajdzie coś dla siebie!",
    side: "right",
  },
  {
    title: "Indywidualne Podejście",
    body: "Organizacja urodzin w Kuzi Sport opiera się na Twoich potrzebach i preferencjach. Współpracujemy z rodzicami, aby stworzyć niezapomniane przyjęcie dostosowane do gustu i wieku dziecka.",
    side: "left",
  },
  {
    title: "Profesjonalna Obsługa",
    body: "Nasz wykwalifikowany zespół zadba o każdy detal. Możesz liczyć na wsparcie w organizacji poczęstunku oraz dekoracji, aby przyjęcie było jeszcze bardziej wyjątkowe.",
    side: "right",
  },
  {
    title: "Elastyczne Pakiety Urodzinowe",
    body: "Oferujemy różne pakiety urodzinowe, które obejmują atrakcje oraz opcje dodatkowe, takie jak malowanie twarzy czy tatuaże z bohaterami. Z łatwością dopasujesz ofertę do swoich potrzeb i budżetu.",
    side: "left",
  },
];

const Benefits: React.FC = () => {
  const left = BENEFITS.filter((b) => b.side === "left");
  const right = BENEFITS.filter((b) => b.side === "right");

  return (
    <section className="benefits">
      <div className="benefits__cloud">
        <h2 className="benefits__title">Dlaczego Kuzi Sport?</h2>
      </div>

      <div className="benefits__inner">
        <div
          className="benefits__col benefits__col--left"
          style={{ "--col-offset": "1.2rem" } as CSSVars}
        >
          {left.map(({ title, body }) => (
            <article key={title} className="benefits__card">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>

        <div className="benefits__center" aria-hidden />

        <div
          className="benefits__col benefits__col--right"
          style={{ "--col-offset": "0rem" } as CSSVars}
        >
          {right.map(({ title, body }) => (
            <article key={title} className="benefits__card">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
