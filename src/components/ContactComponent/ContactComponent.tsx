"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import "./ContactComponent.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="arrow-icon"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.57-1.15a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16v16H4z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function ContactComponent() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Dziękujemy! Wiadomość została wysłana (demo).");
  }

  return (
    <section className={`Contact ${poppins.className}`}>
      <div className="contact-top">
        <div className="contact-container contact-grid">
          <div className="contact-form">
            <h1 className="contact-title">Kontakt</h1>

            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="row full">
                <label className="sr-only" htmlFor="name">
                  Imię i nazwisko / Firma
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Imię i nazwisko / Firma"
                  required
                />
              </div>

              <div className="row two">
                <div>
                  <label className="sr-only" htmlFor="phone">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Telefon"
                    inputMode="tel"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="email">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                  />
                </div>
              </div>

              <div className="row full">
                <label className="sr-only" htmlFor="message">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Wiadomość"
                  rows={6}
                />
              </div>

              <label className="consent">
                <input type="checkbox" required />
                <span>
                  Zgoda na przetwarzanie danych osobowych{" "}
                  <span className="required">*</span>
                </span>
              </label>

              <label className="consent">
                <input type="checkbox" />
                <span>Zgoda marketingowa</span>
              </label>

              <p className="security">
                <ShieldIcon /> <span>Twoje dane są bezpieczne</span>
              </p>

              <button type="submit" className="submit">
                <span>Wyślij wiadomość</span>
                <ArrowIcon />
              </button>
            </form>
          </div>

          <div className="contact-hero">
            <Image
              src="/Contact/ContactImage.png"
              alt="Zespół"
              width={620}
              height={560}
              priority
              sizes="(max-width: 992px) 90vw, 620px"
            />
          </div>
        </div>
      </div>

      <div className="contact-strip">
        <div className="contact-container strip-grid">
          <div className="strip-item">
            <div className="icon">
              <PhoneIcon />
            </div>
            <div className="meta">
              <p className="label">Biuro:</p>
              <a href="tel:605550370" className="value">
                605 550 370
              </a>
            </div>
          </div>

          <div className="strip-item">
            <div className="icon">
              <PhoneIcon />
            </div>
            <div className="meta">
              <p className="label">XYZ:</p>
              <div className="phones">
                <a href="tel:XYZ" className="value">
                  XYZ
                </a>
              </div>
            </div>
          </div>

          <div className="strip-item">
            <div className="icon">
              <MailIcon />
            </div>
            <div className="meta">
              <p className="label">E-mail:</p>
              <a href="mailto:kuzisport.biuro@gmail.com" className="value">
                kontakt@sasiedzkilazarz.pl
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
