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
  // -------------------- PONIEDZIAŁEK --------------------
  {
    id: "mon-gim-1",
    day: "Poniedziałek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "mon-pk-1",
    day: "Poniedziałek",
    start: "16:00",
    end: "17:00",
    title: "Parkour",
    group: "Dzieci 4+",
    tags: ["dzieci 4+"],
  },
  {
    id: "mon-ges-1",
    day: "Poniedziałek",
    start: "16:00",
    end: "17:00",
    title: "Szkoła GES",
  },
  {
    id: "mon-kar-1",
    day: "Poniedziałek",
    start: "16:15",
    end: "17:00",
    title: "Karate",
    group: "4-7 lat",
    tags: ["dzieci 4-7"],
  },

  {
    id: "mon-pk-2",
    day: "Poniedziałek",
    start: "17:00",
    end: "18:00",
    title: "Parkour",
    group: "Dzieci 5-6 lat",
    tags: ["dzieci 5-6"],
  },
  {
    id: "mon-gim-2",
    day: "Poniedziałek",
    start: "17:00",
    end: "18:15",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa + kontynuacja 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "mon-ges-2",
    day: "Poniedziałek",
    start: "17:00",
    end: "18:15",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa 7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "mon-gim-3",
    day: "Poniedziałek",
    start: "17:00",
    end: "18:15",
    title: "Gimnastyka sportowa",
    group: "Kontynuacja 7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "mon-kar-2",
    day: "Poniedziałek",
    start: "17:00",
    end: "18:00",
    title: "Karate",
    group: "7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "mon-ring-1",
    day: "Poniedziałek",
    start: "17:15",
    end: "18:15",
    title: "Kickboxing",
    group: "Dzieci starsze i młodzież",
    tags: ["Ring", "młodzież"],
  },

  {
    id: "mon-pk-3",
    day: "Poniedziałek",
    start: "18:00",
    end: "19:00",
    title: "Parkour",
    group: "Dzieci 7-9 lat",
    tags: ["dzieci 7-9"],
  },
  {
    id: "mon-akr-1",
    day: "Poniedziałek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Grupa naborowa 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "mon-akr-2",
    day: "Poniedziałek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "mon-wyczyn-1",
    day: "Poniedziałek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka wyczyn+ / Gimnastyka wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "mon-ring-2",
    day: "Poniedziałek",
    start: "18:15",
    end: "19:30",
    title: "Kickboxing",
    group: "Prospekci Kickboxing (grupa rekreacyjno-sportowa)",
    tags: ["Ring", "prospekci"],
  },

  {
    id: "mon-pk-4",
    day: "Poniedziałek",
    start: "19:00",
    end: "20:00",
    title: "Parkour",
    group: "Dzieci 10-12 lat",
    tags: ["dzieci 10-12"],
  },
  {
    id: "mon-akr-3",
    day: "Poniedziałek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka",
    group: "Dorośli",
    tags: ["dorośli"],
  },
  {
    id: "mon-ges-3",
    day: "Poniedziałek",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Studenci",
    tags: ["studenci"],
  },
  {
    id: "mon-wyczyn-2",
    day: "Poniedziałek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka wyczyn+ / Gimnastyka wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "mon-ring-3",
    day: "Poniedziałek",
    start: "19:30",
    end: "20:45",
    title: "Kickboxing",
    group: "Grupa zawodnicza",
    tags: ["Ring", "zawodnicy"],
  },

  {
    id: "mon-pk-5",
    day: "Poniedziałek",
    start: "20:00",
    end: "21:00",
    title: "Parkour",
    group: "13+ i 18+",
    tags: ["młodzież", "dorośli"],
  },
  {
    id: "mon-ring-4",
    day: "Poniedziałek",
    start: "20:45",
    end: "22:00",
    title: "Zajęcia indywidualne",
    tags: ["Ring", "indywidualne"],
  },

  {
    id: "mon-pk-6",
    day: "Poniedziałek",
    start: "21:00",
    end: "22:00",
    title: "Parkour",
    group: "Dorośli od podstaw",
    tags: ["dorośli"],
  },
  {
    id: "mon-train-1",
    day: "Poniedziałek",
    start: "21:00",
    end: "22:00",
    title: "Train Station",
  },

  // -------------------- WTOREK --------------------
  {
    id: "tue-gim-1",
    day: "Wtorek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "tue-aerial-1",
    day: "Wtorek",
    start: "16:00",
    end: "17:00",
    title: "Aerial Hoop (Koła)",
    tags: ["aerial"],
  },

  {
    id: "tue-akr-1",
    day: "Wtorek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "tue-akr-2",
    day: "Wtorek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Kontynuacja 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "tue-akr-3",
    day: "Wtorek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "tue-akr-4",
    day: "Wtorek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Kontynuacja 7-10 lat",
    tags: ["dzieci 7-10"],
  },

  {
    id: "tue-akr-5",
    day: "Wtorek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "tue-akr-6",
    day: "Wtorek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Grupa naborowa 10-14 lat",
    tags: ["dzieci 10-14"],
  },
  {
    id: "tue-akr-wyczyn-1",
    day: "Wtorek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "tue-gim-wyczyn-1",
    day: "Wtorek",
    start: "18:15",
    end: "19:30",
    title: "Gimnastyka",
    group: "Wyczyn",
    tags: ["wyczyn"],
  },

  {
    id: "tue-gim-std",
    day: "Wtorek",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Studenci",
    tags: ["studenci"],
  },
  {
    id: "tue-akr-adults",
    day: "Wtorek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka",
    group: "Dorośli",
    tags: ["dorośli"],
  },
  {
    id: "tue-akr-wyczyn-2",
    day: "Wtorek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka",
    group: "Wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "tue-gim-wyczyn-2",
    day: "Wtorek",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Wyczyn",
    tags: ["wyczyn"],
  },

  {
    id: "tue-ring-1",
    day: "Wtorek",
    start: "20:45",
    end: "22:00",
    title: "Kickboxing",
    group: "Grupa zamknięta",
    tags: ["Ring", "zamknięta"],
  },

  // -------------------- ŚRODA --------------------
  {
    id: "wed-gim-1",
    day: "Środa",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "wed-kar-1",
    day: "Środa",
    start: "16:15",
    end: "17:00",
    title: "Karate",
    group: "4-7 lat",
    tags: ["dzieci 4-7"],
  },

  {
    id: "wed-pk-1",
    day: "Środa",
    start: "17:00",
    end: "18:00",
    title: "Parkour",
    group: "Dzieci 5-6 lat",
    tags: ["dzieci 5-6"],
  },
  {
    id: "wed-gim-2",
    day: "Środa",
    start: "17:00",
    end: "18:15",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa + kontynuacja 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "wed-akr-1",
    day: "Środa",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "wed-akr-2",
    day: "Środa",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Kontynuacja 7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "wed-kar-2",
    day: "Środa",
    start: "17:00",
    end: "18:00",
    title: "Karate",
    group: "7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "wed-kb-1",
    day: "Środa",
    start: "17:15",
    end: "18:15",
    title: "Kickboxing",
    group: "Dzieci starsze 12+",
    tags: ["Ring", "młodzież 12+"],
  },

  {
    id: "wed-pk-2",
    day: "Środa",
    start: "18:00",
    end: "19:00",
    title: "Parkour",
    group: "Dzieci 7-9 lat",
    tags: ["dzieci 7-9"],
  },
  {
    id: "wed-akr-3",
    day: "Środa",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Grupa naborowa 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "wed-akr-4",
    day: "Środa",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "wed-wyczyn-1",
    day: "Środa",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka wyczyn+ / Gimnastyka wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "wed-kb-2",
    day: "Środa",
    start: "18:15",
    end: "19:30",
    title: "Kickboxing",
    group: "Prospekci Kickboxing",
    tags: ["Ring", "prospekci"],
  },

  {
    id: "wed-pk-3",
    day: "Środa",
    start: "19:00",
    end: "20:00",
    title: "Parkour",
    group: "Dzieci 9-13 lat",
    tags: ["dzieci 9-13"],
  },
  {
    id: "wed-ext-1",
    day: "Środa",
    start: "19:30",
    end: "21:00",
    title: "Trening grupy zewnętrznej",
    tags: ["zewnętrzna"],
  },
  {
    id: "wed-gim-std",
    day: "Środa",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Studenci + dorośli",
    tags: ["studenci", "dorośli"],
  },
  {
    id: "wed-wyczyn-2",
    day: "Środa",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka wyczyn+ / Gimnastyka wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "wed-kb-3",
    day: "Środa",
    start: "19:30",
    end: "20:45",
    title: "Kickboxing",
    group: "Grupa zaawansowana",
    tags: ["Ring", "zaawansowani"],
  },

  {
    id: "wed-pk-4",
    day: "Środa",
    start: "20:00",
    end: "21:00",
    title: "Parkour",
    group: "13+ i 18+",
    tags: ["młodzież", "dorośli"],
  },

  {
    id: "wed-pk-5",
    day: "Środa",
    start: "21:00",
    end: "22:00",
    title: "Parkour",
    group: "Dorośli od podstaw",
    tags: ["dorośli"],
  },
  {
    id: "wed-train-1",
    day: "Środa",
    start: "21:00",
    end: "22:00",
    title: "Train Station",
    tags: ["train-station"],
  },
  {
    id: "wed-kb-ind",
    day: "Środa",
    start: "21:00",
    end: "22:00",
    title: "Kickboxing",
    group: "Indywidualne",
    tags: ["Ring", "indywidualne"],
  },

  // -------------------- CZWARTEK --------------------
  {
    id: "thu-gim-1",
    day: "Czwartek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Dzieci nabór 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "thu-aerial-1",
    day: "Czwartek",
    start: "16:00",
    end: "17:00",
    title: "Aerial Hoop (Koła)",
    tags: ["aerial"],
  },

  {
    id: "thu-akr-1",
    day: "Czwartek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "thu-akr-2",
    day: "Czwartek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Kontynuacja 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "thu-akr-3",
    day: "Czwartek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "thu-akr-4",
    day: "Czwartek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Kontynuacja 7-10 lat",
    tags: ["dzieci 7-10"],
  },

  {
    id: "thu-akr-5",
    day: "Czwartek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "thu-akr-6",
    day: "Czwartek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Grupa naborowa 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "thu-akr-wyczyn-1",
    day: "Czwartek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "thu-gim-wyczyn-1",
    day: "Czwartek",
    start: "18:15",
    end: "19:30",
    title: "Gimnastyka",
    group: "Wyczyn",
    tags: ["wyczyn"],
  },

  {
    id: "thu-grappling-1",
    day: "Czwartek",
    start: "18:15",
    end: "19:30",
    title: "Grappling",
    group: "Od podstaw",
    tags: ["Ring", "grappling"],
  },

  {
    id: "thu-gim-std",
    day: "Czwartek",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Studenci",
    tags: ["studenci"],
  },
  {
    id: "thu-akr-adults",
    day: "Czwartek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka",
    group: "Dorośli",
    tags: ["dorośli"],
  },
  {
    id: "thu-akr-wyczyn-2",
    day: "Czwartek",
    start: "19:30",
    end: "21:00",
    title: "Akrobatyka",
    group: "Wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "thu-gim-wyczyn-2",
    day: "Czwartek",
    start: "19:30",
    end: "21:00",
    title: "Gimnastyka",
    group: "Wyczyn",
    tags: ["wyczyn"],
  },

  {
    id: "thu-kb-mix",
    day: "Czwartek",
    start: "19:30",
    end: "20:45",
    title: "Kickboxing",
    group: "MIX",
    tags: ["Ring", "kickboxing", "mix"],
  },
  {
    id: "thu-boks-1",
    day: "Czwartek",
    start: "20:45",
    end: "22:00",
    title: "Boks",
    tags: ["Ring", "boks"],
  },

  {
    id: "thu-stretch",
    day: "Czwartek",
    start: "21:00",
    end: "22:00",
    title: "Stretching",
    group: "Wszystkie grupy + zewnętrzne",
    tags: ["stretching"],
  },
  {
    id: "thu-train-1",
    day: "Czwartek",
    start: "21:00",
    end: "22:00",
    title: "Train Station",
    tags: ["train-station"],
  },

  // -------------------- PIĄTEK --------------------
  {
    id: "fri-gim-1",
    day: "Piątek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa + kontynuacja 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "fri-gim-2",
    day: "Piątek",
    start: "16:00",
    end: "17:00",
    title: "Gimnastyka sportowa",
    group: "Grupa naborowa + kontynuacja 4-7 lat",
    tags: ["dzieci 4-7"],
  },
  {
    id: "fri-aerial-1",
    day: "Piątek",
    start: "16:00",
    end: "17:00",
    title: "Aerial Silks (Szarpy) / Aerial Hoop (Koła)",
    tags: ["aerial"],
  },

  {
    id: "fri-akr-1",
    day: "Piątek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "4-7 nabór + kontynuacja",
    tags: ["dzieci 4-7"],
  },
  {
    id: "fri-akr-2",
    day: "Piątek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Grupa naborowa 7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "fri-akr-3",
    day: "Piątek",
    start: "17:00",
    end: "18:15",
    title: "Akrobatyka",
    group: "Kontynuacja 7-10 lat",
    tags: ["dzieci 7-10"],
  },
  {
    id: "fri-ext-1",
    day: "Piątek",
    start: "17:00",
    end: "18:15",
    title: "Trening grupy zewnętrznej",
    tags: ["zewnętrzna"],
  },
  {
    id: "fri-aerial-2",
    day: "Piątek",
    start: "17:00",
    end: "18:15",
    title: "Aerial Hoop",
    tags: ["aerial"],
  },

  {
    id: "fri-akr-4",
    day: "Piątek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Grupa naborowa 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "fri-akr-5",
    day: "Piątek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka",
    group: "Średniozaawansowani 11-14 lat",
    tags: ["dzieci 11-14"],
  },
  {
    id: "fri-gim-wyczyn-1",
    day: "Piątek",
    start: "18:15",
    end: "19:30",
    title: "Gimnastyka wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "fri-akr-wyczyn-1",
    day: "Piątek",
    start: "18:15",
    end: "19:30",
    title: "Akrobatyka wyczyn",
    tags: ["wyczyn"],
  },

  {
    id: "fri-train-1",
    day: "Piątek",
    start: "21:00",
    end: "22:00",
    title: "Train Station",
    tags: ["train-station"],
  },

  // -------------------- SOBOTA --------------------
  {
    id: "sat-akr-1",
    day: "Sobota",
    start: "09:00",
    end: "10:00",
    title: "Akrobatyka",
    group: "Początkujący",
    tags: ["początkujący"],
  },
  {
    id: "sat-akr-2",
    day: "Sobota",
    start: "10:00",
    end: "11:00",
    title: "Akrobatyka",
    group: "Średniozaawansowani",
    tags: ["średniozaawans."],
  },
  {
    id: "sat-akr-3",
    day: "Sobota",
    start: "11:00",
    end: "12:00",
    title: "Akrobatyka",
    group: "Początkujący / Zaawansowani młodsi",
    tags: ["początkujący", "zaawansowani"],
  },
  {
    id: "sat-kb-1",
    day: "Sobota",
    start: "11:00",
    end: "12:30",
    title: "Kickboxing",
    tags: ["Ring", "kickboxing"],
  },
  {
    id: "sat-wyczyn-1",
    day: "Sobota",
    start: "12:00",
    end: "13:30",
    title: "Akrobatyka wyczyn+ / Gimnastyka wyczyn",
    tags: ["wyczyn"],
  },
  {
    id: "sat-events-1",
    day: "Sobota",
    start: "13:30",
    end: "15:00",
    title: "Grupy zewnętrzne / Eventy / Urodzinki",
    tags: ["zewnętrzna", "event"],
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
              <span className="filter-label">Rodzaj zajęć:</span>
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
              <span className="filter-label">Szukaj:</span>
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
                  <span className="time-sep">-</span>
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
