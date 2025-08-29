"use client";

import React, { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import Navbar from "@/components/Navbar/Navbar";
import AbcHeadingPage from "@/components/Abc/AbcHeading/AbcHeading";
import Museums from "@/components/Abc/AbcList/Museums/Museums";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";

export default function MuseumsPage() {
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
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <AbcHeadingPage />
            <Museums />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
