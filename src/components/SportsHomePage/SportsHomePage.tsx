"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./SportsHomePage.scss";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="arrow-icon"
  >
    <path d="M7 7h10v10" />
  </svg>
);

export default function ProjectsHomePage() {
  const features = [
    {
      title: "Sporty Gimnastyczne - Kuzi Sport Gymnastics",
      description: "...",
      link: "/Sports/KuziSportGymnastics",
    },
    {
      title: "Sporty Walki - Kuzi Sport Fight",
      description: "...",
      link: "/Sports/KuziSportFight",
    },
    {
      title: "Treningi motoryczne - Kuzi Sport Performance",
      description: "...",
      link: "/Sports/KuziSportPerformance",
    },
    {
      title: "Treningi dla klubów - Kuzi Sport Team",
      description: "...",
      link: "/Sports/KuziSportTeam",
    },
  ];

  return (
    <section className="ProjectsHomePage">
      <div className="projectsHomePage-top-wrapper">
        <div className="projectsHomePage-container">
          <div className="projectsHomePage-top">
            <div className="projectsHomePage-content">
              <h2 className="projectsHomePage-title">
                Nasze Dyscypliny Sportowe w Klubie
              </h2>
              <p className="projectsHomePage-description">
                Witamy na stronie naszego klubu, gdzie pasja do sportu spotyka
                się z profesjonalizmem oraz wspaniałą atmosferą. Oferujemy
                szeroki wachlarz dyscyplin sportowych, które pozwalają na
                rozwijanie umiejętności, poprawę kondycji oraz zdobycie nowych
                doświadczeń. Poniżej przedstawiamy szczegóły dotyczące naszych
                głównych dyscyplin:
              </p>

              {/* ✅ Link styled as a button */}
              <Link href="/Sports" className="projectsHomePage-button">
                Sprawdź
              </Link>
            </div>

            <div className="projectsHomePage-image-wrapper">
              <Image
                src="/ProjectsHomePage/person.png"
                alt="Portret osoby"
                width={652}
                height={336}
                className="projectsHomePage-image"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="projectsHomePage-grid-wrapper">
        <div className="projectsHomePage-container">
          <div className="projectsHomePage-grid">
            {features.map((feature, index) => (
              <div className="grid-item" key={index}>
                <div className="grid-item-icon-wrapper">
                  <ArrowIcon />
                </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
