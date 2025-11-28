"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";
import "./NewsPage.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (dom?: Element | null) => void;
      };
    };
  }
}

type Article = {
  href: string;
  thumbnail: string;
  category: string;
  title: string;
};

const ARTICLES: Article[] = [
  {
    href: "https://www.facebook.com/photo?fbid=765844246432833&set=a.182448548105742&locale=pl_PL",
    thumbnail: "/News/smallimage1.jpg",
    category: "PETYCJE · PARK · HETMAŃSKA",
    title: `🌳Aktualizacja! 📩
19 września petycje w sprawie parku–sadu na południe od ulicy Hetmańskiej trafiły do:
✅️ Rady Miasta Poznania
✅️ oraz do Prezydenta Poznania.`,
  },
  {
    href: "https://www.facebook.com/sasiedzkilazarz/videos/1620423938934155/?locale=pl_PL",
    thumbnail: "/News/smallimage2.png",
    category: "REWITALIZACJA · WIELKOPOLSKA · KONFERENCJA",
    title:
      "Dzisiaj mieliśmy okazję posłuchać o rewitalizacji w Wielkopolsce, dzięki udziałowi w konferencji „Rewitalizacja się opłaca! Jak inwestować w odnowę przestrzeni i rozwój społeczności”, zorganizowanej przez Wielkopolski Fundusz Rozwoju.",
  },
  {
    href: "https://www.facebook.com/photo.php?fbid=762593770091214&set=pb.100090217936902.-2207520000&type=3&locale=pl_PL",
    thumbnail: "/News/smallimage3.jpg",
    category: "JESIEŃ · BLAJBA · WERNISAŻ",
    title: `🍂 No i mamy jesień! 🌥️
Słońce wstaje później, dzień robi się coraz krótszy, a wieczory z cieplym kocem wygrywają z innymi rozrywkami☕🍁`,
  },
];

export default function NewsSubpage() {
  const fbHostRef = useRef<HTMLDivElement | null>(null);
  const newsColRef = useRef<HTMLDivElement | null>(null);

  const lastSizeRef = useRef<{ w: number; h: number } | null>(null);
  const loadedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const renderPlugin = useCallback(() => {
    const host = fbHostRef.current;
    if (!host) return;

    const el = host.querySelector(".fb-page") as HTMLElement | null;
    if (!el) return;

    const width = Math.max(280, Math.min(500, host.clientWidth));

    const rightHeight = newsColRef.current?.clientHeight ?? 0;
    const viewportHeight = Math.floor(window.innerHeight * 0.85);
    const height = Math.max(
      700,
      Math.min(1200, Math.max(rightHeight, viewportHeight))
    );

    const last = lastSizeRef.current;
    const changedEnough =
      !last || Math.abs(last.w - width) > 6 || Math.abs(last.h - height) > 12;
    if (!changedEnough && loadedRef.current) return;

    lastSizeRef.current = { w: width, h: height };

    el.setAttribute("data-width", String(width));
    el.setAttribute("data-height", String(height));

    if (window.FB) {
      window.FB.XFBML.parse(host);
      if (!loadedRef.current) {
        loadedRef.current = true;
        setLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!document.getElementById("fb-root")) {
      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }

    if (window.FB) {
      renderPlugin();
    } else if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.src =
        "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v20.0";
      script.onload = () => renderPlugin();
      document.body.appendChild(script);
    }

    let t: number | undefined;
    const schedule = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => renderPlugin(), 120);
    };

    const ro = new ResizeObserver(schedule);
    if (fbHostRef.current) ro.observe(fbHostRef.current);
    if (newsColRef.current) ro.observe(newsColRef.current);

    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [renderPlugin]);

  return (
    <main className={`${poppins.className} newsPage`}>
      <section className="newsPage__wall">
        <div className="newsPage__container">
          <div className="newsPage__grid">
            <aside
              className="panel panel--fb"
              aria-label="Aktualności z Facebooka"
            >
              <div className="panel__head">
                <h2 className="panel__title">Facebook</h2>
                <p className="panel__subtitle">Najnowsze posty i wydarzenia</p>
              </div>

              {!loaded && (
                <div className="newsPage-skeleton" aria-hidden="true">
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                </div>
              )}

              <div ref={fbHostRef} className="fb-wrapper">
                <div className="fb-frame">
                  <div
                    className="fb-page"
                    data-href="https://www.facebook.com/kuzisport"
                    data-tabs="timeline"
                    data-width=""
                    data-height=""
                    data-hide-cover="false"
                    data-show-facepile="true"
                    data-adapt-container-width="true"
                  >
                    <blockquote
                      cite="https://www.facebook.com/kuzisport"
                      className="fb-xfbml-parse-ignore"
                    >
                      <a href="https://www.facebook.com/kuzisport">
                        Kuzi Sport na Facebooku
                      </a>
                    </blockquote>
                  </div>
                </div>
              </div>

              <div className="panel__footer">
                <a
                  className="panel__pill"
                  href="https://www.facebook.com/kuzisport/?locale=pl_PL"
                  target="_blank"
                  rel="noreferrer"
                >
                  Otwórz stronę na Facebooku →
                </a>
              </div>
            </aside>

            <section
              ref={newsColRef}
              className="panel panel--news"
              aria-label="Blog"
            >
              <div className="panel__head">
                <h2 className="panel__title">Blog</h2>
                <p className="panel__subtitle">Przegląd wydarzeń</p>
              </div>

              <div className="news-list">
                {ARTICLES.map((a, i) => (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-item"
                    key={i}
                    aria-label={`${a.category}: ${a.title} — otwiera się w nowej karcie`}
                  >
                    <div className="news-thumb" aria-hidden="true">
                      <Image
                        src={a.thumbnail}
                        alt={a.title}
                        width={140}
                        height={110}
                        priority={i === 0}
                      />
                    </div>

                    <div className="news-copy">
                      <span className="news-category">{a.category}</span>
                      <p className="news-title">{a.title}</p>
                      <span className="news-cta" aria-hidden="true">
                        Czytaj →
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="panel__footer">
                <a
                  className="panel__pill"
                  href="https://www.facebook.com/kuzisport/?locale=pl_PL"
                  target="_blank"
                  rel="noreferrer"
                >
                  Więcej aktualności na Facebooku →
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
