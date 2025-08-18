"use client";

import Image from "next/image";
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
            {/* no fill — let the natural aspect render; CSS reserves height */}
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority={image.priority}
              className="mission-image"
              sizes="(max-width:700px) 90vw, (max-width:1200px) 50vw, 33vw"
              style={{ width: "100%", height: "auto", display: "block" }}
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
