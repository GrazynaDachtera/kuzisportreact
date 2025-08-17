"use client";

import React from "react";
import Image from "next/image";
import "./ProjectsHomePage.scss";

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
      title: "Nasze projekty",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Spacery",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Sprzątanie",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <section className="ProjectsHomePage">
      <div className="projectsHomePage-top-wrapper">
        <div className="projectsHomePage-container">
          <div className="projectsHomePage-top">
            <div className="projectsHomePage-content">
              <h2 className="projectsHomePage-title">Projekty</h2>
              <p className="projectsHomePage-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                malesuada tincidunt turpis, pretium consequat ante mollis a.
                Nullam nec sapien nisi. Etiam pellentesque, justo vitae faucibus
                blandit, ex sem luctus ante, eu dictum magna est quis nunc.
              </p>
              <button className="projectsHomePage-button">Sprawdź</button>
            </div>
            <div className="projectsHomePage-image-wrapper">
              <Image
                src="/ProjectsHomePage/people.png"
                alt="grupa ludzi"
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
