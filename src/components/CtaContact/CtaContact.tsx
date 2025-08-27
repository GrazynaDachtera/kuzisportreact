"use client";

import React, { useState } from "react";
import "./CtaContact.scss";

export default function CtaContact() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted e-mail:", email);
  };

  return (
    <section className="cta-contact" aria-labelledby="cta-newsletter-heading">
      <div className="cta-contact__container">
        <div className="cta-contact__content">
          <h2 id="cta-newsletter-heading">Zapisz się do newslettera!</h2>
        </div>
        <form className="cta-contact__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="cta-contact-email" className="sr-only">
            Adres e-mail
          </label>
          <input
            id="cta-contact-email"
            className="cta-contact__input"
            type="email"
            placeholder="Wpisz adres mailowy"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <button className="cta-contact__btn" type="submit">
            Zapisz się!
          </button>
          <label
            htmlFor="cta-contact-consent"
            className="cta-contact__checkbox"
          >
            <input id="cta-contact-consent" type="checkbox" required />
            <span>
              Wyrażam zgodę na otrzymywanie newslettera na wskazany przeze mnie
              adres&nbsp;e-mail
            </span>
          </label>
        </form>
      </div>
    </section>
  );
}
