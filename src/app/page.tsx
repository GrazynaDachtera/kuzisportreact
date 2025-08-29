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
    if (!isCoarse) {
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
      if (sb) {
        sb.destroy();
        sb = null;
      }
    };
  }, []);

  return (
    <>
      <div ref={scrollRef} style={{ height: "100vh", overflow: "hidden" }}>
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
