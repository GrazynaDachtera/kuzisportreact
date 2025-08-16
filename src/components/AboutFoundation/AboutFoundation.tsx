"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "./AboutFoundation.scss";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="tl-check"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12l2.5 2.5L16 9" />
  </svg>
);

type AnimMode = "asc" | "desc" | "bottom-up";

export default function AboutFoundationPage() {
  const timeline = [
    {
      n: "01",
      year: "2024",
      points: [
        "Rozbudowa wolontariatu i cykliczne akcje porządkowe",
        "Program mikrodotacji dla inicjatyw sąsiedzkich",
        "Więcej zajęć dla dzieci i seniorów",
      ],
    },
    {
      n: "02",
      year: "2023",
      points: [
        "Nowe partnerstwa i wydarzenia lokalne",
        "Stałe konsultacje mieszkańców w sprawach dzielnicy",
      ],
    },
    {
      n: "03",
      year: "2022",
      points: ["Start cyklicznych spotkań sąsiedzkich"],
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || startedRef.current) return;

    const mode = (root.getAttribute("data-anim-mode") || "asc") as AnimMode;
    const items = Array.from(
      root.querySelectorAll<HTMLLIElement>(".tl-list-item")
    );
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || startedRef.current) return;

          startedRef.current = true;

          // Determine reveal order
          let ordered = [...items];
          if (mode === "desc") {
            ordered.reverse();
          } else if (mode === "bottom-up") {
            const rects = ordered.map((el) => ({
              el,
              top: el.getBoundingClientRect().top,
            }));
            rects.sort((a, b) => b.top - a.top);
            ordered = rects.map((r) => r.el);
          }

          const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          const step = prefersReduced ? 0 : 120;

          ordered.forEach((el, i) => {
            el.style.transitionDelay = `${i * step}ms`;
          });

          requestAnimationFrame(() => {
            ordered.forEach((el) => el.classList.add("is-visible"));
          });

          observer.disconnect();
        });
      },
      { root: null, threshold: 0.25 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="AboutFoundation">
      {/* O nas */}
      <div className="aboutfoundation-top-wrapper">
        <div className="aboutfoundation-container">
          <div className="aboutfoundation-top">
            <div className="aboutfoundation-image-wrapper">
              <Image
                src="/Sports/people.png"
                alt="grupa ludzi"
                width={652}
                height={336}
                className="aboutfoundation-image"
                priority
              />
            </div>
            <div className="aboutfoundation-content">
              <h2 className="aboutfoundation-title">Misja i wizja</h2>
              <p className="aboutfoundation-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                malesuada tincidunt turpis, pretium consequat ante mollis a.
                Nullam nec sapien nisi. Etiam pellentesque, justo vitae faucibus
                blandit, ex sem luctus ante, eu dictum magna est quis nunc.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HISTORIA / TIMELINE */}
      {/* Change data-anim-mode to: "asc" | "desc" | "bottom-up" */}
      <div
        className="foundation-timeline"
        data-anim-mode="desc"
        ref={sectionRef}
      >
        <div className="aboutfoundation-container">
          <div className="tl-header">
            <h2 className="tl-title">Historia Sąsiedzkiego Łazarza</h2>
            <p className="tl-lead">
              Krótki opis naszych działań i rozwoju. Działamy blisko ludzi,
              wspierając oddolne inicjatywy, integrując mieszkańców i
              upiększając wspólną przestrzeń.
            </p>
          </div>

          <div className="tl-wrap">
            <div className="tl-line" aria-hidden="true" />

            {timeline.map((item, idx) => (
              <div className="tl-item" key={idx}>
                <div className="tl-node">
                  <span>{item.n}</span>
                </div>

                <div className="tl-right">
                  <div className="tl-year">{item.year}</div>
                  <ul className="tl-list">
                    {item.points.map((p, i) => (
                      <li className="tl-list-item" key={i}>
                        <span className="tl-bullet">
                          <CheckIcon />
                        </span>
                        <span className="tl-text">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
