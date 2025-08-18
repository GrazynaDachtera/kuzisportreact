"use client";

import "./AccDeclaration.scss";
import React from "react";

type Section = {
  roman: string;
  title: React.ReactNode;
  body?: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    roman: "I",
    title: (
      <>
        Deklaracja dostępności dotyczy strony internetowej{" "}
        <a
          href="https://sasiedzkilazarz.pl"
          target="_blank"
          rel="noopener noreferrer"
        >
          sasiedzkilazarz.pl
        </a>
        .
      </>
    ),
  },
  {
    roman: "II",
    title:
      "Sąsiedzki Łazarz zobowiązuje się dołożyć wszelkich starań, aby zapewnić dostępność swojej strony internetowej",
  },
  {
    roman: "III",
    title: "Data publikacji strony internetowej",
    body: <p>25 sierpnia 2025 roku.</p>,
  },
  {
    roman: "IV",
    title: "Data ostatniej istotnej aktualizacji",
    body: <p>25 sierpnia 2025 roku.</p>,
  },
  {
    roman: "V",
    title: "Stan dostępności cyfrowej",
    body: (
      <p>
        Strona internetowa jest częściowo zgodna z załącznikiem do ustawy z dnia
        4 kwietnia 2019 r. o dostępności cyfrowej stron internetowych i
        aplikacji mobilnych podmiotów publicznych, z powodu niezgodności lub
        wyłączeń wymienionych poniżej.
      </p>
    ),
  },
  {
    roman: "VI",
    title: "Niedostępne treści",
    body: (
      <p>
        Formularz kontaktowy może być problematyczny dla osób, które korzystają
        z czytnika ekranu. Można natomiast skontaktować się z nami, pisząc na
        adres mailowy lub dzwoniąc do nas. Dane teleadresowe znajdują się
        bezpośrednio pod formularzem kontaktowym.
      </p>
    ),
  },
  {
    roman: "VII",
    title: "Treści nieobjęte przepisami",
    body: (
      <p>
        W opublikowanych filmach w aktualnościach nie ma napisów dla osób
        niesłyszących i Głuchych.
      </p>
    ),
  },
  {
    roman: "VIII",
    title: "Dokumenty archiwalne",
    body: (
      <p>
        Dokumenty archiwalne nie są publikowane. Jeżeli potrzebują Państwo
        dostępu do nich, prosimy o skontaktowanie się z nami i wskazanie, które
        z nich są potrzebne i jak powinniśmy je dostosować.
      </p>
    ),
  },
  {
    roman: "IX",
    title: "Informacje zwrotne i dane kontaktowe",
    body: (
      <p>
        Wszystkie problemy z dostępnością cyfrową tej strony internetowej
        prosimy zgłaszać telefonicznie lub mailowo: tel.{" "}
        <a href="tel:+48605550370">605&nbsp;550&nbsp;370</a>,{" "}
        <a href="mailto:kontakt@sasiedzkilazarz.pl">
          kontakt@sasiedzkilazarz.pl
        </a>
        .
      </p>
    ),
  },
  {
    roman: "X",
    title:
      "Każdy ma prawo wystąpić z żądaniem zapewnienia dostępności cyfrowej tej strony internetowej lub jej elementów",
  },
  {
    roman: "XI",
    title: "Zgłaszając takie żądanie, prosimy podać",
    body: (
      <ol className="accDeclaration-sublist">
        <li>swoje imię i nazwisko,</li>
        <li>swoje dane kontaktowe (np. numer telefonu, e-mail),</li>
        <li>
          dokładny adres strony internetowej, na której jest niedostępny cyfrowo
          element lub treść,
        </li>
        <li>
          opis na czym polega problem i jaki sposób jego rozwiązania byłby dla
          Ciebie najwygodniejszy.
        </li>
      </ol>
    ),
  },
  {
    roman: "XII",
    title:
      "Na zgłoszenie odpowiemy najszybciej jak to możliwe, nie później niż w ciągu 7 dni od jego otrzymania",
  },
  {
    roman: "XIII",
    title:
      "Jeżeli nie będziemy w stanie zapewnić dostępności cyfrowej strony internetowej lub treści, wskazanej w żądaniu, zaproponujemy dostęp do nich w alternatywny sposób",
  },
];

export default function AccDeclarationPage() {
  return (
    <main className="accDeclaration-wrapper">
      <h1 className="accDeclaration-title">Deklaracja dostępności</h1>

      <section className="accDeclaration-content">
        <h2 className="accDeclaration-subtitle">
          Deklaracja dostępności Sąsiedzki Łazarz
        </h2>

        <div className="accDeclaration-sections">
          {SECTIONS.map((s, idx) => (
            <section className="accDeclaration-block" key={idx}>
              <h3 className="accDeclaration-heading">
                <strong className="accDeclaration-roman">{s.roman}.</strong>{" "}
                {s.title}
              </h3>
              {s.body && <div className="accDeclaration-text">{s.body}</div>}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
