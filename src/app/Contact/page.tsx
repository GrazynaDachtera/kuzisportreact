"use client";

import React, { useRef } from "react";
import Navbar from "@/components/Navbar/Navbar";
import ContactHeading from "@/components/ContactComponent/ContactHeading/ContactHeading";
import ContactComponent from "@/components/ContactComponent/ContactComponent";
import Reviews from "@/components/Reviews/Reviews";
import MapComponent from "@/components/MapComponent/MapComponent";
import Footer from "@/components/Footer/Footer";
import Cookies from "@/components/Cookies/Cookies";
import "@/app/globals.css";
import { useSmoothScrollbar } from "@/components/hooks/useSmoothScrollbar";

export default function Contact() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useSmoothScrollbar(scrollRef);

  return (
    <>
      <div ref={scrollRef} style={{ overflow: "hidden" }}>
        <section className="kuziSport">
          <div className="main">
            <Navbar />
            <ContactHeading />
            <Reviews />
            <ContactComponent />
          </div>
          <MapComponent />
          <Footer />
        </section>
      </div>
      <Cookies />
    </>
  );
}
