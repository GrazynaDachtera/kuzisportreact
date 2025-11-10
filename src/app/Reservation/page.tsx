"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import ReservationHeading from "@/components/Reservation/ReservationHeading/ReservationHeading";
import Reservation from "@/components/Reservation/Reservation";
import MapComponent from "@/components/MapComponent/MapComponent";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function ReservationPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <ReservationHeading />
            <Reservation />
            <MapComponent />
            <Footer />
          </div>
        </section>
      </div>
      <Cookies />
    </>
  );
}
