"use client";

import React, { useState } from "react";
import "./CtaContact.scss";

export default function CtaContact() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    try {
      setLoading(true);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({
          type: "ok",
          text: "Dziękujemy! Sprawdź skrzynkę i potwierdź zapis.",
        });
        setEmail("");
        setConsent(false);
      } else {
        setMsg({
          type: "err",
          text:
            data?.error || "Nie udało się zapisać. Spróbuj ponownie później.",
        });
      }
    } catch {
      setMsg({ type: "err", text: "Wystąpił błąd sieci. Spróbuj ponownie." });
    } finally {
      setLoading(false);
    }
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
          <button
            className="cta-contact__btn"
            type="submit"
            disabled={loading || !consent}
          >
            {loading ? "Wysyłanie…" : "Zapisz się!"}
          </button>
          <label
            htmlFor="cta-contact-consent"
            className="cta-contact__checkbox"
          >
            <input
              id="cta-contact-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <span>
              Wyrażam zgodę na otrzymywanie newslettera na wskazany przeze mnie
              adres e-mail.
            </span>
          </label>
          {msg && (
            <p
              aria-live="polite"
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: msg.type === "ok" ? "#d5ffd5" : "#ffe4e4",
              }}
            >
              {msg.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
