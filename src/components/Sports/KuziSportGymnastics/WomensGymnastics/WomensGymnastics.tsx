"use client";

import "./WomensGymnastics.scss";

export default function WomensGymnasticsPage() {
  return (
    <main className="WomensGymnastics">
      <section className="WomensGymnastics-wrapper">
        <div className="WomensGymnastics-container">
          <div className="WomensGymnastics-content">
            <h1 className="WomensGymnastics-hero">
              Gimnastyka Sportowa - przyrządy
            </h1>

            <p className="WomensGymnastics-paragraph">
              Gimnastyka sportowa jest niezwykle widowiskowym a jednocześnie
              ekstremalnie trudnym sportem.
            </p>
            <p className="WomensGymnastics-paragraph">
              Kobiety wykonują układy na Równoważni, Poręczach asymetrycznych,
              skok przez stół gimnastyczny oraz układ ćwiczeń wolnych na
              planszy. Mężczyźni poza skokiem i układem ćwiczeń wolnych trenują
              na kółkach, drążku, poręczach równoległych i koniu z łękami.
            </p>
            <p className="WomensGymnastics-paragraph">
              W naszym klubie szkolimy na wszystkich przyrządach.
            </p>

            <h2 className="WomensGymnastics-title">FAQ</h2>

            <ol className="WomensGymnastics-faq">
              <li>
                <h3 className="WomensGymnastics-question">
                  1. W jakim wieku powinno się zaczynać przygodę z gimnastyką
                  sportową?
                </h3>
                <p className="WomensGymnastics-paragraph">
                  W tym wypadku im wcześniej tym lepiej. Jeśli planujemy udział
                  w zawodach sportowych to najpóźniej 7/8 lat. Należy też
                  zaznaczyć, że można rozwijać się w ramach programu Gimnastyka
                  Dla Wszystkich, lub profesjonalnie podejmując trening
                  zmierzający do mistrzostwa sportowego.
                </p>
              </li>

              <li>
                <h3 className="WomensGymnastics-question">
                  2. Ile godzin treningów przewiduje klub dla zawodników?
                </h3>
                <p className="WomensGymnastics-paragraph">
                  Na etapie klasy 1-3 będziemy prowadzić treningi codziennie w
                  dwóch blokach – 1h ćwiczeń wolnych + 1h z przyrządem od
                  poniedziałku do soboty.
                </p>
                <p className="WomensGymnastics-paragraph">
                  Zawodnicy w wieku juniora młodszego i juniorzy będą dodatkowo
                  trenować przed szkołą lub w 3 blokach popołudniowych.
                </p>
              </li>

              <li>
                <h3 className="WomensGymnastics-question">
                  3. Jaki strój obowiązuje na zajęciach?
                </h3>
                <p className="WomensGymnastics-paragraph">
                  Estetyczny strój sportowy – u kobiet legginsy i bluzka, lub
                  body gimnastyczne, u mężczyzn krótkie spodenki i koszulka bez
                  rękawów, ewentualnie T-shirt. Zalecany strój – strój klubowy
                  dostępny w sklepie w recepcji na zamówienie.
                </p>
              </li>

              <li>
                <h3 className="WomensGymnastics-question">
                  4. Czy skórki gimnastyczne są konieczne?
                </h3>
                <p className="WomensGymnastics-paragraph">
                  Nie, ale potrafią znacznie uprzyjemnić ćwiczenia na drążku i
                  poręczach.
                </p>
              </li>

              <li>
                <h3 className="WomensGymnastics-question">
                  5. Czy treningi są ciężkie?
                </h3>
                <p className="WomensGymnastics-paragraph">
                  Na etapie gimnastyki dla wszystkich są dosyć wymagające, na
                  etapie treningów ku mistrzostwu sportowemu – bardzo
                  wymagające. Obok trenowania układów na przyrządach, zwiększamy
                  konsekwentnie siłę przy zachowaniu ekstremalnie wysokiej
                  mobilności i gibkości. Przygotowanie zawodnika do rywalizacji
                  na najwyższym poziomie sportowym wymaga treningu po 4-6h
                  dziennie.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
