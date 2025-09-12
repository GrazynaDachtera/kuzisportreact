"use client";

import Link from "next/link";
import "./KuziSportPerformance.scss";

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
    className="KuziSportPerformance-arrow-icon"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

const DISCIPLINES = [
  {
    name: "Treningi motoryczne dla klubów sportowych",
    href: "/treningi-motoryczne-kluby",
  },
  { name: "Trening obwodowy Train Station", href: "/train-station" },
  {
    name: "Treningi personalne na siłowni (uzupełniające, wzmacniające, terapeutyczne, BPS) oraz treningi indywidualne w obrębie wybranych dyscyplin",
    href: "/treningi-personalne-i-indywidualne",
  },
  {
    name: "EMS (Elektrostymulacja mięśniowa) oraz Drenaż limfatyczny",
    href: "/ems-drenaz-limfatyczny",
  },
  {
    name: "Zajęcia z fizjoterapeutą, zajęcia rehabilitacyjne",
    href: "/fizjoterapia-rehabilitacja",
  },
];

export default function KuziSportPerformancesPage() {
  return (
    <main className="KuziSportPerformance">
      <section className="KuziSportPerformance-grid-wrapper">
        <div className="KuziSportPerformance-container">
          <div className="KuziSportPerformance-content">
            <h2 className="KuziSportPerformance-title">
              Treningi motoryczne - Kuzi Sport Performance
            </h2>

            <nav className="KuziSportPerformance-grid" role="list">
              {DISCIPLINES.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="KuziSportPerformance-item"
                  role="listitem"
                >
                  <span className="KuziSportPerformance-icon-wrapper">
                    <ArrowIcon />
                  </span>
                  <span className="KuziSportPerformance-text">
                    <span className="KuziSportPerformance-item-title">
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
