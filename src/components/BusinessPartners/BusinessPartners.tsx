"use client";

import "./BusinessPartners.scss";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Multisport from "../../../public/BusinessPartners/profit.webp";
import BenefitSystems from "../../../public/BusinessPartners/benefitsystems.png";
import P1 from "../../../public/BusinessPartners/LOGO_POZnan_PL_RGB_PNG.png";
import P2 from "../../../public/BusinessPartners/MARSZALEK WOJ WLKP.png";
import P3 from "../../../public/BusinessPartners/OIP.png";
import P4 from "../../../public/BusinessPartners/POLSKA UNIA KARATE.png";
import P5 from "../../../public/BusinessPartners/PZG-LOGO__.png";
import P6 from "../../../public/BusinessPartners/PZKB.png";
import P7 from "../../../public/BusinessPartners/SWW_logo.png";
import P8 from "../../../public/BusinessPartners/WKF.png";

type Section = {
  id: string;
  marker: string;
  title: string;
  body: React.ReactNode;
};

function escRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlightString(text: string, q: string): React.ReactNode {
  if (!q) return text;
  const re = new RegExp(`(${escRe(q)})`, "ig");
  const parts = text.split(re);
  const ql = q.toLowerCase();
  return parts.map((p, i) =>
    p.toLowerCase() === ql ? (
      <mark key={i}>{p}</mark>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    )
  );
}
function highlightNode(node: React.ReactNode, q: string): React.ReactNode {
  if (!q) return node;
  if (typeof node === "string") return highlightString(node, q);
  if (typeof node === "number" || node === null || node === undefined)
    return node;
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <React.Fragment key={i}>{highlightNode(child, q)}</React.Fragment>
    ));
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (!props || props.children === undefined) return node;
    return React.cloneElement(node, props, highlightNode(props.children, q));
  }
  return node;
}

type PartnerLogo = { src: StaticImageData | string; alt: string };

const PARTNER_LOGOS: PartnerLogo[] = [
  { src: P1, alt: "Miasto Poznań" },
  { src: P2, alt: "Marszałek Województwa Wielkopolskiego" },
  { src: P3, alt: "OIP" },
  { src: P4, alt: "Polska Unia Karate" },
  { src: P5, alt: "Polski Związek Gimnastyczny" },
  { src: P6, alt: "Polski Związek Kickboxingu" },
  { src: P7, alt: "SWW" },
  { src: P8, alt: "WKF" },
];

