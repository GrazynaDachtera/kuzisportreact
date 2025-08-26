"use client";

import "./Help.scss";

type Line =
  | { kind: "text"; text: string }
  | { kind: "label"; label: string; text: string; boldText?: boolean }
  | { kind: "title"; text: string }
  | { kind: "mixed"; before: string; strong: string; after: string };

const RULES: Line[] = [
  {
    kind: "mixed",
    before: "Jako ",
    strong: "Stowarzyszenie Sąsiedzki Łazarz",
    after:
      " działamy na rzecz mieszkańców Osiedla Święty Łazarz dzięki składkom członkowskim, dotacjom oraz darowiznom.",
  },
  {
    kind: "text",
    text: "Ty też możesz wesprzeć nasze działania społeczne poprzez wpłatę darowizny na nasze konto.",
  },
  {
    kind: "label",
    label: "Nazwa:",
    text: "Stowarzyszenie Sąsiedzki Łazarz",
    boldText: true,
  },
  {
    kind: "label",
    label: "Numer Konta Bankowego:",
    text: "65 1090 1476 0000 0001 6175 6613",
    boldText: true,
  },
  { kind: "title", text: "Poznaj zakres naszych działań:" },

  { kind: "title", text: "Robimy Porządek!" },
  {
    kind: "text",
    text: "Chodzimy po Łazarzu wzdłuż i wszerz, tropimy nieporządek i zgłaszamy go odpowiednim instytucjom. Pilnujemy też, by służby miejskie skutecznie realizowały swoje zadania, tak aby nasza dzielnica była czysta i zadbana.",
  },

  { kind: "title", text: "Integrujemy Łazarz i okolicę!" },
  {
    kind: "text",
    text: "Tworzymy przestrzeń do spotkań i współdziałania – organizujemy sąsiedzkie wydarzenia, od spacerów i pikników po warsztaty dla mieszkańców. Dbamy, by każde spotkanie miało także wymiar edukacyjny, wzmacniając więzi i wspierając rozwój naszej społeczności.",
  },

  { kind: "title", text: "Zieleń, zwierzęta, natura!" },
  {
    kind: "text",
    text: "Naszym priorytetem jest tworzenie jeszcze większej ilości dobrze zaplanowanej zieleni na Łazarzu – miejsc przyjaznych zarówno ludziom, jak i zwierzętom. Dbamy o to, by w naszych opiniach i projektach zawsze znalazła się przestrzeń dla natury, która sprzyja odpoczynkowi, spotkaniom i wspólnemu życiu z innymi mieszkańcami – także tymi małymi, skrzydlatymi czy futrzastymi.",
  },

  { kind: "title", text: "Inwestycje!" },
  {
    kind: "text",
    text: "Chcemy, aby na Łazarzu panował ład urbanistyczny. Jako społeczność pragniemy aktywnie uczestniczyć w planowaniu przestrzeni i wskazywać realne potrzeby mieszkańców. Dążymy do kompromisu między oczekiwaniami pieszych, rowerzystów, kierowców, młodszych i starszych – tych praktycznych i tych ceniących estetykę.",
  },

  { kind: "title", text: "Kultura i historia!" },
  {
    kind: "text",
    text: "Śledzimy i nagłaśniamy najważniejsze wydarzenia kulturalne i historyczne na Łazarzu i w całym Poznaniu – te bieżące i te, które już zapisały się w pamięci mieszkańców. Organizujemy także spacery, podczas których można odkrywać historię Łazarza w wyjątkowy i ciekawy sposób.",
  },

  { kind: "title", text: "… i wiele więcej!" },
];

export default function HelpPage() {
  return (
    <main className="help-wrapper">
      <h1 className="help-title">Ty też możesz pomóc</h1>

      <section className="help-content">
        <h2 className="help-subtitle">Ty też możesz pomóc</h2>

        <div className="help-text">
          {RULES.map((item, i) => {
            if (item.kind === "title") {
              return (
                <p key={i}>
                  <strong>{item.text}</strong>
                </p>
              );
            }
            if (item.kind === "label") {
              return (
                <p key={i}>
                  <strong>{item.label}</strong>{" "}
                  {item.boldText ? <strong>{item.text}</strong> : item.text}
                </p>
              );
            }
            if (item.kind === "mixed") {
              return (
                <p key={i}>
                  {item.before}
                  <strong>{item.strong}</strong>
                  {item.after}
                </p>
              );
            }
            return <p key={i}>{item.text}</p>;
          })}
        </div>
      </section>
    </main>
  );
}
