"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import emailjs from "@emailjs/browser";
import "./ContactComponent.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="contactFormKuziSport__arrowIcon"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactComponent() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const honey =
      form
        .querySelector<HTMLInputElement>("input[name='bot_honey']")
        ?.value.trim() ?? "";
    if (honey) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration is missing");
      setErrorMsg(
        "Formularz jest chwilowo niedostępny. Spróbuj ponownie później."
      );
      setStatus("error");
      return;
    }

    const rodoCb = form.querySelector<HTMLInputElement>(
      "input[name='consent_rodo']"
    );
    const mktCb = form.querySelector<HTMLInputElement>(
      "input[name='consent_marketing']"
    );

    if (!rodoCb || !mktCb) {
      console.error("Consent checkboxes not found in the form");
      setErrorMsg(
        "Ups… Wystąpił błąd formularza. Odśwież stronę i spróbuj ponownie."
      );
      setStatus("error");
      return;
    }

    form
      .querySelectorAll<HTMLInputElement>(
        "input[type='hidden'][name='consent_rodo'], input[type='hidden'][name='consent_marketing']"
      )
      .forEach((el) => el.remove());

    rodoCb.disabled = true;
    mktCb.disabled = true;

    const rodoHidden = document.createElement("input");
    rodoHidden.type = "hidden";
    rodoHidden.name = "consent_rodo";
    rodoHidden.value = rodoCb.checked ? "Tak" : "Nie";

    const mktHidden = document.createElement("input");
    mktHidden.type = "hidden";
    mktHidden.name = "consent_marketing";
    mktHidden.value = mktCb.checked ? "Tak" : "Nie";

    form.appendChild(rodoHidden);
    form.appendChild(mktHidden);

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.sendForm(serviceId, templateId, form, {
        publicKey,
      });
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setErrorMsg("Ups… Nie udało się wysłać wiadomości. Spróbuj ponownie.");
      setStatus("error");
    } finally {
      rodoCb.disabled = false;
      mktCb.disabled = false;
    }
  }

  return (
    <section
      className={`contactFormKuziSport ${poppins.className}`}
      aria-labelledby="contact-heading"
      aria-describedby="contact-description contact-security"
    >
      <div className="contactFormKuziSport__top">
        <div className="contactFormKuziSport__container contactFormKuziSport__grid">
          <div className="contactFormKuziSport__hero">
            <div className="contactFormKuziSport__heroCard" aria-hidden="true">
              <Image
                src="/Contact/CalistenicsImage.jpeg"
                alt=""
                priority
                fill
                sizes="(max-width: 62rem) 90vw, 46vw"
                className="contactFormKuziSport__heroImage"
              />
            </div>
          </div>

          <div className="contactFormKuziSport__panel">
            <header className="contactFormKuziSport__header">
              <h1 id="contact-heading" className="contactFormKuziSport__title">
                Kontakt
              </h1>
              <p id="contact-description" className="contactFormKuziSport__sub">
                Krótki formularz – oddzwonimy.
              </p>
            </header>

            <form
              ref={formRef}
              className="contactFormKuziSport__form"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status === "sending"}
            >
              <input
                type="text"
                name="bot_honey"
                className="contactFormKuziSport__honey"
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" name="page_url" value="/kontakt" />

              <p
                id="contact-status"
                aria-live="polite"
                role="status"
                className="contactFormKuziSport__statusLine"
              >
                {status === "sending" && "Wysyłanie…"}
                {status === "sent" && (
                  <span className="contactFormKuziSport__security">
                    <ShieldIcon /> Dziękujemy! Wiadomość wysłana.
                  </span>
                )}
                {status === "error" && (
                  <span className="contactFormKuziSport__error">
                    {errorMsg}
                  </span>
                )}
              </p>

              <div className="contactFormKuziSport__row contactFormKuziSport__row--full contactFormKuziSport__field contactFormKuziSport__field--full">
                <label htmlFor="name">
                  Imię i nazwisko / Firma{" "}
                  <span
                    className="contactFormKuziSport__req"
                    aria-hidden="true"
                  >
                    *
                  </span>
                  <span className="contactFormKuziSport__srOnly">
                    Pole wymagane
                  </span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Imię i nazwisko / Firma"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="contactFormKuziSport__row contactFormKuziSport__row--two">
                <div className="contactFormKuziSport__field">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="Telefon"
                    autoComplete="tel"
                  />
                </div>
                <div className="contactFormKuziSport__field">
                  <label htmlFor="email">
                    E-mail{" "}
                    <span
                      className="contactFormKuziSport__req"
                      aria-hidden="true"
                    >
                      *
                    </span>
                    <span className="contactFormKuziSport__srOnly">
                      Pole wymagane
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="contactFormKuziSport__row contactFormKuziSport__row--full contactFormKuziSport__field contactFormKuziSport__field--full">
                <label htmlFor="message">
                  Wiadomość{" "}
                  <span
                    className="contactFormKuziSport__req"
                    aria-hidden="true"
                  >
                    *
                  </span>
                  <span className="contactFormKuziSport__srOnly">
                    Pole wymagane
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Wiadomość"
                  rows={6}
                  required
                />
              </div>

              <div
                className="contactFormKuziSport__divider"
                aria-hidden="true"
              />

              <label className="contactFormKuziSport__consent">
                <input
                  type="checkbox"
                  name="consent_rodo"
                  required
                  aria-required="true"
                />
                <span>
                  Zgoda na przetwarzanie danych osobowych{" "}
                  <span className="contactFormKuziSport__required">*</span>
                </span>
              </label>

              <label className="contactFormKuziSport__consent">
                <input type="checkbox" name="consent_marketing" />
                <span>Zgoda marketingowa</span>
              </label>

              <p
                id="contact-security"
                className="contactFormKuziSport__security"
              >
                <ShieldIcon /> <span>Twoje dane są bezpieczne</span>
              </p>

              <div className="contactFormKuziSport__actions">
                <button
                  type="submit"
                  className="contactFormKuziSport__submit"
                  disabled={status === "sending"}
                  aria-disabled={status === "sending"}
                >
                  <span>
                    {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
                  </span>
                  <ArrowIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  console.log("EmailJS vars:", {
    service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  });
}
