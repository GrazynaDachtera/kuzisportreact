"use client";

import React from "react";
import Image from "next/image";
import "./Sports.scss";

// Updated ArrowIcon component
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5" // Increased strokeWidth for a bolder look
    strokeLinecap="round"
    strokeLinejoin="round"
    className="arrow-icon"
  >
    {/* This single path creates the new arrow shape */}
    <path d="M7 7h10v10" />
  </svg>
);

export default function Sports() {
  const features = [
    {
      title: "Projekt 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Projekt 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Projekt 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Projekt 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <section className="Sports">
      <div className="sports-top-wrapper">
        <div className="sports-container">
          <div className="sports-top">
            <div className="sports-content">
              <h2 className="sports-title">Projekty</h2>
              <p className="sports-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                malesuada tincidunt turpis, pretium consequat ante mollis a.
                Nullam nec sapien nisi. Etiam pellentesque, justo vitae faucibus
                blandit, ex sem luctus ante, eu dictum magna est quis nunc.
              </p>
              <button className="sports-button">Sprawdź</button>
            </div>
            <div className="sports-image-wrapper">
              <Image
                src="/Sports/people.png"
                alt="karate"
                width={652}
                height={336}
                className="sports__badge"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sports-grid-wrapper">
        <div className="sports-container">
          <div className="sports-grid">
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
