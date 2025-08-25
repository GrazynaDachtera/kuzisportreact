"use client";

import "./PrivacyPolicy.scss";
import React, { useEffect, useMemo, useState } from "react";

type Section = {
  id: string;
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

const SECTIONS: Section[] = [
  {
    id: "s1",
    title: "Definicje",
    body: (
      <>
        <p>
          <strong>Administrator</strong> – Sąsiedzki Łazarz, ul. Ułańska 5,
          60-748 Poznań, NIP: 7792584284, REGON: 540869932, tel.{" "}
          <a href="tel:+48605550370">605&nbsp;550&nbsp;370</a>,{" "}
          <a href="mailto:kontakt@sasiedzkilazarz.pl">
            kontakt@sasiedzkilazarz.pl
          </a>
          .
        </p>
        <p>
          <strong>Dane osobowe</strong> – wszelkie informacje o zidentyfikowanej
          lub możliwej do zidentyfikowania osobie fizycznej.
        </p>
        <p>
          <strong>Polityka</strong> – niniejsza polityka prywatności Strony{" "}
          <a
            href="https://sasiedzkilazarz.pl"
            target="_blank"
            rel="noopener noreferrer"
          >
            sasiedzkilazarz.pl
          </a>
          .
        </p>
        <p>
          <strong>RODO</strong> – Rozporządzenie (UE) 2016/679 Parlamentu
          Europejskiego i Rady z dnia 27 kwietnia 2016 r.
        </p>
        <p>
          <strong>Ustawa</strong> – ustawa z dnia 10 maja 2018 r. o ochronie
          danych osobowych (Dz. U. z 2019 r. poz. 1781).
        </p>
        <p>
          <strong>Użytkownik</strong> – każda osoba fizyczna odwiedzająca Stronę
          lub korzystająca z jej usług.
        </p>
      </>
    ),
  },
  {
    id: "s2",
    title: "Dane osobowe – cele i podstawy",
    body: (
      <>
        <p>
          Administrator przetwarza dane osobowe Użytkowników Strony{" "}
          <a
            href="https://sasiedzkilazarz.pl"
            target="_blank"
            rel="noopener noreferrer"
          >
            sasiedzkilazarz.pl
          </a>
          .
        </p>
        <p>Dane są przetwarzane w następujących celach:</p>
        <ul className="privacyPolicy-sublist">
          <li>
            świadczenie usług drogą elektroniczną, obsługa zapytań, rezerwacji,
            zamówień i reklamacji — <em>art. 6 ust. 1 lit. b RODO</em>;
          </li>
          <li>
            działania marketingowe i promocyjne (np. newsletter, SMS) —{" "}
            <em>art. 6 ust. 1 lit. a RODO</em>;
          </li>
          <li>
            analityka i statystyka dla poprawy funkcjonalności —{" "}
            <em>art. 6 ust. 1 lit. f RODO</em>;
          </li>
          <li>
            wykrywanie nadużyć, ustalenie odpowiedzialności, dochodzenie
            roszczeń — <em>art. 6 ust. 1 lit. f RODO</em>.
          </li>
        </ul>
        <p>
          Dane mogą być ujawniane podmiotom przetwarzającym na podstawie umów
          powierzenia (art. 28 RODO), podmiotom, którym Administrator udostępnia
          dane oraz podmiotom uprawnionym na mocy przepisów prawa.
        </p>
      </>
    ),
  },
  {
    id: "s3",
    title: "Okres przetwarzania i prawa Użytkownika",
    body: (
      <>
        <p>
          Okres przetwarzania zależy od usługi i celu; co do zasady do czasu
          świadczenia usługi lub do wycofania zgody / skutecznego sprzeciwu, a
          także dłużej w zakresie niezbędnym do dochodzenia lub obrony roszczeń.
          Po upływie okresów dane są usuwane lub anonimizowane.
        </p>
        <p>
          Użytkownikowi przysługuje prawo: dostępu, sprostowania, usunięcia,
          ograniczenia przetwarzania, sprzeciwu, przenoszenia danych oraz prawo
          wniesienia skargi do Prezesa UODO. Zgody mogą być wycofane w dowolnym
          momencie, bez wpływu na zgodność z prawem przetwarzania sprzed
          wycofania.
        </p>
        <p>
          Podanie danych oznaczonych jako obowiązkowe może być wymagane do
          realizacji usług; ich niepodanie może uniemożliwić świadczenie usług.
          Pozostałe dane są dobrowolne.
        </p>
        <p>
          Dane przetwarzane w celach marketingowych nie są profilowane ani
          przetwarzane w sposób zautomatyzowany.
        </p>
      </>
    ),
  },
  {
    id: "s4",
    title: "Pliki cookies",
    body: (
      <>
        <p>
          Administrator stosuje pliki cookies w celu świadczenia usług na
          najwyższym poziomie, dopasowania treści oraz w celach reklamowych i
          statystycznych.
        </p>
        <p>
          Użytkownik może zmienić ustawienia cookies w przeglądarce (w tym je
          zablokować lub usunąć). Brak zmiany ustawień oznacza zgodę na ich
          stosowanie zgodnie z ustawieniami przeglądarki.
        </p>
      </>
    ),
  },
  {
    id: "s5",
    title: "Kontakt",
    body: (
      <p>
        W sprawach polityki prywatności prosimy o kontakt:{" "}
        <a href="mailto:kontakt@sasiedzkilazarz.pl">
          kontakt@sasiedzkilazarz.pl
        </a>{" "}
        lub korespondencyjnie: Sąsiedzki Łazarz, ul. Ułańska 5, 60-748 Poznań z
        dopiskiem „dane osobowe”.
      </p>
    ),
  },
  {
    id: "s6",
    title: "Postanowienia końcowe",
    body: (
      <ul className="privacyPolicy-sublist">
        <li>Polityka jest weryfikowana i aktualizowana w razie potrzeby.</li>
        <li>
          O istotnych zmianach Użytkownik może zostać poinformowany np.
          e-mailem.
        </li>
        <li>Aktualna wersja obowiązuje od dnia 28 kwietnia 2022 r.</li>
      </ul>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [query, setQuery] = useState("");
  const [navIndex, setNavIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter((s) => `${s.title}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const id =
      typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (id && SECTIONS.some((s) => s.id === id)) setActiveId(id);
  }, []);

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

  function onKeyNav(e: React.KeyboardEvent) {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(navIndex + 1, filtered.length - 1);
      setNavIndex(next);
      setActiveId(filtered[next].id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(navIndex - 1, 0);
      setNavIndex(prev);
      setActiveId(filtered[prev].id);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setActiveId(filtered[navIndex].id);
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

  return (
    <main className="privacyPolicy-wrapper">
      <h1 className="privacyPolicy-title">Polityka prywatności</h1>

      <section className="privacyPolicy-content">
        <div className="privacyPolicy-actions">
          <button className="btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Pokaż tylko wybraną" : "Pokaż wszystko"}
          </button>
          <button className="btn" onClick={() => window.print()}>
            Drukuj PDF
          </button>
          <button className="btn" onClick={copyLink}>
            {copied ? "Skopiowano" : "Kopiuj link do sekcji"}
          </button>
        </div>

        <div className="privacyPolicy-grid">
          <aside
            className="privacyPolicy-sidenav"
            aria-label="Spis sekcji"
            onKeyDown={onKeyNav}
            tabIndex={0}
            id="pp-toc"
          >
            <h2 className="privacyPolicy-subtitle">
              Polityka prywatności Sąsiedzki Łazarz
            </h2>
            <div className="privacyPolicy-search">
              <input
                type="search"
                placeholder="Szukaj w tytułach…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Szukaj w tytułach sekcji"
              />
            </div>
            <ul role="tablist" className="privacyPolicy-navlist">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={activeId === s.id}
                    aria-controls={`panel-${s.id}`}
                    id={`tab-${s.id}`}
                    className={
                      activeId === s.id
                        ? "privacyPolicy-navitem is-active"
                        : "privacyPolicy-navitem"
                    }
                    onClick={() => setActiveId(s.id)}
                  >
                    <span className="privacyPolicy-navtitle">
                      {highlightString(s.title, query)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <article className="privacyPolicy-panel">
            <button className="back-btn" onClick={backToList}>
              ← Spis treści
            </button>

            {showAll ? (
              SECTIONS.map((s) => (
                <section
                  className="privacyPolicy-block"
                  key={s.id}
                  id={`panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${s.id}`}
                >
                  <h3 className="privacyPolicy-heading">{s.title}</h3>
                  <div className="privacyPolicy-text">
                    {query ? highlightNode(s.body, query) : s.body}
                  </div>
                </section>
              ))
            ) : (
              <section
                className="privacyPolicy-block"
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
              >
                <h3 className="privacyPolicy-heading">{active.title}</h3>
                <div className="privacyPolicy-text">
                  {query ? highlightNode(active.body, query) : active.body}
                </div>
              </section>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
