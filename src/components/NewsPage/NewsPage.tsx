"use client";

import { useEffect, useRef, useState } from "react";
import "./NewsPage.scss";

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (dom?: Element | null) => void;
      };
    };
  }
}

export default function NewsSubpage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const renderPlugin = () => {
    const root = containerRef.current;
    if (!root) return;

    const el = root.querySelector(".fb-page") as HTMLElement | null;
    if (!el) return;

    const width = root.clientWidth;
    const height = Math.max(43.75 * 16, Math.floor(window.innerHeight * 0.9)); // min ~700px

    el.setAttribute("data-width", String(width));
    el.setAttribute("data-height", String(height));

    if (window.FB) {
      window.FB.XFBML.parse(root);
      setLoaded(true);
    }
  };

  useEffect(() => {
    const tryParse = () => renderPlugin();

    if (!document.getElementById("fb-root")) {
      const fbRoot: HTMLDivElement = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }

    if (window.FB) {
      tryParse();
    } else if (!document.getElementById("facebook-jssdk")) {
      const script: HTMLScriptElement = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.src =
        "https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v20.0";
      script.onload = () => tryParse();
      document.body.appendChild(script);
    }

    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => renderPlugin(), 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <main className="newsPage-wrapper">
      <section className="newsPage-wall">
        <div className="newsPage-container">
          {!loaded && (
            <div className="newsPage-skeleton" aria-hidden="true">
              <div className="skeleton-line" />
              <div className="skeleton-line" />
              <div className="skeleton-line" />
            </div>
          )}

          <div ref={containerRef} className="fb-wrapper">
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

          <p className="newsPage-fallback">
            Nie widzisz wtyczki?{" "}
            <a
              href="https://www.facebook.com/kuzisport/?locale=pl_PL"
              target="_blank"
              rel="noreferrer"
            >
              Otwórz stronę na Facebooku
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
