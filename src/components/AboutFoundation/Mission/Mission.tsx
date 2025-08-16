"use client";

import Image from "next/image";
import React from "react";
import "./Mission.scss";

type MissionProps = {
  title?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
  };
};

export default function Mission({
  title = "Misja i wizja",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada tincidunt turpis, pretium consequat ante mollis a. Nullam nec sapien nisi. Etiam pellentesque, justo vitae faucibus blandit, ex sem luctus ante, eu dictum magna est quis nunc.",
  image = {
    src: "/Sports/people.png",
    alt: "grupa ludzi",
    width: 652,
    height: 336,
    priority: true,
  },
}: MissionProps) {
  return (
    <section className="mission-top-wrapper">
      <div className="mission-container">
        <div className="mission-top">
          <div className="mission-image-wrapper">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="mission-image"
              priority={image.priority}
              sizes="(max-width:700px) 90vw, (max-width:1200px) 50vw, 33vw"
            />
          </div>

          <div className="mission-content">
            <h2 className="mission-title">{title}</h2>
            <p className="mission-description">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