const SECTIONS: Section[] = [
  {
    id: "s1",
    marker: "I.",
    title: "BENEFIT SYSTEMS",
    body: (
      <>
        <p>Akceptujemy karty Benefit Systems ..............</p>
        <figure
          className="BusinessPartners-mediaSlot"
          aria-label="Miejsce na logo Benefit Systems"
        >
          <Image
            src={BenefitSystems}
            alt="Benefit Systems"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              objectPosition: "50% 0%",
            }}
            priority={false}
          />
        </figure>
      </>
    ),
  },
  {
    id: "s2",
    marker: "II.",
    title: "FIT PROFIT",
    body: (
      <>
        <p>Akceptujemy karty Fit Profit ..............</p>
        <figure
          className="BusinessPartners-mediaSlot"
          aria-label="Miejsce na logo Fit Profit"
        >
          <Image
            src={Multisport}
            alt="Fit Profit"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              objectPosition: "50% 0%",
            }}
            priority={false}
          />
        </figure>
      </>
    ),
  },
  {
    id: "s3",
    marker: "III.",
    title: "PARTNERZY BIZNESOWI",
    body: (
      <>
        <p>
          Administrator stosuje tzw. pliki cookies – dane informatyczne
          zapisywane przez serwery internetowe na urządzeniu końcowym
          Użytkownika, które mogą być następnie odczytywane przez serwery
          internetowe przy każdorazowym połączeniu się z urządzeniem końcowym
          Użytkownika.
        </p>
        <div
          className="BusinessPartners-mediaGrid"
          role="group"
          aria-label="Logo partnerów"
        >
          {PARTNER_LOGOS.map((item, i) => (
            <figure
              className="BusinessPartners-mediaSlot"
              key={i}
              aria-label={`Logo partnera ${i + 1}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 200px"
                style={{ objectFit: "contain", objectPosition: "50% 50%" }}
                priority={false}
              />
            </figure>
          ))}
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [query, setQuery] = useState("");
  const [navIndex, setNavIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (id && SECTIONS.some((s) => s.id === id)) setActiveId(id);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter((s) =>
      `${s.marker} ${s.title}`.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    const idx = Math.max(
      0,
      filtered.findIndex((s) => s.id === activeId)
    );
    setNavIndex(idx === -1 ? 0 : idx);
  }, [filtered, activeId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${activeId}`);
      const el = document.getElementById(`panel-${activeId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeId]);

  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

  function onKeyNav(e: React.KeyboardEvent<HTMLElement>) {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(navIndex + 1, filtered.length - 1);
      setNavIndex(next);
      setActiveId(filtered[next].id);
      setShowAll(false);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(navIndex - 1, 0);
      setNavIndex(prev);
      setActiveId(filtered[prev].id);
      setShowAll(false);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setActiveId(filtered[navIndex].id);
      setShowAll(false);
    }
  }

  function copyLink() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#${activeId}`
        : `#${activeId}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url).finally(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      });
    }
  }

  function backToList() {
    const el = document.getElementById("pp-toc");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handlePrint() {
    const prev = showAll;
    setShowAll(true);
    const restore = () => {
      if (!prev) setShowAll(false);
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    setTimeout(() => window.print(), 0);
  }

  return (
    <main className="BusinessPartners-wrapper">
      <h1 className="BusinessPartners-title">Partnerzy biznesowi</h1>
      <section className="BusinessPartners-content">
        <div className="BusinessPartners-actions">
          <button className="btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Pokaż tylko wybrany" : "Pokaż wszystko"}
          </button>
          <button className="btn" onClick={handlePrint}>
            Drukuj PDF
          </button>
          <button className="btn" onClick={copyLink}>
            {copied ? "Skopiowano" : "Kopiuj link do sekcji"}
          </button>
        </div>
        <div className="BusinessPartners-grid">
          <aside
            className="BusinessPartners-sidenav"
            aria-label="Spis sekcji"
            onKeyDown={onKeyNav}
            tabIndex={0}
            id="pp-toc"
          >
            <h2 className="BusinessPartners-subtitle">
              Partnerzy biznesowi klubu Kuzi Sport
            </h2>
            <div className="BusinessPartners-search">
              <input
                type="search"
                placeholder="Szukaj w tytułach…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Szukaj w tytułach sekcji"
              />
            </div>
            <ul role="tablist" className="BusinessPartners-navlist">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={activeId === s.id}
                    aria-controls={`panel-${s.id}`}
                    id={`tab-${s.id}`}
                    className={
                      activeId === s.id
                        ? "BusinessPartners-navitem is-active"
                        : "BusinessPartners-navitem"
                    }
                    onClick={() => {
                      setActiveId(s.id);
                      setShowAll(false);
                    }}
                  >
                    <span className="BusinessPartners-navmarker">
                      {s.marker}
                    </span>
                    <span className="BusinessPartners-navtitle">
                      {highlightString(s.title, query)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <article className="BusinessPartners-panel">
            <button className="back-btn" onClick={backToList}>
              ← Spis treści
            </button>
            {showAll ? (
              SECTIONS.map((s) => (
                <section
                  className="BusinessPartners-block"
                  key={s.id}
                  id={`panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${s.id}`}
                >
                  <h3 className="BusinessPartners-heading">
                    <strong className="BusinessPartners-marker">
                      {s.marker}
                    </strong>{" "}
                    {s.title}
                  </h3>
                  <div className="BusinessPartners-text">
                    {highlightNode(s.body, query)}
                  </div>
                </section>
              ))
            ) : (
              <section
                className="BusinessPartners-block"
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
              >
                <h3 className="BusinessPartners-heading">
                  <strong className="BusinessPartners-marker">
                    {active.marker}
                  </strong>{" "}
                  {active.title}
                </h3>
                <div className="BusinessPartners-text">
                  {highlightNode(active.body, query)}
                </div>
              </section>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
