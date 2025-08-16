"use client";

import Image from "next/image";
import React from "react";
import "./AreasOfActivity.scss";

type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

type AreasOfActivityProps = {
  title?: string;
  description?: string;
  image?: Img;
};

export default function AreasOfActivity({
  title = "Obszary działalności",
  description = "Tutaj możesz dodać opis obszarów działalności fundacji. Może to być tekst o inicjatywach, projektach i aktywnościach, które realizujemy w ramach naszej misji.",
  image = {
    src: "/News/matejki-poznan.png",
    alt: "obszary działalności",
    width: 652,
    height: 336,
    priority: true,
  },
}: AreasOfActivityProps) {
  return (
    <section className="areas-top-wrapper">
      <div className="areas-container">
        <div className="areas-top">
          <div className="areas-content">
            <h2 className="areas-title">{title}</h2>
            <p className="areas-description">{description}</p>
          </div>

          <div className="areas-image-wrapper">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="areas-image"
              priority={image.priority}
              sizes="(max-width:700px) 90vw, (max-width:1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
