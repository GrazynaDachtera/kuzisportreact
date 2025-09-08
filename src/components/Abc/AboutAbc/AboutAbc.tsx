"use client";

import React, { useMemo, useState } from "react";
import "./AboutAbc.scss";

type Day =
  | "Poniedziałek"
  | "Wtorek"
  | "Środa"
  | "Czwartek"
  | "Piątek"
  | "Sobota";

type ScheduleItem = {
  id: string;
  day: Day;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
  title: string; // "Parkour", "Akrobatyka", "Gimnastyka", itd.
  group?: string;
  location?: string; // "Sala", "Szkoła GES", "Ring", "Train Station"
  tags?: string[];
};

const DAYS: Day[] = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
];

// sort by "HH:MM"
const byTime = (a: ScheduleItem, b: ScheduleItem) =>
  a.start.localeCompare(b.start);

// —————————————————————————————————————————————
// GRAFIK – skondensowany i znormalizowany
// (Możesz swobodnie dopisywać wpisy. UI zaktualizuje się automatycznie.)
// —————————————————————————————————————————————
const SCHEDULE: ScheduleItem[] = [
  // PONIEDZIAŁEK
  {
    id: "mon-gim-1",
    day: "Poniedziałek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa 4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "mon-kar-1",
    day: "Poniedziałek",
    start: "16:15",
    end: "17:00",
    title: "Karate",
    group: "4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "mon-pk-1",
    day: "Poniedziałek",
    start: "17:00",
    end: "18:15",
    title: "Parkour",
    group: "Dzieci 5–6 lat",
    location: "Sala",
    tags: ["dzieci 5–6"],
  },
  {
    id: "mon-kar-2",
    day: "Poniedziałek",
    start: "17:00",
    end: "18:00",
    title: "Karate",
    group: "7–10 lat",
    location: "Sala",
    tags: ["dzieci 7–10"],
  },
  {
    id: "mon-pk-2",
    day: "Poniedziałek",
    start: "18:00",
    end: "19:00",
    title: "Parkour",
    group: "Dzieci 7–9 lat",
    location: "Sala",
    tags: ["dzieci 7–9"],
  },
  {
    id: "mon-pk-3",
    day: "Poniedziałek",
    start: "19:00",
    end: "20:00",
    title: "Parkour",
    group: "Dzieci 10–12 lat",
    location: "Sala",
    tags: ["dzieci 10–12"],
  },
  {
    id: "mon-akr-1",
    day: "Poniedziałek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Grupa naborowa 11–14 lat",
    location: "Szkoła GES",
    tags: ["dzieci 11–14"],
  },
  {
    id: "mon-pk-4",
    day: "Poniedziałek",
    start: "19:30",
    end: "21:00",
    title: "Parkour",
    group: "Dorośli od podstaw",
    location: "Sala",
    tags: ["dorośli"],
  },
  {
    id: "mon-pk-5",
    day: "Poniedziałek",
    start: "20:00",
    end: "21:00",
    title: "Parkour",
    group: "13+ i 18+",
    location: "Train Station",
    tags: ["młodzież", "dorośli"],
  },
  {
    id: "mon-pk-6",
    day: "Poniedziałek",
    start: "21:00",
    end: "22:00",
    title: "Parkour",
    group: "Dzieci 4+",
    location: "Sala",
    tags: ["dzieci 4+"],
  },
  {
    id: "mon-ges-1",
    day: "Poniedziałek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Szkoła GES — Gr. naborowa 7–10 lat",
    location: "Szkoła GES",
    tags: ["dzieci 7–10"],
  },
  {
    id: "mon-ges-2",
    day: "Poniedziałek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11–14 lat",
    location: "Szkoła GES",
    tags: ["dzieci 11–14"],
  },
  {
    id: "mon-ges-3",
    day: "Poniedziałek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Dorośli",
    location: "Szkoła GES",
    tags: ["dorośli"],
  },
  {
    id: "mon-ges-4",
    day: "Poniedziałek",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka / Akrobatyka",
    group: "Wyczyn / Wyczyn+",
    location: "Szkoła GES",
    tags: ["wyczyn"],
  },
  {
    id: "mon-ges-5",
    day: "Poniedziałek",
    start: "21:00",
    end: "22:00",
    title: "Gimnastyka",
    group: "Studenci",
    location: "Szkoła GES",
    tags: ["studenci"],
  },
  {
    id: "mon-ring-1",
    day: "Poniedziałek",
    start: "17:15",
    end: "18:15",
    title: "Kickboxing",
    group: "Dzieci starsze i młodzież",
    location: "Ring",
    tags: ["młodzież"],
  },
  {
    id: "mon-ring-2",
    day: "Poniedziałek",
    start: "18:15",
    end: "19:30",
    title: "Kickboxing",
    group: "Prospekci (rekreacyjno-sportowa)",
    location: "Ring",
    tags: ["prospekci"],
  },
  {
    id: "mon-ring-3",
    day: "Poniedziałek",
    start: "19:30",
    end: "20:45",
    title: "Kickboxing",
    group: "Grupa zawodnicza",
    location: "Ring",
    tags: ["zawodnicy"],
  },
  {
    id: "mon-ring-4",
    day: "Poniedziałek",
    start: "20:45",
    end: "22:00",
    title: "Zajęcia indywidualne",
    group: "Kickboxing (1-na-1)",
    location: "Ring",
  },

  // WTOREK
  {
    id: "tue-gim-1",
    day: "Wtorek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa 4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "tue-akr-1",
    day: "Wtorek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "tue-akr-2",
    day: "Wtorek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11–14 lat",
    location: "Sala",
    tags: ["dzieci 11–14"],
  },
  {
    id: "tue-gim-std",
    day: "Wtorek",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Studenci",
    location: "Sala",
    tags: ["studenci"],
  },
  {
    id: "tue-ges-1",
    day: "Wtorek",
    start: "16:00",
    end: "17:00",
    title: "Akrobatyka",
    group: "Szkoła GES — Kontynuacja 4–7 lat",
    location: "Szkoła GES",
    tags: ["dzieci 4–7"],
  },
  {
    id: "tue-ges-2",
    day: "Wtorek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 7–10 lat",
    location: "Szkoła GES",
    tags: ["dzieci 7–10"],
  },
  {
    id: "tue-ges-3",
    day: "Wtorek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Grupa naborowa 10–14 lat",
    location: "Szkoła GES",
    tags: ["dzieci 10–14"],
  },
  {
    id: "tue-ges-4",
    day: "Wtorek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka",
    group: "Dorośli",
    location: "Szkoła GES",
    tags: ["dorośli"],
  },
  {
    id: "tue-ges-5",
    day: "Wtorek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka / Gimnastyka",
    group: "Wyczyn",
    location: "Szkoła GES",
    tags: ["wyczyn"],
  },
  {
    id: "tue-aerial-1",
    day: "Wtorek",
    start: "21:00",
    end: "22:00",
    title: "Aerial Hoop (Koła)",
    location: "Sala",
    tags: ["aerial"],
  },
  {
    id: "tue-ring-1",
    day: "Wtorek",
    start: "17:15",
    end: "18:15",
    title: "Kickboxing",
    group: "Dzieci starsze 12+",
    location: "Ring",
    tags: ["młodzież 12+"],
  },
  {
    id: "tue-ring-2",
    day: "Wtorek",
    start: "18:15",
    end: "19:30",
    title: "Kickboxing",
    group: "Prospekci",
    location: "Ring",
    tags: ["prospekci"],
  },

  // ŚRODA
  {
    id: "wed-gim-1",
    day: "Środa",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa 4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "wed-pk-1",
    day: "Środa",
    start: "17:00",
    end: "18:00",
    title: "Parkour",
    group: "Dzieci 5–6 lat",
    location: "Sala",
    tags: ["dzieci 5–6"],
  },
  {
    id: "wed-pk-2",
    day: "Środa",
    start: "18:00",
    end: "19:00",
    title: "Parkour",
    group: "Dzieci 7–9 lat",
    location: "Sala",
    tags: ["dzieci 7–9"],
  },
  {
    id: "wed-pk-3",
    day: "Środa",
    start: "19:00",
    end: "20:00",
    title: "Parkour",
    group: "Dzieci 9–13 lat",
    location: "Sala",
    tags: ["dzieci 9–13"],
  },
  {
    id: "wed-pk-4",
    day: "Środa",
    start: "20:00",
    end: "21:00",
    title: "Parkour",
    group: "13+ i 18+ (Train Station)",
    location: "Train Station",
    tags: ["młodzież", "dorośli"],
  },
  {
    id: "wed-pk-5",
    day: "Środa",
    start: "21:00",
    end: "22:00",
    title: "Parkour",
    group: "Dorośli od podstaw",
    location: "Sala",
    tags: ["dorośli"],
  },
  {
    id: "wed-ges-1",
    day: "Środa",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Szkoła GES — Nabór+Kont. 4–7 lat",
    location: "Szkoła GES",
    tags: ["dzieci 4–7"],
  },
  {
    id: "wed-ges-2",
    day: "Środa",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 7–10 lat",
    location: "Szkoła GES",
    tags: ["dzieci 7–10"],
  },
  {
    id: "wed-ges-3",
    day: "Środa",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11–14 lat",
    location: "Szkoła GES",
    tags: ["dzieci 11–14"],
  },
  {
    id: "wed-ges-4",
    day: "Środa",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka / Gimnastyka",
    group: "Wyczyn+ / Wyczyn",
    location: "Szkoła GES",
    tags: ["wyczyn"],
  },
  {
    id: "wed-gim-std",
    day: "Środa",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Studenci + Dorośli",
    location: "Sala",
    tags: ["studenci", "dorośli"],
  },
  {
    id: "wed-kar-1",
    day: "Środa",
    start: "16:15",
    end: "17:00",
    title: "Karate",
    group: "4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "wed-kar-2",
    day: "Środa",
    start: "17:00",
    end: "18:00",
    title: "Karate",
    group: "7–10 lat",
    location: "Sala",
    tags: ["dzieci 7–10"],
  },
  {
    id: "wed-ring-1",
    day: "Środa",
    start: "18:15",
    end: "19:30",
    title: "Kickboxing",
    group: "Prospekci",
    location: "Ring",
    tags: ["prospekci"],
  },
  {
    id: "wed-ring-2",
    day: "Środa",
    start: "19:30",
    end: "20:45",
    title: "Kickboxing",
    group: "Grupa zaawansowana",
    location: "Ring",
    tags: ["zaawansowani"],
  },

  // CZWARTEK
  {
    id: "thu-gim-1",
    day: "Czwartek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka",
    group: "Dzieci — nabór 4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "thu-akr-1",
    day: "Czwartek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "thu-akr-2",
    day: "Czwartek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11–14 lat",
    location: "Sala",
    tags: ["dzieci 11–14"],
  },
  {
    id: "thu-stretch",
    day: "Czwartek",
    start: "19:30",
    end: "21:00",
    title: "Stretching",
    group: "Wszystkie grupy + zewnętrzne",
    location: "Sala",
    tags: ["stretching"],
  },
  {
    id: "thu-aerial",
    day: "Czwartek",
    start: "21:00",
    end: "22:00",
    title: "Aerial Hoop (Koła)",
    location: "Sala",
    tags: ["aerial"],
  },
  {
    id: "thu-ges-1",
    day: "Czwartek",
    start: "16:00",
    end: "17:00",
    title: "Akrobatyka",
    group: "Szkoła GES — Kontynuacja 4–7 lat",
    location: "Szkoła GES",
    tags: ["dzieci 4–7"],
  },
  {
    id: "thu-ges-2",
    day: "Czwartek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 7–10 lat",
    location: "Szkoła GES",
    tags: ["dzieci 7–10"],
  },
  {
    id: "thu-ges-3",
    day: "Czwartek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Grupa naborowa 11–14 lat",
    location: "Szkoła GES",
    tags: ["dzieci 11–14"],
  },
  {
    id: "thu-ges-4",
    day: "Czwartek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka / Gimnastyka",
    group: "Wyczyn",
    location: "Szkoła GES",
    tags: ["wyczyn"],
  },
  {
    id: "thu-ring-1",
    day: "Czwartek",
    start: "18:15",
    end: "19:30",
    title: "Grappling",
    group: "Od podstaw",
    location: "Ring",
    tags: ["grappling"],
  },
  {
    id: "thu-ring-2",
    day: "Czwartek",
    start: "19:30",
    end: "20:45",
    title: "Kickboxing",
    group: "MIX",
    location: "Ring",
    tags: ["mix"],
  },
  {
    id: "thu-ring-3",
    day: "Czwartek",
    start: "20:45",
    end: "22:00",
    title: "Boks",
    location: "Ring",
    tags: ["boks"],
  },

  // PIĄTEK
  {
    id: "fri-ges-0",
    day: "Piątek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Szkoła GES — 4–7 nabór + kontynuacja",
    location: "Szkoła GES",
    tags: ["dzieci 4–7"],
  },
  {
    id: "fri-akr-1",
    day: "Piątek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 11–14 lat",
    location: "Sala",
    tags: ["dzieci 11–14"],
  },
  {
    id: "fri-gim-1",
    day: "Piątek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa + kontynuacja 4–7 lat",
    location: "Sala",
    tags: ["dzieci 4–7"],
  },
  {
    id: "fri-akr-2",
    day: "Piątek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 7–10 lat",
    location: "Sala",
    tags: ["dzieci 7–10"],
  },
  {
    id: "fri-akr-3",
    day: "Piątek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11–14 lat",
    location: "Sala",
    tags: ["dzieci 11–14"],
  },
  {
    id: "fri-ges-1",
    day: "Piątek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka / Gimnastyka",
    group: "Wyczyn",
    location: "Szkoła GES",
    tags: ["wyczyn"],
  },
  {
    id: "fri-aerial-1",
    day: "Piątek",
    start: "19:30",
    end: "21:00",
    title: "Aerial Silks / Aerial Hoop",
    location: "Sala",
    tags: ["aerial"],
  },
  {
    id: "fri-ring-1",
    day: "Piątek",
    start: "19:30",
    end: "20:45",
    title: "Kickboxing",
    group: "Grupa zaawansowana",
    location: "Ring",
    tags: ["zaawansowani"],
  },
  {
    id: "fri-ring-2",
    day: "Piątek",
    start: "20:45",
    end: "22:00",
    title: "Grupa zamknięta",
    location: "Ring",
    tags: ["zamknięta"],
  },

  // SOBOTA
  {
    id: "sat-akr-1",
    day: "Sobota",
    start: "09:00",
    end: "10:00",
    title: "Akrobatyka",
    group: "Początkujący",
    location: "Sala",
    tags: ["początkujący"],
  },
  {
    id: "sat-akr-2",
    day: "Sobota",
    start: "10:00",
    end: "11:00",
    title: "Akrobatyka",
    group: "Średniozaawansowani",
    location: "Sala",
    tags: ["średniozaawans."],
  },
  {
    id: "sat-akr-3",
    day: "Sobota",
    start: "11:00",
    end: "12:00",
    title: "Akrobatyka",
    group: "Początkujący",
    location: "Sala",
    tags: ["początkujący"],
  },
  {
    id: "sat-akr-4",
    day: "Sobota",
    start: "12:00",
    end: "13:30",
    title: "Akrobatyka",
    group: "Zaawansowani młodsi",
    location: "Sala",
    tags: ["zaawansowani"],
  },
  {
    id: "sat-wyczyn",
    day: "Sobota",
    start: "13:30",
    end: "15:00",
    title: "Akrobatyka Wyczyn+ / Gimnastyka Wyczyn",
    location: "Sala",
    tags: ["wyczyn"],
  },
  {
    id: "sat-ring-1",
    day: "Sobota",
    start: "11:00",
    end: "12:30",
    title: "Kickboxing",
    location: "Ring",
    tags: ["kickboxing"],
  },
  {
    id: "sat-info-1",
    day: "Sobota",
    start: "08:00",
    end: "20:00",
    title: "Treningi indywidualne",
    group: "Ustalane z trenerem prowadzącym",
    location: "Sala / Ring",
    tags: ["indywidualne"],
  },
];

