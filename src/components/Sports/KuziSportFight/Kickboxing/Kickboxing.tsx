"use client";

import Link from "next/link";
import "./KuziSportFight.scss";

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
    className="KuziSportFight-arrow-icon"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7 7 L17 17" />
    <path d="M17 7 L17 17 L7 17" />
  </svg>
);

const DISCIPLINES = [
  { name: "K1 kickboxing", href: "/k1-kickboxing" },
  { name: "Karate", href: "/karate" },
  { name: "Boks", href: "/boks" },
  { name: "Grappling", href: "/grappling" },
];

export default function KuziSportFightPage() {
  return (
    <main className="KuziSportFight">
      <section className="KuziSportFight-grid-wrapper">
        <div className="KuziSportFight-container">
          <div className="KuziSportFight-content">
            <h2 className="KuziSportFight-title">
              Sporty Walki - Kuzi Sport Fight
            </h2>

            <nav className="KuziSportFight-grid" role="list">
              {DISCIPLINES.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="KuziSportFight-item"
                  role="listitem"
                >
                  <span className="KuziSportFight-icon-wrapper">
                    <ArrowIcon />
                  </span>
                  <span className="KuziSportFight-text">
                    <span className="KuziSportFight-item-title">{d.name}</span>
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
