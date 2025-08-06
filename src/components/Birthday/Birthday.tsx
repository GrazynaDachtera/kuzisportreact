"use client";

import React from "react";
import Image from "next/image";
import "./Birthday.scss";

export default function Birthday() {
  return (
    <section className="Sports">
      <div className="sports-top-wrapper">
        <div className="sports-container">
          <div className="sports-top">
            {/* Image now appears on the left */}
            <div className="sports-image-wrapper">
              <Image
                src="/Sports/karate.png"
                alt="karate"
                width={600}
                height={400}
                className="sports__badge"
                priority
              />
            </div>

            {/* Description appears on the right */}
            <div className="sports-content">
              <h2 className="sports-title">
                Organizacja Urodzin dla Dzieci w Kuzi Sport
              </h2>
              <p className="sports-description">
                Zapraszamy do wyjątkowego świata urodzinowych przyjęć w Kuzi
                Sport! Nasza sala sportowa to idealne miejsce, aby świętować ten
                szczególny dzień w radosnej i aktywnej atmosferze. Oferujemy
                organizację urodzin dla dzieci w każdym wieku, które z pewnością
                zostaną na długo w pamięci zarówno maluchów, jak i ich rodziców.
              </p>
              <button className="sports-button">Sprawdź</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
