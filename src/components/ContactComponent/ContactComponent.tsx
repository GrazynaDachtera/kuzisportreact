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
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="contactFormKuziSport__arrowIcon"
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
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
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    const honey = (
      formRef.current.querySelector(
        'input[name="bot_honey"]'
      ) as HTMLInputElement | null
    )?.value;
    if (honey) return;

    const rodoCb = formRef.current.querySelector<HTMLInputElement>(
      "input[name='consent_rodo']"
    )!;
    const mktCb = formRef.current.querySelector<HTMLInputElement>(
      "input[name='consent_marketing']"
    )!;

    formRef.current
      .querySelectorAll(
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

    formRef.current.appendChild(rodoHidden);
    formRef.current.appendChild(mktHidden);

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string }
      );
      formRef.current.reset();
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
    >
      <div className="contactFormKuziSport__top">
        <div className="contactFormKuziSport__container contactFormKuziSport__grid">
          <div className="contactFormKuziSport__hero">
            <div className="contactFormKuziSport__heroCard">
              <Image
                src="/Contact/CalistenicsImage.jpeg"
                alt="Calisthenics training"
                width={620}
                height={560}
                priority
                sizes="(max-width: 992px) 90vw, 46vw"
              />
            </div>
          </div>

          <div className="contactFormKuziSport__panel">
            <header className="contactFormKuziSport__header">
              <h1 id="contact-heading" className="contactFormKuziSport__title">
                Kontakt
              </h1>
              <p className="contactFormKuziSport__sub">
                Krótki formularz – oddzwonimy.
              </p>
            </header>

            <form
              ref={formRef}
              className="contactFormKuziSport__form"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={status === "sending" ? "true" : "false"}
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
                </label>
                <input
                  id="name"
                  name="name"
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
                <input type="checkbox" name="consent_rodo" required />
                <span>
                  Zgoda na przetwarzanie danych osobowych{" "}
                  <span className="contactFormKuziSport__required">*</span>
                </span>
              </label>

              <label className="contactFormKuziSport__consent">
                <input type="checkbox" name="consent_marketing" />
                <span>Zgoda marketingowa</span>
              </label>

              <p className="contactFormKuziSport__security">
                <ShieldIcon /> <span>Twoje dane są bezpieczne</span>
              </p>

              <div className="contactFormKuziSport__actions">
                <button
                  type="submit"
                  className="contactFormKuziSport__submit"
                  disabled={status === "sending"}
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

if (typeof window !== "undefined") {
  console.log("EmailJS vars:", {
    service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  });
}
