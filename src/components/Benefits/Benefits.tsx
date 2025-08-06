"use client";

import React from "react";
import "./Benefits.scss";

export default function Benefits() {
  return (
    <section className="benefits">
      {/* Decorative cloud heading */}
      <div className="benefits__cloud">
        <h2 className="benefits__title">Dlaczego Kuzi Sport?</h2>
      </div>

      {/* Grid with cards */}
      <div className="benefits__inner">
        <article className="benefits__card card--1">
          <h3>Bezpieczeństwo i&nbsp;Komfort</h3>
          <p>
            Nasza sala jest w&nbsp;pełni przystosowana do organizacji
            dziecięcych wydarzeń. Dbamy o&nbsp;bezpieczeństwo najmłodszych,
            oferując przestronne i&nbsp;bezpieczne otoczenie do zabawy.
          </p>
        </article>

        <article className="benefits__card card--2">
          <h3>Aktywność w&nbsp;Centrum Urodzin</h3>
          <p>
            Zajęcia sportowe to doskonały sposób na aktywne spędzenie czasu.
            Oferujemy różnorodne formy ruchu, takie jak piłka nożna, koszykówka,
            czy zabawy z&nbsp;chustą animacyjną. Niezależnie od zainteresowań,
            każda pociecha znajdzie coś dla siebie!
          </p>
        </article>

        <article className="benefits__card card--3">
          <h3>Indywidualne Podejście</h3>
          <p>
            Organizacja urodzin w&nbsp;Kuzi Sport opiera się na Twoich
            potrzebach i&nbsp;preferencjach. Współpracujemy z&nbsp;rodzicami,
            aby stworzyć niezapomniane przyjęcie dostosowane do gustu
            i&nbsp;wieku dziecka.
          </p>
        </article>

        <article className="benefits__card card--4">
          <h3>Profesjonalna Obsługa</h3>
          <p>
            Nasz wykwalifikowany zespół zadba o&nbsp;każdy detal. Możesz liczyć
            na wsparcie w&nbsp;organizacji poczęstunku oraz dekoracji, aby
            przyjęcie było jeszcze bardziej wyjątkowe.
          </p>
        </article>

        <article className="benefits__card card--5">
          <h3>Elastyczne Pakiety Urodzinowe</h3>
          <p>
            Oferujemy różne pakiety urodzinowe, które obejmują różnorodne
            atrakcje oraz opcje dodatkowe, takie jak malowanie twarzy, tatuaże z
            wybranymi bohaterami. Z&nbsp;łatwością dopasujesz ofertę do swoich
            potrzeb i&nbsp;budżetu.
          </p>
        </article>
      </div>
    </section>
  );
}
