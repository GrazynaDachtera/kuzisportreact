"use client";

import React from "react";
import "./Benefits.scss";

interface Benefit {
  title: string;
  body: string;
}

const BENEFITS: Benefit[] = [
  {
    title: "Bezpieczeństwo i Komfort",
    body: "Nasza sala jest w pełni przystosowana do organizacji dziecięcych wydarzeń. Dbamy o bezpieczeństwo najmłodszych, oferując przestronne i bezpieczne otoczenie do zabawy.",
  },
  {
    title: "Aktywność w Centrum Urodzin",
    body: "Zajęcia sportowe to doskonały sposób na aktywne spędzenie czasu. Oferujemy różnorodne formy ruchu, takie jak piłka nożna, koszykówka czy zabawy z chustą animacyjną. Niezależnie od zainteresowań, każda pociecha znajdzie coś dla siebie!",
  },
  {
    title: "Indywidualne Podejście",
    body: "Organizacja urodzin w Kuzi Sport opiera się na Twoich potrzebach i preferencjach. Współpracujemy z rodzicami, aby stworzyć niezapomniane przyjęcie dostosowane do gustu i wieku dziecka.",
  },
  {
    title: "Profesjonalna Obsługa",
    body: "Nasz wykwalifikowany zespół zadba o każdy detal. Możesz liczyć na wsparcie w organizacji poczęstunku oraz dekoracji, aby przyjęcie było jeszcze bardziej wyjątkowe.",
  },
  {
    title: "Elastyczne Pakiety Urodzinowe",
    body: "Oferujemy różne pakiety urodzinowe, które obejmują atrakcje oraz opcje dodatkowe, takie jak malowanie twarzy czy tatuaże z bohaterami. Z łatwością dopasujesz ofertę do swoich potrzeb i budżetu.",
  },
];

const Benefits: React.FC = () => (
  <section className="benefits">
    <div className="benefits__cloud">
      <h2 className="benefits__title">Dlaczego Kuzi Sport?</h2>
    </div>
    <div className="benefits__inner">
      {BENEFITS.map(({ title, body }) => (
        <article className="benefits__card" key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Benefits;
