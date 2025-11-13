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
    className="arrow-icon"
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
    <section className={`Contact ${poppins.className}`}>
      <div className="contact-top">
        <div className="contact-container contact-grid">
          <div className="contact-form">
            <h1 className="contact-title">Kontakt</h1>

            <form
              ref={formRef}
              className="form"
              onSubmit={handleSubmit}
              noValidate
            >
              <input
                type="text"
                name="bot_honey"
                className="honey"
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" name="page_url" value="/kontakt" />

              <p aria-live="polite" className="status-line">
                {status === "sending" && "Wysyłanie…"}
                {status === "sent" && (
                  <span className="security">
                    <ShieldIcon /> Dziękujemy! Wiadomość wysłana.
                  </span>
                )}
                {status === "error" && (
                  <span className="error">{errorMsg}</span>
                )}
              </p>

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
                    required
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
                  required
                />
              </div>

              <label className="consent">
                <input type="checkbox" name="consent_rodo" required />
                <span>
                  Zgoda na przetwarzanie danych osobowych{" "}
                  <span className="required">*</span>
                </span>
              </label>

              <label className="consent">
                <input type="checkbox" name="consent_marketing" />
                <span>Zgoda marketingowa</span>
              </label>

              <p className="security">
                <ShieldIcon /> <span>Twoje dane są bezpieczne</span>
              </p>

              <button
                type="submit"
                className="submit"
                disabled={status === "sending"}
              >
                <span>
                  {status === "sending" ? "Wysyłanie…" : "Wyślij wiadomość"}
                </span>
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
              sizes="(max-width: 992px) 90vw, 46vw"
            />
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
