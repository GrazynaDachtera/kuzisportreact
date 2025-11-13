"use client";

import React, { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./CtaContact.scss";

type Msg = { type: "ok" | "err"; text: string } | null;

const SKILL_LEVELS = [
  "początkujący",
  "średniozaawansowany",
  "zaawansowany",
] as const;
const TRAININGS_PER_WEEK = ["1", "2", "3 lub więcej"] as const;
const CLASS_FORMS = [
  "indywidualne",
  "mikrogrupa 2–4",
  "grupowe",
  "grupy zamknięte",
] as const;

type Level = (typeof SKILL_LEVELS)[number];
type Frequency = (typeof TRAININGS_PER_WEEK)[number];
type ClassForm = (typeof CLASS_FORMS)[number];

type DisciplineGroup = { label: string; options: string[] };

const DISCIPLINE_GROUPS: DisciplineGroup[] = [
  {
    label: "Akrobatyka i gimnastyka",
    options: [
      "Akrobatyka sportowa - skoki na ścieżce / trampolinie / podwójnej mini trampolinie",
      "Gimnastyka sportowa kobiet - ćw. wolne / skok / poręcze asymetryczne / równoważnia",
      "Akrobatyka powietrzna - aerial silks (szarfy) / aerial hoop (koło) / aerial straps (pasy)",
      "Parkour",
      "Street workout / kalistenika / freestyle na drążkach",
    ],
  },
  {
    label: "Sporty walki",
    options: ["K1 kickboxing", "Karate", "Boks", "Grappling"],
  },
  {
    label: "Treningi i usługi",
    options: [
      "Treningi motoryczne dla klubów sportowych",
      "Trening obwodowy „Train Station”",
      "Treningi personalne na siłowni (uzupełniające / wzmacniające / terapeutyczne / BPS) + treningi indywidualne",
      "EMS (elektrostymulacja mięśniowa) + drenaż limfatyczny",
      "Zajęcia z fizjoterapeutą / zajęcia rehabilitacyjne",
    ],
  },
  {
    label: "Oferta dodatkowa",
    options: [
      "Treningi uzupełniające (np. lekka atletyka / taniec / narciarstwo)",
      "Wycieczki szkolne i lekcje WF",
      "Eventy sportowe / pokazy",
      "Urodzinki sportowe",
      "Warsztaty wakacyjne / półkolonie / obozy sportowe",
      "Staże i zloty, seminaria i zgrupowania, obozy dochodzeniowe",
      "Konsultacje dietetyczne / psycholog sportowy",
      "Warsztaty / szkolenia trenerskie",
      "Treningi dla firm",
    ],
  },
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  discipline: string;
  birthDate: string;
  level: Level;
  frequency: Frequency;
  format: ClassForm;
  rodo: boolean;
  marketing: boolean;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type ValidatorFn<K extends keyof FormState> = (
  val: FormState[K],
  full: FormState
) => string | undefined;

export default function CtaContact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    discipline: "",
    birthDate: "",
    level: SKILL_LEVELS[0],
    frequency: TRAININGS_PER_WEEK[0],
    format: CLASS_FORMS[0],
    rodo: false,
    marketing: false,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<Msg>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const formRef = useRef<HTMLFormElement>(null);

  const age = useMemo(() => {
    if (!form.birthDate) return null;
    const b = new Date(form.birthDate);
    if (Number.isNaN(b.getTime())) return null;
    const today = new Date();
    let years = today.getFullYear() - b.getFullYear();
    const m = today.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < b.getDate())) years--;
    return years;
  }, [form.birthDate]);

  const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const validators: { [K in keyof FormState]: ValidatorFn<K> } = {
    name: (v) => (v.trim() ? undefined : "Podaj imię i nazwisko."),
    phone: (v) => {
      const d = v.replace(/\D/g, "");
      return d.length >= 6 ? undefined : "Podaj numer telefonu.";
    },
    email: (v) => (emailOk(v) ? undefined : "Podaj adres e-mail."),
    discipline: (v) => (v.trim() ? undefined : "Wybierz dyscyplinę."),
    birthDate: (v) => {
      if (!v) return "Podaj datę urodzenia.";
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return "Nieprawidłowa data.";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (d > today) return "Data nie może być z przyszłości.";
      return undefined;
    },
    level: () => undefined,
    frequency: () => undefined,
    format: () => undefined,
    rodo: (v) => (v ? undefined : "Wymagana zgoda na przetwarzanie danych."),
    marketing: () => undefined,
    message: () => undefined,
  };

  const validateStep = (s: 1 | 2 | 3): Errors => {
    const keysByStep: Record<1 | 2 | 3, (keyof FormState)[]> = {
      1: ["name", "phone", "email"],
      2: ["discipline", "birthDate"],
      3: ["rodo"],
    };
    const e: Errors = {};
    for (const k of keysByStep[s]) {
      const msg = validators[k](form[k] as never, form);
      if (msg) e[k] = msg;
    }
    return e;
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    const msg = validators[key](value, next);
    setErrors((prev) => {
      if (!msg) {
        const rest: Errors = { ...prev };
        delete rest[key];
        return rest;
      }
      return { ...prev, [key]: msg };
    });
  };

  const focusFirstError = (e: Errors) => {
    const order: (keyof FormState)[] = [
      "name",
      "phone",
      "email",
      "discipline",
      "birthDate",
      "rodo",
    ];
    const idMap: Record<string, string> = {
      name: "trial-name",
      phone: "trial-phone",
      email: "trial-email",
      discipline: "trial-discipline",
      birthDate: "trial-birth",
      rodo: "trial-rodo",
    };
    for (const key of order) {
      if (e[key]) {
        const el = document.getElementById(idMap[key]);
        if (el) (el as HTMLElement).focus();
        break;
      }
    }
  };

  const goTo = (target: 1 | 2 | 3) => {
    if (target <= step) return setStep(target);
    for (let s = step as number; s < target; s++) {
      const es = validateStep(s as 1 | 2 | 3);
      if (Object.keys(es).length) {
        setErrors((prev) => ({ ...prev, ...es }));
        setStep(s as 1 | 2 | 3);
        focusFirstError(es);
        return;
      }
    }
    setStep(target);
  };

  const next = () => goTo(Math.min(step + 1, 3) as 1 | 2 | 3);
  const back = () => setStep(Math.max(step - 1, 1) as 1 | 2 | 3);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setMsg(null);
    let allErrors: Errors = {};
    [1, 2, 3].forEach(
      (s) => (allErrors = { ...allErrors, ...validateStep(s as 1 | 2 | 3) })
    );
    setErrors(allErrors);
    if (Object.keys(allErrors).length) {
      const firstBad = [1, 2, 3].find(
        (s) => Object.keys(validateStep(s as 1 | 2 | 3)).length
      ) as 1 | 2 | 3;
      setStep(firstBad);
      focusFirstError(allErrors);
      return;
    }
    try {
      setLoading(true);
      const submitted_at = new Intl.DateTimeFormat("pl-PL", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/Warsaw",
      }).format(new Date());
      const templateParams = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        discipline: form.discipline,
        birthDate: form.birthDate,
        age: age ?? "",
        level: form.level,
        frequency: form.frequency,
        format: form.format,
        rodo: form.rodo ? "TAK" : "NIE",
        marketing: form.marketing ? "TAK" : "NIE",
        message: form.message || "",
        submitted_at,
        reply_to: form.email,
      };
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
      const res = await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });
      if (res.status === 200) {
        setMsg({
          type: "ok",
          text: "Dziękujemy! Twoje zgłoszenie zostało wysłane. Skontaktujemy się wkrótce.",
        });
        setForm({
          name: "",
          phone: "",
          email: "",
          discipline: "",
          birthDate: "",
          level: SKILL_LEVELS[0],
          frequency: TRAININGS_PER_WEEK[0],
          format: CLASS_FORMS[0],
          rodo: false,
          marketing: false,
          message: "",
        });
        setErrors({});
        setStep(1);
        formRef.current?.reset();
      } else {
        setMsg({
          type: "err",
          text: "Nie udało się wysłać formularza. Spróbuj ponownie później.",
        });
      }
    } catch {
      setMsg({ type: "err", text: "Wystąpił błąd sieci. Spróbuj ponownie." });
    } finally {
      setLoading(false);
    }
  };

  const step1Done = !!(form.name && form.phone && form.email);
  const step2Done = !!(form.discipline && form.birthDate);

  const DISCIPLINE_GROUPS_SORTED = useMemo(
    () =>
      DISCIPLINE_GROUPS.map((g) => ({
        ...g,
        options: [...g.options].sort((a, b) => a.localeCompare(b, "pl")),
      })),
    []
  );

  const ageHintIds = (hasAge: boolean, hasError: boolean) => {
    const ids = [];
    if (hasAge) ids.push("age-hint");
    if (hasError) ids.push("err-birthDate");
    return ids.length ? ids.join(" ") : undefined;
  };

  return (
    <section className="trial" aria-labelledby="trial-heading">
      <div className="trial__container">
        <div className="trial__content">
          <div className="trial__card">
            <header className="trial__header">
              <h2 id="trial-heading">Zapisz się na zajęcia próbne</h2>
              <p className="trial__sub">Krótki formularz – oddzwonimy.</p>
            </header>

            <nav
              className="trial__stepper"
              aria-label="Postęp formularza"
              role="tablist"
              aria-orientation="horizontal"
            >
              <button
                type="button"
                role="tab"
                id="stepper-step-1"
                aria-controls="step-1"
                aria-selected={step === 1}
                className={`stepper__item ${step === 1 ? "is-active" : ""} ${
                  step1Done ? "is-done" : ""
                }`}
                onClick={() => goTo(1)}
              >
                <span className="stepper__dot" aria-hidden>
                  1
                </span>
                <span className="stepper__label">Dane</span>
              </button>
              <button
                type="button"
                role="tab"
                id="stepper-step-2"
                aria-controls="step-2"
                aria-selected={step === 2}
                className={`stepper__item ${step === 2 ? "is-active" : ""} ${
                  step2Done ? "is-done" : ""
                }`}
                onClick={() => goTo(2)}
              >
                <span className="stepper__dot" aria-hidden>
                  2
                </span>
                <span className="stepper__label">Preferencje</span>
              </button>
              <button
                type="button"
                role="tab"
                id="stepper-step-3"
                aria-controls="step-3"
                aria-selected={step === 3}
                className={`stepper__item ${step === 3 ? "is-active" : ""}`}
                onClick={() => goTo(3)}
              >
                <span className="stepper__dot" aria-hidden>
                  3
                </span>
                <span className="stepper__label">Zgody & wysyłka</span>
              </button>
            </nav>

            <form
              ref={formRef}
              className="trial__form"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={loading ? "true" : "false"}
            >
              <div
                id="step-1"
                className={`step ${step === 1 ? "is-active" : ""}`}
                role="tabpanel"
                aria-labelledby="stepper-step-1"
                hidden={step !== 1}
              >
                <div className="step__cap">
                  <span className="step__dot" aria-hidden>
                    1
                  </span>
                  <h3 className="step__title">Dane kontaktowe</h3>
                </div>

                <div className={`field ${errors.name ? "field--error" : ""}`}>
                  <label htmlFor="trial-name">
                    Imię i nazwisko{" "}
                    <span className="req" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="trial-name"
                    type="text"
                    placeholder="Jan Kowalski"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    autoComplete="name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "err-name" : undefined}
                  />
                  {errors.name && (
                    <span id="err-name" className="error-text" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className={`field ${errors.phone ? "field--error" : ""}`}>
                  <label htmlFor="trial-phone">
                    Telefon{" "}
                    <span className="req" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="trial-phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="np. 785 828 666"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                    pattern="[\d\s+()-]{6,}"
                    autoComplete="tel"
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "err-phone" : undefined}
                  />
                  {errors.phone && (
                    <span id="err-phone" className="error-text" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div
                  className={`field field--full ${
                    errors.email ? "field--error" : ""
                  }`}
                >
                  <label htmlFor="trial-email">
                    E-mail{" "}
                    <span className="req" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="trial-email"
                    type="email"
                    placeholder="np. jan@domena.pl"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    autoComplete="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "err-email" : undefined}
                  />
                  {errors.email && (
                    <span id="err-email" className="error-text" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="wizard-controls actions actions--sticky">
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => {
                      const es = validateStep(1);
                      setErrors((prev) => ({ ...prev, ...es }));
                      if (Object.keys(es).length) {
                        focusFirstError(es);
                        return;
                      }
                      next();
                    }}
                  >
                    <span className="btn__label">Dalej</span>
                  </button>
                </div>
              </div>

              <div
                id="step-2"
                className={`step step--preferences ${
                  step === 2 ? "is-active" : ""
                }`}
                role="tabpanel"
                aria-labelledby="stepper-step-2"
                hidden={step !== 2}
              >
                <div className="step__cap">
                  <span className="step__dot" aria-hidden>
                    2
                  </span>
                  <h3 className="step__title">Preferencje treningowe</h3>
                </div>

                <div
                  className={`field field--full ${
                    errors.discipline ? "field--error" : ""
                  }`}
                >
                  <label htmlFor="trial-discipline">
                    Dyscyplina{" "}
                    <span className="req" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <select
                    id="trial-discipline"
                    value={form.discipline}
                    onChange={(e) => update("discipline", e.target.value)}
                    required
                    aria-invalid={errors.discipline ? "true" : "false"}
                    aria-describedby={
                      errors.discipline ? "err-discipline" : undefined
                    }
                  >
                    <option value="" disabled>
                      Wybierz…
                    </option>
                    {DISCIPLINE_GROUPS_SORTED.map((g) => (
                      <optgroup key={g.label} label={g.label}>
                        {g.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.discipline && (
                    <span
                      id="err-discipline"
                      className="error-text"
                      role="alert"
                    >
                      {errors.discipline}
                    </span>
                  )}
                </div>

                <div
                  className={`field field--full ${
                    errors.birthDate ? "field--error" : ""
                  }`}
                >
                  <label htmlFor="trial-birth">
                    Data urodzenia{" "}
                    <span className="req" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="trial-birth"
                    type="date"
                    value={form.birthDate}
                    onChange={(e) => update("birthDate", e.target.value)}
                    required
                    max={new Date().toISOString().slice(0, 10)}
                    aria-invalid={errors.birthDate ? "true" : "false"}
                    aria-describedby={ageHintIds(
                      age !== null,
                      !!errors.birthDate
                    )}
                  />
                  {age !== null && (
                    <small id="age-hint" className="hint">
                      Wiek: {age} lat
                    </small>
                  )}
                  {errors.birthDate && (
                    <span
                      id="err-birthDate"
                      className="error-text"
                      role="alert"
                    >
                      {errors.birthDate}
                    </span>
                  )}
                </div>

                <fieldset className="field group field--full">
                  <legend>Poziom</legend>
                  <div className="pills">
                    {SKILL_LEVELS.map((lvl) => (
                      <label
                        key={lvl}
                        className={`pill ${
                          form.level === lvl ? "is-active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="skill"
                          value={lvl}
                          checked={form.level === lvl}
                          onChange={() => update("level", lvl)}
                        />
                        <span>{lvl}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="field group field--full">
                  <legend>Treningi / tydzień</legend>
                  <div className="pills pills--compact">
                    {TRAININGS_PER_WEEK.map((f) => (
                      <label
                        key={f}
                        className={`pill ${
                          form.frequency === f ? "is-active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={f}
                          checked={form.frequency === f}
                          onChange={() => update("frequency", f)}
                        />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="field group field--full">
                  <legend>Forma zajęć</legend>
                  <div className="pills pills--wrap">
                    {CLASS_FORMS.map((f) => (
                      <label
                        key={f}
                        className={`pill ${
                          form.format === f ? "is-active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="format"
                          value={f}
                          checked={form.format === f}
                          onChange={() => update("format", f)}
                        />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="field field--full">
                  <label htmlFor="trial-message">Wiadomość (opcjonalnie)</label>
                  <textarea
                    id="trial-message"
                    rows={4}
                    placeholder="Dodatkowe informacje, preferowane godziny…"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                  />
                </div>

                <div className="wizard-controls actions actions--sticky">
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={back}
                  >
                    <span className="btn__label">Wstecz</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => {
                      const es = validateStep(2);
                      setErrors((prev) => ({ ...prev, ...es }));
                      if (Object.keys(es).length) {
                        focusFirstError(es);
                        return;
                      }
                      next();
                    }}
                  >
                    <span className="btn__label">Dalej</span>
                  </button>
                </div>
              </div>

              <div
                id="step-3"
                className={`step ${step === 3 ? "is-active" : ""}`}
                role="tabpanel"
                aria-labelledby="stepper-step-3"
                hidden={step !== 3}
              >
                <div className="step__cap">
                  <span className="step__dot" aria-hidden>
                    3
                  </span>
                  <h3 className="step__title">Zgody & wysyłka</h3>
                </div>

                <label
                  className={`check field--full ${
                    errors.rodo ? "field--error" : ""
                  }`}
                  htmlFor="trial-rodo"
                >
                  <input
                    id="trial-rodo"
                    type="checkbox"
                    checked={form.rodo}
                    onChange={(e) => update("rodo", e.target.checked)}
                    required
                    aria-invalid={errors.rodo ? "true" : "false"}
                    aria-describedby={errors.rodo ? "err-rodo" : undefined}
                  />
                  <span>
                    Zgoda na przetwarzanie danych osobowych{" "}
                    <span className="req" aria-hidden="true">
                      *
                    </span>
                  </span>
                </label>
                {errors.rodo && (
                  <span id="err-rodo" className="error-text" role="alert">
                    {errors.rodo}
                  </span>
                )}

                <label className="check field--full" htmlFor="trial-marketing">
                  <input
                    id="trial-marketing"
                    type="checkbox"
                    checked={form.marketing}
                    onChange={(e) => update("marketing", e.target.checked)}
                  />
                  <span>Zgoda marketingowa</span>
                </label>

                <p className="aside">
                  <span className="ico-shield" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      focusable="false"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.5 12.5l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Twoje dane są bezpieczne
                </p>

                <div className="wizard-controls actions actions--sticky">
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={back}
                  >
                    <span className="btn__label">Wstecz</span>
                  </button>
                  <button
                    className="btn btn--primary"
                    type="submit"
                    disabled={loading}
                    aria-disabled={loading ? "true" : "false"}
                  >
                    <span className="btn__label">
                      {loading ? "Wysyłanie…" : "Wyślij wiadomość"}
                    </span>
                  </button>
                </div>

                <div
                  id="form-status"
                  aria-live="polite"
                  role="status"
                  className="visually-hidden"
                >
                  {loading ? "Trwa wysyłanie formularza…" : msg?.text || ""}
                </div>
                {msg && (
                  <p
                    aria-live="polite"
                    role={msg.type === "err" ? "alert" : "status"}
                    className={`msg ${
                      msg.type === "ok" ? "msg--ok" : "msg--err"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
