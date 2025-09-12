"use client";

import Link from "next/link";
import "./KuziSportGymnastics.scss";

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
    className="KuziSportGymnastics-arrow-icon"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

const DISCIPLINES = [
  {
    name: "Akrobatyka sportowa",
    href: "/Sports/KuziSportGymnastics/Acrobatics",
  },
  {
    name: "Gimnastyka sportowa kobiet",
    href: "/Sports/KuziSportGymnastics/WomensGymnastics",
  },
  { name: "Akrobatyka powietrzna", href: "/Sports/KuziSportGymnastics/Aerial" },
  { name: "Parkour", href: "/Sports/KuziSportGymnastics/Parkour" },
  {
    name: "Street workout, kalistenika, freestyle na drążkach",
    href: "/Sports/KuziSportGymnastics/StreetWorkout",
  },
];

export default function ProjectsPage() {
  return (
    <main className="KuziSportGymnastics">
      <section className="KuziSportGymnastics-grid-wrapper">
        <div className="KuziSportGymnastics-container">
          <div className="KuziSportGymnastics-content">
            <h2 className="KuziSportGymnastics-title">
              Sporty Gimnastyczne - Kuzi Sport Gymnastics
            </h2>

            <nav className="KuziSportGymnastics-grid" role="list">
              {DISCIPLINES.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="KuziSportGymnastics-item"
                  role="listitem"
                >
                  <span className="KuziSportGymnastics-icon-wrapper">
                    <ArrowIcon />
                  </span>
                  <span className="KuziSportGymnastics-text">
                    <span className="KuziSportGymnastics-item-title">
                      {d.name}
                    </span>
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
