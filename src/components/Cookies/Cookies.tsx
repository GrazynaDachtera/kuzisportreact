"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CookiesJS from "js-cookie";
import "./Cookies.scss";

export default function Cookies() {
  const [showIcon, setShowIcon] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = CookiesJS.get("cookieConsent");
    if (!consent) {
      setShowIcon(true);
    }
  }, []);

  const handleIconClick = () => {
    setShowPopup(true);
  };

  const handleAccept = () => {
    CookiesJS.set("cookieConsent", "accepted", { expires: 365 });
    setShowIcon(false);
    setShowPopup(false);
  };

  const handleDecline = () => {
    CookiesJS.set("cookieConsent", "declined", { expires: 365 });
    setShowIcon(false);
    setShowPopup(false);
  };

  if (!showIcon && !showPopup) {
    return null;
  }

  return (
    <>
      {showIcon && (
        <section className="cookiesIconSection">
          <div className="cookiesIconContainer" onClick={handleIconClick}>
            <Image
              src="/Cookies/cookie.svg"
              alt="Cookies Icon"
              width={64}
              height={64}
              className="cookiesIcon"
            />
          </div>
        </section>
      )}
      {showPopup && (
        <div className="cookiesPopupOverlay">
          <div className="cookiesPopup">
            <h3>Niniejsza strona korzysta z plików cookie</h3>
            <p>
              Wykorzystujemy pliki cookie, aby oferować funkcje społecznościowe,
              analizować ruch w naszej witrynie, a także, żeby spersonalizować
              treści i reklamy. Informacje o tym, jak korzystasz z naszej
              witryny, udostępniamy partnerom społecznościowym, reklamowym i
              analitycznym. Partnerzy mogą połączyć te informacje z innymi
              danymi otrzymanymi od Ciebie lub uzyskanymi podczas korzystania z
              ich usług. Polityka prywatności
            </p>
            <div className="cookiesPopupActions">
              <button className="acceptBtn" onClick={handleAccept}>
                Zezwól na wszystkie
              </button>
              <button className="declineBtn" onClick={handleDecline}>
                Odrzuć
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
