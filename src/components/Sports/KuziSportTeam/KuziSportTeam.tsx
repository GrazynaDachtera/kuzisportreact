"use client";

import Link from "next/link";
import "./KuziSportTeam.scss";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="butt"
    strokeLinejoin="miter"
    className="KuziSportTeam-arrow-icon"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

const ITEMS = [
  {
    name: "treningi uzupełniające dla wybranych dyscyplin (np. lekka atletyka, taniec, narciarstwo)",
    href: "/Sports/KuziSportTeam/SupplementaryTraining",
  },
  {
    name: "wycieczki szkolne i lekcje WF",
    href: "/Sports/KuziSportTeam/SchoolTrips",
  },
  {
    name: "eventy sportowe, pokazy",
    href: "/Sports/KuziSportTeam/SportEvents",
  },
  {
    name: "urodzinki sportowe",
    href: "/Sports/KuziSportTeam/SportsBirthday",
  },
  {
    name: "warsztaty wakacyjne, półkolonie i obozy sportowe",
    href: "/Sports/KuziSportTeam/Workshops",
  },
  {
    name: "staże i zloty ogólnopolskie, seminaria i zgrupowania, obozy dochodzeniowe",
    href: "/Sports/KuziSportTeam/Internships",
  },
  {
    name: "konsultacje dietetyczne, psycholog sportowy",
    href: "/Sports/KuziSportTeam/Consultations",
  },
  {
    name: "warsztaty, szkolenia trenerskie",
    href: "/Sports/KuziSportTeam/TrainerTrainings",
  },
  {
    name: "treningi dla firm",
    href: "/Sports/KuziSportTeam/TrainingsForCompanies",
  },
];

export default function ProjectsPage() {
  return (
    <main className="KuziSportTeam">
      <section className="KuziSportTeam-grid-wrapper">
        <div className="KuziSportTeam-container">
          <div className="KuziSportTeam-content">
            <h2 className="KuziSportTeam-title">
              Treningi dla klubów - Kuzi Sport Team
            </h2>

            <nav className="KuziSportTeam-grid" role="list">
              {ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="KuziSportTeam-item"
                  role="listitem"
                >
                  <span className="KuziSportTeam-icon-wrapper">
                    <ArrowIcon />
                  </span>
                  <span className="KuziSportTeam-text">
                    <span className="KuziSportTeam-item-title">{it.name}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
