"use client";

import React, { useMemo, useState, useId } from "react";
import "./Schedule.scss";

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
  start: string;
  end: string;
  title: string;
  group?: string;
  location?: string;
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

const SCHEDULE: ScheduleItem[] = [
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
    group: "Grupa naborowa 7–10 lat",
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
    title: "Kickboxing",
    group: "Zajęcia indywidualne",
    location: "Ring",
  },

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
    id: "tue-aerial-1",
    day: "Wtorek",
    start: "21:00",
    end: "22:00",
    title: "Aerial Hoop (Koła)",
    location: "Sala",
    tags: ["aerial"],
  },

  {
    id: "tue-ges-1",
    day: "Wtorek",
    start: "16:00",
    end: "17:00",
    title: "Akrobatyka",
    group: "Kontynuacja 4–7 lat",
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
    id: "wed-ges-1",
    day: "Środa",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Nabór + Kontynuacja 4–7 lat",
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
    id: "wed-ges-ext",
    day: "Środa",
    start: "19:30",
    end: "21:00",
    title: "Trening grupy zewnętrznej",
    location: "Szkoła GES",
    tags: ["zewnętrzna"],
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
    id: "wed-ring-0",
    day: "Środa",
    start: "17:15",
    end: "18:15",
    title: "Kickboxing",
    group: "Dzieci starsze 12+",
    location: "Ring",
    tags: ["młodzież 12+"],
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
  {
    id: "wed-ring-3",
    day: "Środa",
    start: "20:45",
    end: "22:00",
    title: "Kickboxing",
    group: "Zajęcia indywidualne",
    location: "Ring",
  },

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
    id: "thu-gim-std",
    day: "Czwartek",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Studenci",
    location: "Sala",
    tags: ["studenci"],
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
    group: "Kontynuacja 4–7 lat",
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
    id: "fri-ges-ext",
    day: "Piątek",
    start: "19:30",
    end: "21:00",
    title: "Trening grupy zewnętrznej",
    location: "Szkoła GES",
    tags: ["zewnętrzna"],
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
    title: "Aerial Silks (Szarfy) / Aerial Hoop (Koła)",
    location: "Sala",
    tags: ["aerial"],
  },
  {
    id: "fri-aerial-2",
    day: "Piątek",
    start: "21:00",
    end: "22:00",
    title: "Aerial Hoop (Koła)",
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
    title: "Kickboxing",
    group: "Grupa zamknięta",
    location: "Ring",
    tags: ["zamknięta"],
  },

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
    id: "sat-events",
    day: "Sobota",
    start: "09:00",
    end: "15:00",
    title: "Grupy zewnętrzne / Eventy / Urodzinki",
    location: "Sala",
    tags: ["zewnętrzna", "event"],
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

const byTime = (a: ScheduleItem, b: ScheduleItem) =>
  a.start.localeCompare(b.start);

export default function AbcPage() {
  const [activeDay, setActiveDay] = useState<Day>("Poniedziałek");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Wszystkie");

  const selectId = useId();
  const searchId = useId();

  const categories = useMemo<string[]>(() => {
    const set = new Set<string>();
    SCHEDULE.forEach((x: ScheduleItem) => set.add(x.title));
    return ["Wszystkie", ...Array.from(set).sort()];
  }, []);

  const dayItems = useMemo<ScheduleItem[]>(() => {
    const q = query.trim().toLowerCase();
    return SCHEDULE.filter((x: ScheduleItem) => x.day === activeDay)
      .filter((x: ScheduleItem) =>
        cat === "Wszystkie" ? true : x.title === cat
      )
      .filter((x: ScheduleItem) =>
        q
          ? [x.title, x.group, ...(x.tags ?? [])]
              .filter(Boolean)
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true
      )
      .sort(byTime);
  }, [activeDay, query, cat]);

  const onTabsKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const i = DAYS.indexOf(activeDay);
    if (e.key === "ArrowRight") setActiveDay(DAYS[(i + 1) % DAYS.length]);
    else if (e.key === "ArrowLeft")
      setActiveDay(DAYS[(i - 1 + DAYS.length) % DAYS.length]);
  };

  const clearDisabled = cat === "Wszystkie" && query.trim() === "";
  const clearFilters = () => {
    setCat("Wszystkie");
    setQuery("");
  };

  return (
    <section className="Schedule" aria-labelledby="schedule-heading">
      <div className="schedule-container">
        <header className="schedule-header">
          <h2 id="schedule-heading" className="schedule-title">
            Grafik zajęć 2025/2026
          </h2>

          <div
            className="schedule-tabs"
            role="tablist"
            aria-label="Dni tygodnia"
            onKeyDown={onTabsKeyDown}
          >
            {DAYS.map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={activeDay === d}
                aria-controls={`panel-${d}`}
                className={`tab ${activeDay === d ? "is-active" : ""}`}
                onClick={() => setActiveDay(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="schedule-filters" aria-label="Filtry">
            <label className="filter" htmlFor={selectId}>
              <span className="filter-label">Zajęcia</span>
              <select
                id={selectId}
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="filter-input"
              >
                {categories.map((c: string) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="filter filter-search" htmlFor={searchId}>
              <span className="filter-label">Szukaj</span>
              <input
                id={searchId}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Szukaj: grupa, wiek, słowo kluczowe…"
                className="filter-input"
                type="search"
                inputMode="search"
              />
            </label>

            <div className="filters-actions">
              <button
                type="button"
                className="clear-btn"
                aria-label="Wyczyść wszystkie filtry"
                onClick={clearFilters}
                disabled={clearDisabled}
                title="Wyczyść wszystkie filtry"
              >
                <svg
                  className="clear-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="clear-label">Wyczyść</span>
              </button>
            </div>
          </div>

          <div className="sr-only" role="status" aria-live="polite">
            {dayItems.length} wyników dla {activeDay}
          </div>
        </header>

        <div
          className="schedule-list"
          role="list"
          id={`panel-${activeDay}`}
          aria-labelledby="schedule-heading"
        >
          {dayItems.length === 0 ? (
            <p className="empty">Brak zajęć dla wybranych filtrów.</p>
          ) : (
            dayItems.map((item: ScheduleItem) => (
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
                      <span className="class-loc" aria-label="Lokalizacja">
                        {item.location}
                      </span>
                    )}
                  </div>

                  {item.group && <p className="class-group">{item.group}</p>}

                  {item.tags && item.tags.length > 0 && (
                    <ul className="class-tags">
                      {item.tags.map((t: string) => (
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
