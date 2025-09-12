"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import SportsHeading from "@/components/Sports/SportsHeading/SportsHeading";
import Ems from "@/components/Sports/KuziSportPerformance/Ems/Ems";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function KuziSportPerformanceSubpage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <SportsHeading />
            <Ems />
          </div>
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
