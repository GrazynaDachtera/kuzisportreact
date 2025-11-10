"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./SportsHomePage.scss";

export default function ProjectsHomePage() {
  const features = [
    {
      title: "Sporty Gimnastyczne - Kuzi Sport Gymnastics",
      description:
        "Sekcja gimnastyczno-akrobatyczna: od podstaw przewrotów i stania na rękach, przez elementy na przyrządach, akrobatykę powietrzną i parkour, po łączenie ich w układy. Rozwijamy koordynację, mobilność i kontrolę ciała.",
      link: "/Sports/KuziSportGymnastics",
    },
    {
      title: "Sporty Walki - Kuzi Sport Fight",
      description:
        "Treningi sportów walki dla początkujących i zaawansowanych: technika (boks/kickboxing), elementy samoobrony oraz mocny trening ogólnorozwojowy. Budujemy siłę, kondycję i pewność siebie w bezpiecznej, partnerskiej atmosferze.",
      link: "/Sports/KuziSportFight",
    },
    {
      title: "Treningi motoryczne - Kuzi Sport Performance",
      description:
        "Kompleksowe przygotowanie motoryczne dla sportowców i amatorów: siła, szybkość, stabilizacja, mobilność. Treningi indywidualne i dla klubów (Train Station, siłownia/BPS), wsparcie fizjoterapeuty, EMS i drenaż limfatyczny – bezpiecznie i pod cele danej dyscypliny.",
      link: "/Sports/KuziSportPerformance",
    },
    {
      title: "Treningi dla klubów - Kuzi Sport Team",
      description:
        "Oferta dla szkół i klubów: treningi uzupełniające pod dyscyplinę, prowadzenie lekcji WF i eventów, półkolonie/obozy oraz pokazy. Organizujemy też urodziny sportowe, zgrupowania i seminaria, a do tego konsultacje dietetyczne, psychologa sportowego oraz szkolenia trenerskie.",
      link: "/Sports/KuziSportTeam",
    },
  ];

  return (
    <section className="ProjectsHomePage" aria-labelledby="sports-heading">
      <div className="projectsHomePage-top-wrapper">
        <div className="projectsHomePage-container">
          <div className="projectsHomePage-top">
            <div className="projectsHomePage-content">
              <h2 id="sports-heading" className="projectsHomePage-title">
                <span className="title-line">Nasze dyscypliny sportowe</span>
              </h2>
              <p className="projectsHomePage-description">
                Witamy na stronie naszego klubu, gdzie pasja do sportu spotyka
                się z profesjonalizmem oraz wspaniałą atmosferą. Oferujemy
                szeroki wachlarz dyscyplin sportowych, które pozwalają na
                rozwijanie umiejętności, poprawę kondycji oraz zdobycie nowych
                doświadczeń. Poniżej przedstawiamy szczegóły dotyczące naszych
                głównych dyscyplin:
              </p>
              <Link
                href="/Sports"
                className="projectsHomePage-button"
                aria-label="Przejdź do listy wszystkich dyscyplin sportowych"
              >
                Sprawdź
              </Link>
            </div>

            <div className="projectsHomePage-image-wrapper">
              <Image
                src="/ProjectsHomePage/aerial.jpg"
                alt="Zajęcia aerial silks - osoba ćwicząca na szarfach"
                width={652}
                height={336}
                className="projectsHomePage-image"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="projectsHomePage-grid-wrapper"
        aria-labelledby="sports-heading"
      >
        <div className="projectsHomePage-container">
          <ol className="projectsHomePage-grid" role="list">
            {features.map((feature, index) => (
              <li className="grid-item" key={index}>
                <div className="grid-item-icon-wrapper" aria-hidden="true" />
                <div className="grid-item-text">
                  {feature.link ? (
                    <h3 className="grid-item-title">
                      <Link href={feature.link}>{feature.title}</Link>
                    </h3>
                  ) : (
                    <h3 className="grid-item-title">{feature.title}</h3>
                  )}
                  {feature.description && (
                    <p className="grid-item-description">
                      {feature.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