export default function AbcPage() {
  const [activeDay, setActiveDay] = useState<Day>("Poniedziałek");
  const [query, setQuery] = useState("");
  const [loc, setLoc] = useState<string>("Wszystkie");
  const [cat, setCat] = useState<string>("Wszystkie");

  const categories = useMemo(() => {
    const set = new Set<string>();
    SCHEDULE.forEach((x) => set.add(x.title));
    return ["Wszystkie", ...Array.from(set).sort()];
  }, []);

  const locations = useMemo(() => {
    const set = new Set<string>();
    SCHEDULE.forEach((x) => x.location && set.add(x.location));
    return ["Wszystkie", ...Array.from(set).sort()];
  }, []);

  const dayItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHEDULE.filter((x) => x.day === activeDay)
      .filter((x) => (loc === "Wszystkie" ? true : x.location === loc))
      .filter((x) => (cat === "Wszystkie" ? true : x.title === cat))
      .filter((x) =>
        q
          ? [x.title, x.group, x.location, ...(x.tags ?? [])]
              .filter(Boolean)
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true
      )
      .sort(byTime);
  }, [activeDay, query, loc, cat]);

  return (
    <section className="Schedule">
      <div className="schedule-container">
        <header className="schedule-header">
          <h2 className="schedule-title">Grafik zajęć 2025/2026</h2>

          <div
            className="schedule-tabs"
            role="tablist"
            aria-label="Dni tygodnia"
          >
            {DAYS.map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={activeDay === d}
                className={`tab ${activeDay === d ? "is-active" : ""}`}
                onClick={() => setActiveDay(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="schedule-filters" aria-label="Filtry">
            <label className="filter">
              <span className="filter-label">Lokalizacja</span>
              <select
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                className="filter-input"
              >
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter">
              <span className="filter-label">Zajęcia</span>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="filter-input"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter filter-search">
              <span className="sr-only">Szukaj</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Szukaj: grupa, wiek, słowo kluczowe…"
                className="filter-input"
              />
            </label>
          </div>
        </header>

        <div className="schedule-list" role="list">
          {dayItems.length === 0 ? (
            <p className="empty">Brak zajęć dla wybranych filtrów.</p>
          ) : (
            dayItems.map((item) => (
              <article key={item.id} className="class-card" role="listitem">
                <div className="class-time">
                  <span className="time-start">{item.start}</span>
                  <span className="time-sep">–</span>
                  <span className="time-end">{item.end}</span>
                </div>

                <div className="class-main">
                  <div className="class-top">
                    <h3 className="class-title">{item.title}</h3>
                    {item.location && (
                      <span className="class-location">{item.location}</span>
                    )}
                  </div>

                  {item.group && <p className="class-group">{item.group}</p>}

                  {item.tags && item.tags.length > 0 && (
                    <ul className="class-tags">
                      {item.tags.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        <footer className="schedule-note">
          <p>
            * Grafik może ulegać drobnym zmianom. Aktualizacje publikujemy na
            bieżąco.
          </p>
        </footer>
      </div>
    </section>
  );
}
