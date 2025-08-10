"use client";

import Image from "next/image";
import "./Birthday.scss";

export default function Birthday() {
  return (
    <section className="Birthday">
      <div className="birthday-top-wrapper">
        <div className="birthday-container">
          <div className="birthday-top">
            <div className="birthday-content">
              <h2 className="birthday-title">
                Organizacja Urodzin dla Dzieci w Kuzi Sport
              </h2>

              <div className="birthday-image-wrapper">
                <Image
                  src="/Birthday/birthdaycake.png"
                  alt="birthday cake"
                  width={430}
                  height={424}
                  sizes="(max-width: 992px) 90vw, 430px"
                  /* Make Next/Image fully responsive on small screens */
                  style={{ width: "100%", height: "auto", display: "block" }}
                  className="birthday__badge"
                  priority
                />
              </div>

              <p className="birthday-description">
                Zapraszamy do wyjątkowego świata urodzinowych przyjęć w Kuzi
                Sport! Nasza sala sportowa to idealne miejsce, aby świętować ten
                szczególny dzień w radosnej i aktywnej atmosferze. Oferujemy
                organizację urodzin dla dzieci w każdym wieku, które z pewnością
                zostaną na długo w pamięci zarówno maluchów, jak i ich rodziców.
              </p>

              <button className="birthday-button">Sprawdź</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
