"use client";

import "./Regulations.scss";
import React, { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
  marker: string;
  body: string;
};

const SECTIONS: Section[] = [
  {
    id: "p1",
    marker: "1.",
    body: "W strefach treningowych mogą znajdować się tylko i wyłącznie osoby\ntrenujące na podstawie niniejszej umowy",
  },
  {
    id: "p2",
    marker: "2.",
    body: "W obrębie stref treningowych nie mogą przebywać rodzice oraz osoby\npostronne, niezaangażowane w trening",
  },
  {
    id: "p3",
    marker: "3.",
    body: "Trenujący przybywają na strefę nie później niż 5 minut przed\nrozpoczęciem treningu i są wprowadzani na salę przez trenera\nprowadzącego zajęcia",
  },
  {
    id: "p4",
    marker: "4.",
    body: "Po zakończeniu treningu udajemy się do szatni",
  },
  {
    id: "p5",
    marker: "5.",
    body: "Jeśli klubowicz chce zostać na sali po odbytym treningu, powinien\nudać się na antresolę",
  },
  {
    id: "p6",
    marker: "6.",
    body: "Właściciel obiektu nie odpowiada za rzeczy pozostawione w szatni",
  },
  {
    id: "p7",
    marker: "7.",
    body: `Na strefę treningową przychodzimy:\n- w stroju właściwym dyscyplinie, z wodą (najlepiej w bidonie–unikamy mnożenia odpadów z tworzyw sztucznych)\n- na boso, w baletkach lub skarpetkach antypoślizgowych (w przypadku akrobatyki)`,
  },
  {
    id: "p10",
    marker: "10.",
    body: "Po wejściu na strefę treningową siadamy we wskazanym dla grupy\noczekującej miejscu (ławka lub wydzielona strefa)",
  },
  {
    id: "p11",
    marker: "11.",
    body: "Przy każdej strefie treningowej znajduje się trójdzielny pojemnik w\nktórym pozostawiamy: zdjęte skarpetki, wodę mineralną i\nkosztowności tj. telefony , portfele, klucze i biżuterię",
  },
  {
    id: "p12",
    marker: "12.",
    body: "Zarówno w ramach treningu jak i podczas przebywania na antresoli\nnależy zachować spokój i kulturę, niezakłócające przebiegu treningu",
  },
  {
    id: "p13",
    marker: "13.",
    body: "Zabrania się przebywania na siłowni osób poniżej 16 roku życia.\nOsoby młodsze mogą przebywać w strefie siłowniowej tylko i\nwyłącznie w przypadku gdy wymaga tego przebieg zajęć\nprowadzonych pod okiem wykwalifikowanego trenera",
  },
  {
    id: "p14",
    marker: "14.",
    body: "Zabrania się samodzielnego emitowania muzyki lub zakłócania\nspokoju obiektu",
  },
  {
    id: "p15",
    marker: "15.",
    body: "Zabrania się spożywania jedzenia w strefach treningowych",
  },
  {
    id: "p16",
    marker: "16.",
    body: "Na terenie całego obiektu obowiązuje zakaz palenia papierosów,\nwyrobów nikotynowych, spożywania alkoholu",
  },
  {
    id: "p17",
    marker: "17.",
    body: "Zabrania się wprowadzania zwierząt na salę",
  },
  {
    id: "p18",
    marker: "18.",
    body: "Uprasza się o przestrzeganie kultury języka i wypowiadanie się z\nszacunkiem do współćwiczących",
  },
  {
    id: "p19",
    marker: "19.",
    body: "Na terenie obiektu przy ul. Św. Michała 50-56 obowiązuje\nograniczenie prędkości do 5km/h, niezależnie od środka\ntransportu. Prosimy o respektowanie ww. wymogu, gdyż\nnadmierna prędkość zagraża bezpieczeństwu i zdrowiu dzieci\nporuszających się po całym obiekcie",
  },
];

function escRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function oneLine(s: string) {
  return s.replace(/\n/g, " ");
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

export default function RegulationsPage() {
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

  const withTitles = useMemo(
    () => SECTIONS.map((s) => ({ ...s, title: oneLine(s.body) })),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return withTitles;
    return withTitles.filter((s) =>
      `${s.marker} ${s.title}`.toLowerCase().includes(q)
    );
  }, [query, withTitles]);

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

  const active = withTitles.find((s) => s.id === activeId) ?? withTitles[0];

  function onKeyNav(e: React.KeyboardEvent) {
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
    const el = document.getElementById("toc");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="regulations-wrapper">
      <section className="regulations-content">
        <div className="regulations-actions">
          <button className="btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Pokaż tylko wybrany" : "Pokaż wszystko"}
          </button>
          <button className="btn" onClick={copyLink}>
            {copied ? "Skopiowano" : "Kopiuj link do sekcji"}
          </button>
        </div>

        <div className="regulations-grid">
          <aside
            className="regulations-sidenav"
            aria-label="Spis paragrafów"
            onKeyDown={onKeyNav}
            tabIndex={0}
            id="toc"
          >
            <h2 className="regulations-subtitle">Regulamin KUZI SPORT</h2>
            <div className="regulations-search">
              <input
                type="search"
                placeholder="Szukaj paragrafu…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Szukaj w tytułach paragrafów"
              />
            </div>
            <ul role="tablist" className="regulations-navlist">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={activeId === s.id}
                    aria-controls={`panel-${s.id}`}
                    id={`tab-${s.id}`}
                    className={
                      activeId === s.id
                        ? "regulations-navitem is-active"
                        : "regulations-navitem"
                    }
                    onClick={() => {
                      setActiveId(s.id);
                      setShowAll(false);
                    }}
                  >
                    <span className="regulations-navmarker">{s.marker}</span>
                    <span className="regulations-navtitle">
                      {highlightString(s.title, query)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <article className="regulations-panel">
            <button className="back-btn" onClick={backToList}>
              ← Spis treści
            </button>

            {showAll ? (
              <div className="regulations-scroll">
                {filtered.map((s) => (
                  <section
                    className="regulations-block"
                    key={s.id}
                    id={`panel-${s.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${s.id}`}
                  >
                    <h3 className="regulations-heading">
                      <strong className="regulations-marker">{s.marker}</strong>{" "}
                      {s.title}
                    </h3>
                  </section>
                ))}
              </div>
            ) : (
              <section
                className="regulations-block"
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
              >
                <h3 className="regulations-heading">
                  <strong className="regulations-marker">
                    {active.marker}
                  </strong>{" "}
                  {active.title}
                </h3>
              </section>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
