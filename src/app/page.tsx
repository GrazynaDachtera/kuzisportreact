"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Reviews from "../components/Reviews/Reviews";
import ProjectsHomePage from "../components/ProjectsHomePage/ProjectsHomePage";
import News from "../components/News/News";
import CtaContact from "../components/CtaContact/CtaContact";
import Footer from "../components/Footer/Footer";
import Cookies from "../components/Cookies/Cookies";
import Scrollbar from "smooth-scrollbar";
import "../app/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    let sb: Scrollbar | null = null;
    let setHeightToViewport: (() => void) | null = null;

    if (isCoarse) {
      // Native scroll on mobile: no fixed height
      el.style.removeProperty("height");
      el.style.overflowY = "auto";
      (
        el.style as unknown as { webkitOverflowScrolling?: string }
      ).webkitOverflowScrolling = "touch";
    } else {
      // Smooth Scrollbar on desktop: fix height to visual viewport
      const setter = () => {
        const vh = window.visualViewport?.height ?? window.innerHeight;
        el.style.height = `${vh}px`;
      };
      setHeightToViewport = setter;
      setter();
      window.addEventListener("resize", setter);
      window.visualViewport?.addEventListener("resize", setter);

      sb = Scrollbar.init(el, { damping: 0.07 });
    }

    const wheelOptions: AddEventListenerOptions = {
      capture: true,
      passive: true,
    };
    const captureOptions: AddEventListenerOptions = { capture: true };

    const allowZoomWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.stopImmediatePropagation();
        e.stopPropagation();
      }
    };

    const allowPinch = (e: Event) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
    };

    document.addEventListener("wheel", allowZoomWheel, wheelOptions);
    document.addEventListener(
      "gesturestart",
      allowPinch as EventListener,
      captureOptions
    );
    document.addEventListener(
      "gesturechange",
      allowPinch as EventListener,
      captureOptions
    );

    // Ensure we start at the top
    el.scrollTop = 0;

    return () => {
      document.removeEventListener("wheel", allowZoomWheel, wheelOptions);
      document.removeEventListener(
        "gesturestart",
        allowPinch as EventListener,
        captureOptions
      );
      document.removeEventListener(
        "gesturechange",
        allowPinch as EventListener,
        captureOptions
      );

      if (setHeightToViewport) {
        window.removeEventListener("resize", setHeightToViewport);
        window.visualViewport?.removeEventListener(
          "resize",
          setHeightToViewport
        );
      }
      if (sb) {
        sb.destroy();
        sb = null;
      }
    };
  }, []);

  return (
    <>
      {/* No fixed height here; desktop height is applied in JS only for Smooth Scrollbar */}
      <div ref={scrollRef} style={{ overflowX: "hidden", overflowY: "hidden" }}>
        <section className={`kuziSport ${poppins.className}`}>
          <div className="main">
            <Navbar />
          </div>
          <Header />
          <Reviews />
          <ProjectsHomePage />
          <News />
          <CtaContact />
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
