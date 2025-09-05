"use client";

import React from "react";
import Link from "next/link";
import "./Sports.scss";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="butt"
    strokeLinejoin="miter"
    className="projects-arrow-icon"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

export default function AbcPage() {
  const features = [
    {
      title: "Sporty Gimnastyczne - Kuzi Sport Gymnastics",
      href: "/Sports/KuziSportGymnastics",
    },
    {
      title: "Sporty Walki - Kuzi Sport Fight",
      href: "/Sports/KuziSportFight",
    },
    {
      title: "Treningi motoryczne - Kuzi Sport Performance",
      href: "/Sports/KuziSportPerformance",
    },
    {
      title: "Treningi dla klubów - Kuzi Sport Team",
      href: "/Sports/KuziSportTeam",
    },
  ];

  return (
    <section className="projects-heading">
      <div className="projects-heading-grid-wrapper">
        <div className="projects-heading-container">
          <nav className="projects-heading-grid" role="list">
            {features.map((feature) => (
              <Link
                href={feature.href}
                className="projects-grid-item"
                key={feature.href}
                role="listitem"
              >
                <span className="projects-grid-item-icon-wrapper">
                  <ArrowIcon />
                </span>
                <span className="projects-grid-item-text">
                  <h3 className="projects-grid-item-title">{feature.title}</h3>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
