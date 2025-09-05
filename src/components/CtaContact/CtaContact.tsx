"use client";

import React, { useMemo, useState } from "react";
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
      "Akrobatyka sportowa — skoki na ścieżce / trampolinie / podwójnej mini trampolinie",
      "Gimnastyka sportowa kobiet — ćw. wolne / skok / poręcze asymetryczne / równoważnia",
      "Akrobatyka powietrzna — aerial silks (szarfy) / aerial hoop (koło) / aerial straps (pasy)",
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

const safeJson = async (res: Response): Promise<unknown> => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const isErrorResponse = (x: unknown): x is { error: string } =>
  typeof x === "object" &&
  x !== null &&
  "error" in x &&
  typeof (x as { error: unknown }).error === "string";

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

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);

    if (!form.rodo) {
      setMsg({
        type: "err",
        text: "Zaznacz zgodę na przetwarzanie danych (RODO).",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await safeJson(res);

      if (res.ok) {
        setMsg({
          type: "ok",
          text: "Dziękujemy! Twoje zgłoszenie na zajęcia próbne zostało wysłane. Skontaktujemy się wkrótce.",
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
      } else {
        const errText = isErrorResponse(data)
          ? data.error
          : "Nie udało się wysłać formularza. Spróbuj ponownie później.";
        setMsg({ type: "err", text: errText });
      }
    } catch {
      setMsg({ type: "err", text: "Wystąpił błąd sieci. Spróbuj ponownie." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="trial" aria-labelledby="trial-heading">
      <div className="trial__container">
        <header className="trial__header">
          <h2 id="trial-heading">Zapisz się na zajęcia próbne</h2>
          <p className="trial__sub">
            Szybki formularz – oddzwonimy z potwierdzeniem terminu.
          </p>
        </header>

        <form className="trial__form" onSubmit={handleSubmit} noValidate>
          <div className="trial__field">
            <label htmlFor="trial-name">Imię i nazwisko *</label>
            <input
              id="trial-name"
              type="text"
              placeholder="Jan Kowalski"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="trial__field">
            <label htmlFor="trial-phone">Telefon *</label>
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
            />
          </div>

          <div className="trial__field">
            <label htmlFor="trial-email">E-mail *</label>
            <input
              id="trial-email"
              type="email"
              placeholder="np. jan@domena.pl"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="trial__field">
            <label htmlFor="trial-discipline">Dyscyplina *</label>
            <select
              id="trial-discipline"
              value={form.discipline}
              onChange={(e) => update("discipline", e.target.value)}
              required
            >
              <option value="" disabled>
                Wybierz dyscyplinę…
              </option>
              {DISCIPLINE_GROUPS.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="trial__field">
            <label htmlFor="trial-birth">Data urodzenia *</label>
            <input
              id="trial-birth"
              type="date"
              value={form.birthDate}
              onChange={(e) => update("birthDate", e.target.value)}
              required
              max={new Date().toISOString().slice(0, 10)}
            />
            {age !== null && (
              <small aria-live="polite" className="trial__hint">
                Wiek: {age} lat
              </small>
            )}
          </div>

          <fieldset className="trial__field trial__group">
            <legend>Poziom zaawansowania *</legend>
            <div className="trial__pills">
              {SKILL_LEVELS.map((lvl) => (
                <label
                  key={lvl}
                  className={`pill ${form.level === lvl ? "is-active" : ""}`}
                >
                  <input
                    type="radio"
                    name="skill"
                    value={lvl}
                    checked={form.level === lvl}
                    onChange={() => update("level", lvl)}
                    required
                  />
                  <span>{lvl}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="trial__field trial__group">
            <legend>Deklarowana liczba treningów / tydzień *</legend>
            <div className="trial__pills">
              {TRAININGS_PER_WEEK.map((f) => (
                <label
                  key={f}
                  className={`pill ${form.frequency === f ? "is-active" : ""}`}
                >
                  <input
                    type="radio"
                    name="frequency"
                    value={f}
                    checked={form.frequency === f}
                    onChange={() => update("frequency", f)}
                    required
                  />
                  <span>{f}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="trial__field trial__group">
            <legend>Forma zajęć *</legend>
            <div className="trial__pills trial__pills--wrap">
              {CLASS_FORMS.map((f) => (
                <label
                  key={f}
                  className={`pill ${form.format === f ? "is-active" : ""}`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={f}
                    checked={form.format === f}
                    onChange={() => update("format", f)}
                    required
                  />
                  <span>{f}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="trial__field trial__field--full">
            <label htmlFor="trial-message">Wiadomość (opcjonalnie)</label>
            <textarea
              id="trial-message"
              rows={4}
              placeholder="Dodatkowe informacje, preferowane godziny…"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>

          <label className="trial__check trial__field--full">
            <input
              type="checkbox"
              checked={form.rodo}
              onChange={(e) => update("rodo", e.target.checked)}
              required
            />
            <span>
              Zgoda na przetwarzanie danych osobowych (RODO) w celu kontaktu w
              sprawie zajęć próbnych. *
            </span>
          </label>

          <label className="trial__check trial__field--full">
            <input
              type="checkbox"
              checked={form.marketing}
              onChange={(e) => update("marketing", e.target.checked)}
            />
            <span>Zgoda marketingowa (opcjonalnie).</span>
          </label>

          <div className="trial__actions">
            <button className="trial__btn" type="submit" disabled={loading}>
              {loading ? "Wysyłanie…" : "Wyślij zgłoszenie"}
            </button>
            <p className="trial__safety">Twoje dane są bezpieczne</p>
          </div>

          {msg && (
            <p
              aria-live="polite"
              className={`trial__msg ${
                msg.type === "ok" ? "trial__msg--ok" : "trial__msg--err"
              }`}
            >
              {msg.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
